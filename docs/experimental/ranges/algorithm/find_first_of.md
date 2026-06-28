# std::experimental::ranges::find_first_of

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< InputIterator I1, Sentinel<I1> S1, ForwardIterator I2, Sentinel<I2> S2,
class Proj1 = ranges::identity, class Proj2 = ranges::identity,
IndirectRelation<projected<I1, Proj1>,
projected<I2, Proj2>> Pred = ranges::equal_to<> >
I1 find_first_of( I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = Pred{},
Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
template< InputRange R1, ForwardRange R2,
class Proj1 = ranges::identity, class Proj2 = ranges::identity,
IndirectRelation<projected<ranges::iterator_t<R1>, Proj1>,
projected<ranges::iterator_t<R2>, Proj2>> Pred = ranges::equal_to<> >
ranges::safe_iterator_t<R1> find_first_of( R1&& r1, R2&& r2, Pred pred = Pred{},
Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
```

1) Procura no range `[`first1`, `last1`)` por qualquer um dos elementos no range `[`first2`, `last2`)`, após projetar os ranges com proj1 e proj2 respectivamente. Os elementos projetados são comparados usando pred.

2) O mesmo que (1), mas usa r1 como o primeiro range de origem e r2 como o segundo range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, [ranges::end](<#/doc/ranges/end>)(r1) como last1, [ranges::begin](<#/doc/ranges/begin>)(r2) como first2, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

### Parâmetros

- **first1, last1** — o range de elementos a examinar
- **r1** — o range de elementos a examinar
- **first2, last2** — o range de elementos a procurar
- **r2** — o range de elementos a procurar
- **pred** — predicado a ser usado para comparar os elementos projetados
- **proj1** — projeção a ser aplicada aos elementos no primeiro range
- **proj2** — projeção a ser aplicada aos elementos no segundo range

### Valor de retorno

Um iterator para o primeiro elemento no range `[`first1`, `last1`)` que é igual a um elemento do range `[`first2`, `last2`)` após a projeção. Se nenhum elemento for encontrado, um iterator que se compara como igual a last1 é retornado.

### Complexidade

No máximo `(S * N)` aplicações do predicado e de cada projeção, onde S = distance(last2 - first2) e N = last1 - first1.

### Possível implementação
```cpp
    template<InputIterator I1, Sentinel<I1> S1, ForwardIterator I2, Sentinel<I2> S2,
             class Proj1 = ranges::identity, class Proj2 = ranges::identity,
             IndirectRelation<projected<I1, Proj1>, 
                              projected<I2, Proj2>> Pred = ranges::equal_to<>>
    I1 find_first_of(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = Pred{},
                     Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{})
    {
        for (; first1 != last1; ++first1)
            for (ForwardIt it = first2; it != last2; ++it)
                if (ranges::invoke(pred, ranges::invoke(proj1, *first1),
                                         ranges::invoke(proj2, *it)))
                    return first1;
        return first1;
    }
```

---

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ find_first_of](<#/doc/algorithm/find_first_of>) | procura por qualquer um de um conjunto de elementos
(modelo de função)
[ findfind_iffind_if_not](<#/doc/experimental/ranges/algorithm/find>) | encontra o primeiro elemento que satisfaz critérios específicos
(modelo de função)