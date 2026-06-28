# std::experimental::parallel::transform_reduce

Definido no cabeçalho `[<experimental/numeric>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/numeric&action=edit&redlink=1> "cpp/header/experimental/numeric \(page does not exist\)")

```c
template< class InputIt, class UnaryOp, class T, class BinaryOp >
T transform_reduce( InputIt first, InputIt last,
UnaryOp unary_op, T init, BinaryOp binary_op );
template< class ExecutionPolicy,
class InputIt, class UnaryOp, class T, class BinaryOp >
T transform_reduce( ExecutionPolicy&& policy,
InputIt first, InputIt last,
UnaryOp unary_op, T init, BinaryOp binary_op );
```

Aplica unary_op a cada elemento no range `[`first`, `last`)` e reduz os resultados (possivelmente permutados e agregados de maneira não especificada) juntamente com o valor inicial init sobre binary_op.

O comportamento é não-determinístico se binary_op não for associativo ou não for comutativo.

O comportamento é indefinido se unary_op ou binary_op modificar qualquer elemento ou invalidar qualquer iterator em `[`first`, `last`)`.

### Parâmetros

- **first, last** — o range de elementos ao qual aplicar o algoritmo
- **init** — o valor inicial da soma generalizada
- **policy** — a [política de execução](<#/doc/experimental/parallelism>)
- **unary_op** — [FunctionObject](<#/doc/named_req/FunctionObject>) unário que será aplicado a cada elemento do range de entrada. O tipo de retorno deve ser aceitável como entrada para binary_op
- **binary_op** — [FunctionObject](<#/doc/named_req/FunctionObject>) binário que será aplicado em ordem não especificada aos resultados de unary_op, aos resultados de outros binary_op e init
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

Soma generalizada de init e unary_op(*first), unary_op(*(first + 1)), ... unary_op(*(last - 1)) sobre binary_op, onde a soma generalizada GSUM(op, a1, ..., aN) é definida como segue:

* se N = 1, a1,
* se N > 1, op(GSUM(op, b1, ..., bK), GSUM(op, bM, ..., bN)) onde

* b1, ..., bN pode ser qualquer permutação de a1, ..., aN e
* 1 < K + 1 = M ≤ N

em outras palavras, os resultados de unary_op podem ser agrupados e arranjados em ordem arbitrária.

### Complexidade

O(last - first) aplicações de unary_op e binary_op, cada.

### Exceções

* Se a execução de uma função invocada como parte do algoritmo lançar uma exceção,

* se `policy` for `parallel_vector_execution_policy`, [std::terminate](<#/doc/error/terminate>) é chamada.
* se `policy` for `sequential_execution_policy` ou `parallel_execution_policy`, o algoritmo sai com uma [`exception_list`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/exception_list&action=edit&redlink=1> "cpp/experimental/exception list \(page does not exist\)") contendo todas as exceções não capturadas. Se houver apenas uma exceção não capturada, o algoritmo pode relançá-la sem envolver em `exception_list`. Não é especificado quanto trabalho o algoritmo realizará antes de retornar após a primeira exceção ser encontrada.
* se `policy` for de algum outro tipo, o comportamento é definido pela implementação.

* Se o algoritmo falhar ao alocar memória (seja para si mesmo ou para construir uma `exception_list` ao lidar com uma exceção do usuário), [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

unary_op não é aplicado a init.

Se o range estiver vazio, init é retornado, inalterado.

* Se `policy` for uma instância de `sequential_execution_policy`, todas as operações são realizadas no thread chamador.
* Se `policy` for uma instância de `parallel_execution_policy`, as operações podem ser realizadas em um número não especificado de threads, sequenciadas de forma indeterminada umas com as outras.
* Se `policy` for uma instância de `parallel_vector_execution_policy`, a execução pode ser tanto paralelizada quanto vetorizada: os limites do corpo da função não são respeitados e o código do usuário pode ser sobreposto e combinado de maneira arbitrária (em particular, isso implica que um Callable fornecido pelo usuário não deve adquirir um mutex para acessar um recurso compartilhado).

### Exemplo

transform_reduce pode ser usado para paralelizar [std::inner_product](<#/doc/algorithm/inner_product>):

Execute este código
```cpp
    #include <boost/iterator/zip_iterator.hpp>
    #include <boost/tuple.hpp>
    #include <experimental/execution_policy>
    #include <experimental/numeric>
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        std::vector<double> xvalues(10007, 1.0), yvalues(10007, 1.0);
    
        double result = std::experimental::parallel::transform_reduce(
            std::experimental::parallel::par,
            boost::iterators::make_zip_iterator(
                boost::make_tuple(std::begin(xvalues), std::begin(yvalues))),
            boost::iterators::make_zip_iterator(
                boost::make_tuple(std::end(xvalues), std::end(yvalues))),
             { return boost::get<0>(r) * boost::get<1>(r); },
            0.0,
            std::plus<>()
        );
        std::cout << result << '\n';
    }
```

Saída:
```
    10007
```

### Veja também

[ accumulate](<#/doc/algorithm/accumulate>) | soma ou dobra um range de elementos
(modelo de função)
[ transform](<#/doc/algorithm/transform>) | aplica uma função a um range de elementos, armazenando os resultados em um range de destino
(modelo de função)
[ reduce](<#/doc/experimental/reduce>)(parallelism TS) | similar a [std::accumulate](<#/doc/algorithm/accumulate>), exceto fora de ordem
(modelo de função)