# std::ranges::set_intersection, std::ranges::set_intersection_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::input_iterator I2, std::sentinel_for<I2> S2,
std::weakly_incrementable O, class Comp = ranges::less,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::mergeable<I1, I2, O, Comp, Proj1, Proj2>
constexpr set_intersection_result<I1, I2, O>
set_intersection( I1 first1, S1 last1, I2 first2, S2 last2,
O result, Comp comp = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::input_range R1, ranges::input_range R2,
std::weakly_incrementable O, class Comp = ranges::less,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::mergeable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
O, Comp, Proj1, Proj2>
constexpr set_intersection_result<ranges::borrowed_iterator_t<R1>,
ranges::borrowed_iterator_t<R2>, O>
set_intersection( R1&& r1, R2&& r2, O result, Comp comp = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
Tipos auxiliares
template< class I1, class I2, class O >
using set_intersection_result = ranges::in_in_out_result<I1, I2, O>;
```

Constrói um range ordenado começando em `result`, consistindo de elementos que são encontrados em ambos os ranges de entrada ordenados `[`first1`, `last1`)` e `[`first2`, `last2`)`. Se um elemento é encontrado `m` vezes em `[`first1`, `last1`)` e `n` vezes em `[`first2`, `last2`)`, os primeiros min(m, n) elementos serão copiados do primeiro range para `result`. A ordem dos elementos equivalentes é preservada.

O comportamento é indefinido se

*   os ranges de entrada não estiverem ordenados em relação a `comp` e `proj1` ou `proj2`, respectivamente, ou
*   o range resultante se sobrepuser a qualquer um dos ranges de entrada.

1) Os elementos são comparados usando a função de comparação binária `comp` fornecida.

2) O mesmo que (1), mas usa `r1` como o primeiro range e `r2` como o segundo range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como `first1`, [ranges::end](<#/doc/ranges/end>)(r1) como `last1`, [ranges::begin](<#/doc/ranges/begin>)(r2) como `first2`, e [ranges::end](<#/doc/ranges/end>)(r2) como `last2`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

first1, last1 | \- | par iterador-sentinela denotando o primeiro range de entrada ordenado
---|---|---
first2, last2 | \- | par iterador-sentinela denotando o segundo range de entrada ordenado
r1 | \- | o primeiro range de entrada ordenado
r2 | \- | o segundo range de entrada ordenado
result | \- | o início do range de saída
comp | \- | comparação a ser aplicada aos elementos projetados
proj1 | \- | projeção a ser aplicada aos elementos no primeiro range
proj2 | \- | projeção a ser aplicada aos elementos no segundo range

### Valor de retorno

`{last1, last2, result_last}`, onde `result_last` é o fim do range construído.

### Complexidade

No máximo \\(\scriptsize 2\cdot(N_1+N_2)-1\\)2·(N1+N2)-1 comparações e aplicações de cada projeção, onde \\(\scriptsize N_1\\)N1 e \\(\scriptsize N_2\\)N2 são [ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1) e [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last2), respectivamente.

### Implementação possível
```cpp
    struct set_intersection_fn
    {
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::input_iterator I2, std::sentinel_for<I2> S2,
                 std::weakly_incrementable O, class Comp = ranges::less,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::mergeable<I1, I2, O, Comp, Proj1, Proj2>
        constexpr ranges::set_intersection_result<I1, I2, O>
            operator()(I1 first1, S1 last1, I2 first2, S2 last2,
                       O result, Comp comp = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            while (!(first1 == last1 or first2 == last2))
            {
                if (std::invoke(comp, std::invoke(proj1, *first1),
                                      std::invoke(proj2, *first2)))
                    ++first1;
                else if (std::invoke(comp, std::invoke(proj2, *first2),
                                           std::invoke(proj1, *first1)))
                    ++first2;
                else
                    *result = *first1, ++first1, ++first2, ++result;
            }
            return {ranges::next(std::move(first1), std::move(last1)),
                    ranges::next(std::move(first2), std::move(last2)),
                    std::move(result)};
        }
    
        template<ranges::input_range R1, ranges::input_range R2,
                 std::weakly_incrementable O, class Comp = ranges::less,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::mergeable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
                                O, Comp, Proj1, Proj2>
        constexpr ranges::set_intersection_result<ranges::borrowed_iterator_t<R1>,
                                                  ranges::borrowed_iterator_t<R2>, O>
            operator()(R1&& r1, R2&& r2, O result, Comp comp = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2),
                           std::move(result), std::move(comp),
                           std::move(proj1), std::move(proj2));
        }
    };
    
    inline constexpr set_intersection_fn set_intersection {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    void print(const auto& v, const auto& rem)
    {
        std::cout << "{ ";
        for (const auto& e : v)
            std::cout << e << ' ';
        std::cout << '}' << rem;
    }
    
    int main()
    {
        const auto in1 = {1, 2, 2, 3, 4, 5, 6};
        const auto in2 = {2, 2, 3, 3, 5, 7};
        std::vector<int> out {};
    
        std::ranges::set_intersection(in1, in2, std::back_inserter(out));
    
        print(in1, " ∩ "), print(in2, " = "), print(out, "\n");
    }
```

Saída:
```
    { 1 2 2 3 4 5 6 } ∩ { 2 2 3 3 5 7 } = { 2 2 3 5 }
```

### Veja também

[ ranges::set_union](<#/doc/algorithm/ranges/set_union>)(C++20) | calcula a união de dois conjuntos
---|---
(objeto de função de algoritmo) |
[ ranges::set_difference](<#/doc/algorithm/ranges/set_difference>)(C++20) | calcula a diferença entre dois conjuntos
(objeto de função de algoritmo)
[ ranges::set_symmetric_difference](<#/doc/algorithm/ranges/set_symmetric_difference>)(C++20) | calcula a diferença simétrica entre dois conjuntos
(objeto de função de algoritmo)
[ ranges::includes](<#/doc/algorithm/ranges/includes>)(C++20) | retorna true se uma sequência é uma subsequência de outra
(objeto de função de algoritmo)
[ set_intersection](<#/doc/algorithm/set_intersection>) | calcula a intersecção de dois conjuntos
(template de função)