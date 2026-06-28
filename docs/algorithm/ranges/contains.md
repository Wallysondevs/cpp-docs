# std::ranges::contains, std::ranges::contains_subrange

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S,
class T,
class Proj = std::identity >
requires std::indirect_binary_predicate<ranges::equal_to, std::projected<I, Proj>,
const T*>
constexpr bool contains( I first, S last, const T& value, Proj proj = {} );
(até C++26)
template< std::input_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
class T = std::projected_value_t<I, Proj> >
requires std::indirect_binary_predicate<ranges::equal_to, std::projected<I, Proj>,
const T*>
constexpr bool contains( I first, S last, const T& value, Proj proj = {} );
template< ranges::input_range R,
class T,
class Proj = std::identity >
requires std::indirect_binary_predicate<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>,
const T*>
constexpr bool contains( R&& r, const T& value, Proj proj = {} );
(até C++26)
template< ranges::input_range R,
class Proj = std::identity,
class T = std::projected_value_t<ranges::iterator_t<R>, Proj> >
requires std::indirect_binary_predicate<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>,
const T*>
constexpr bool contains( R&& r, const T& value, Proj proj = {} );
template< std::forward_iterator I1, std::sentinel_for<I1> S1,
std::forward_iterator I2, std::sentinel_for<I2> S2,
class Pred = ranges::equal_to,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
constexpr bool contains_subrange( I1 first1, S1 last1, I2 first2, S2 last2,
Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::forward_range R1, ranges::forward_range R2,
class Pred = ranges::equal_to,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::indirectly_comparable<ranges::iterator_t<R1>,
ranges::iterator_t<R2>, Pred, Proj1, Proj2>
constexpr bool contains_subrange( R1&& r1, R2&& r2, Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
```

1) Algoritmo baseado em busca que verifica se um dado range contém um valor, usando pares iterador-sentinela.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

3) Algoritmo baseado em busca que verifica se um dado range é um subrange de outro range, usando pares iterador-sentinela.

4) O mesmo que (3), mas usa `r1` como o primeiro range de origem e `r2` como o segundo range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como `first1`, [ranges::end](<#/doc/ranges/end>)(r1) como `last1`, [ranges::begin](<#/doc/ranges/begin>)(r2) como `first2`, e [ranges::end](<#/doc/ranges/end>)(r2) como `last2`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
*   Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parameters

- **first, last** — o range de elementos a examinar
- **r** — o range dos elementos a examinar
- **value** — valor para comparar os elementos
- **pred** — predicado a aplicar aos elementos projetados
- **proj** — projeção a aplicar aos elementos

### Return value

1,2) : [ranges::find](<#/doc/algorithm/ranges/find>)(std::move(first), last, value, proj) != last

3,4) : first2 == last2 || ![ranges::search](<#/doc/algorithm/ranges/search>)(first1, last1, first2, last2, pred, proj1, proj2).empty()

### Complexity

No máximo `last - first` aplicações do predicado e da projeção.

### Notes

Até o C++20, tínhamos que escrever `std::[ranges::find](<#/doc/algorithm/ranges/find>)(r, value) != std::[ranges::end](<#/doc/ranges/end>)(r)` para determinar se um único valor está dentro de um range. E para verificar se um range contém um subrange de interesse, usamos `not std::[ranges::search](<#/doc/algorithm/ranges/search>)(haystack, needle).empty()`. Embora isso seja preciso, não é necessariamente conveniente e dificilmente expressa a intenção (especialmente no último caso). Ser capaz de dizer `std::ranges::contains(r, value)` aborda ambos os pontos.

`ranges::contains_subrange`, o mesmo que [ranges::search](<#/doc/algorithm/ranges/search>), mas ao contrário de [std::search](<#/doc/algorithm/search>), não fornece acesso a [Searchers](<https://en.cppreference.com/mwiki/index.php?title=cpp/named_req/Searcher&action=edit&redlink=1> "cpp/named req/Searcher (page does not exist)") (como [Boyer-Moore](<#/doc/utility/functional>)).

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_ranges_contains`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | [`std::ranges::contains`](<#/doc/algorithm/ranges/contains>) e [`ranges::contains_subrange`](<#/doc/algorithm/ranges/contains>)
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/ranges/contains>))

### Possible implementation

[contains (1,2)](<#/doc/algorithm/ranges/contains>)
---
```cpp
    struct __contains_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity,
                 class T = std::projected_value_t<I, Proj>>
        requires std::indirect_binary_predicate<ranges::equal_to, std::projected<I, Proj>,
                                                const T*>
        constexpr bool operator()(I first, S last, const T& value, Proj proj = {}) const
        {
            return ranges::find(std::move(first), last, value, proj) != last;
        }
    
        template<ranges::input_range R,
                 class Proj = std::identity,
                 class T = std::projected_value_t<ranges::iterator_t<R>, Proj>>
        requires std::indirect_binary_predicate<ranges::equal_to,
                                                std::projected<ranges::iterator_t<R>, Proj>,
                                                const T*>
        constexpr bool operator()(R&& r, const T& value, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(value), proj);
        }
    };
    
    inline constexpr __contains_fn contains {};
```

[contains_subrange (3,4)](<#/doc/algorithm/ranges/contains>)
```cpp
    struct __contains_subrange_fn
    {
        template<std::forward_iterator I1, std::sentinel_for<I1> S1,
                 std::forward_iterator I2, std::sentinel_for<I2> S2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
        constexpr bool operator()(I1 first1, S1 last1,
                                  I2 first2, S2 last2,
                                  Pred pred = {},
                                  Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (first2 == last2) ||
                   !ranges::search(first1, last1, first2, last2, pred, proj1, proj2).empty();
        }
    
        template<ranges::forward_range R1, ranges::forward_range R2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::indirectly_comparable<ranges::iterator_t<R1>,
                                            ranges::iterator_t<R2>, Pred, Proj1, Proj2>
        constexpr bool operator()(R1&& r1, R2&& r2,
                                  Pred pred = {},
                                  Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2), std::move(pred),
                           std::move(proj1), std::move(proj2));
        }
    };
    
    inline constexpr __contains_subrange_fn contains_subrange {};
```

### Example

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <complex>
    
    namespace ranges = std::ranges;
    
    int main()
    {
        constexpr auto haystack = std::array{3, 1, 4, 1, 5};
        constexpr auto needle = std::array{1, 4, 1};
        constexpr auto bodkin = std::array{2, 5, 2};
    
        static_assert(
            ranges::contains(haystack, 4) &&
           !ranges::contains(haystack, 6) &&
            ranges::contains_subrange(haystack, needle) &&
           !ranges::contains_subrange(haystack, bodkin)
        );
    
        constexpr std::array<std::complex<double>, 3> nums{{{1, 2}, {3, 4}, {5, 6}}};
        #ifdef __cpp_lib_algorithm_default_value_type
            static_assert(ranges::contains(nums, {3, 4}));
        #else
            static_assert(ranges::contains(nums, std::complex<double>{3, 4}));
        #endif
    }
```

### See also

[ ranges::findranges::find_ifranges::find_if_not](<#/doc/algorithm/ranges/find>)(C++20)(C++20)(C++20) | encontra o primeiro elemento que satisfaz critérios específicos
(objeto de função de algoritmo)
[ ranges::search](<#/doc/algorithm/ranges/search>)(C++20) | procura pela primeira ocorrência de um range de elementos
(objeto de função de algoritmo)
[ ranges::binary_search](<#/doc/algorithm/ranges/binary_search>)(C++20) | determina se um elemento existe em um range parcialmente ordenado
(objeto de função de algoritmo)
[ ranges::includes](<#/doc/algorithm/ranges/includes>)(C++20) | retorna verdadeiro se uma sequência é uma subsequência de outra
(objeto de função de algoritmo)
[ ranges::all_ofranges::any_ofranges::none_of](<#/doc/algorithm/ranges/all_any_none_of>)(C++20)(C++20)(C++20) | verifica se um predicado é verdadeiro para todos, qualquer ou nenhum dos elementos em um range
(objeto de função de algoritmo)