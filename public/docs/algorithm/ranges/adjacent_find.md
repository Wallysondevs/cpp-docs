# std::ranges::adjacent_find

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
std::indirect_binary_predicate<
std::projected<I, Proj>,
std::projected<I, Proj>> Pred = ranges::equal_to >
constexpr I
adjacent_find( I first, S last, Pred pred = {}, Proj proj = {} );
template< ranges::forward_range R, class Proj = std::identity,
std::indirect_binary_predicate<
std::projected<ranges::iterator_t<R>, Proj>,
std::projected<ranges::iterator_t<R>, Proj>> Pred = ranges::equal_to >
constexpr ranges::borrowed_iterator_t<R>
adjacent_find( R&& r, Pred pred = {}, Proj proj = {} );
```

Procura no range `[`first`, `last`)` os dois primeiros elementos consecutivos iguais.

1) Os elementos são comparados usando pred (após projetar com a projeção proj).

2) O mesmo que (1), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
* Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
* Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de elementos a examinar
- **r** — o range dos elementos a examinar
- **pred** — predicado a aplicar aos elementos projetados
- **proj** — projeção a aplicar aos elementos

### Valor de retorno

Um iterator para o primeiro do primeiro par de elementos idênticos, ou seja, o primeiro iterator `it` tal que bool([std::invoke](<#/doc/utility/functional/invoke>)(pred, [std::invoke](<#/doc/utility/functional/invoke>)(proj1, *it), [std::invoke](<#/doc/utility/functional/invoke>)(proj, *(it + 1)))) é true.

Se nenhum elemento for encontrado, um iterator igual a last é retornado.

### Complexidade

Exatamente min((result - first) + 1, (last - first) - 1) aplicações do predicado e da projeção onde `result` é o valor de retorno.

### Implementação possível
```cpp
    struct adjacent_find_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_binary_predicate<
                     std::projected<I, Proj>,
                     std::projected<I, Proj>> Pred = ranges::equal_to>
        constexpr I operator()(I first, S last, Pred pred = {}, Proj proj = {}) const
        {
            if (first == last)
                return first;
            auto next = ranges::next(first);
            for (; next != last; ++next, ++first)
                if (std::invoke(pred, std::invoke(proj, *first), std::invoke(proj, *next)))
                    return first;
            return next;
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 std::indirect_binary_predicate<
                     std::projected<ranges::iterator_t<R>, Proj>,
                     std::projected<ranges::iterator_t<R>, Proj>> Pred = ranges::equal_to>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, Pred pred = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::ref(pred), std::ref(proj));
        }
    };
    
    inline constexpr adjacent_find_fn adjacent_find;
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <ranges>
    
    constexpr bool some_of(auto&& r, auto&& pred) // some but not all
    {
        return std::ranges::cend(r) != std::ranges::adjacent_find(r,
            &pred
            {
                return pred(x) != pred(y);
            });
    }
    
    // test some_of
    constexpr auto a = {0, 0, 0, 0}, b = {1, 1, 1, 0}, c = {1, 1, 1, 1};
    auto is_one = { return x == 1; };
    static_assert(!some_of(a, is_one) && some_of(b, is_one) && !some_of(c, is_one));
    
    int main()
    {
        const auto v = {0, 1, 2, 3, 40, 40, 41, 41, 5}; /*
                                    ^^          ^^       */
        namespace ranges = std::ranges;
    
        if (auto it = ranges::adjacent_find(v.begin(), v.end()); it == v.end())
            std::cout << "No matching adjacent elements\n";
        else
            std::cout << "The first adjacent pair of equal elements is at ["
                      << ranges::distance(v.begin(), it) << "] == " << *it << '\n';
    
        if (auto it = ranges::adjacent_find(v, ranges::greater()); it == v.end())
            std::cout << "The entire vector is sorted in ascending order\n";
        else
            std::cout << "The last element in the non-decreasing subsequence is at ["
                      << ranges::distance(v.begin(), it) << "] == " << *it << '\n';
    }
```

Saída:
```
    The first adjacent pair of equal elements is at [4] == 40
    The last element in the non-decreasing subsequence is at [7] == 41
```

### Veja também

[ ranges::unique](<#/doc/algorithm/ranges/unique>)(C++20) | remove elementos duplicados consecutivos em um range
(objeto de função de algoritmo)
[ adjacent_find](<#/doc/algorithm/adjacent_find>) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(modelo de função)