# std::count, std::count_if

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class T >
typename std::iterator_traits<InputIt>::difference_type
count( InputIt first, InputIt last, const T& value );
(até C++26)
template< class InputIt, class T = typename std::iterator_traits
<InputIt>::value_type >
constexpr typename std::iterator_traits<InputIt>::difference_type
count( InputIt first, InputIt last, const T& value );
template< class ExecutionPolicy, class ForwardIt, class T >
typename std::iterator_traits<ForwardIt>::difference_type
count( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, const T& value );
(até C++26)
template< class ExecutionPolicy,
class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type >
typename std::iterator_traits<ForwardIt>::difference_type
count( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, const T& value );
template< class InputIt, class UnaryPred >
typename std::iterator_traits<InputIt>::difference_type
count_if( InputIt first, InputIt last, UnaryPred p );
template< class ExecutionPolicy, class ForwardIt, class UnaryPred >
typename std::iterator_traits<ForwardIt>::difference_type
count_if( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, UnaryPred p );
```

Retorna o número de elementos no range `[`first`, `last`)` que satisfazem critérios específicos.

1) Conta os elementos que são iguais a value (usando operator==).

3) Conta os elementos para os quais o predicado p retorna true.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [`std::is_execution_policy_v`](<#/doc/algorithm/is_execution_policy>)`<[`std::decay_t`](<#/doc/types/decay>)<ExecutionPolicy>>` é true. | (até C++20)
---|---
[`std::is_execution_policy_v`](<#/doc/algorithm/is_execution_policy>)`<[`std::remove_cvref_t`](<#/doc/types/remove_cvref>)<ExecutionPolicy>>` é true. | (desde C++20)

### Parâmetros

- **first, last** — o range de elementos a examinar
- **value** — o valor a procurar
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado unário que retorna true para os elementos requeridos.
A expressão p(v) deve ser conversível para bool para cada argumento `v` do tipo (possivelmente const) `VT`, onde `VT` é o tipo de valor de `InputIt`, independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro VT& não é permitido, nem VT, a menos que para `VT` um move seja equivalente a uma cópia (desde C++11).
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`UnaryPred` deve satisfazer os requisitos de [Predicate](<#/doc/named_req/Predicate>).

### Valor de retorno

O número de iterators it no [range](<#/doc/iterator>) `[`first`, `last`)` que satisfazem a seguinte condição:

1,2) *it == value é true.

3,4) p(*it) != false é true.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) Exatamente \\(\scriptsize N\\)N comparações com value usando operator==.

3,4) Exatamente \\(\scriptsize N\\)N aplicações do predicado p.

### Exceções

As sobrecargas com um parâmetro template nomeado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é indefinido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

Para o número de elementos no range `[`first`, `last`)` sem quaisquer critérios adicionais, veja [std::distance](<#/doc/iterator/distance>).

Macro de [teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Std | Funcionalidade
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/count>))

### Possível implementação

Veja também as implementações de `count` em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L4056>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L1171>).

Veja também as implementações de `count_if` em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L4079>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L1186>).

[count](<#/doc/algorithm/count>)
---
```cpp
    template<class InputIt, class T = typename std::iterator_traits<InputIt>::value_type>
    typename std::iterator_traits<InputIt>::difference_type
        count(InputIt first, InputIt last, const T& value)
    {
        typename std::iterator_traits<InputIt>::difference_type ret = 0;
        for (; first != last; ++first)
            if (*first == value)
                ++ret;
        return ret;
    }
```

[count_if](<#/doc/algorithm/count>)
```cpp
    template<class InputIt, class UnaryPred>
    typename std::iterator_traits<InputIt>::difference_type
        count_if(InputIt first, InputIt last, UnaryPred p)
    {
        typename std::iterator_traits<InputIt>::difference_type ret = 0;
        for (; first != last; ++first)
            if (p(*first))
                ++ret;
        return ret;
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <cassert>
    #include <complex>
    #include <iostream>
    #include <iterator>
    
    int main()
    {
        constexpr std::array v{1, 2, 3, 4, 4, 3, 7, 8, 9, 10};
        std::cout << "v: ";
        std::copy(v.cbegin(), v.cend(), std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    
        // Determina quantos inteiros correspondem a um valor alvo.
        for (const int target : {3, 4, 5})
        {
            const int num_items = std::count(v.cbegin(), v.cend(), target);
            std::cout << "number: " << target << ", count: " << num_items << '\n';
        }
    
        // Usa uma expressão lambda para contar elementos divisíveis por 4.
        int count_div4 = std::count_if(v.begin(), v.end(),  { return i % 4 == 0; });
        std::cout << "numbers divisible by four: " << count_div4 << '\n';
    
        // Uma versão simplificada de `distance` com complexidade O(N):
        auto distance = 
        {
            return std::count_if(first, last,  { return true; });
        };
        static_assert(distance(v.begin(), v.end()) == 10);
    
        std::array<std::complex<double>, 3> nums{{{4, 2}, {1, 3}, {4, 2}}};
        #ifdef __cpp_lib_algorithm_default_value_type
            // T é deduzido, tornando a inicialização por lista possível
            auto c = std::count(nums.cbegin(), nums.cend(), {4, 2});
        #else
            auto c = std::count(nums.cbegin(), nums.cend(), std::complex<double>{4, 2});
        #endif
        assert(c == 2);
    }
```

Saída:
```
    v: 1 2 3 4 4 3 7 8 9 10
    number: 3, count: 2
    number: 4, count: 2
    number: 5, count: 0
    numbers divisible by four: 3
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 283](<https://cplusplus.github.io/LWG/issue283>) | C++98 | `T` era exigido como [EqualityComparable](<#/doc/named_req/EqualityComparable>), mas
o tipo de valor de `InputIt` nem sempre é `T` | removeu o requisito

### Veja também

[ distance](<#/doc/iterator/distance>) | retorna a distância entre dois iterators
(modelo de função)
[ ranges::countranges::count_if](<#/doc/algorithm/ranges/count>)(C++20)(C++20) | retorna o número de elementos que satisfazem critérios específicos
(objeto de função de algoritmo)