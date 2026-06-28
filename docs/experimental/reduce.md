# std::experimental::parallel::reduce

Definido no cabeçalho `[<experimental/numeric>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/numeric&action=edit&redlink=1> "cpp/header/experimental/numeric \(page does not exist\)")`

```c
template< class InputIt >
typename std::iterator_traits<InputIt>::value_type reduce(
InputIt first, InputIt last );
template< class ExecutionPolicy, class InputIterator >
typename std::iterator_traits<InputIt>::value_type reduce(
ExecutionPolicy&& policy, InputIt first, InputIt last );
template< class InputIt, class T >
T reduce( InputIt first, InputIt last, T init );
template< class ExecutionPolicy, class InputIt, class T >
T reduce( ExecutionPolicy&& policy, InputIt first, InputIt last, T init );
template< class InputIt, class T, class BinaryOp >
T reduce( InputIt first, InputIt last, T init, BinaryOp binary_op );
template< class ExecutionPolicy, class InputIt, class T, class BinaryOp >
T reduce( ExecutionPolicy&& policy,
InputIt first, InputIt last, T init, BinaryOp binary_op );
```

1) O mesmo que reduce(first, last, typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;InputIt&gt;::value_type{}).

3) O mesmo que reduce(first, last, init, [std::plus](<#/doc/utility/functional/plus>)<>()).

5) Reduz o range `[`first`, `last`)`, possivelmente permutado e agregado de maneira não especificada, juntamente com o valor inicial init sobre binary_op.

2,4,6) O mesmo que (1,3,5), mas executado de acordo com a policy.

O comportamento é não determinístico se binary_op não for associativo ou não comutativo.

O comportamento é indefinido se binary_op modifica qualquer elemento ou invalida qualquer iterator em `[`first`, `last`)`.

### Parâmetros

- **first, last** — o range de elementos para aplicar o algoritmo
- **init** — o valor inicial da soma generalizada
- **policy** — a [policy de execução](<#/doc/experimental/parallelism>)
- **binary_op** — [FunctionObject](<#/doc/named_req/FunctionObject>) binário que será aplicado em ordem não especificada ao resultado da desreferenciação dos iterators de entrada, aos resultados de outros binary_op e a init
Requisitos de tipo
-`InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

Soma generalizada de init e *first, *(first + 1), ... *(last - 1) sobre binary_op,

onde a soma generalizada GSUM(op, a1, ..., aN) é definida como segue:

*   se N=1, a1
*   se N > 1, op(GSUM(op, b1, ..., bK), GSUM(op, bM, ..., bN)) onde

    *   b1, ..., bN pode ser qualquer permutação de a1, ..., aN e
    *   1 < K+1 = M ≤ N

em outras palavras, os elementos do range podem ser agrupados e rearranjados em ordem arbitrária.

### Complexidade

O(last - first) aplicações de binary_op.

### Exceções

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção,

    *   se `policy` for `parallel_vector_execution_policy`, [std::terminate](<#/doc/error/terminate>) é chamado.
    *   se `policy` for `sequential_execution_policy` ou `parallel_execution_policy`, o algoritmo termina com uma [`exception_list`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/exception_list&action=edit&redlink=1> "cpp/experimental/exception list \(page does not exist\)") contendo todas as exceções não capturadas. Se houver apenas uma exceção não capturada, o algoritmo pode relançá-la sem envolvê-la em `exception_list`. Não é especificado quanto trabalho o algoritmo realizará antes de retornar após a primeira exceção ser encontrada.
    *   se `policy` for de algum outro tipo, o comportamento é definido pela implementação.

*   Se o algoritmo falhar ao alocar memória (seja para si mesmo ou para construir uma `exception_list` ao lidar com uma exceção do usuário), [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

Se o range estiver vazio, init é retornado, sem modificações.

*   Se `policy` for uma instância de `sequential_execution_policy`, todas as operações são realizadas na thread chamadora.
*   Se `policy` for uma instância de `parallel_execution_policy`, as operações podem ser realizadas em um número não especificado de threads, sequenciadas de forma indeterminada entre si.
*   Se `policy` for uma instância de `parallel_vector_execution_policy`, a execução pode ser paralelizada e vetorizada: os limites do corpo da função não são respeitados e o código do usuário pode ser sobreposto e combinado de maneira arbitrária (em particular, isso implica que um Callable fornecido pelo usuário não deve adquirir um mutex para acessar um recurso compartilhado).

### Exemplo

reduce é a versão fora de ordem de [std::accumulate](<#/doc/algorithm/accumulate>):

Run this code
```cpp
    #include <chrono>
    #include <experimental/execution_policy>
    #include <experimental/numeric>
    #include <iostream>
    #include <numeric>
    #include <vector>
    
    int main()
    {
        std::vector<double> v(10'000'007, 0.5);
    
        {
            auto t1 = std::chrono::high_resolution_clock::now();
            double result = std::accumulate(v.begin(), v.end(), 0.0);
            auto t2 = std::chrono::high_resolution_clock::now();
            std::chrono::duration<double, std::milli> ms = t2 - t1;
            std::cout << std::fixed << "std::accumulate result " << result
                      << " took " << ms.count() << " ms\n";
        }
    
        {
            auto t1 = std::chrono::high_resolution_clock::now();
            double result = std::experimental::parallel::reduce(
                                std::experimental::parallel::par,
                                v.begin(), v.end());
            auto t2 = std::chrono::high_resolution_clock::now();
            std::chrono::duration<double, std::milli> ms = t2 - t1;
            std::cout << "parallel::reduce result "
                      << result << " took " << ms.count() << " ms\n";
        }
    }
```

Saída possível:
```
    std::accumulate result 5000003.50000 took 12.7365 ms
    parallel::reduce result 5000003.50000 took 5.06423 ms
```

### Veja também

[ accumulate](<#/doc/algorithm/accumulate>) | soma ou dobra um range de elementos
(modelo de função)
[ transform](<#/doc/algorithm/transform>) | aplica uma função a um range de elementos, armazenando os resultados em um range de destino
(modelo de função)
[ transform_reduce](<#/doc/experimental/transform_reduce>)(parallelism TS) | aplica um functor, então reduz fora de ordem
(modelo de função)