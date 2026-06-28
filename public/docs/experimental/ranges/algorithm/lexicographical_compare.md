# std::experimental::ranges::lexicographical_compare

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
class Proj1 = ranges::identity, class Proj2 = ranges::identity,
class Comp = ranges::less<> >
requires IndirectStrictWeakOrder<Comp, projected<I1, Proj1>, projected<I2, Proj2>>
bool lexicographical_compare( I1 first1, S1 last1, I2 first2, S2 last2,
Comp comp = Comp{},
Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
template< InputRange R1, InputRange R2,
class Proj1 = ranges::identity, class Proj2 = ranges::identity,
class Comp = ranges::less<> >
requires IndirectStrictWeakOrder<Comp, projected<ranges::iterator_t<R1>, Proj1>,
projected<ranges::iterator_t<R2>, Proj2>>
bool lexicographical_compare( R1&& r1, R2&& r2, Comp comp = Comp{},
Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
```

1) Verifica se o primeiro range `[`first1`, `last1`)` é lexicograficamente _menor_ que o segundo range `[`first2`, `last2`)`. Os elementos são comparados usando a função de comparação binária `comp` fornecida, após serem projetados com `proj1` e `proj2` respectivamente.

2) O mesmo que (1), mas usa `r1` como o primeiro range de origem e `r2` como o segundo range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como `first1`, [ranges::end](<#/doc/ranges/end>)(r1) como `last1`, [ranges::begin](<#/doc/ranges/begin>)(r2) como `first2`, e [ranges::end](<#/doc/ranges/end>)(r2) como `last2`.

A comparação lexicográfica é uma operação com as seguintes propriedades:

*   Dois ranges são comparados elemento por elemento.
*   O primeiro elemento divergente define qual range é lexicograficamente _menor_ ou _maior_ que o outro.
*   Se um range é um prefixo de outro, o range mais curto é lexicograficamente _menor_ que o outro.
*   Se dois ranges têm elementos equivalentes e são do mesmo comprimento, então os ranges são lexicograficamente _iguais_.
*   Um range vazio é lexicograficamente _menor_ que qualquer range não vazio.
*   Dois ranges vazios são lexicograficamente _iguais_.

### Parâmetros

- **first1, last1** — o primeiro range de elementos a examinar
- **r1** — o primeiro range de elementos a examinar
- **first2, last2** — o segundo range de elementos a examinar
- **r2** — o segundo range de elementos a examinar
- **comp** — função de comparação a ser aplicada aos elementos projetados
- **proj1** — projeção a ser aplicada aos elementos no primeiro range
- **proj2** — projeção a ser aplicada aos elementos no segundo range

### Valor de retorno

`true` se o primeiro range for lexicograficamente _menor_ que o segundo.

### Complexidade

No máximo 2·min(N1, N2) aplicações da operação de comparação, onde N1 = `last1` - `first1` e N2 = `last2` - `first2`.

### Possível implementação
```cpp
    template<InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
             class Proj1 = ranges::identity, class Proj2 = ranges::identity,
             class Comp = ranges::less<>>
        requires IndirectStrictWeakOrder<Comp, projected<I1, Proj1>, projected<I2, Proj2>>
    bool lexicographical_compare(I1 first1, S1 last1, I2 first2, S2 last2,
                                 Comp comp = Comp{}, 
                                 Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{})
    {
        for (; (first1 != last1) && (first2 != last2); (void) ++first1, (void) ++first2)
        {
            if (ranges::invoke(comp, ranges::invoke(proj1, *first1),
                                     ranges::invoke(proj2, *first2)))
                return true;
            if (ranges::invoke(comp, ranges::invoke(proj2, *first2),
                                     ranges::invoke(proj1, *first1)))
                return false;
        }
        return (first1 == last1) && (first2 != last2);
    }
```

---

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Ver também

[ lexicographical_compare](<#/doc/algorithm/lexicographical_compare>) | retorna `true` se um range é lexicograficamente menor que outro
(modelo de função)
[ equal](<#/doc/experimental/ranges/algorithm/equal>) | determina se dois conjuntos de elementos são os mesmos
(modelo de função)