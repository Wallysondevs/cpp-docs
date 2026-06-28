# std::ranges::search

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I1, std::sentinel_for<I1> S1,
std::forward_iterator I2, std::sentinel_for<I2> S2,
class Pred = ranges::equal_to,
class Proj1 = std::identity,
class Proj2 = std::identity >
requires std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
constexpr ranges::subrange<I1>
search( I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::forward_range R1, ranges::forward_range R2,
class Pred = ranges::equal_to,
class Proj1 = std::identity,
class Proj2 = std::identity>
requires std::indirectly_comparable<ranges::iterator_t<R1>,
ranges::iterator_t<R2>, Pred, Proj1, Proj2>
constexpr ranges::borrowed_subrange_t<R1>
search( R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {} );
```

1) Procura pela _primeira_ ocorrência da sequência de elementos `[`first2`, `last2`)` no range `[`first1`, `last1`)`. Os elementos são comparados usando o predicado binário pred após serem projetados com proj2 e proj1, respectivamente.

2) O mesmo que (1), mas usa r1 como o primeiro range de origem e r2 como o segundo range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, [ranges::end](<#/doc/ranges/end>)(r1) como last1, [ranges::begin](<#/doc/ranges/begin>)(r2) como first2, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
* Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
* Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first1, last1** — o range de elementos a examinar (também conhecido como _haystack_)
- **first2, last2** — o range de elementos a procurar (também conhecido como _needle_)
- **r1** — o range de elementos a examinar (também conhecido como _haystack_)
- **r2** — o range de elementos a procurar (também conhecido como _needle_)
- **pred** — predicado binário a aplicar aos elementos projetados
- **proj1** — projeção a aplicar aos elementos no primeiro range
- **proj2** — projeção a aplicar aos elementos no segundo range

### Valor de retorno

1) Retorna um valor [ranges::subrange](<#/doc/ranges/subrange>) que é a primeira ocorrência da sequência `[`first2`, `last2`)` (também conhecido como _needle_) no range `[`first1`, `last1`)` (também conhecido como _haystack_), após a aplicação das projeções proj1 e proj2 aos elementos de ambas as sequências, respectivamente, com a consequente aplicação do predicado binário pred para comparar os elementos projetados.

Se nenhuma ocorrência for encontrada, [ranges::subrange](<#/doc/ranges/subrange>){last1, last1} é retornado.

Se o range a ser procurado (também conhecido como _needle_) estiver vazio, ou seja, first2 == last2, então o [ranges::subrange](<#/doc/ranges/subrange>){first1, first1} é retornado.

2) O mesmo que (1), mas o tipo de retorno é [ranges::borrowed_subrange_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R1&gt;.

### Complexidade

No máximo `S * N` aplicações do predicado correspondente e de cada projeção, onde
(1) S = [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last2) e N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1);
(2) S = [ranges::distance](<#/doc/iterator/ranges/distance>)(r2) e N = [ranges::distance](<#/doc/iterator/ranges/distance>)(r1).

### Possível implementação
```cpp
    struct search_fn
    {
        template<std::forward_iterator I1, std::sentinel_for<I1> S1,
                 std::forward_iterator I2, std::sentinel_for<I2> S2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity,
                 class Proj2 = std::identity>
        requires std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
        constexpr ranges::subrange<I1>
            operator()(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            for (;; ++first1)
            {
                I1 it1 = first1;
                for (I2 it2 = first2;; ++it1, ++it2)
                {
                    if (it2 == last2)
                        return {first1, it1};
                    if (it1 == last1)
                        return {it1, it1};
                    if (!std::invoke(pred, std::invoke(proj1, *it1), std::invoke(proj2, *it2)))
                        break;
                }
            }
        }
    
        template<ranges::forward_range R1, ranges::forward_range R2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity,
                 class Proj2 = std::identity>
        requires std::indirectly_comparable<ranges::iterator_t<R1>,
                                            ranges::iterator_t<R2>, Pred, Proj1, Proj2>
        constexpr ranges::borrowed_subrange_t<R1>
            operator()(R1&& r1, R2&& r2, Pred pred = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2),
                           std::move(pred), std::move(proj1), std::move(proj2));
        }
    };
    
    inline constexpr search_fn search {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cctype>
    #include <iostream>
    #include <iterator>
    #include <string_view>
    
    using namespace std::literals;
    
    void print(int id, const auto& haystack, const auto& needle, const auto& found)
    {
        std::cout << id << ") search(\"" << haystack << "\", \"" << needle << "\"); ";
        const auto first = std::distance(haystack.begin(), found.begin());
        const auto last = std::distance(haystack.begin(), found.end());
        if (found.empty())
            std::cout << "not found;";
        else
        {
            std::cout << "found: \"";
            for (const auto x : found)
                std::cout << x;
            std::cout << "\";";
        }
        std::cout << " subrange: {" << first << ", " << last << "}\n";
    }
    
    int main()
    {
        constexpr auto haystack {"abcd abcd"sv};
        constexpr auto needle {"bcd"sv};
    
        // the search uses iterator pairs begin()/end():
        constexpr auto found1 = std::ranges::search(
            haystack.begin(), haystack.end(),
            needle.begin(), needle.end());
        print(1, haystack, needle, found1);
    
        // the search uses ranges r1, r2:
        constexpr auto found2 = std::ranges::search(haystack, needle);
        print(2, haystack, needle, found2);
    
        // 'needle' range is empty:
        constexpr auto none {""sv};
        constexpr auto found3 = std::ranges::search(haystack, none);
        print(3, haystack, none, found3);
    
        // 'needle' will not be found:
        constexpr auto awl {"efg"sv};
        constexpr auto found4 = std::ranges::search(haystack, awl);
        print(4, haystack, awl, found4);
    
        // the search uses custom comparator and projections:
        constexpr auto bodkin {"234"sv};
        auto found5 = std::ranges::search(haystack, bodkin,
             { return x == y; }, // pred
             { return std::toupper(x); }, // proj1
             { return y + 'A' - '1'; }); // proj2
        print(5, haystack, bodkin, found5);
    }
```

Saída:
```
    1) search("abcd abcd", "bcd"); found: "bcd"; subrange: {1, 4}
    2) search("abcd abcd", "bcd"); found: "bcd"; subrange: {1, 4}
    3) search("abcd abcd", ""); not found; subrange: {0, 0}
    4) search("abcd abcd", "efg"); not found; subrange: {9, 9}
    5) search("abcd abcd", "234"); found: "bcd"; subrange: {1, 4}
```

### Ver também

[ ranges::adjacent_find](<#/doc/algorithm/ranges/adjacent_find>)(C++20) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(objeto de função de algoritmo)
[ ranges::findranges::find_ifranges::find_if_not](<#/doc/algorithm/ranges/find>)(C++20)(C++20)(C++20) | encontra o primeiro elemento que satisfaz critérios específicos
(objeto de função de algoritmo)
[ ranges::find_end](<#/doc/algorithm/ranges/find_end>)(C++20) | encontra a última sequência de elementos em um determinado range
(objeto de função de algoritmo)
[ ranges::find_first_of](<#/doc/algorithm/ranges/find_first_of>)(C++20) | procura por qualquer um de um conjunto de elementos
(objeto de função de algoritmo)
[ ranges::containsranges::contains_subrange](<#/doc/algorithm/ranges/contains>)(C++23)(C++23) | verifica se o range contém o elemento ou subrange dado
(objeto de função de algoritmo)
[ ranges::includes](<#/doc/algorithm/ranges/includes>)(C++20) | retorna true se uma sequência é uma subsequência de outra
(objeto de função de algoritmo)
[ ranges::mismatch](<#/doc/algorithm/ranges/mismatch>)(C++20) | encontra a primeira posição onde dois ranges diferem
(objeto de função de algoritmo)
[ ranges::search_n](<#/doc/algorithm/ranges/search_n>)(C++20) | procura pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(objeto de função de algoritmo)
[ search](<#/doc/algorithm/search>) | procura pela primeira ocorrência de um range de elementos
(modelo de função)