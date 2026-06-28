# Guias de dedução para std::ranges::slide_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class R >
slide_view( R&&, ranges::range_difference_t<R> ) -> slide_view<views::all_t<R>>;
```

O [guia de dedução](<#/doc/language/ctad>) é fornecido para std::ranges::slide_view para permitir a dedução a partir de um [`range`](<#/doc/ranges/range>) e do número de elementos.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo