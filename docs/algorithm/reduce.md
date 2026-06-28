# std::reduce

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class InputIt >
typename std::iterator_traits<InputIt>::value_type
reduce( InputIt first, InputIt last );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt >
typename std::iterator_traits<ForwardIt>::value_type
reduce( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last );
template< class InputIt, class T >
T reduce( InputIt first, InputIt last, T init );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt, class T >
T reduce( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, T init );
template< class InputIt, class T, class BinaryOp >
T reduce( InputIt first, InputIt last, T init, BinaryOp op );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt, class T, class BinaryOp >
T reduce( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, T init, BinaryOp op );
```

1) Equivalente a reduce(first, last, typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;InputIt&gt;::value_type{}).

3) Equivalente a reduce(first, last, init, [std::plus](<#/doc/utility/functional/plus>)<>()).

5) Reduz o range `[`first`, `last`)`, possivelmente permutado e agregado de maneira não especificada, juntamente com o valor inicial init sobre op.

2,4,6) O mesmo que (1,3,5), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (desde C++20)

Dado binary_op como a operação binária real:

*   O resultado é não determinístico se binary_op não for associativa ou não comutativa (como a adição de ponto flutuante).

*   Se qualquer um dos seguintes valores não for conversível para `T`, o programa é malformado:

    *   binary_op(init, *first)
    *   binary_op(*first, init)
    *   binary_op(init, init)
    *   binary_op(*first, *first)

*   Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

    *   `T` não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
    *   binary_op modifica qualquer elemento de `[`first`, `last`)`.
    *   binary_op invalida qualquer iterator ou subrange de `[`first`, `last`]`.

### Parâmetros

- **first, last** — o range de elementos para aplicar o algoritmo
- **init** — o valor inicial da soma generalizada
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **op** — [FunctionObject](<#/doc/named_req/FunctionObject>) binário que será aplicado em ordem não especificada ao resultado da desreferenciação dos iterators de entrada, os resultados de outras operações e init.
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

1-4) A soma generalizada de init e os elementos de `[`first`, `last`)` sobre [std::plus](<#/doc/utility/functional/plus>)<>().

5,6) A soma generalizada de init e os elementos de `[`first`, `last`)` sobre op.

A _soma generalizada_ de um grupo de elementos sobre uma operação binária binary_op é definida como segue:

*   Se o grupo tiver apenas um elemento, a soma é o valor do elemento.
*   Caso contrário, executa as seguintes operações em ordem:

    1.  Pega quaisquer dois elementos elem1 e elem2 do grupo.
    2.  Calcula binary_op(elem1, elem2) e coloca o resultado de volta no grupo.
    3.  Repete os passos 1 e 2 até que haja apenas um elemento no grupo.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1-4) \\(\scriptsize O(N)\\)O(N) aplicações de [std::plus](<#/doc/utility/functional/plus>)<>().

5,6) \\(\scriptsize O(N)\\)O(N) aplicações de op.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Observações

`std::reduce` se comporta como [std::accumulate](<#/doc/algorithm/accumulate>), exceto que os elementos do range podem ser agrupados e rearranjados em ordem arbitrária.

### Exemplo

Comparação lado a lado entre `std::reduce` e [std::accumulate](<#/doc/algorithm/accumulate>):

Execute este código
```cpp
    #if PARALLEL
    #include <execution>
    #define SEQ std::execution::seq,
    #define PAR std::execution::par,
    #else
    #define SEQ
    #define PAR
    #endif
    
    #include <chrono>
    #include <iomanip>
    #include <iostream>
    #include <locale>
    #include <numeric>
    #include <utility>
    #include <vector>
    
    int main()
    {
        std::cout.imbue(std::locale("en_US.UTF-8"));
        std::cout << std::fixed << std::setprecision(1);
    
        auto eval = 
        {
            const auto t1 = std::chrono::high_resolution_clock::now();
            const auto [name, result] = fun();
            const auto t2 = std::chrono::high_resolution_clock::now();
            const std::chrono::duration<double, std::milli> ms = t2 - t1;
            std::cout << std::setw(28) << std::left << name << "sum: "
                      << result << '\t' << "time: " << ms.count() << " ms\n";
        };
    
        {
            const std::vector<double> v(100'000'007, 0.1);
    
            eval([&v]{ return std::pair{"std::accumulate (double)",
                std::accumulate(v.cbegin(), v.cend(), 0.0)}; });
            eval([&v]{ return std::pair{"std::reduce (seq, double)",
                std::reduce(SEQ v.cbegin(), v.cend())}; });
            eval([&v]{ return std::pair{"std::reduce (par, double)",
                std::reduce(PAR v.cbegin(), v.cend())}; });
        }
    
        {
            const std::vector<long> v(100'000'007, 1);
    
            eval([&v]{ return std::pair{"std::accumulate (long)",
                std::accumulate(v.cbegin(), v.cend(), 0l)}; });
            eval([&v]{ return std::pair{"std::reduce (seq, long)",
                std::reduce(SEQ v.cbegin(), v.cend())}; });
            eval([&v]{ return std::pair{"std::reduce (par, long)",
                std::reduce(PAR v.cbegin(), v.cend())}; });
        }
    }
```

Saída possível:
```
    // POSIX: g++ -std=c++23 ./example.cpp -ltbb -O3; ./a.out
    std::accumulate (double)    sum: 10,000,000.7	time: 356.9 ms
    std::reduce (seq, double)   sum: 10,000,000.7	time: 140.1 ms
    std::reduce (par, double)   sum: 10,000,000.7	time: 140.1 ms
    std::accumulate (long)      sum: 100,000,007	time: 46.0 ms
    std::reduce (seq, long)     sum: 100,000,007	time: 67.3 ms
    std::reduce (par, long)     sum: 100,000,007	time: 63.3 ms
    
    // POSIX: g++ -std=c++23 ./example.cpp -ltbb -O3 -DPARALLEL; ./a.out
    std::accumulate (double)    sum: 10,000,000.7	time: 353.4 ms
    std::reduce (seq, double)   sum: 10,000,000.7	time: 140.7 ms
    std::reduce (par, double)   sum: 10,000,000.7	time: 24.7 ms
    std::accumulate (long)      sum: 100,000,007	time: 42.4 ms
    std::reduce (seq, long)     sum: 100,000,007	time: 52.0 ms
    std::reduce (par, long)     sum: 100,000,007	time: 23.1 ms
```

### Veja também

[ accumulate](<#/doc/algorithm/accumulate>) | soma ou "dobra" (folds) um range de elementos
(modelo de função)
[ transform](<#/doc/algorithm/transform>) | aplica uma função a um range de elementos, armazenando os resultados em um range de destino
(modelo de função)
[ transform_reduce](<#/doc/algorithm/transform_reduce>)(C++17) | aplica um invocável, então reduz fora de ordem
(modelo de função)
[ ranges::fold_left](<#/doc/algorithm/ranges/fold_left>)(C++23) | "dobra" (left-folds) um range de elementos à esquerda
(objeto de função de algoritmo)
\*\[Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão