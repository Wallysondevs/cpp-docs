# std::experimental::ranges::equal

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
class Pred = ranges::equal_to<>,
class Proj1 = ranges::identity, class Proj2 = ranges::identity >
requires IndirectlyComparable<I1, I2, Pred, Proj1, Proj2>
bool equal( I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = Pred{},
Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
template< InputRange R1, InputRange R2, class Pred = ranges::equal_to<>,
class Proj1 = ranges::identity, class Proj2 = ranges::identity >
requires IndirectlyComparable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
Pred, Proj1, Proj2>
bool equal( R1&& r1, R2&& r2, Pred pred = Pred{},
Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
template< InputIterator I1, Sentinel<I1> S1, class I2,
class Pred = ranges::equal_to<>,
class Proj1 = ranges::identity, class Proj2 = ranges::identity >
requires InputIterator<std::decay_t<I2>> && !Range<I2> &&
IndirectlyComparable<I1, std::decay_t<I2>, Pred, Proj1, Proj2>
bool equal( I1 first1, S1 last1, I2&& first2_, Pred pred = Pred{},
Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
(deprecated)
template< InputRange R1, class I2, class Pred = ranges::equal_to<>,
class Proj1 = ranges::identity, class Proj2 = ranges::identity >
requires InputIterator<std::decay_t<I2>> && !Range<I2> &&
IndirectlyComparable<ranges::iterator_t<R1>, std::decay_t<I2>, Pred, Proj1, Proj2>
bool equal( R1&& r1, I2&& first2_, Pred pred = Pred{},
Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
(deprecated)
```

1) Retorna true se o range `[`first1`, `last1`)` for igual ao range `[`first2`, `last2`)`, e false caso contrário.

2) O mesmo que (1), mas usa r1 como o primeiro range de origem e r2 como o segundo range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, [ranges::end](<#/doc/ranges/end>)(r1) como last1, [ranges::begin](<#/doc/ranges/begin>)(r2) como first2, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

3) O mesmo que (1), exceto que o segundo range é considerado encerrado quando o primeiro range é exaurido ou o primeiro desencontro é detectado. Equivalente a return last1 == [ranges::mismatch](<#/doc/algorithm/ranges/mismatch>)(first1, last1, [std::forward](<#/doc/utility/forward>)&lt;I2&gt;(first2_), comp, proj1, proj2).in1();

4) O mesmo que (3), mas usa r1 como o primeiro range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1 e [ranges::end](<#/doc/ranges/end>)(r1) como last1.

Dois ranges são considerados iguais se tiverem o mesmo número de elementos e, para cada iterator `i` no range `[`first1`, `last1`)`, [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(pred, [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(proj1, *i), [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(proj2, *(first2 + (i - first1)))) for true.

Não obstante as declarações acima, o número real e a ordem dos parâmetros de template para declarações de algoritmo são não especificados. Assim, se argumentos de template explícitos forem usados ao chamar um algoritmo, o programa é provavelmente não-portável.

### Parameters

- **first1, last1** — o primeiro range dos elementos
- **r1** — o primeiro range dos elementos
- **first2, last2** — o segundo range dos elementos
- **r2** — o segundo range dos elementos
- **first2_** — o início do segundo range dos elementos
- **pred** — predicado a ser aplicado aos elementos projetados
- **proj1** — projeção a ser aplicada aos elementos no primeiro range
- **proj2** — projeção a ser aplicada aos elementos no segundo range

### Return value

true se os dois ranges forem iguais, caso contrário retorna false.

### Notes

`ranges::equal` não deve ser usado para comparar os ranges formados pelos iterators de [std::unordered_set](<#/doc/container/unordered_set>), [std::unordered_multiset](<#/doc/container/unordered_multiset>), [std::unordered_map](<#/doc/container/unordered_map>), ou [std::unordered_multimap](<#/doc/container/unordered_multimap>) porque a ordem em que os elementos são armazenados nesses containers pode ser diferente mesmo que os dois containers armazenem os mesmos elementos.

Ao comparar containers inteiros por igualdade, `operator==` para o container correspondente é geralmente preferido.

### Complexity

1,2) Se SizedSentinel<S1, I1> && SizedSentinel<S2, I2> for satisfeito e last1 - first1 != last2 - first2, nenhuma aplicação do predicado e das projeções. Caso contrário, no máximo min(last1 \- first1, last2 \- first2) aplicações do predicado e de cada projeção.

3,4) No máximo last1 \- first1 aplicações do predicado e de cada projeção.

### Possible implementation
```cpp
    namespace detail
    {
        template<InputIterator I1, SizedSentinel<I1> S1,
                 InputIterator I2, SizedSentinel<I1> S2>
        bool check_size(I1& first1, S1& last1, I2& first2, S2& last2)
        {
            return last1 - first1 != last2 - first2;
        }
    
        template<InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I1> S2>
        bool check_size(I1& first1, S1& last1, I2& first2, S2& last2)
        {
            return false;
        }
    }
    
    template<InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
             class Pred = ranges::equal_to<>,
             class Proj1 = ranges::identity, class Proj2 = ranges::identity>
        requires IndirectlyComparable<I1, I2, Pred, Proj1, Proj2>
    bool equal(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = Pred{},
               Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{})
    {
        if (detail::check_size(first1, last1, first2, last2))
            return false;
        for (; first1 != last1 && first2 != last2; (void) ++first1, (void)++first2)
            if (!ranges::invoke(pred, ranges::invoke(proj1, *first1),
                                      ranges::invoke(proj2, *first2)))
                return false;
        return first1 == last1 && first2 == last2;
    }
```

---

### Example

| Esta seção está incompleta
Razão: sem exemplo

### See also

[ equal](<#/doc/algorithm/equal>) | determina se dois conjuntos de elementos são os mesmos
(function template)
[ findfind_iffind_if_not](<#/doc/experimental/ranges/algorithm/find>) | encontra o primeiro elemento que satisfaz critérios específicos
(function template)
[ lexicographical_compare](<#/doc/experimental/ranges/algorithm/lexicographical_compare>) | retorna true se um range for lexicograficamente menor que outro
(function template)
[ mismatch](<#/doc/experimental/ranges/algorithm/mismatch>) | encontra a primeira posição onde dois ranges diferem
(function template)
[ search](<#/doc/experimental/ranges/algorithm/search>) | procura por um range de elementos
(function template)