# std::ranges::set_symmetric_difference, std::ranges::set_symmetric_difference_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::input_iterator I2, std::sentinel_for<I2> S2,
std::weakly_incrementable O, class Comp = ranges::less,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::mergeable<I1, I2, O, Comp, Proj1, Proj2>
constexpr set_symmetric_difference_result<I1, I2, O>
set_symmetric_difference( I1 first1, S1 last1, I2 first2, S2 last2,
O result, Comp comp = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::input_range R1, ranges::input_range R2,
std::weakly_incrementable O, class Comp = ranges::less,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::mergeable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
O, Comp, Proj1, Proj2>
constexpr set_symmetric_difference_result<ranges::borrowed_iterator_t<R1>,
ranges::borrowed_iterator_t<R2>, O>
set_symmetric_difference( R1&& r1, R2&& r2, O result, Comp comp = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
Tipos auxiliares
template< class I1, class I2, class O >
using set_symmetric_difference_result = ranges::in_in_out_result<I1, I2, O>;
```

Calcula a diferença simétrica de dois ranges ordenados: os elementos que são encontrados em qualquer um dos ranges, mas não em ambos, são copiados para o range que começa em result. O range resultante também é ordenado.

Se um elemento for encontrado `m` vezes em `[`first1`, `last1`)` e `n` vezes em `[`first2`, `last2`)`, ele será copiado para result exatamente `│m - n│` vezes. Se `m > n`, então os últimos `m - n` desses elementos são copiados de `[`first1`, `last1`)`, caso contrário, os últimos `n - m` elementos são copiados de `[`first2`, `last2`)`. O range resultante não pode se sobrepor a nenhum dos ranges de entrada.

O comportamento é indefinido se

* os ranges de entrada não estiverem ordenados em relação a comp e proj1 ou proj2, respectivamente, ou
* o range resultante se sobrepuser a qualquer um dos ranges de entrada.

1) Os elementos são comparados usando a função de comparação binária comp fornecida.

2) O mesmo que (1), mas usa r1 como o primeiro range e r2 como o segundo range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, [ranges::end](<#/doc/ranges/end>)(r1) como last1, [ranges::begin](<#/doc/ranges/begin>)(r2) como first2, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
* Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
* Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first1, last1** — par de iterator-sentinel denotando o primeiro range de entrada ordenado
- **first2, last2** — par de iterator-sentinel denotando o segundo range de entrada ordenado
- **r1** — o primeiro range de entrada ordenado
- **r2** — o segundo range de entrada ordenado
- **result** — o início do range de saída
- **comp** — comparação a ser aplicada aos elementos projetados
- **proj1** — projeção a ser aplicada aos elementos no primeiro range
- **proj2** — projeção a ser aplicada aos elementos no segundo range

### Valor de retorno

{last1, last2, result_last}, onde result_last é o fim do range construído.

### Complexidade

No máximo \\(\scriptsize 2\cdot(N_1+N_2)-1\\)2·(N1+N2)-1 comparações e aplicações de cada projeção, onde \\(\scriptsize N_1\\)N1 e \\(\scriptsize N_2\\)N2 são [ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1) e [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last2), respectivamente.

### Possível implementação
```cpp
    struct set_symmetric_difference_fn
    {
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::input_iterator I2, std::sentinel_for<I2> S2,
                 std::weakly_incrementable O, class Comp = ranges::less,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::mergeable<I1, I2, O, Comp, Proj1, Proj2>
        constexpr ranges::set_symmetric_difference_result<I1, I2, O>
            operator()(I1 first1, S1 last1, I2 first2, S2 last2, O result, Comp comp = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            while (!(first1 == last1 or first2 == last2))
            {
                if (std::invoke(comp, std::invoke(proj1, *first1), std::invoke(proj2, *first2)))
                {
                    *result = *first1;
                    ++first1;
                    ++result;
                }
                else if (std::invoke(comp, std::invoke(proj2, *first2),
                                           std::invoke(proj1, *first1)))
                {
                    *result = *first2;
                    ++first2;
                    ++result;
                }
                else
                {
                    ++first1;
                    ++first2;
                }
            }
            auto res1 {ranges::copy(std::move(first1), std::move(last1), std::move(result))};
            auto res2 {ranges::copy(std::move(first2), std::move(last2), std::move(res1.out))};
            return {std::move(res1.in), std::move(res2.in), std::move(res2.out)};
        }
    
        template<ranges::input_range R1, ranges::input_range R2,
                 std::weakly_incrementable O, class Comp = ranges::less,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::mergeable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
                                O, Comp, Proj1, Proj2>
        constexpr ranges::set_symmetric_difference_result<
            ranges::borrowed_iterator_t<R1>, ranges::borrowed_iterator_t<R2>, O>
            operator()(R1&& r1, R2&& r2, O result, Comp comp = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2),
                           std::move(result), std::move(comp),
                           std::move(proj1), std::move(proj2));
        }
    };
    
    inline constexpr set_symmetric_difference_fn set_symmetric_difference {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    void visualize_this(const auto& v, int min = 1, int max = 9)
    {
        for (auto i {min}; i <= max; ++i)
        {
            std::ranges::binary_search(v, i) ? std::cout << i : std::cout << '.';
            std::cout << ' ';
        }
        std::cout << '\n';
    }
    
    int main()
    {
        const auto in1 = {1, 3, 4,    6, 7, 9};
        const auto in2 = {1,    4, 5, 6,    9};
    
        std::vector<int> out {};
    
        std::ranges::set_symmetric_difference(in1, in2, std::back_inserter(out));
    
        visualize_this(in1);
        visualize_this(in2);
        visualize_this(out);
    }
```

Saída:
```
    1 . 3 4 . 6 7 . 9
    1 . . 4 5 6 . . 9
    . . 3 . 5 . 7 . .
```

### Ver também

[ ranges::set_union](<#/doc/algorithm/ranges/set_union>)(C++20) | calcula a união de dois conjuntos
(objeto de função de algoritmo)
[ ranges::set_difference](<#/doc/algorithm/ranges/set_difference>)(C++20) | calcula a diferença entre dois conjuntos
(objeto de função de algoritmo)
[ ranges::set_intersection](<#/doc/algorithm/ranges/set_intersection>)(C++20) | calcula a interseção de dois conjuntos
(objeto de função de algoritmo)
[ ranges::includes](<#/doc/algorithm/ranges/includes>)(C++20) | retorna true se uma sequência é uma subsequência de outra
(objeto de função de algoritmo)
[ set_symmetric_difference](<#/doc/algorithm/set_symmetric_difference>) | calcula a diferença simétrica entre dois conjuntos
(modelo de função)