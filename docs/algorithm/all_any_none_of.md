# std::all_of, std::any_of, std::none_of

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class UnaryPred >
bool all_of( InputIt first, InputIt last, UnaryPred p );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt, class UnaryPred >
bool all_of( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, UnaryPred p );
template< class InputIt, class UnaryPred >
bool any_of( InputIt first, InputIt last, UnaryPred p );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt, class UnaryPred >
bool any_of( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, UnaryPred p );
template< class InputIt, class UnaryPred >
bool none_of( InputIt first, InputIt last, UnaryPred p );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt, class UnaryPred >
bool none_of( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, UnaryPred p );
```

1) Verifica se o predicado unário `p` retorna `false` para pelo menos um elemento no range `[`first`, `last`)`.

3) Verifica se o predicado unário `p` retorna `true` para pelo menos um elemento no range `[`first`, `last`)`.

5) Verifica se o predicado unário `p` retorna `true` para nenhum dos elementos no range `[`first`, `last`)`.

2,4,6) O mesmo que (1,3,5), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é `true`. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é `true`. | (desde C++20)

### Parâmetros

first, last | \- | o range de elementos a examinar
---|---|---
policy | \- | a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
p | \- | predicado unário.
A expressão `p(v)` deve ser conversível para `bool` para cada argumento `v` do tipo (possivelmente `const`) `VT`, onde `VT` é o tipo de valor de `InputIt`, independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro `VT&` não é permitido, nem `VT` a menos que para `VT` um move seja equivalente a uma cópia (desde C++11).
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`UnaryPred` deve satisfazer os requisitos de [Predicate](<#/doc/named_req/Predicate>).

### Valor de retorno

Tem elemento true | Sim | Não
---|---|---|---|---
Tem elemento false | Sim | Não | Sim | Não[1](<#/doc/algorithm/all_any_none_of>)
[`all_of`](<#/doc/algorithm/all_any_none_of>) | false | true | false | true
[`any_of`](<#/doc/algorithm/all_any_none_of>) | true | true | false | false
[`none_of`](<#/doc/algorithm/all_any_none_of>) | false | false | true | true

1. [↑](<#/doc/algorithm/all_any_none_of>) O range está vazio neste caso.

### Complexidade

1-6) No máximo [std::distance](<#/doc/iterator/distance>)(first, last) aplicações do predicado `p`.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Implementação possível

Veja também as implementações de

*   `all_of` em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L508>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L838>).
*   `any_of` em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L541>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L852>).
*   `none_of` em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L523>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L866>).

[all_of](<#/doc/algorithm/all_any_none_of>)
---
```cpp
    template<class InputIt, class UnaryPred>
    constexpr bool all_of(InputIt first, InputIt last, UnaryPred p)
    {
        return std::find_if_not(first, last, p) == last;
    }
```

[any_of](<#/doc/algorithm/all_any_none_of>)
```cpp
    template<class InputIt, class UnaryPred>
    constexpr bool any_of(InputIt first, InputIt last, UnaryPred p)
    {
        return std::find_if(first, last, p) != last;
    }
```

[none_of](<#/doc/algorithm/all_any_none_of>)
```cpp
    template<class InputIt, class UnaryPred>
    constexpr bool none_of(InputIt first, InputIt last, UnaryPred p)
    {
        return std::find_if(first, last, p) == last;
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <numeric>
    #include <vector>
    
    int main()
    {
        std::vector<int> v(10, 2);
        std::partial_sum(v.cbegin(), v.cend(), v.begin());
        std::cout << "Among the numbers: ";
        std::copy(v.cbegin(), v.cend(), std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    
        if (std::all_of(v.cbegin(), v.cend(),  { return i % 2 == 0; }))
            std::cout << "All numbers are even\n";
    
        if (std::none_of(v.cbegin(), v.cend(), std::bind(std::modulus<>(),
                                                         std::placeholders::_1, 2)))
            std::cout << "None of them are odd\n";
    
        struct DivisibleBy
        {
            const int d;
            DivisibleBy(int n) : d(n) {}
            bool operator()(int n) const { return n % d == 0; }
        };
    
        if (std::any_of(v.cbegin(), v.cend(), DivisibleBy(7)))
            std::cout << "At least one number is divisible by 7\n";
    }
```

Saída:
```
    Among the numbers: 2 4 6 8 10 12 14 16 18 20
    All numbers are even
    None of them are odd
    At least one number is divisible by 7
```

### Veja também

[ ranges::all_ofranges::any_ofranges::none_of](<#/doc/algorithm/ranges/all_any_none_of>)(C++20)(C++20)(C++20) | verifica se um predicado é verdadeiro para todos, qualquer ou nenhum dos elementos em um range
(objeto de função de algoritmo)