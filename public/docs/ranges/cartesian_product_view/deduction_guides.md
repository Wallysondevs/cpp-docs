# guias de dedução para std::ranges::cartesian_product_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class... Rs >
cartesian_product_view( Rs&&... ) ->
cartesian_product_view<views::all_t<Rs>...>;
```

O [guia de dedução](<#/doc/language/ctad>) é fornecido para `std::ranges::cartesian_product_view` para permitir a dedução a partir de [`range`s](<#/doc/ranges/range>).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo