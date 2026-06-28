# std::experimental::ranges::count, std::experimental::ranges::count_if

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< InputIterator I, Sentinel<I> S, class T, class Proj = ranges::identity >
requires IndirectRelation<ranges::equal_to<>, projected<I, Proj>, const T*>
ranges::difference_type_t<I> count( I first, S last, const T& value, Proj proj = Proj{} );
template< InputRange R, class T, class Proj = ranges::identity >
requires IndirectRelation<ranges::equal_to<>,
projected<ranges::iterator_t<R>, Proj>, const T*>
ranges::difference_type_t<ranges::iterator_t<R>>
count( R&& r, const T& value, Proj proj = Proj{} );
template< InputIterator I, Sentinel<I> S, class Proj = ranges::identity,
IndirectUnaryPredicate<projected<I, Proj>> Pred >
ranges::difference_type_t<I> count_if( I first, S last, Pred pred, Proj proj = Proj{} );
template< InputRange R, class Proj = ranges::identity,
IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred >
ranges::difference_type_t<ranges::iterator_t<R>>
count_if( R&& r, Pred pred, Proj proj = Proj{} );
```

Retorna o número de elementos no range `[`first`, `last`)` que satisfazem critérios específicos.

1) Conta os elementos cujos valores projetados são iguais a value (ou seja, [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(proj, *i) == value).

3) Conta os elementos cujos valores projetados satisfazem o predicado pred (ou seja, [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(pred, [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(proj, *i)) != false).

2,4) O mesmo que (1,3), mas usa r como o range de origem, como se estivesse usando [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

Apesar das declarações apresentadas acima, o número real e a ordem dos parâmetros de template para as declarações de algoritmo não são especificados. Assim, se argumentos de template explícitos forem usados ao chamar um algoritmo, o programa é provavelmente não-portável.

### Parâmetros

- **first, last** — o range de elementos a examinar
- **r** — o range de elementos a examinar
- **value** — o valor a procurar
- **pred** — predicado a aplicar aos elementos projetados
- **proj** — projeção a aplicar aos elementos

### Valor de retorno

Número de elementos que satisfazem a condição.

### Complexidade

Exatamente last - first comparações / aplicações do predicado, e o mesmo número de aplicações da projeção.

### Observações

Para o número de elementos no range `[`first`, `last`)` sem quaisquer critérios adicionais, veja [ranges::distance](<#/doc/iterator/ranges/distance>).

### Implementação possível

Primeira versão
---
```cpp
    template<InputIterator I, Sentinel<I> S, class T, class Proj = ranges::identity>
        requires IndirectRelation<ranges::equal_to<>, projected<I, Proj>, const T*>
    ranges::difference_type_t<I> count(I first, S last, const T& value, Proj proj = Proj{})
    {
        ranges::difference_type_t<I> ret = 0;
        for (; first != last; ++first)
            if (ranges::invoke(proj, *first) == value)
                ++ret;
        return ret;
    }
```

Segunda versão
```cpp
    template<InputIterator I, Sentinel<I> S, class Proj = ranges::identity,
             IndirectUnaryPredicate<projected<I, Proj>> Pred>
    ranges::difference_type_t<I> count_if(I first, S last, Pred pred, Proj proj = Proj{})
    {
        ranges::difference_type_t<I> ret = 0;
        for (; first != last; ++first)
            if (ranges::invoke(pred, ranges::invoke(proj, *i)))
                ++ret;
        return ret;
    }
```

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ countcount_if](<#/doc/algorithm/count>) | retorna o número de elementos que satisfazem critérios específicos
(modelo de função)
[ distance](<#/doc/experimental/ranges/iterator/distance>) | retorna a distância entre um iterator e um sentinel, ou entre o início e o fim de um range
(modelo de função)