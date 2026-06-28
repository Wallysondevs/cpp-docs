# guias de dedução para std::ranges::chunk_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class R >
chunk_view( R&&, ranges::range_difference_t<R> ) -> chunk_view<views::all_t<R>>;
```

O [guia de dedução](<#/doc/language/ctad>) é fornecido para [`ranges::chunk_view`](<#/doc/ranges/chunk_view>) somente se V modelar o [`input_range`](<#/doc/ranges/input_range>). Este guia permite a dedução a partir de [`range`](<#/doc/ranges/range>) e o número de elementos.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo