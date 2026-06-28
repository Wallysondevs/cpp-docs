# std::transform_reduce

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class InputIt1, class InputIt2, class T >
T transform_reduce( InputIt1 first1, InputIt1 last1,
InputIt2 first2, T init );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class T >
T transform_reduce( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, T init );
template< class InputIt1, class InputIt2, class T,
class BinaryOp1, class BinaryOp2 >
T transform_reduce( InputIt1 first1, InputIt1 last1,
InputIt2 first2, T init,
BinaryOp1 reduce, BinaryOp2 transform );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class T,
class BinaryOp1, class BinaryOp2 >
T transform_reduce( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, T init,
BinaryOp1 reduce, BinaryOp2 transform );
template< class InputIt, class T,
class BinaryOp, class UnaryOp >
T transform_reduce( InputIt first, InputIt last, T init,
BinaryOp reduce, UnaryOp transform );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt, class T,
class BinaryOp, class UnaryOp >
T transform_reduce( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, T init,
BinaryOp reduce, UnaryOp transform );
```

1) Equivalente a transform_reduce(first1, last1, first2, init,
[std::plus](<#/doc/utility/functional/plus>)<>(), [std::multiplies](<#/doc/utility/functional/multiplies>)<>()), versão efetivamente paralelizada do [std::inner_product](<#/doc/algorithm/inner_product>) padrão.

3) Aplica transform a cada par de elementos dos intervalos `[`first1`, `last1`)` e do intervalo de [std::distance](<#/doc/iterator/distance>)(first1, last1) elementos começando em first2 e reduz os resultados (possivelmente permutados e agregados de maneira não especificada) juntamente com o valor inicial init usando reduce.

O resultado é não-determinístico se reduce não for associativo ou não comutativo (como a adição de ponto flutuante).

Se qualquer um dos seguintes valores não for conversível para `T`, o programa é malformado:

  * reduce(init, init)
  * reduce(init, transform(*first1, *first2))
  * reduce(transform(*first1, *first2), init)
  * reduce(transform(*first1, *first2), transform(*first1, *first2))

Dado last2 como o enésimo iterador seguinte de first2, onde n é [std::distance](<#/doc/iterator/distance>)(first1, last1), se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * `T` não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * transform ou reduce modifica qualquer elemento de `[`first1`, `last1`)` ou `[`first2`, `last2`)`.
  * transform ou reduce invalida qualquer iterador ou sub-intervalo de `[`first1`, `last1`]` ou `[`first2`, `last2`]`.

5) Aplica transform a cada elemento no intervalo `[`first`, `last`)` e reduz os resultados (possivelmente permutados e agregados de maneira não especificada) juntamente com o valor inicial init usando reduce.

O resultado é não-determinístico se reduce não for associativo ou não comutativo (como a adição de ponto flutuante).

Se qualquer um dos seguintes valores não for conversível para `T`, o programa é malformado:

  * reduce(init, init)
  * reduce(init, transform(*first))
  * reduce(transform(*first), init)
  * reduce(transform(*first), transform(*first))

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * `T` não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * transform ou reduce modifica qualquer elemento de `[`first`, `last`)`.
  * transform ou reduce invalida qualquer iterador ou sub-intervalo de `[`first`, `last`]`.

2,4,6) O mesmo que (1,3,5), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (desde C++20)

### Parâmetros

- **first1, last1** — o intervalo de elementos a serem usados como operando esquerdo de transform
- **first2** — o início do intervalo de elementos a serem usados como operando direito de transform
- **first, last** — o intervalo de elementos a serem usados como operando de transform
- **init** — o valor inicial da soma generalizada
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **reduce** — [FunctionObject](<#/doc/named_req/FunctionObject>) binário que será aplicado em ordem não especificada aos resultados de transform, aos resultados de outros reduce e a init.
- **transform** — [FunctionObject](<#/doc/named_req/FunctionObject>) unário ou binário que será aplicado a cada elemento do(s) intervalo(s) de entrada. O tipo de retorno deve ser aceitável como entrada para reduce.
Requisitos de tipo
-`InputIt1, InputIt2, InputIt` devem satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt1, ForwardIt2, ForwardIt` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

1,2) A soma generalizada de init e valores usando [std::plus](<#/doc/utility/functional/plus>)<>(), onde os valores são os valores transformados por [std::multiplies](<#/doc/utility/functional/multiplies>)<>(), cada valor é transformado a partir de um par de elementos dos dois intervalos de entrada.

3,4) A soma generalizada de init e valores usando reduce, onde os valores são os valores transformados por transform, cada valor é transformado a partir de um par de elementos dos dois intervalos de entrada.

5,6) A soma generalizada de init e valores usando reduce, onde os valores são os valores transformados por transform, cada valor é transformado a partir de um elemento do intervalo de entrada.

A _soma generalizada_ de um grupo de elementos sobre uma operação binária binary_op é definida da seguinte forma:

  * Se o grupo tiver apenas um elemento, a soma é o valor do elemento.
  * Caso contrário, executa as seguintes operações em ordem:
  1. Pega quaisquer dois elementos elem1 e elem2 do grupo.
  2. Calcula binary_op(elem1, elem2) e coloca o resultado de volta no grupo.
  3. Repete os passos 1 e 2 até que haja apenas um elemento no grupo.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first1, last1) (ou [std::distance](<#/doc/iterator/distance>)(first, last) para as sobrecargas (5,6)):

1,2) \\(\scriptsize O(N)\\)O(N) aplicações de [std::plus](<#/doc/utility/functional/plus>)<>() e [std::multiplies](<#/doc/utility/functional/multiplies>)<>() respectivamente.

3-6) \\(\scriptsize O(N)\\)O(N) aplicações de reduce e transform respectivamente.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

transform nunca é aplicado a init.

Se first == last ou first1 == last1, init é retornado, inalterado.

### Exemplo

`transform_reduce` pode ser usado para paralelizar [std::inner_product](<#/doc/algorithm/inner_product>). Alguns sistemas podem precisar de suporte adicional para obter vantagens da execução paralela. Por exemplo, no GNU/Linux, o [Intel TBB](<https://en.wikipedia.org/wiki/Threading_Building_Blocks> "enwiki:Threading Building Blocks") deve ser instalado e a opção -ltbb fornecida ao compilador gcc/clang.

Run this code
```cpp
    #if PARALLEL
    #include <execution>
    #define PAR std::execution::par,
    #else
    #define PAR
    #endif
    
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <locale>
    #include <numeric>
    #include <vector>
    
    // to parallelize non-associate accumulative operation, you'd better choose
    // transform_reduce instead of reduce; e.g., a + b * b != b + a * a
    void print_sum_squared(long const num)
    {
        std::cout.imbue(std::locale{"en_US.UTF8"});
        std::cout << "num = " << num << '\n';
    
        // create an immutable vector filled with pattern: 1,2,3,4, 1,2,3,4 ...
        const std::vector<long> v{[n = num * 4] {
            std::vector<long> v;
            v.reserve(n);
            std::generate_n(std::back_inserter(v), n,
                i = 0 mutable { return 1 + i++ % 4; });
            return v;
        }()};
    
        auto squared_sum =  { return sum + val * val; };
    
        auto sum1 = std::accumulate(v.cbegin(), v.cend(), 0L, squared_sum);
        std::cout << "accumulate(): " << sum1 << '\n';
    
        auto sum2 = std::reduce(PAR v.cbegin(), v.cend(), 0L, squared_sum);
        std::cout << "reduce(): " << sum2 << '\n';
    
        auto sum3 = std::transform_reduce(PAR v.cbegin(), v.cend(), 0L, std::plus{},
                                           { return val * val; });
        std::cout << "transform_reduce(): " << sum3 << "\n\n";
    }
    
    int main()
    {
        print_sum_squared(1);
        print_sum_squared(1'000);
        print_sum_squared(1'000'000);
    }
```

Saída possível:
```
    num = 1
    accumulate(): 30
    reduce(): 30
    transform_reduce(): 30
    
    num = 1,000
    accumulate(): 30,000
    reduce(): -7,025,681,278,312,630,348
    transform_reduce(): 30,000
    
    num = 1,000,000
    accumulate(): 30,000,000
    reduce(): -5,314,886,882,370,003,032
    transform_reduce(): 30,000,000
    
    // Opções de compilação para execução paralela em POSIX:
    // g++ -O2 -std=c++17 -Wall -Wextra -pedantic -DPARALLEL ./example.cpp -ltbb -o tr; ./tr
```

### Ver também

[ accumulate](<#/doc/algorithm/accumulate>) | soma ou dobra um intervalo de elementos
(function template)
[ transform](<#/doc/algorithm/transform>) | aplica uma função a um intervalo de elementos, armazenando os resultados em um intervalo de destino
(function template)
[ reduce](<#/doc/algorithm/reduce>)(C++17) | semelhante a [std::accumulate](<#/doc/algorithm/accumulate>), exceto pela ordem
(function template)