# std::experimental::ranges::adjacent_find

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< ForwardIterator I, Sentinel<I> S, class Proj = ranges::identity,
IndirectRelation<projected<I, Proj>> Pred = ranges::equal_to<> >
I adjacent_find( I first, S last, Pred pred = Pred{}, Proj proj = Proj{} );
template< ForwardRange R, class Proj = ranges::identity,
IndirectRelation<projected<ranges::iterator_t<R>, Proj>> Pred = ranges::equal_to<> >
ranges::safe_iterator_t<R> adjacent_find( R&& r, Pred pred = Pred{}, Proj proj = Proj{} );
```

1) Procura no range `[`first`, `last`)` por dois elementos idênticos consecutivos. Os elementos são comparados usando pred após serem projetados com proj.

2) O mesmo que (1), mas usa r como o range de origem, como se estivesse usando `[`ranges::begin`](<#/doc/ranges/begin>)`(r) como first e `[`ranges::end`](<#/doc/ranges/end>)`(r) como last.

Não obstante as declarações descritas acima, o número real e a ordem dos parâmetros de template para declarações de algoritmo não são especificados. Assim, se argumentos de template explícitos forem usados ao chamar um algoritmo, o programa é provavelmente não-portável.

### Parâmetros

- **first, last** — o range de elementos a examinar
- **r** — o range de elementos a examinar
- **pred** — predicado a ser usado para comparar os elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

Um iterator para o primeiro do primeiro par de elementos idênticos, ou seja, o primeiro iterator `i` tal que tanto `i` quanto `i + 1` estão no range `[`first`, `last`)` e `[`ranges::invoke`](<#/doc/experimental/ranges/functional/invoke>)`(pred, `[`ranges::invoke`](<#/doc/experimental/ranges/functional/invoke>)`(proj, *i), `[`ranges::invoke`](<#/doc/experimental/ranges/functional/invoke>)`(proj, *(i + 1))) != false.`

Se nenhum elemento for encontrado, um iterator que se compara como igual a last é retornado.

### Complexidade

Se o range não estiver vazio, exatamente `min((result - first) + 1, (last - first) - 1)` aplicações do predicado onde `result` é o valor de retorno, e no máximo o dobro de aplicações da projeção.

### Possível implementação
```cpp
    template<ForwardIterator I, Sentinel<I> S, class Proj = ranges::identity,
             IndirectRelation<projected<I, Proj>> Pred = ranges::equal_to<>>
    I adjacent_find(I first, S last, Pred pred = Pred{}, Proj proj = Proj{})
    {
        if (first == last)
            return first;
        I next = first;
        ++next;
        while (next != last)
        {
            if (ranges::invoke(pred, ranges::invoke(proj, *first),
                                     ranges::invoke(proj, *next)))
                return first;
            ++next;
            ++first;
        }
        return next;
    }
```

---

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[`adjacent_find`](<#/doc/algorithm/adjacent_find>) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(modelo de função)
[`unique`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/unique&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/unique \(page does not exist\)") | remove elementos duplicados consecutivos em um range
(modelo de função)