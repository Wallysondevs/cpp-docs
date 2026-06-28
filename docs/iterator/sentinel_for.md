# std::sentinel_for

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class S, class I >
concept sentinel_for =
std::semiregular<S> &&
std::input_or_output_iterator<I> &&
__WeaklyEqualityComparableWith<S, I>;
```

O concept `sentinel_for` especifica a relação entre um tipo [`input_or_output_iterator`](<#/doc/iterator/input_or_output_iterator>) e um tipo [`semiregular`](<#/doc/concepts/semiregular>) cujos valores denotam um range. O concept apenas para exposição `___WeaklyEqualityComparableWith_` é descrito em [`equality_comparable`](<#/doc/concepts/equality_comparable>).

### Requisitos semânticos

Sejam `s` e `i` valores dos tipos `S` e `I`, respectivamente, tal que `[`i`, `s`)` denota um [range](<#/doc/iterator>). `sentinel_for<S, I>` é modelado apenas se:

  * i == s é bem definido.
  * Se bool(i != s), então `i` é desreferenciável e `[`++i`, `s`)` denota um range.
  * [std::assignable_from](<#/doc/concepts/assignable_from>)<I&, S> é modelado ou não satisfeito.

O domínio de `==` pode mudar ao longo do tempo. Dado um iterator `i` e um sentinel `s` tal que `[`i`, `s`)` denota um range e i != s, `[`i`, `s`)` não é obrigado a continuar a denotar um range após incrementar qualquer iterator igual a `i` (e, portanto, i == s não é mais obrigado a ser bem definido após tal incremento).

### Notas

Um tipo sentinel e seu tipo iterator correspondente não são obrigados a modelar [`equality_comparable_with`](<#/doc/concepts/equality_comparable>), porque o tipo sentinel pode não ser comparável consigo mesmo, e eles não são obrigados a ter um tipo de referência comum.

É permitido usar um tipo sentinel diferente do tipo iterator no [loop `for` baseado em range](<#/doc/language/range-for>) desde C++17.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3453](<https://cplusplus.github.io/LWG/issue3453>) | C++20 | requisitos semânticos para `sentinel_for` eram muito frouxos para `ranges::advance` | reforçados