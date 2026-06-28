# std::ranges::mismatch, std::ranges::mismatch_result

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`

```cpp
Assinatura da chamada
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::input_iterator I2, std::sentinel_for<I2> S2,
class Pred = ranges::equal_to,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
constexpr mismatch_result<I1, I2>
mismatch( I1 first1, S1 last1, I2 first2, S2 last2,
Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {} );  // (1) (desde C++20)
template< ranges::input_range R1, ranges::input_range R2,
class Pred = ranges::equal_to,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::indirectly_comparable<
ranges::iterator_t<R1>, ranges::iterator_t<R2>, Pred, Proj1, Proj2>
constexpr mismatch_result<ranges::borrowed_iterator_t<R1>,
ranges::borrowed_iterator_t<R2>>
mismatch( R1&& r1, R2&& r2, Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );  // (2) (desde C++20)
Tipos auxiliares
template< class I1, class I2 >
using mismatch_result = ranges::in_in_result<I1, I2>;  // (3) (desde C++20)
```

Retorna o primeiro par de elementos projetados que não correspondem de dois ranges: um definido por `[`first1`, `last1`)` ou r1 e outro definido por `[`first2`, `last2`)` ou r2.

1) Os elementos são comparados usando o predicado binário p fornecido.

2) O mesmo que (1), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
* Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
* Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first1, last1** — um par iterador-sentinela denotando o primeiro range de elementos a comparar
- **r1** — o primeiro range de elementos a comparar
- **first2, last2** — um par iterador-sentinela denotando o segundo range de elementos a comparar
- **r2** — o segundo range de elementos a comparar
- **pred** — predicado a aplicar aos elementos projetados
- **proj1** — projeção a aplicar ao primeiro range de elementos
- **proj2** — projeção a aplicar ao segundo range de elementos

### Valor de retorno

`ranges::mismatch_result` com iteradores para os dois primeiros elementos não iguais.

Se nenhuma diferença for encontrada quando a comparação atingir last1 ou last2, o que ocorrer primeiro, o objeto conterá o iterador de fim e o iterador correspondente do outro range.

### Complexidade

No máximo [std::min](<#/doc/algorithm/min>)(last1 - first1, last2 - first2) aplicações do predicado e projeções correspondentes.

### Implementação possível
```
    struct mismatch_fn
    {
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::input_iterator I2, std::sentinel_for<I2> S2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
        constexpr std::mismatch_result<I1, I2>
            operator()(I1 first1, S1 last1, I2 first2, S2 last2,
                       Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            for (; first1 != last1 && first2 != last2; ++first1, (void)++first2)
                if (not std::invoke(pred, std::invoke(proj1, *first1),
                                          std::invoke(proj2, *first2)))
                    break;
    
            return {first1, first2};
        }
    
        template<ranges::input_range R1, ranges::input_range R2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::indirectly_comparable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
                                            Pred, Proj1, Proj2>
        constexpr ranges::mismatch_result<ranges::borrowed_iterator_t<R1>,
                                          ranges::borrowed_iterator_t<R2>>
            operator()(R1&& r1, R2&& r2, Pred pred = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2),
                           std::ref(pred), std::ref(proj1), std::ref(proj2));
        }
    };
    
    inline constexpr mismatch_fn mismatch;
```

---

### Exemplo

Este programa determina a substring mais longa que é encontrada simultaneamente no início e no fim da string fornecida, em ordem inversa (possivelmente sobrepondo-se).

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    
    [[nodiscard]]
    constexpr std::string_view mirror_ends(const std::string_view in)
    {
        const auto end = std::ranges::mismatch(in, in | std::views::reverse).in1;
        return {in.cbegin(), end};
    }
    
    int main()
    {
        std::cout << mirror_ends("abXYZba") << '\n'
                  << mirror_ends("abca") << '\n'
                  << mirror_ends("ABBA") << '\n'
                  << mirror_ends("level") << '\n';
    
        using namespace std::literals::string_view_literals;
    
        static_assert("123"sv == mirror_ends("123!@#321"));
        static_assert("radar"sv == mirror_ends("radar"));
    }
```

Saída:
```
    ab
    a
    ABBA
    level
```

### Veja também

[ ranges::equal](<#/doc/algorithm/ranges/equal>)(C++20) | determina se dois conjuntos de elementos são os mesmos
(objeto de função de algoritmo)
[ ranges::findranges::find_ifranges::find_if_not](<#/doc/algorithm/ranges/find>)(C++20)(C++20)(C++20) | encontra o primeiro elemento que satisfaz critérios específicos
(objeto de função de algoritmo)
[ ranges::lexicographical_compare](<#/doc/algorithm/ranges/lexicographical_compare>)(C++20) | retorna true se um range for lexicograficamente menor que outro
(objeto de função de algoritmo)
[ ranges::search](<#/doc/algorithm/ranges/search>)(C++20) | procura pela primeira ocorrência de um range de elementos
(objeto de função de algoritmo)
[ mismatch](<#/doc/algorithm/mismatch>) | encontra a primeira posição onde dois ranges diferem
(modelo de função)