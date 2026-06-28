# Guias de dedução para std::ranges::concat_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class... Rs >
concat_view( Rs&&... ) -> concat_view<views::all_t<Rs>...>;
```

O [guia de dedução](<#/doc/language/ctad>) é fornecido para [`concat_view`](<#/doc/ranges/concat_view>) para permitir a dedução a partir de [`range`s](<#/doc/ranges/range>).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo