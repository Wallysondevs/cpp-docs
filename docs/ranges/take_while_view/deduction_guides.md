# Guias de dedução para std::ranges::take_while_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class R, class Pred >
take_while_view( R&&, Pred ) -> take_while_view<views::all_t<R>, Pred>;
```

O [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::ranges::take_while_view](<#/doc/ranges/take_while_view>) para permitir a dedução a partir de um [`range`](<#/doc/ranges/range>) e um predicado.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo