# guias de dedução para std::ranges::drop_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class R >
drop_view( R&&, ranges::range_difference_t<R> ) -> drop_view<views::all_t<R>>;
```

O [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::ranges::drop_view](<#/doc/ranges/drop_view>) para permitir a dedução a partir de um [`range`](<#/doc/ranges/range>) e um número de elementos.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo