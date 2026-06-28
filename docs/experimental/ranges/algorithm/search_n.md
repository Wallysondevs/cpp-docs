# std::experimental::ranges::search_n

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< ForwardIterator I, Sentinel<I> S, class T,
class Pred = ranges::equal_to<>, class Proj = ranges::identity >
requires IndirectlyComparable<I, const T*, Pred, Proj>
I search_n( I first, S last, ranges::difference_type_t<I> count,
const T& value, Pred pred = Pred{}, Proj proj = Proj{} );
template< ForwardRange R, class T, class Pred = ranges::equal_to<>,
class Proj = ranges::identity >
requires IndirectlyComparable<ranges::iterator_t<R>, const T*, Pred, Proj>
ranges::safe_iterator_t<R> search_n( R&& r,
ranges::difference_type_t<ranges::iterator_t<R>> count,
const T& value, Pred pred = Pred{}, Proj proj = Proj{} );
```

1) Procura no range `[`first`, `last`)` a primeira sequência de `count` elementos cujos valores projetados são cada um igual ao `value` fornecido de acordo com o predicado `pred`.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/>)(r) como `last`.

### Parâmetros

first, last | \- | o range de elementos a examinar
---|---|---
r | \- | o range de elementos a examinar
count | \- | o comprimento da sequência a ser procurada
value | \- | o valor a ser procurado
pred | \- | o predicado que compara os elementos projetados com `value`
proj | \- | a projeção a ser aplicada aos elementos

### Valor de retorno

Um iterator para o início da sequência encontrada no range `[`first`, `last`)`. Se nenhuma sequência for encontrada, um iterator que se compara como igual a `last` é retornado.

### Complexidade

No máximo `last - first` aplicações do predicado e da projeção.

### Possível implementação
```cpp
    template<ForwardIterator I, Sentinel<I> S, class T,
             class Pred = ranges::equal_to<>, class Proj = ranges::identity>
        requires IndirectlyComparable<I, const T*, Pred, Proj>
    I search_n(I first, S last, ranges::difference_type_t<I> count,
               const T& value, Pred pred = Pred{}, Proj proj = Proj{})
    {
        for (; first != last; ++first)
        {
            if (!ranges::invoke(pred, ranges::invoke(proj, *first), value))
                continue;
    
            I candidate = first;
            ranges::difference_type_t<I> cur_count = 0;
    
            while (true)
            {
                ++cur_count;
                if (cur_count == count)
                    // success
                    return candidate;
    
                ++first;
                if (first == last)
                    // exhausted the list
                    return first;
    
                if (!ranges::invoke(pred, ranges::invoke(proj, *first), value))
                    // too few in a row
                    break;
            }
        }
        return first;
    }
```

---

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ search_n](<#/doc/algorithm/search_n>) | procura pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(function template)
[ find_end](<#/doc/experimental/ranges/algorithm/find_end>) | encontra a última sequência de elementos em um determinado range
(function template)
[ findfind_iffind_if_not](<#/doc/experimental/ranges/algorithm/find>) | encontra o primeiro elemento que satisfaz critérios específicos
(function template)
[ search](<#/doc/experimental/ranges/algorithm/search>) | procura por um range de elementos
(function template)