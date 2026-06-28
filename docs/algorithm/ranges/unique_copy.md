# std::ranges::unique_copy, std::ranges::unique_copy_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S, std::weakly_incrementable O,
class Proj = std::identity,
std::indirect_equivalence_relation<std::projected<I, Proj>> C = ranges::equal_to >
requires std::indirectly_copyable<I, O> && (std::forward_iterator<I>
(std::input_iterator<O> && std::same_as<std::iter_value_t<I>,
std::iter_value_t<O>>)
constexpr unique_copy_result<I, O>
unique_copy( I first, S last, O result, C comp = {}, Proj proj = {} );
template< ranges::input_range R, std::weakly_incrementable O, class Proj = std::identity,
std::indirect_equivalence_relation<std::projected<ranges::iterator_t<R>,
Proj>> C = ranges::equal_to >
requires std::indirectly_copyable<ranges::iterator_t<R>, O> &&
(std::forward_iterator<ranges::iterator_t<R>>
(std::input_iterator<O> && std::same_as<ranges::range_value_t<R>,
std::iter_value_t<O>>)
std::indirectly_copyable_storable<ranges::iterator_t<R>, O>)
constexpr unique_copy_result<ranges::borrowed_iterator_t<R>, O>
unique_copy( R&& r, O result, C comp = {}, Proj proj = {} );
Tipos auxiliares
template< class I, class O >
using unique_copy_result = ranges::in_out_result<I, O>;
```

1) Copia os elementos do range de origem `[`first`, `last`)` para o range de destino começando em `result` de tal forma que não haja elementos consecutivos iguais. Apenas o primeiro elemento de cada grupo de elementos iguais é copiado.

Os ranges `[`first`, `last`)` e `[`result`, `result + N`)` não devem se sobrepor. N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last).

Dois elementos consecutivos *(i - 1) e *i são considerados equivalentes se [std::invoke](<#/doc/utility/functional/invoke>)(comp, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *(i - 1)), [std::invoke](<#/doc/utility/functional/invoke>)(proj, *i)) == true, onde `i` é um iterator no range `[`first + 1`, `last`)`.

2) O mesmo que (1), mas usa `r` como o range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first`, e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo-função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de origem dos elementos
- **r** — o range de origem dos elementos
- **result** — o range de destino dos elementos
- **comp** — o predicado binário para comparar os elementos projetados
- **proj** — a projeção a ser aplicada aos elementos

### Valor de retorno

{last, result + N}

### Complexidade

Exatamente N - 1 aplicações do predicado `comp` correspondente e não mais que o dobro de aplicações de qualquer projeção `proj`.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/ranges_algo.h#L1198-L1276>) e [MSVC STL](<https://github.com/microsoft/STL/blob/472161105d596192194d4715ccad307c6c163b4a/stl/inc/algorithm#L4022-L4113>) (e bibliotecas de terceiros: [cmcstl2](<https://github.com/CaseyCarter/cmcstl2/blob/master/include/stl2/detail/algorithm/unique_copy.hpp>), [NanoRange](<https://github.com/tcbrindle/NanoRange/blob/master/include/nanorange/algorithm/unique_copy.hpp>), e [range-v3](<https://github.com/ericniebler/range-v3/blob/master/include/range/v3/algorithm/unique_copy.hpp>)).
```cpp
    struct unique_copy_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, std::weakly_incrementable O,
                 class Proj = std::identity,
                 std::indirect_equivalence_relation<std::projected<I,
                     Proj>> C = ranges::equal_to>
        requires std::indirectly_copyable<I, O> && (std::forward_iterator<I> ||
                     (std::input_iterator<O> && std::same_as<std::iter_value_t<I>,
                         std::iter_value_t<O>>) || std::indirectly_copyable_storable<I, O>)
        constexpr ranges::unique_copy_result<I, O>
            operator()(I first, S last, O result, C comp = {}, Proj proj = {}) const
        {
            if (!(first == last))
            {
                std::iter_value_t<I> value = *first;
                *result = value;
                ++result;
                while (!(++first == last))
                {
                    auto&& value2 = *first;
                    if (!std::invoke(comp, std::invoke(proj, value2),
                            std::invoke(proj, value)))
                    {
                        value = std::forward<decltype(value2)>(value2);
                        *result = value;
                        ++result;
                    }
                }
            }
    
            return {std::move(first), std::move(result)};
        }
    
        template<ranges::input_range R, std::weakly_incrementable O, class Proj = std::identity,
                 std::indirect_equivalence_relation<std::projected<ranges::iterator_t<R>,
                     Proj>> C = ranges::equal_to>
        requires std::indirectly_copyable<ranges::iterator_t<R>, O> &&
                     (std::forward_iterator<ranges::iterator_t<R>> ||
                     (std::input_iterator<O> && std::same_as<ranges::range_value_t<R>,
                         std::iter_value_t<O>>) ||
                     std::indirectly_copyable_storable<ranges::iterator_t<R>, O>)
        constexpr ranges::unique_copy_result<ranges::borrowed_iterator_t<R>, O>
            operator()(R&& r, O result, C comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(result),
                           std::move(comp), std::move(proj));
        }
    };
    
    inline constexpr unique_copy_fn unique_copy {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cmath>
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <string>
    #include <type_traits>
    
    void print(const auto& rem, const auto& v)
    {
        using V = std::remove_cvref_t<decltype(v)>;
        constexpr bool sep{std::is_same_v<typename V::value_type, int>};
        std::cout << rem << std::showpos;
        for (const auto& e : v)
            std::cout << e << (sep ? " " : "");
        std::cout << '\n';
    }
    
    int main()
    {
        std::string s1{"The      string    with many       spaces!"};
        print("s1: ", s1);
    
        std::string s2;
        std::ranges::unique_copy(
            s1.begin(), s1.end(), std::back_inserter(s2),
             { return c1 == ' ' && c2 == ' '; }
        );
        print("s2: ", s2);
    
        const auto v1 = {-1, +1, +2, -2, -3, +3, -3};
        print("v1: ", v1);
        std::list<int> v2;
        std::ranges::unique_copy(
            v1, std::back_inserter(v2),
            {}, // default comparator std::ranges::equal_to
             { return std::abs(x); } // projection
        );
        print("v2: ", v2);
    }
```

Saída:
```
    s1: The      string    with many       spaces!
    s2: The string with many spaces!
    v1: -1 +1 +2 -2 -3 +3 -3 
    v2: -1 +2 -3
```

### Veja também

[ ranges::unique](<#/doc/algorithm/ranges/unique>)(C++20) | remove elementos duplicados consecutivos em um range
(objeto de função de algoritmo)
[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) | copia um range de elementos para um novo local
(objeto de função de algoritmo)
[ ranges::adjacent_find](<#/doc/algorithm/ranges/adjacent_find>)(C++20) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(objeto de função de algoritmo)
[ unique_copy](<#/doc/algorithm/unique_copy>) | cria uma cópia de um range de elementos que não contém duplicatas consecutivas
(modelo de função)