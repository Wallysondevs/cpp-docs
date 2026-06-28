# Guias de dedução para std::ranges::drop_while_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class R, class Pred >
drop_while_view( R&&, Pred ) -> drop_while_view<views::all_t<R>, Pred>;
```

O [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::ranges::drop_while_view](<#/doc/ranges/drop_while_view>) para permitir a dedução a partir de [`range`](<#/doc/ranges/range>) e predicate.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo