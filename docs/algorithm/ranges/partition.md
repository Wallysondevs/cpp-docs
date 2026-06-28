# std::ranges::partition

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::permutable I, std::sentinel_for<I> S, class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
constexpr ranges::subrange<I>
partition( I first, S last, Pred pred, Proj proj = {} );
template< ranges::forward_range R, class Proj = std::identity,
std::indirect_unary_predicate<
std::projected<ranges::iterator_t<R>, Proj>> Pred >
requires std::permutable<ranges::iterator_t<R>>
constexpr ranges::borrowed_subrange_t<R>
partition( R&& r, Pred pred, Proj proj = {} );
```

1) Reordena os elementos no range `[`first`, `last`)` de tal forma que a projeção `proj` de todos os elementos para os quais o predicado `pred` retorna `true` precede a projeção `proj` dos elementos para os quais o predicado `pred` retorna `false`. A ordem relativa dos elementos não é preservada.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de elementos a ser reordenado
- **r** — o range de elementos a ser reordenado
- **pred** — predicado a ser aplicado aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

Um subrange começando com um iterator para o primeiro elemento do segundo grupo e terminando com um iterator igual a `last`. (2) retorna [std::ranges::dangling](<#/doc/ranges/dangling>) se `r` for um rvalue de tipo não-[`borrowed_range`](<#/doc/ranges/borrowed_range>).

### Complexidade

Dado N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last), exatamente N aplicações do predicado e da projeção. No máximo N / 2 trocas se `I` modela ranges::bidirectional_iterator, e no máximo N trocas caso contrário.

### Implementação possível
```
    struct partition_fn
    {
        template<std::permutable I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        constexpr ranges::subrange<I>
            operator()(I first, S last, Pred pred, Proj proj = {}) const
        {
            first = ranges::find_if_not(first, last, std::ref(pred), std::ref(proj));
            if (first == last)
                return {first, first};
    
            for (auto i = ranges::next(first); i != last; ++i)
            {
                if (std::invoke(pred, std::invoke(proj, *i)))
                {
                    ranges::iter_swap(i, first);
                    ++first;
                }
            }
            return {std::move(first), std::move(last)};
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 std::indirect_unary_predicate<
                     std::projected<ranges::iterator_t<R>, Proj>> Pred>
        requires std::permutable<ranges::iterator_t<R>>
        constexpr ranges::borrowed_subrange_t<R>
            operator()(R&& r, Pred pred, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r),
                           std::ref(pred), std::ref(proj));
        }
    };
    
    inline constexpr partition_fn partition;
```

---

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <forward_list>
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <ranges>
    #include <vector>
    
    namespace ranges = std::ranges;
    
    template<class I, std::sentinel_for<I> S, class Cmp = ranges::less>
    requires std::sortable<I, Cmp>
    void quicksort(I first, S last, Cmp cmp = Cmp {})
    {
        using reference = std::iter_reference_t<I>;
    
        if (first == last)
            return;
    
        auto size = ranges::distance(first, last);
        auto pivot = ranges::next(first, size - 1);
        ranges::iter_swap(pivot, ranges::next(first, size / 2));
    
        auto tail = ranges::partition(first, pivot, =
        {
            return std::invoke(cmp, em, *pivot); // em < pivot
        });
    
        ranges::iter_swap(pivot, tail.begin());
        quicksort(first, tail.begin(), std::ref(cmp));
        quicksort(ranges::next(tail.begin()), last, std::ref(cmp));
    }
    
    int main()
    {
        std::ostream_iterator<int> cout {std::cout, " "};
    
        std::vector<int> v {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        std::cout << "Original vector:  \t";
        ranges::copy(v, cout);
    
        auto tail = ranges::partition(v,  { return i % 2 == 0; });
    
        std::cout << "\nPartitioned vector: \t";
        ranges::copy(ranges::begin(v), ranges::begin(tail), cout);
        std::cout << "│ ";
        ranges::copy(tail, cout);
    
        std::forward_list<int> fl {1, 30, -4, 3, 5, -4, 1, 6, -8, 2, -5, 64, 1, 92};
        std::cout << "\nUnsorted list: \t\t";
        ranges::copy(fl, cout);
    
        quicksort(ranges::begin(fl), ranges::end(fl), ranges::greater {});
        std::cout << "\nQuick-sorted list: \t";
        ranges::copy(fl, cout);
    
        std::cout << '\n';
    }
```

Saída possível:
```
    Original vector:        0 1 2 3 4 5 6 7 8 9
    Partitioned vector:     0 8 2 6 4 │ 5 3 7 1 9
    Unsorted list:          1 30 -4 3 5 -4 1 6 -8 2 -5 64 1 92
    Quick-sorted list:      92 64 30 6 5 3 2 1 1 1 -4 -4 -5 -8
```

### Veja também

[ ranges::partition_copy](<#/doc/algorithm/ranges/partition_copy>)(C++20) | copia um range dividindo os elementos em dois grupos
(objeto de função de algoritmo)
[ ranges::is_partitioned](<#/doc/algorithm/ranges/is_partitioned>)(C++20) | determina se o range está particionado pelo predicado fornecido
(objeto de função de algoritmo)
[ ranges::stable_partition](<#/doc/algorithm/ranges/stable_partition>)(C++20) | divide elementos em dois grupos preservando sua ordem relativa
(objeto de função de algoritmo)
[ partition](<#/doc/algorithm/partition>) | divide um range de elementos em dois grupos
(modelo de função)