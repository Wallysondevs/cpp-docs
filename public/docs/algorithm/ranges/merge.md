# std::ranges::merge, std::ranges::merge_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Call signature
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::input_iterator I2, std::sentinel_for<I2> S2,
std::weakly_incrementable O, class Comp = ranges::less,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::mergeable<I1, I2, O, Comp, Proj1, Proj2>
constexpr merge_result<I1, I2, O>
merge( I1 first1, S1 last1, I2 first2, S2 last2, O result, Comp comp = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::input_range R1, ranges::input_range R2,
std::weakly_incrementable O, class Comp = ranges::less,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::mergeable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
O, Comp, Proj1, Proj2>
constexpr merge_result<ranges::borrowed_iterator_t<R1>,
ranges::borrowed_iterator_t<R2>, O>
merge( R1&& r1, R2&& r2, O result, Comp comp = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
Helper types
template< class I1, class I2, class O >
using merge_result = ranges::in_in_out_result<I1, I2, O>;
```

Mescla dois ranges _ordenados_ `[`[first1`, `last1`)` e `[`first2`, `last2`)` em um único range _ordenado_ começando em result.

Uma sequência é considerada _ordenada_ em relação ao comparador comp se para qualquer iterator `it` apontando para a sequência e qualquer inteiro não negativo `n` tal que `it + n` é um iterator válido apontando para um elemento da sequência, [std::invoke](<#/doc/utility/functional/invoke>)(comp, [std::invoke](<#/doc/utility/functional/invoke>)(proj2, *(it + n)), [std::invoke](<#/doc/utility/functional/invoke>)(proj1, *it))) avalia para falso.

1) Os elementos são comparados usando a função de comparação binária comp fornecida.

2) O mesmo que (1), mas usa r1 como o primeiro range e r2 como o segundo range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, [ranges::end](<#/doc/ranges/end>)(r1) como last1, [ranges::begin](<#/doc/ranges/begin>)(r2) como first2, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

O comportamento é indefinido se o range de destino se sobrepõe a qualquer um dos ranges de entrada (os ranges de entrada podem se sobrepor entre si).

Esta função merge é _estável_, o que significa que para elementos equivalentes nos dois ranges originais, os elementos do primeiro range (preservando sua ordem original) precedem os elementos do segundo range (preservando sua ordem original).

As entidades tipo-função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidas como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
* Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
* Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parameters

- **first1, last1** — o primeiro range de entrada ordenado
- **first2, last2** — o segundo range de entrada ordenado
- **result** — o início do range de saída
- **comp** — comparação a ser aplicada aos elementos projetados
- **proj1** — projeção a ser aplicada aos elementos no primeiro range
- **proj2** — projeção a ser aplicada aos elementos no segundo range

### Return value

{last1, last2, result_last}, onde result_last é o fim do range construído.

### Complexity

No máximo N − 1 comparações e aplicações de cada projeção, onde N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1) + [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last12).

### Notes

Este algoritmo executa uma tarefa semelhante à que [ranges::set_union](<#/doc/algorithm/ranges/set_union>) faz. Ambos consomem dois ranges de entrada ordenados e produzem uma saída ordenada com elementos de ambas as entradas. A diferença entre esses dois algoritmos está no tratamento de valores de ambos os ranges de entrada que se comparam como equivalentes (veja as notas sobre [LessThanComparable](<#/doc/named_req/LessThanComparable>)). Se quaisquer valores equivalentes apareceram n vezes no primeiro range e m vezes no segundo, **ranges::merge** produziria todas as n + m ocorrências, enquanto [ranges::set_union](<#/doc/algorithm/ranges/set_union>) produziria apenas max(n, m) delas. Assim, **ranges::merge** produz exatamente N valores e [ranges::set_union](<#/doc/algorithm/ranges/set_union>) pode produzir menos.

### Possible implementation
```cpp
    struct merge_fn
    {
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::input_iterator I2, std::sentinel_for<I2> S2,
                 std::weakly_incrementable O, class Comp = ranges::less,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::mergeable<I1, I2, O, Comp, Proj1, Proj2>
        constexpr ranges::merge_result<I1, I2, O>
            operator()(I1 first1, S1 last1, I2 first2, S2 last2, O result, Comp comp = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            for (; !(first1 == last1 or first2 == last2); ++result)
            {
                if (std::invoke(comp, std::invoke(proj2, *first2), std::invoke(proj1, *first1)))
                    *result = *first2, ++first2;
                else
                    *result = *first1, ++first1;
            }
            auto ret1{ranges::copy(std::move(first1), std::move(last1), std::move(result))};
            auto ret2{ranges::copy(std::move(first2), std::move(last2), std::move(ret1.out))};
            return {std::move(ret1.in), std::move(ret2.in), std::move(ret2.out)};
        }
    
        template<ranges::input_range R1, ranges::input_range R2, std::weakly_incrementable O,
                 class Comp = ranges::less,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::mergeable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
                                O, Comp, Proj1, Proj2>
        constexpr ranges::merge_result<ranges::borrowed_iterator_t<R1>,
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
    
    inline constexpr merge_fn merge {};
```

---

### Example

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
        std::cout << "} +\n{ ";
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
        in2 = {3, 4, 5, 6, 7};
        out.resize(in1.size() + in2.size());
        const auto ret = std::ranges::merge(in1, in2, out.begin());
        print(in1, in2, out.begin(), ret.out);
    
        in1 = {1, 2, 3, 4, 5, 5, 5};
        in2 = {3, 4, 5, 6, 7};
        out.clear();
        out.reserve(in1.size() + in2.size());
        std::ranges::merge(in1, in2, std::back_inserter(out));
        print(in1, in2, out.cbegin(), out.cend());
    }
```

Saída:
```
    { 1 2 3 4 5 } +
    { 3 4 5 6 7 } =
    { 1 2 3 3 4 4 5 5 6 7 }
    
    { 1 2 3 4 5 5 5 } +
    { 3 4 5 6 7 } =
    { 1 2 3 3 4 4 5 5 5 5 6 7 }
```

### See also

[ ranges::inplace_merge](<#/doc/algorithm/ranges/inplace_merge>)(C++20) | mescla dois ranges ordenados no local
(objeto de função de algoritmo)
[ ranges::is_sorted](<#/doc/algorithm/ranges/is_sorted>)(C++20) | verifica se um range está ordenado em ordem crescente
(objeto de função de algoritmo)
[ ranges::set_union](<#/doc/algorithm/ranges/set_union>)(C++20) | calcula a união de dois conjuntos
(objeto de função de algoritmo)
[ ranges::sort](<#/doc/algorithm/ranges/sort>)(C++20) | ordena um range em ordem crescente
(objeto de função de algoritmo)
[ ranges::stable_sort](<#/doc/algorithm/ranges/stable_sort>)(C++20) | ordena um range de elementos preservando a ordem entre elementos iguais
(objeto de função de algoritmo)
[ merge](<#/doc/algorithm/merge>) | mescla dois ranges ordenados
(modelo de função)