# std::unstoppable_token

Definido no cabeçalho `[<stop_token>](<#/doc/header/stop_token>)`

```c
template< class Token >
concept unstoppable_token =
std::stoppable_token<Token> &&
requires (const Token tok) {
requires std::bool_constant<(!tok.stop_possible())>::value;
};
```

O concept `unstoppable_token<Token>` especifica um requisito adicional para um [`stoppable_token`](<#/doc/thread/stoppable_token>) onde o tipo não permite a interrupção. Ou seja, a expressão tok.stop_possible() deve ser utilizável em uma expressão constante e retornar false.