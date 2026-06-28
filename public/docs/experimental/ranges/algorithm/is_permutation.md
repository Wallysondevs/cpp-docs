# std::experimental::ranges::is_permutation

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< ForwardIterator I1, Sentinel<I1> S1, ForwardIterator I2, Sentinel<I2> S2, class Pred = ranges::equal_to<>, class Proj1 = ranges::identity, class Proj2 = ranges::identity > requires IndirectlyComparable<I1, I2, Pred, Proj1, Proj2> bool is_permutation( I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = Pred{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
template< ForwardRange R1, ForwardRange R2, class Pred = ranges::equal_to<>, class Proj1 = ranges::identity, class Proj2 = ranges::identity > requires IndirectlyComparable<ranges::iterator_t<R1>, ranges::iterator_t<R2>, Pred, Proj1, Proj2> bool is_permutation( R1&& r1, R2&& r2, Pred pred = Pred{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
template< ForwardIterator I1, Sentinel<I1> S1, class I2, class Pred = ranges::equal_to<>, class Proj1 = ranges::identity, class Proj2 = ranges::identity > requires ForwardIterator<std::decay_t<I2>> && !Range<I2> && IndirectlyComparable<I1, std::decay_t<I2>, Pred, Proj1, Proj2> bool is_permutation( I1 first1, S1 last1, I2&& first2_, Pred pred = Pred{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
template< ForwardRange R1, class I2, class Pred = ranges::equal_to<>, class Proj1 = ranges::identity, class Proj2 = ranges::identity > requires ForwardIterator<std::decay_t<I2>> && !Range<I2> && IndirectlyComparable<ranges::iterator_t<R1>, std::decay_t<I2>, Pred, Proj1, Proj2> bool is_permutation( R1&& r1, I2&& first2_, Pred pred = Pred{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
```

1) Retorna true se existe uma permutação dos elementos no range `[`first1`, `last1`)` que torna o range igual a `[`first2`, `last2`)`, e false caso contrário.

2) O mesmo que (1), mas usa r1 como o primeiro range de origem e r2 como o segundo range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, [ranges::end](<#/doc/ranges/end>)(r1) como last1, [ranges::begin](<#/doc/ranges/begin>)(r2) como first2, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

3) O mesmo que (1), exceto que first2 é definido como se por [std::decay_t](<#/doc/types/decay>)&lt;I2&gt; first2 = [std::forward](<#/doc/utility/forward>)&lt;I2&gt;(first2_); e last2 é first2 + (last1 - first1).

4) O mesmo que (3), mas usa r1 como o primeiro range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1 e [ranges::end](<#/doc/ranges/end>)(r1) como last1.

Dois ranges são considerados iguais se eles têm o mesmo número de elementos e, para cada iterator `i` no range `[`first1`, `last1`)`, [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(pred, [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(proj1, *i), [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(proj2, *(first2 + (i - first1)))) é true.

Não obstante as declarações representadas acima, o número e a ordem reais dos parâmetros de template para declarações de algoritmo são não especificados. Assim, se argumentos de template explícitos forem usados ao chamar um algoritmo, o programa é provavelmente não-portável.

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

true se o range `[`first1`, `last1`)` é uma permutação do range `[`first2`, `last2`)`.

### Complexidade

No máximo O(N2) aplicações do predicado e de cada projeção, ou exatamente N se as sequências já são iguais, onde N = last1 - first1.

No entanto, se SizedSentinel<S1, I1> && SizedSentinel<S2, I2> é satisfeito e last1 - first1 != last2 - first2, nenhuma aplicação do predicado e das projeções é feita.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ is_permutation](<#/doc/algorithm/is_permutation>)(C++11) | determina se uma sequência é uma permutação de outra sequência
(modelo de função)
[ next_permutation](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/next_permutation&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/next permutation \(page does not exist\)") | gera a próxima permutação lexicográfica maior de um range de elementos
(modelo de função)
[ prev_permutation](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/prev_permutation&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/prev permutation \(page does not exist\)") | gera a próxima permutação lexicográfica menor de um range de elementos
(modelo de função)