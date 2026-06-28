# std::ranges::find_first_of

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::forward_iterator I2, std::sentinel_for<I2> S2,
class Pred = ranges::equal_to,
class Proj1 = std::identity,
class Proj2 = std::identity >
requires std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
constexpr I1
find_first_of( I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::input_range R1, ranges::forward_range R2,
class Pred = ranges::equal_to,
class Proj1 = std::identity,
class Proj2 = std::identity >
requires std::indirectly_comparable<ranges::iterator_t<R1>,
ranges::iterator_t<R2>,
Pred, Proj1, Proj2>
constexpr ranges::borrowed_iterator_t<R1>
find_first_of( R1&& r1, R2&& r2, Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
```

1) Procura no range `[`first1`, `last1`)` por _qualquer_ um dos elementos no range `[`first2`, `last2`)`, após projetar os ranges com proj1 e proj2, respectivamente. Os elementos projetados são comparados usando o predicado binário pred.

2) O mesmo que (1), mas usa r1 como o primeiro range de origem e r2 como o segundo range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, [ranges::end](<#/doc/ranges/end>)(r1) como last1, [ranges::begin](<#/doc/ranges/begin>)(r2) como first2, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

As entidades tipo função descritas nesta página são [_algorithm function objects_](<#/doc/algorithm/ranges>) (informalmente conhecidas como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar nenhuma delas.
*   Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first1, last1** — o range de elementos a examinar (também conhecido como _haystack_)
- **first2, last2** — o range de elementos a procurar (também conhecido como _needles_)
- **r1** — o range de elementos a examinar (também conhecido como _haystack_)
- **r2** — o range de elementos a procurar (também conhecido como _needles_)
- **pred** — predicado binário para comparar os elementos
- **proj1** — projeção a aplicar aos elementos no primeiro range
- **proj2** — projeção a aplicar aos elementos no segundo range

### Valor de retorno

Um iterator para o primeiro elemento no range `[`first1`, `last1`)` que é igual a um elemento do range `[`first2`, `last2`)` após a projeção. Se nenhum elemento for encontrado, um iterator que se compara igual a last1 é retornado.

### Complexidade

No máximo S * N aplicações do predicado e de cada projeção, onde
(1) S = [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last2) e N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1);
(2) S = [ranges::distance](<#/doc/iterator/ranges/distance>)(r2) e N = [ranges::distance](<#/doc/iterator/ranges/distance>)(r1).

### Implementação possível
```cpp
    struct find_first_of_fn
    {
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::forward_iterator I2, std::sentinel_for<I2> S2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity,
                 class Proj2 = std::identity>
        requires std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
        constexpr I1 operator()(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {},
                                Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            for (; first1 != last1; ++first1)
                for (auto i = first2; i != last2; ++i)
                    if (std::invoke(pred, std::invoke(proj1, *first1), std::invoke(proj2, *i)))
                        return first1;
            return first1;
        }
    
        template<ranges::input_range R1, ranges::forward_range R2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity,
                 class Proj2 = std::identity>
        requires std::indirectly_comparable<ranges::iterator_t<R1>,
                                            ranges::iterator_t<R2>,
                                            Pred, Proj1, Proj2>
        constexpr ranges::borrowed_iterator_t<R1>
            operator()(R1&& r1, R2&& r2, Pred pred = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2),
                           std::move(pred), std::move(proj1), std::move(proj2));
        }
    };
    
    inline constexpr find_first_of_fn find_first_of {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    
    int main()
    {
        namespace rng = std::ranges;
    
        constexpr static auto haystack = {1, 2, 3, 4};
        constexpr static auto needles  = {0, 3, 4, 3};
    
        constexpr auto found1 = rng::find_first_of(haystack.begin(), haystack.end(),
                                                   needles.begin(), needles.end());
        static_assert(std::distance(haystack.begin(), found1) == 2);
    
        constexpr auto found2 = rng::find_first_of(haystack, needles);
        static_assert(std::distance(haystack.begin(), found2) == 2);
    
        constexpr static auto negatives = {-6, -3, -4, -3};
        constexpr auto not_found = rng::find_first_of(haystack, negatives);
        static_assert(not_found == haystack.end());
    
        constexpr auto found3 = rng::find_first_of(haystack, negatives,
             { return x == -y; }); // uses a binary comparator
        static_assert(std::distance(haystack.begin(), found3) == 2);
    
        struct P { int x, y; };
        constexpr static auto p1 = {P{1, -1}, P{2, -2}, P{3, -3}, P{4, -4}};
        constexpr static auto p2 = {P{5, -5}, P{6, -3}, P{7, -5}, P{8, -3}};
    
        // Compare only P::y data members by projecting them:
        const auto found4 = rng::find_first_of(p1, p2, {}, &P::y, &P::y);
        std::cout << "First equivalent element {" << found4->x << ", " << found4->y
                  << "} was found at position " << std::distance(p1.begin(), found4)
                  << ".\n";
    }
```

Saída:
```
    First equivalent element {3, -3} was found at position 2.
```

### Veja também

[ find_first_of](<#/doc/algorithm/find_first_of>) | procura por qualquer um de um conjunto de elementos
(function template)
[ ranges::adjacent_find](<#/doc/algorithm/ranges/adjacent_find>)(C++20) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(algorithm function object)
[ ranges::findranges::find_ifranges::find_if_not](<#/doc/algorithm/ranges/find>)(C++20)(C++20)(C++20) | encontra o primeiro elemento que satisfaz critérios específicos
(algorithm function object)
[ ranges::find_end](<#/doc/algorithm/ranges/find_end>)(C++20) | encontra a última sequência de elementos em um determinado range
(algorithm function object)
[ ranges::search](<#/doc/algorithm/ranges/search>)(C++20) | procura pela primeira ocorrência de um range de elementos
(algorithm function object)
[ ranges::search_n](<#/doc/algorithm/ranges/search_n>)(C++20) | procura pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(algorithm function object)