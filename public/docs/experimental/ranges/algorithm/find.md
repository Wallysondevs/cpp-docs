# std::experimental::ranges::find, std::experimental::ranges::find_if, std::experimental::ranges::find_if_not

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< InputIterator I, Sentinel<I> S, class T, class Proj = ranges::identity >
requires IndirectRelation<ranges::equal_to<>, projected<I, Proj>, const T*>
I find( I first, S last, const T& value, Proj proj = Proj{} );
template< InputRange R, class T, class Proj = ranges::identity >
requires IndirectRelation<ranges::equal_to<>,
projected<ranges::iterator_t<R>, Proj>, const T*>
ranges::safe_iterator_t<R> find( R&& r, const T& value, Proj proj = Proj{} );
template< InputIterator I, Sentinel<I> S, class Proj = ranges::identity,
IndirectUnaryPredicate<projected<I, Proj>> Pred >
I find_if( I first, S last, Pred pred, Proj proj = Proj{} );
template< InputRange R, class Proj = ranges::identity,
IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred >
ranges::safe_iterator_t<R> find_if( R&& r, Pred pred, Proj proj = Proj{} );
template< InputIterator I, Sentinel<I> S, class Proj = ranges::identity,
IndirectUnaryPredicate<projected<I, Proj>> Pred >
I find_if_not( I first, S last, Pred pred, Proj proj = Proj{} );
template< InputRange R, class Proj = ranges::identity,
IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred >
ranges::safe_iterator_t<R> find_if_not( R&& r, Pred pred, Proj proj = Proj{} );
```

Retorna o primeiro elemento no range `[`first`, `last`)` que satisfaz critérios específicos:

1) `find` busca por um elemento cujo valor projetado é igual a value (isto é, value == [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(proj, *i)).

3) `find_if` busca por um elemento para o qual o predicado p do valor projetado retorna true (isto é, [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(pred, [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(proj, *i))) é true).

5) `find_if_not` busca por um elemento para o qual o predicado q do valor projetado retorna false (isto é, [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(pred, [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(proj, *i))) é false).

2,4,6) O mesmo que (1,3,5), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

Não obstante as declarações descritas acima, o número e a ordem reais dos parâmetros de template para declarações de algoritmo são não especificados. Assim, se argumentos de template explícitos forem usados ao chamar um algoritmo, o programa é provavelmente não-portável.

### Parâmetros

- **first, last** — o range de elementos a examinar
- **r** — o range de elementos a examinar
- **value** — valor para comparar com os elementos projetados
- **pred** — predicado a aplicar aos elementos projetados
- **proj** — projeção a aplicar aos elementos

### Valor de retorno

Iterator para o primeiro elemento que satisfaz a condição. Se nenhum elemento for encontrado, retorna um iterator que se compara como igual a last.

### Complexidade

No máximo last - first aplicações do predicado e da projeção.

### Implementação possível

Primeira versão
---
```cpp
    template<InputIterator I, Sentinel<I> S, class T, class Proj = ranges::identity>
        requires IndirectRelation<ranges::equal_to<>, projected<I, Proj>, const T*>
    I find(I first, S last, const T& value, Proj proj = Proj{})
    {
        for (; first != last; ++first)
            if (ranges::invoke(proj, *first) == value)
                break;
        return first;
    }
```

Segunda versão
```cpp
    template<InputIterator I, Sentinel<I> S, class Proj = ranges::identity,
             IndirectUnaryPredicate<projected<I, Proj>> Pred>
    I find_if(I first, S last, Pred pred, Proj proj = Proj{})
    {
        for (; first != last; ++first)
            if (ranges::invoke(pred, ranges::invoke(proj, *first)))
                break;
        return first;
    }
```

Terceira versão
```cpp
    template<InputIterator I, Sentinel<I> S, class Proj = ranges::identity,
             IndirectUnaryPredicate<projected<I, Proj>> Pred>
    I find_if_not(I first, S last, Pred pred, Proj proj = Proj{})
    {
        for (; first != last; ++first)
            if (!ranges::invoke(pred, ranges::invoke(proj, *first)))
                break;
        return first;
    }
```

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ findfind_iffind_if_not](<#/doc/algorithm/find>)(C++11) | encontra o primeiro elemento que satisfaz critérios específicos
(modelo de função)
[ adjacent_find](<#/doc/experimental/ranges/algorithm/adjacent_find>) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(modelo de função)
[ find_end](<#/doc/experimental/ranges/algorithm/find_end>) | encontra a última sequência de elementos em um determinado range
(modelo de função)
[ find_first_of](<#/doc/experimental/ranges/algorithm/find_first_of>) | busca por qualquer um de um conjunto de elementos
(modelo de função)
[ mismatch](<#/doc/experimental/ranges/algorithm/mismatch>) | encontra a primeira posição onde dois ranges diferem
(modelo de função)
[ search](<#/doc/experimental/ranges/algorithm/search>) | busca por um range de elementos
(modelo de função)