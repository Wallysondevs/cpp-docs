# std::ranges::find_last, std::ranges::find_last_if, std::ranges::find_last_if_not

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Call signature
template< std::forward_iterator I, std::sentinel_for<I> S,
class T,
class Proj = std::identity >
requires std::indirect_binary_predicate
<ranges::equal_to, std::projected<I, Proj>, const T*>
constexpr ranges::subrange<I>
find_last( I first, S last, const T& value, Proj proj = {} );
(até C++26)
template< std::forward_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
class T = std::projected_value_t<I, Proj> >
requires std::indirect_binary_predicate
<ranges::equal_to, std::projected<I, Proj>, const T*>
constexpr ranges::subrange<I>
find_last( I first, S last, const T& value, Proj proj = {} );
template< ranges::forward_range R,
class T,
class Proj = std::identity >
requires std::indirect_binary_predicate
<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>, const T*>
constexpr ranges::borrowed_subrange_t<R>
find_last( R&& r, const T& value, Proj proj = {} );
(até C++26)
template< ranges::forward_range R,
class Proj = std::identity,
class T = std::projected_value_t<iterator_t<R>, Proj> >
requires std::indirect_binary_predicate
<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>, const T*>
constexpr ranges::borrowed_subrange_t<R>
find_last( R&& r, const T& value, Proj proj = {} );
template< std::forward_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
constexpr ranges::subrange<I>
find_last_if( I first, S last, Pred pred, Proj proj = {} );
template< ranges::forward_range R,
class Proj = std::identity,
std::indirect_unary_predicate
<std::projected<ranges::iterator_t<R>, Proj>> Pred >
constexpr ranges::borrowed_subrange_t<R>
find_last_if( R&& r, Pred pred, Proj proj = {} );
template< std::forward_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
constexpr ranges::subrange<I>
find_last_if_not( I first, S last, Pred pred, Proj proj = {} );
template< ranges::forward_range R,
class Proj = std::identity,
std::indirect_unary_predicate
<std::projected<ranges::iterator_t<R>, Proj>> Pred >
constexpr ranges::borrowed_subrange_t<R>
find_last_if_not( R&& r, Pred pred, Proj proj = {} );
```

Retorna o último elemento no range `[`first`, `last`)` que satisfaz critérios específicos:

1) `find_last` procura por um elemento igual a `value`.

3) `find_last_if` procura pelo último elemento no range `[`first`, `last`)` para o qual o predicado `pred` retorna `true`.

5) `find_last_if_not` procura pelo último elemento no range `[`first`, `last`)` para o qual o predicado `pred` retorna `false`.

2,4,6) O mesmo que (1,3,5), mas usa `r` como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de elementos a examinar
- **r** — o range de elementos a examinar
- **value** — valor para comparar os elementos
- **pred** — predicado para aplicar aos elementos projetados
- **proj** — projeção para aplicar aos elementos

### Valor de retorno

1,3,5) Seja `i` o último iterator no range `[`first`, `last`)` para o qual `E` é `true`.

Retorna [ranges::subrange](<#/doc/ranges/subrange>)&lt;I&gt;{i, last}, ou [ranges::subrange](<#/doc/ranges/subrange>)&lt;I&gt;{last, last} se nenhum iterator for encontrado.

1) `E` é `bool([std::invoke](<#/doc/utility/functional/invoke>)(proj, *i) == value)`.

3) `E` é `bool([std::invoke](<#/doc/utility/functional/invoke>)(pred, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *i)))`.

5) `E` é `bool(![std::invoke](<#/doc/utility/functional/invoke>)(pred, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *i)))`.

2,4,6) O mesmo que (1,3,5), mas o tipo de retorno é [ranges::borrowed_subrange_t](<#/doc/ranges/borrowed_iterator_t>)&lt;I&gt;.

### Complexidade

No máximo `last - first` aplicações do predicado e da projeção.

### Notas

`ranges::find_last`, `ranges::find_last_if`, `ranges::find_last_if_not` têm melhor eficiência em implementações comuns se `I` modela [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>) ou (melhor) [`random_access_iterator`](<#/doc/iterator/random_access_iterator>).

Macro de [teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_ranges_find_last`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | `ranges::find_last`,
`ranges::find_last_if`,
`ranges::find_last_if_not`
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/ranges/find_last>))

### Possível implementação

Estas implementações mostram apenas o algoritmo mais lento usado quando `I` modela [`forward_iterator`](<#/doc/iterator/forward_iterator>).

[find_last (1,2)](<#/doc/algorithm/ranges/find_last>)
---
```cpp
    struct find_last_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity,
                 class T = std::projected_value_t<iterator_t<R>, Proj>>
        requires std::indirect_binary_predicate
                     <ranges::equal_to, std::projected<I, Proj>, const T*>
        constexpr ranges::subrange<I>
            operator()(I first, S last, const T &value, Proj proj = {}) const
        {
            // Note: if I is mere forward_iterator, we may only go from begin to end.
            std::optional<I> found;
            for (; first != last; ++first)
                if (std::invoke(proj, *first) == value)
                    found = first;
    
            if (!found)
                return {first, first};
    
            return {*found, std::ranges::next(*found, last)};
        }
    
        template<ranges::forward_range R,
                 class Proj = std::identity,
                 class T = std::projected_value_t<iterator_t<R>, Proj>>
        requires std::indirect_binary_predicate
                     <ranges::equal_to,
                      std::projected<ranges::iterator_t<R>, Proj>, const T*>
        constexpr ranges::borrowed_subrange_t<R>
            operator()(R&& r, const T &value, Proj proj = {}) const
        {
            return this->operator()(ranges::begin(r), ranges::end(r), value, std::ref(proj));
        }
    };
    
    inline constexpr find_last_fn find_last;
```

[find_last_if (3,4)](<#/doc/algorithm/ranges/find_last>)
```cpp
    struct find_last_if_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        constexpr ranges::subrange<I>
            operator()(I first, S last, Pred pred, Proj proj = {}) const
        {
            // Note: if I is mere forward_iterator, we may only go from begin to end.
            std::optional<I> found;
            for (; first != last; ++first)
                if (std::invoke(pred, std::invoke(proj, *first)))
                    found = first;
    
            if (!found)
                return {first, first};
    
            return {*found, std::ranges::next(*found, last)};
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 std::indirect_unary_predicate
                     <std::projected<ranges::iterator_t<R>, Proj>> Pred>
        constexpr ranges::borrowed_subrange_t<R>
            operator()(R&& r, Pred pred, Proj proj = {}) const
        {
            return this->operator()(ranges::begin(r), ranges::end(r),
                                    std::ref(pred), std::ref(proj));
        }
    };
    
    inline constexpr find_last_if_fn find_last_if;
```

[find_last_if_not (5,6)](<#/doc/algorithm/ranges/find_last>)
```cpp
    struct find_last_if_not_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        constexpr ranges::subrange<I>
            operator()(I first, S last, Pred pred, Proj proj = {}) const
        {
            // Note: if I is mere forward_iterator, we may only go from begin to end.
            std::optional<I> found;
            for (; first != last; ++first)
                if (!std::invoke(pred, std::invoke(proj, *first)))
                    found = first;
    
            if (!found)
                return {first, first};
    
            return {*found, std::ranges::next(*found, last)};
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 std::indirect_unary_predicate
                     <std::projected<ranges::iterator_t<R>, Proj>> Pred>
        constexpr ranges::borrowed_subrange_t<R>
            operator()(R&& r, Pred pred, Proj proj = {}) const
        {
            return this->operator()(ranges::begin(r), ranges::end(r),
                                    std::ref(pred), std::ref(proj));
        }
    };
    
    inline constexpr find_last_if_not_fn find_last_if_not;
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <forward_list>
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    
    int main()
    {
        namespace ranges = std::ranges;
    
        constexpr static auto v = {1, 2, 3, 1, 2, 3, 1, 2};
    
        {
            constexpr auto i1 = ranges::find_last(v.begin(), v.end(), 3);
            constexpr auto i2 = ranges::find_last(v, 3);
            static_assert(ranges::distance(v.begin(), i1.begin()) == 5);
            static_assert(ranges::distance(v.begin(), i2.begin()) == 5);
        }
        {
            constexpr auto i1 = ranges::find_last(v.begin(), v.end(), -3);
            constexpr auto i2 = ranges::find_last(v, -3);
            static_assert(i1.begin() == v.end());
            static_assert(i2.begin() == v.end());
        }
    
        auto abs =  { return x < 0 ? -x : x; };
    
        {
            auto pred =  { return x == 3; };
            constexpr auto i1 = ranges::find_last_if(v.begin(), v.end(), pred, abs);
            constexpr auto i2 = ranges::find_last_if(v, pred, abs);
            static_assert(ranges::distance(v.begin(), i1.begin()) == 5);
            static_assert(ranges::distance(v.begin(), i2.begin()) == 5);
        }
        {
            auto pred =  { return x == -3; };
            constexpr auto i1 = ranges::find_last_if(v.begin(), v.end(), pred, abs);
            constexpr auto i2 = ranges::find_last_if(v, pred, abs);
            static_assert(i1.begin() == v.end());
            static_assert(i2.begin() == v.end());
        }
    
        {
            auto pred =  { return x == 1 or x == 2; };
            constexpr auto i1 = ranges::find_last_if_not(v.begin(), v.end(), pred, abs);
            constexpr auto i2 = ranges::find_last_if_not(v, pred, abs);
            static_assert(ranges::distance(v.begin(), i1.begin()) == 5);
            static_assert(ranges::distance(v.begin(), i2.begin()) == 5);
        }
        {
            auto pred =  { return x == 1 or x == 2 or x == 3; };
            constexpr auto i1 = ranges::find_last_if_not(v.begin(), v.end(), pred, abs);
            constexpr auto i2 = ranges::find_last_if_not(v, pred, abs);
            static_assert(i1.begin() == v.end());
            static_assert(i2.begin() == v.end());
        }
    
        using P = std::pair<std::string_view, int>;
        std::forward_list<P> list
        {
            {"one", 1}, {"two", 2}, {"three", 3},
            {"one", 4}, {"two", 5}, {"three", 6},
        };
        auto cmp_one =  &s) { return s == "one"; };
    
        // find latest element that satisfy the comparator, and projecting pair::first
        const auto subrange = ranges::find_last_if(list, cmp_one, &P::first);
    
        std::cout << "The found element and the tail after it are:\n";
        for (P const& e : subrange)
            std::cout << '{' << std::quoted(e.first) << ", " << e.second << "} ";
        std::cout << '\n';
    
    #if __cpp_lib_algorithm_default_value_type
        const auto i3 = ranges::find_last(list, {"three", 3}); // (2) C++26
    #else
        const auto i3 = ranges::find_last(list, P{"three", 3}); // (2) C++23
    #endif
        assert(i3.begin()->first == "three" && i3.begin()->second == 3);
    }
```

Saída:
```
    The found element and the tail after it are:
    {"one", 4} {"two", 5} {"three", 6}
```

### Veja também

[ ranges::find_end](<#/doc/algorithm/ranges/find_end>)(C++20) | encontra a última sequência de elementos em um determinado range
(objeto de função de algoritmo)
[ ranges::findranges::find_ifranges::find_if_not](<#/doc/algorithm/ranges/find>)(C++20)(C++20)(C++20) | encontra o primeiro elemento que satisfaz critérios específicos
(objeto de função de algoritmo)
[ ranges::search](<#/doc/algorithm/ranges/search>)(C++20) | procura pela primeira ocorrência de um range de elementos
(objeto de função de algoritmo)
[ ranges::includes](<#/doc/algorithm/ranges/includes>)(C++20) | retorna true se uma sequência é uma subsequência de outra
(objeto de função de algoritmo)
[ ranges::binary_search](<#/doc/algorithm/ranges/binary_search>)(C++20) | determina se um elemento existe em um range parcialmente ordenado
(objeto de função de algoritmo)
[ ranges::containsranges::contains_subrange](<#/doc/algorithm/ranges/contains>)(C++23)(C++23) | verifica se o range contém o elemento ou subrange dado
(objeto de função de algoritmo)