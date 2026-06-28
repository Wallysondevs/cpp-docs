# std::stoppable_token

Definido no header `[<stop_token>](<#/doc/header/stop_token>)`

```cpp
template< class Token >
concept stoppable_token =
requires (const Token tok) {
typename /*check-type-alias-exists*/<Token::template callback_type>;
{ tok.stop_requested() } noexcept -> std::same_as<bool>;
{ tok.stop_possible() } noexcept -> std::same_as<bool>;
{ Token(tok) } noexcept; // veja variações de expressão implícita
} &&
std::copyable<Token> &&
std::equality_comparable<Token>;  // (desde C++26)
Templates auxiliares
template< template<class> class >
struct /*check-type-alias-exists*/; // não definido
```

O concept `stoppable_token<Token>` especifica a interface básica de um stop token que é [`copyable`](<#/doc/concepts/copyable>) e [`equality_comparable`](<#/doc/concepts/equality_comparable>) e permite consultar para verificar se a solicitação de parada é possível e se a solicitação foi feita.

### Requisitos semânticos

| Esta seção está incompleta

### Veja também

[ unstoppable_token](<#/doc/thread/unstoppable_token>)(C++26) | especifica um stop token que não permite parar
(concept)