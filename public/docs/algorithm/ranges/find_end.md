# std::ranges::find_end

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
find_end( I1 first1, S1 last1, I2 first2, S2 last2,
Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::forward_range R1, ranges::forward_range R2,
class Pred = ranges::equal_to,
class Proj1 = std::identity,
class Proj2 = std::identity >
requires std::indirectly_comparable<ranges::iterator_t<R1>,
ranges::iterator_t<R2>,
Pred, Proj1, Proj2>
constexpr ranges::borrowed_subrange_t<R1>
find_end( R1&& r1, R2&& r2, Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
```

1) Procura pela _última_ ocorrência da sequência `[`first2`, `last2`)` no range `[`first1`, `last1`)`, após projeção com proj1 e proj2, respectivamente. Os elementos projetados são comparados usando o predicado binário pred.

2) O mesmo que (1), mas usa r1 como o primeiro range de origem e r2 como o segundo range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, [ranges::end](<#/doc/ranges/end>)(r1) como last1, [ranges::begin](<#/doc/ranges/begin>)(r2) como first2, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first1, last1** — o range de elementos a examinar (também conhecido como _haystack_)
- **first2, last2** — o range de elementos a procurar (também conhecido como _needle_)
- **r1** — o range de elementos a examinar (também conhecido como _haystack_)
- **r2** — o range de elementos a procurar (também conhecido como _needle_)
- **pred** — predicado binário para comparar os elementos
- **proj1** — projeção a aplicar aos elementos no primeiro range
- **proj2** — projeção a aplicar aos elementos no segundo range

### Valor de retorno

1) Valor [ranges::subrange](<#/doc/ranges/subrange>)&lt;I1&gt;{} inicializado com a expressão {i, i + (i == last1 ? 0 : [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last2))} que denota a última ocorrência da sequência `[`first2`, `last2`)` no range `[`first1`, `last1`)` (após projeções com proj1 e proj2). Se `[`first2`, `last2`)` estiver vazio ou se nenhuma sequência for encontrada, o valor de retorno é efetivamente inicializado com {last1, last1}.

2) O mesmo que (1), exceto que o tipo de retorno é [ranges::borrowed_subrange_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R1&gt;.

### Complexidade

No máximo \\(\scriptsize S\cdot(N-S+1)\\)S·(N-S+1) aplicações do predicado correspondente e de cada projeção, onde \\(\scriptsize S\\)S é [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last2) e \\(\scriptsize N\\)N é [ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1) para (1), ou \\(\scriptsize S\\)S é [ranges::distance](<#/doc/iterator/ranges/distance>)(r2) e \\(\scriptsize N\\)N é [ranges::distance](<#/doc/iterator/ranges/distance>)(r1) para (2).

### Notas

Uma implementação pode melhorar a eficiência da busca se os iteradores de entrada modelarem [std::bidirectional_iterator](<#/doc/iterator/bidirectional_iterator>) buscando do fim para o início. Modelar o [std::random_access_iterator](<#/doc/iterator/random_access_iterator>) pode melhorar a velocidade de comparação. Tudo isso, no entanto, não altera a complexidade teórica do pior caso.

### Possível implementação
```cpp
    struct find_end_fn
    {
        template<std::forward_iterator I1, std::sentinel_for<I1> S1,
                 std::forward_iterator I2, std::sentinel_for<I2> S2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
        constexpr ranges::subrange<I1>
            operator()(I1 first1, S1 last1,
                       I2 first2, S2 last2, Pred pred = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            if (first2 == last2)
            {
                auto last_it = ranges::next(first1, last1);
                return {last_it, last_it};
            }
            auto result = ranges::search(
                std::move(first1), last1, first2, last2, pred, proj1, proj2);
    
            if (result.empty())
                return result;
    
            for (;;)
            {
                auto new_result = ranges::search(
                    std::next(result.begin()), last1, first2, last2, pred, proj1, proj2);
                if (new_result.empty())
                    return result;
                else
                    result = std::move(new_result);
            }
        }
    
        template<ranges::forward_range R1, ranges::forward_range R2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity,
                 class Proj2 = std::identity>
        requires std::indirectly_comparable<ranges::iterator_t<R1>,
                                            ranges::iterator_t<R2>,
                                            Pred, Proj1, Proj2>
        constexpr ranges::borrowed_subrange_t<R1>
            operator()(R1&& r1, R2&& r2, Pred pred = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2),
                           std::move(pred),
                           std::move(proj1), std::move(proj2));
        }
    };
    
    inline constexpr find_end_fn find_end {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <cctype>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    
    void print(const auto haystack, const auto needle)
    {
        const auto pos = std::distance(haystack.begin(), needle.begin());
        std::cout << "In \"";
        for (const auto c : haystack)
            std::cout << c;
        std::cout << "\" found \"";
        for (const auto c : needle)
            std::cout << c;
        std::cout << "\" at position [" << pos << ".." << pos + needle.size() << ")\n"
            << std::string(4 + pos, ' ') << std::string(needle.size(), '^') << '\n';
    }
    
    int main()
    {
        using namespace std::literals;
        constexpr auto secret{"password password word..."sv};
        constexpr auto wanted{"password"sv};
    
        constexpr auto found1 = std::ranges::find_end(
            secret.cbegin(), secret.cend(), wanted.cbegin(), wanted.cend());
        print(secret, found1);
    
        constexpr auto found2 = std::ranges::find_end(secret, "word"sv);
        print(secret, found2);
    
        const auto found3 = std::ranges::find_end(secret, "ORD"sv,
             { // uses a binary predicate
                return std::tolower(x) == std::tolower(y);
            });
        print(secret, found3);
    
        const auto found4 = std::ranges::find_end(secret, "SWORD"sv, {}, {},
             { return std::tolower(c); }); // projects the 2nd range
        print(secret, found4);
    
        static_assert(std::ranges::find_end(secret, "PASS"sv).empty()); // => not found
    }
```

Saída:
```
    In "password password word..." found "password" at position [9..17)
                 ^^^^^^^^
    In "password password word..." found "word" at position [18..22)
                          ^^^^
    In "password password word..." found "ord" at position [19..22)
                           ^^^
    In "password password word..." found "sword" at position [12..17)
                    ^^^^^
```

### Veja também

[ ranges::find_lastranges::find_last_ifranges::find_last_if_not](<#/doc/algorithm/ranges/find_last>)(C++23)(C++23)(C++23) | encontra o último elemento que satisfaz critérios específicos
(objeto de função de algoritmo)
[ ranges::findranges::find_ifranges::find_if_not](<#/doc/algorithm/ranges/find>)(C++20)(C++20)(C++20) | encontra o primeiro elemento que satisfaz critérios específicos
(objeto de função de algoritmo)
[ ranges::find_first_of](<#/doc/algorithm/ranges/find_first_of>)(C++20) | procura por qualquer um de um conjunto de elementos
(objeto de função de algoritmo)
[ ranges::adjacent_find](<#/doc/algorithm/ranges/adjacent_find>)(C++20) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(objeto de função de algoritmo)
[ ranges::search](<#/doc/algorithm/ranges/search>)(C++20) | procura pela primeira ocorrência de um range de elementos
(objeto de função de algoritmo)
[ ranges::search_n](<#/doc/algorithm/ranges/search_n>)(C++20) | procura pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(objeto de função de algoritmo)
[ find_end](<#/doc/algorithm/find_end>) | encontra a última sequência de elementos em um determinado range
(modelo de função)