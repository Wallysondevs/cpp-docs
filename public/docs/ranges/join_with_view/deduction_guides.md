# Guias de dedução para std::ranges::join_with_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class R, class P >
join_with_view( R&&, P&& ) -> join_with_view<views::all_t<R>, views::all_t<P>>;
template< class R >
join_with_view( R&&, ranges::range_value_t<ranges::range_reference_t<R>> )
-> join_with_view<views::all_t<R>,
ranges::single_view<
ranges::range_value_t<ranges::range_reference_t<R>>>;
```

Estes [guias de dedução](<#/doc/language/ctad>) são fornecidos para [`join_with_view`](<#/doc/ranges/join_with_view>) para permitir a dedução a partir de um range e um delimitador.

1) O delimitador é um range de elementos.

2) O delimitador é um único elemento.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo