# std::ranges::ends_with

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::input_iterator I2, std::sentinel_for<I2> S2,
class Pred = ranges::equal_to,
class Proj1 = std::identity, class Proj2 = std::identity >
requires (std::forward_iterator<I1>
(std::forward_iterator<I2>
std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
constexpr bool ends_with( I1 first1, S1 last1,
I2 first2, S2 last2, Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::input_range R1, ranges::input_range R2,
class Pred = ranges::equal_to,
class Proj1 = std::identity, class Proj2 = std::identity >
requires (ranges::forward_range<R1>
(ranges::forward_range<R2>
std::indirectly_comparable<ranges::iterator_t<R1>,
ranges::iterator_t<R2>,
Pred, Proj1, Proj2>
constexpr bool ends_with( R1&& r1, R2&& r2, Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
```

Verifica se o segundo range corresponde ao sufixo do primeiro range.

1) Seja N1 [ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1) e N2 [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last2):

  * Se N1 < N2 for verdadeiro, retorna false.
  * Caso contrário, retorna [ranges::equal](<#/doc/algorithm/ranges/equal>)(std::move(first1) + (N1 - N2), last1,
std::move(first2), last2, pred, proj1, proj2).

2) Seja N1 [ranges::distance](<#/doc/iterator/ranges/distance>)(r1) e N2 [ranges::distance](<#/doc/iterator/ranges/distance>)(r2).

  * Se N1 < N2 for verdadeiro, retorna false.
  * Caso contrário, retorna [ranges::equal](<#/doc/algorithm/ranges/equal>)([views::drop](<#/doc/ranges/drop_view>)([ranges::ref_view](<#/doc/ranges/ref_view>)(r1),
N1 - static_cast<decltype(N1)>(N2)),
r2, pred, proj1, proj2).

As entidades tipo-função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidas como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
  * Nenhuma delas é visível para [busca dependente de argumento](<#/doc/language/adl>).
  * Quando qualquer uma delas é encontrada por [busca não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [busca dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first1, last1** — o range de elementos a examinar
- **r1** — o range de elementos a examinar
- **first2, last2** — o range de elementos a ser usado como sufixo
- **r2** — o range de elementos a ser usado como sufixo
- **pred** — o predicado binário que compara os elementos projetados
- **proj1** — a projeção a ser aplicada aos elementos do range a examinar
- **proj2** — a projeção a ser aplicada aos elementos do range a ser usado como sufixo

### Valor de retorno

true se o segundo range corresponder ao sufixo do primeiro range, false caso contrário.

### Complexidade

Geralmente linear: no máximo \\(\scriptsize \min(N1,N2) \\)min(N1,N2) aplicações do predicado e de ambas as projeções. O predicado e ambas as projeções não são aplicados se N1 < N2 for verdadeiro.

Se N1 e N2 puderem ser calculados em tempo constante (ou seja, ambos os pares de tipos iterator-sentinel modelam [`sized_sentinel_for`](<#/doc/iterator/sized_sentinel_for>), ou ambos os tipos de range modelam [`sized_range`](<#/doc/ranges/sized_range>)) e N1 < N2 for verdadeiro, a complexidade de tempo é constante.

### Possível implementação
```cpp
    struct ends_with_fn
    {
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::input_iterator I2, std::sentinel_for<I2> S2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires (std::forward_iterator<I1> || std::sized_sentinel_for<S1, I1>) &&
                 (std::forward_iterator<I2> || std::sized_sentinel_for<S2, I2>) &&
                 std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
        constexpr bool operator()(I1 first1, S1 last1, I2 first2, S2 last2,
                                  Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            const auto n1 = ranges::distance(first1, last1);
            const auto n2 = ranges::distance(first2, last2);
            if (n1 < n2)
                return false;
            ranges::advance(first1, n1 - n2);
            return ranges::equal(std::move(first1), last1,
                                 std::move(first2), last2,
                                 pred, proj1, proj2);
        }
    
        template<ranges::input_range R1, ranges::input_range R2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires (ranges::forward_range<R1> || ranges::sized_range<R1>) &&
                 (ranges::forward_range<R2> || ranges::sized_range<R2>) &&
                 std::indirectly_comparable<ranges::iterator_t<R1>,
                                            ranges::iterator_t<R2>,
                                            Pred, Proj1, Proj2>
        constexpr bool operator()(R1&& r1, R2&& r2,
                                  Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            const auto n1 = ranges::distance(r1);
            const auto n2 = ranges::distance(r2);
            if (n1 < n2)
                return false;
            return ranges::equal(views::drop(ranges::ref_view(r1),
                                             n1 - static_cast<decltype(n1)>(n2)),
                                 r2, pred, proj1, proj2);
        }
    };
    
    inline constexpr ends_with_fn ends_with{};
```

---

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_ranges_starts_ends_with`](<#/doc/feature_test>) | [`202106L`](<#/>) | (C++23) | std::ranges::starts_with, `std::ranges::ends_with`

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    
    static_assert
    (
        ! std::ranges::ends_with("for", "cast") &&
        std::ranges::ends_with("dynamic_cast", "cast") &&
        ! std::ranges::ends_with("as_const", "cast") &&
        std::ranges::ends_with("bit_cast", "cast") &&
        ! std::ranges::ends_with("to_underlying", "cast") &&
        std::ranges::ends_with(std::array{1, 2, 3, 4}, std::array{3, 4}) &&
        ! std::ranges::ends_with(std::array{1, 2, 3, 4}, std::array{4, 5})
    );
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 4105](<https://cplusplus.github.io/LWG/issue4105>) | C++23 | a sobrecarga ([2](<#/doc/algorithm/ranges/ends_with>)) calculava a diferença de tamanho por N1 - N2[1](<#/doc/algorithm/ranges/ends_with>) | alterado para N1 - static_cast<decltype(N1)>(N2)

1. [↑](<#/doc/algorithm/ranges/ends_with>) Seu resultado pode ser de um [tipo de classe inteira](<#/doc/iterator/is-integer-like>), neste caso ranges::drop_view não pode ser construído.

### Veja também

[ ranges::starts_with](<#/doc/algorithm/ranges/starts_with>)(C++23) | verifica se um range começa com outro range
(objeto de função de algoritmo)
[ ends_with](<#/doc/string/basic_string/ends_with>)(C++20) | verifica se a string termina com o sufixo dado
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)
[ ends_with](<#/doc/string/basic_string_view/ends_with>)(C++20) | verifica se a string view termina com o sufixo dado
(função membro pública de `std::basic_string_view<CharT,Traits>`)