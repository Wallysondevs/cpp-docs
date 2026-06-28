# std::ranges::lexicographical_compare

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::input_iterator I2, std::sentinel_for<I2> S2,
class Proj1 = std::identity, class Proj2 = std::identity,
std::indirect_strict_weak_order<
std::projected<I1, Proj1>,
std::projected<I2, Proj2>> Comp = ranges::less >
constexpr bool
lexicographical_compare( I1 first1, S1 last1, I2 first2, S2 last2,
Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::input_range R1, ranges::input_range R2,
class Proj1 = std::identity, class Proj2 = std::identity,
std::indirect_strict_weak_order<
std::projected<ranges::iterator_t<R1>, Proj1>,
std::projected<ranges::iterator_t<R2>, Proj2>> Comp = ranges::less >
constexpr bool
lexicographical_compare( R1&& r1, R2&& r2, Comp comp = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
```

Verifica se o primeiro range `[`first1`, `last1`)` é lexicograficamente _menor_ que o segundo range `[`first2`, `last2`)`.

1) Os elementos são comparados usando a função de comparação binária `comp` fornecida.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

A comparação lexicográfica é uma operação com as seguintes propriedades:

*   Dois ranges são comparados elemento por elemento.
*   O primeiro elemento divergente define qual range é lexicograficamente _menor_ ou _maior_ que o outro.
*   Se um range é um prefixo de outro, o range mais curto é lexicograficamente _menor_ que o outro.
*   Se dois ranges têm elementos equivalentes e são do mesmo comprimento, então os ranges são lexicograficamente _iguais_.
*   Um range vazio é lexicograficamente _menor_ que qualquer range não vazio.
*   Dois ranges vazios são lexicograficamente _iguais_.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first1, last1** — o primeiro range de elementos a examinar
- **r1** — o primeiro range de elementos a examinar
- **first2, last2** — o segundo range de elementos a examinar
- **r2** — o segundo range de elementos a examinar
- **comp** — função de comparação a ser aplicada aos elementos projetados
- **proj1** — projeção a ser aplicada ao primeiro range de elementos
- **proj2** — projeção a ser aplicada ao segundo range de elementos

### Valor de retorno

`true` se o primeiro range for lexicograficamente _menor_ que o segundo.

### Complexidade

No máximo 2·min(N1, N2) aplicações da comparação e projeções correspondentes, onde N1 = [ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1) e N2 = [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last2).

### Implementação possível
```cpp
    struct lexicographical_compare_fn
    {
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::input_iterator I2, std::sentinel_for<I2> S2,
                 class Proj1 = std::identity, class Proj2 = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<I1, Proj1>,
                     std::projected<I2, Proj2>> Comp = ranges::less>
        constexpr bool operator()(I1 first1, S1 last1, I2 first2, S2 last2,
                                  Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            for (; (first1 != last1) && (first2 != last2); ++first1, (void) ++first2)
            {
                if (std::invoke(comp, std::invoke(proj1, *first1), std::invoke(proj2, *first2)))
                    return true;
    
                if (std::invoke(comp, std::invoke(proj2, *first2), std::invoke(proj1, *first1)))
                    return false;
            }
            return (first1 == last1) && (first2 != last2);
        }
    
        template<ranges::input_range R1, ranges::input_range R2,
                 class Proj1 = std::identity, class Proj2 = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<ranges::iterator_t<R1>, Proj1>,
                     std::projected<ranges::iterator_t<R2>, Proj2>> Comp = ranges::less>
        constexpr bool operator()(R1&& r1, R2&& r2, Comp comp = {},
                                  Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2),
                           std::ref(comp), std::ref(proj1), std::ref(proj2));
        }
    };
    
    inline constexpr lexicographical_compare_fn lexicographical_compare;
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <random>
    #include <vector>
    
    int main()
    {
        std::vector<char> v1 {'a', 'b', 'c', 'd'};
        std::vector<char> v2 {'a', 'b', 'c', 'd'};
    
        namespace ranges = std::ranges;
        auto os = std::ostream_iterator<char>(std::cout, " ");
    
        std::mt19937 g {std::random_device {}()};
        while (not ranges::lexicographical_compare(v1, v2))
        {
            ranges::copy(v1, os);
            std::cout << ">= ";
            ranges::copy(v2, os);
            std::cout << '\n';
    
            ranges::shuffle(v1, g);
            ranges::shuffle(v2, g);
        }
    
        ranges::copy(v1, os);
        std::cout << "<  ";
        ranges::copy(v2, os);
        std::cout << '\n';
    }
```

Saída possível:
```
    a b c d >= a b c d
    d a b c >= c b d a
    b d a c >= a d c b
    a c d b <  c d a b
```

### Veja também

[ ranges::equal](<#/doc/algorithm/ranges/equal>)(C++20) | determina se dois conjuntos de elementos são os mesmos
(objeto de função de algoritmo)
[ lexicographical_compare](<#/doc/algorithm/lexicographical_compare>) | retorna `true` se um range for lexicograficamente menor que outro
(template de função)