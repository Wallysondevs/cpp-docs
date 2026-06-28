# std::experimental::ranges::mismatch

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
class Proj1 = ranges::identity, class Proj2 = ranges::identity,
class Pred = ranges::equal_to<> >
requires IndirectRelation<Pred, projected<I1, Proj1>, projected<I2, Proj2>>
auto mismatch( I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = Pred{},
Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} )
-> ranges::tagged_pair<tag::in1(I1), tag::in2(I2)>;
template< InputRange R1, InputRange R2,
class Proj1 = ranges::identity, class Proj2 = ranges::identity,
class Pred = ranges::equal_to<> >
requires IndirectRelation<Pred, projected<ranges::iterator_t<R1>, Proj1>,
projected<ranges::iterator_t<R2>, Proj2>>
auto mismatch( R1&& r1, R2&& r2, Pred pred = Pred{},
Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} )
-> ranges::tagged_pair<tag::in1(ranges::safe_iterator_t<R1>),
tag::in2(ranges::safe_iterator_t<R2>)>;
template< InputIterator I1, Sentinel<I1> S1, class I2,
class Pred = ranges::equal_to<>,
class Proj1 = ranges::identity, class Proj2 = ranges::identity >
requires InputIterator<std::decay_t<I2>> && !Range<I2> &&
IndirectRelation<Pred, projected<I1, Proj1>,
projected<std::decay_t<I2>, Proj2>>
auto mismatch( I1 first1, S1 last1, I2&& first2_, Pred pred = Pred{},
Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} )
-> ranges::tagged_pair<tag::in1(I1), tag::in2(std::decay_t<I2>)>;
(deprecated)
template< InputRange R1, class I2, class Pred = ranges::equal_to<>,
class Proj1 = ranges::identity, class Proj2 = ranges::identity >
requires InputIterator<std::decay_t<I2>> && !Range<I2> &&
IndirectRelation<Pred, projected<ranges::iterator_t<R1>, Proj1>,
projected<std::decay_t<I2>, Proj2>>
auto mismatch( R1&& r1, I2&& first2_, Pred pred = Pred{},
Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} )
-> ranges::tagged_pair<tag::in1(ranges::safe_iterator_t<Rng1>),
tag::in2(std::decay_t<I2>)>;
(deprecated)
```

1) Retorna o primeiro par de elementos não correspondentes de dois ranges: um definido por `[`first1`, `last1`)` e outro definido por `[`first2`, `last2`)`.

2) O mesmo que (1), mas usa r1 como o primeiro range de origem e r2 como o segundo range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, [ranges::end](<#/doc/ranges/end>)(r1) como last1, [ranges::begin](<#/doc/ranges/begin>)(r2) como first2, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

3) O mesmo que (1), mas se comporta como se first2 fosse [std::decay_t](<#/doc/types/decay>)&lt;I2&gt; first2 = [std::forward](<#/doc/utility/forward>)&lt;I2&gt;(first2_); e last2 fosse ranges::unreachable{}. O algoritmo subjacente nunca incrementa first2 mais do que last1 - first1 vezes.

4) O mesmo que (3), mas usa r1 como o primeiro range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1 e [ranges::end](<#/doc/ranges/end>)(r1) como last1.

Os elementos são comparados usando pred com os elementos projetados dos dois ranges, como se por [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(pred, [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(proj1, *i), [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(proj2, *j)).

Não obstante as declarações acima, o número real e a ordem dos parâmetros de template para as declarações de algoritmo não são especificados. Assim, se argumentos de template explícitos forem usados ao chamar um algoritmo, o programa é provavelmente não-portável.

### Parâmetros

- **first1, last1** — o primeiro range dos elementos
- **r1** — o primeiro range dos elementos
- **first2, last2** — o segundo range dos elementos
- **r2** — o segundo range dos elementos
- **first2_** — o início do segundo range dos elementos
- **pred** — predicado a ser aplicado aos elementos projetados
- **proj1** — projeção a ser aplicada aos elementos no primeiro range
- **proj2** — projeção a ser aplicada aos elementos no segundo range

### Valor de retorno

Um objeto `tagged_pair` com iteradores para os dois primeiros elementos não-iguais (o iterador do primeiro range tem a tag in1 e o iterador do segundo range tem a tag in2).

Se nenhuma diferença for encontrada quando a comparação atingir last1 ou last2, o que ocorrer primeiro, o par contém o iterador final e o iterador correspondente do outro range.

### Complexidade

No máximo last1 - first1 aplicações do predicado e de cada projeção.

### Possível implementação
```cpp
    template<InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
             class Proj1 = ranges::identity, class Proj2 = ranges::identity,
             class Pred = ranges::equal_to<>>
        requires IndirectRelation<Pred, projected<I1, Proj1>, projected<I2, Proj2>>
    auto mismatch(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = Pred{},
                  Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{})
        -> ranges::tagged_pair<tag::in1(I1), tag::in2(I2)>
    {
        while (first1 != last1 && first2 != last2 &&
               ranges::invoke(pred, ranges::invoke(proj1, *first1),
                                    ranges::invoke(proj2, *first2)))
        {
            ++first1;
            ++first2;
        }
        return {first1, first2};
    }
```

---

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ mismatch](<#/doc/algorithm/mismatch>) | encontra a primeira posição onde dois ranges diferem
(function template)
[ equal](<#/doc/experimental/ranges/algorithm/equal>) | determina se dois conjuntos de elementos são os mesmos
(function template)
[ findfind_iffind_if_not](<#/doc/experimental/ranges/algorithm/find>) | encontra o primeiro elemento que satisfaz critérios específicos
(function template)
[ lexicographical_compare](<#/doc/experimental/ranges/algorithm/lexicographical_compare>) | retorna true se um range é lexicograficamente menor que outro
(function template)
[ search](<#/doc/experimental/ranges/algorithm/search>) | procura por um range de elementos
(function template)