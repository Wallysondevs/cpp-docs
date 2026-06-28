# std::weakly_incrementable

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I >
concept weakly_incrementable =
std::movable<I> &&
requires(I i) {
typename std::iter_difference_t<I>;
requires /*is-signed-integer-like*/<std::iter_difference_t<I>>;
{ ++i } -> std::same_as<I&>; // not required to be equality-preserving
i++; // not required to be equality-preserving
};
```

Para a definição de /*is-signed-integer-like*/, veja [`_is-integer-like_`](<#/doc/iterator/is-integer-like>) ﻿.

Este concept especifica requisitos para tipos que podem ser incrementados com os operadores de pré e pós-incremento, mas essas operações de incremento não são necessariamente [equality-preserving](<#/doc/concepts>), e o próprio tipo não é exigido ser [std::equality_comparable](<#/doc/concepts/equality_comparable>).

Para tipos `std::weakly_incrementable`, a == b não implica que ++a == ++b. Algoritmos em tipos weakly incrementable devem ser algoritmos de passagem única. Esses algoritmos podem ser usados com istreams como a fonte dos dados de entrada através de [std::istream_iterator](<#/doc/iterator/istream_iterator>).

### Requisitos semânticos

Para um objeto i do tipo `I`, `I` modela `std::weakly_incrementable` somente se todas as seguintes condições forem satisfeitas:

*   As expressões ++i e i++ têm o mesmo domínio.
*   Se i é incrementável, então tanto ++i quanto i++ avançam i.
*   Se i é incrementável, então [std::addressof](<#/doc/memory/addressof>)(++i) == [std::addressof](<#/doc/memory/addressof>)(i).

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P2325R3](<https://wg21.link/P2325R3>) | C++20 | [`default_initializable`](<#/doc/concepts/default_initializable>) era exigido | não exigido

### Veja também

[ incrementable](<#/doc/iterator/incrementable>)(C++20) | especifica que a operação de incremento em um tipo `weakly_incrementable` é [equality-preserving](<#/doc/concepts>) e que o tipo é [`equality_comparable`](<#/doc/concepts/equality_comparable>)
(concept)