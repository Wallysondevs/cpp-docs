# std::ranges::set_union, std::ranges::set_union_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::input_iterator I2, std::sentinel_for<I2> S2,
std::weakly_incrementable O, class Comp = ranges::less,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::mergeable<I1, I2, O, Comp, Proj1, Proj2>
constexpr set_union_result<I1, I2, O>
set_union( I1 first1, S1 last1, I2 first2, S2 last2,
O result, Comp comp = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::input_range R1, ranges::input_range R2,
std::weakly_incrementable O, class Comp = ranges::less,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::mergeable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
O, Comp, Proj1, Proj2>
constexpr set_union_result<ranges::borrowed_iterator_t<R1>,
ranges::borrowed_iterator_t<R2>, O>
set_union( R1&& r1, R2&& r2, O result, Comp comp = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
Tipos auxiliares
template< class I1, class I2, class O >
using set_union_result = ranges::in_in_out_result<I1, I2, O>;
```

Constrói uma união ordenada começando em `result` consistindo no conjunto de elementos presentes em um ou ambos os ranges de entrada ordenados `[`first1`, `last1`)` e `[`first2`, `last2`)`.

Se algum elemento for encontrado `m` vezes em `[`first1`, `last1`)` e `n` vezes em `[`first2`, `last2`)`, então todos os `m` elementos serão copiados de `[`first1`, `last1`)` para `result`, preservando a ordem, e então exatamente max(n - m, 0) elementos serão copiados de `[`first2`, `last2`)` para `result`, também preservando a ordem.

O comportamento é indefinido se

*   os ranges de entrada não estiverem ordenados em relação a `comp` e `proj1` ou `proj2`, respectivamente, ou
*   o range resultante se sobrepõe a qualquer um dos ranges de entrada.

1) Os elementos são comparados usando a função de comparação binária `comp` fornecida.

2) O mesmo que (1), mas usa `r1` como o primeiro range e `r2` como o segundo range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como `first1`, [ranges::end](<#/doc/ranges/end>)(r1) como `last1`, [ranges::begin](<#/doc/ranges/begin>)(r2) como `first2`, e [ranges::end](<#/doc/ranges/end>)(r2) como `last2`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
*   Nenhuma delas é visível para a [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer uma delas é encontrada por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first1, last1** — par iterador-sentinela denotando o primeiro range de entrada ordenado
- **first2, last2** — par iterador-sentinela denotando o segundo range de entrada ordenado
- **r1** — o primeiro range de entrada ordenado
- **r2** — o segundo range de entrada ordenado
- **result** — o início do range de saída
- **comp** — comparação a ser aplicada aos elementos projetados
- **proj1** — projeção a ser aplicada aos elementos no primeiro range
- **proj2** — projeção a ser aplicada aos elementos no segundo range

### Valor de retorno

`{last1, last2, result_last}`, onde `result_last` é o fim do range construído.

### Complexidade

No máximo \\(\scriptsize 2\cdot(N_1+N_2)-1\\)2·(N1+N2)-1 comparações e aplicações de cada projeção, onde \\(\scriptsize N_1\\)N1 e \\(\scriptsize N_2\\)N2 são [ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1) e [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last2), respectivamente.

### Notas

Este algoritmo executa uma tarefa semelhante à de [ranges::merge](<#/doc/algorithm/ranges/merge>). Ambos consomem dois ranges de entrada ordenados e produzem uma saída ordenada com elementos de ambas as entradas. A diferença entre esses dois algoritmos está no tratamento de valores de ambos os ranges de entrada que se comparam como equivalentes (veja as notas sobre [LessThanComparable](<#/doc/named_req/LessThanComparable>)). Se quaisquer valores equivalentes apareceram `n` vezes no primeiro range e `m` vezes no segundo, [ranges::merge](<#/doc/algorithm/ranges/merge>) produziria todas as n+m ocorrências, enquanto `ranges::set_union` produziria apenas [std::max](<#/doc/algorithm/max>)(n, m) delas. Assim, [ranges::merge](<#/doc/algorithm/ranges/merge>) produz exatamente \\(\scriptsize (N_1+N_2)\\)(N1+N2) valores e `ranges::set_union` pode produzir menos.

### Possível implementação
```cpp
    struct set_union_fn
    {
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::input_iterator I2, std::sentinel_for<I2> S2,
                 std::weakly_incrementable O, class Comp = ranges::less,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::mergeable<I1, I2, O, Comp, Proj1, Proj2>
        constexpr ranges::set_union_result<I1, I2, O>
            operator()(I1 first1, S1 last1, I2 first2, S2 last2,
                       O result, Comp comp = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            for (; !(first1 == last1 or first2 == last2); ++result)
            {
                if (std::invoke(comp, std::invoke(proj1, *first1),
                                      std::invoke(proj2, *first2)))
                {
                    *result = *first1;
                    ++first1;
                }
                else if (std::invoke(comp, std::invoke(proj2, *first2),
                                           std::invoke(proj1, *first1)))
                {
                    *result = *first2;
                    ++first2;
                }
                else
                {
                    *result = *first1;
                    ++first1;
                    ++first2;
                }
            }
            auto res1 = ranges::copy(std::move(first1), std::move(last1), std::move(result));
            auto res2 = ranges::copy(std::move(first2), std::move(last2), std::move(res1.out));
            return {std::move(res1.in), std::move(res2.in), std::move(res2.out)};
        }
     
        template<ranges::input_range R1, ranges::input_range R2,
                 std::weakly_incrementable O, class Comp = ranges::less,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::mergeable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
                                O, Comp, Proj1, Proj2>
        constexpr ranges::set_union_result<ranges::borrowed_iterator_t<R1>,
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
     
    inline constexpr set_union_fn set_union {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
     
    void print(const auto& in1, const auto& in2, auto first, auto last)
    {
        std::cout << "{ ";
        for (const auto& e : in1)
            std::cout << e << ' ';
        std::cout << "} ∪ { ";
        for (const auto& e : in2)
            std::cout << e << ' ';
        std::cout << "} =\n{ ";
        while (!(first == last))
            std::cout << *first++ << ' ';
        std::cout << "}\n\n";
    }
     
    int main()
    {
        std::vector<int> in1, in2, out;
     
        in1 = {1, 2, 3, 4, 5};
        in2 = {      3, 4, 5, 6, 7};
        out.resize(in1.size() + in2.size());
        const auto ret = std::ranges::set_union(in1, in2, out.begin());
        print(in1, in2, out.begin(), ret.out);
     
        in1 = {1, 2, 3, 4, 5, 5, 5};
        in2 = {      3, 4, 5, 6, 7};
        out.clear();
        out.reserve(in1.size() + in2.size());
        std::ranges::set_union(in1, in2, std::back_inserter(out));
        print(in1, in2, out.cbegin(), out.cend());
    }
```

Saída:
```
    { 1 2 3 4 5 } ∪ { 3 4 5 6 7 } =
    { 1 2 3 4 5 6 7 }
     
    { 1 2 3 4 5 5 5 } ∪ { 3 4 5 6 7 } =
    { 1 2 3 4 5 5 5 6 7 }
```

### Veja também

[ ranges::set_difference](<#/doc/algorithm/ranges/set_difference>)(C++20) | calcula a diferença entre dois conjuntos
(objeto de função de algoritmo)
[ ranges::set_intersection](<#/doc/algorithm/ranges/set_intersection>)(C++20) | calcula a interseção de dois conjuntos
(objeto de função de algoritmo)
[ ranges::set_symmetric_difference](<#/doc/algorithm/ranges/set_symmetric_difference>)(C++20) | calcula a diferença simétrica entre dois conjuntos
(objeto de função de algoritmo)
[ ranges::merge](<#/doc/algorithm/ranges/merge>)(C++20) | mescla dois ranges ordenados
(objeto de função de algoritmo)
[ ranges::includes](<#/doc/algorithm/ranges/includes>)(C++20) | retorna verdadeiro se uma sequência é uma subsequência de outra
(objeto de função de algoritmo)
[ set_union](<#/doc/algorithm/set_union>) | calcula a união de dois conjuntos
(modelo de função)