# guias de dedução para std::ranges::stride_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class R >
stride_view( R&&, ranges::range_difference_t<R> ) -> stride_view<views::all_t<R>>;
```

O [guia de dedução](<#/doc/language/ctad>) é fornecido para std::ranges::stride_view para permitir a dedução a partir de [`range`](<#/doc/ranges/range>) e número de elementos.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo