# Guias de dedução para std::ranges::take_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class R >
take_view( R&&, ranges::range_difference_t<R> ) -> take_view<views::all_t<R>>;
```

O [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::ranges::take_view](<#/doc/ranges/take_view>) para permitir a dedução a partir de um [`range`](<#/doc/ranges/range>) e do número de elementos.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 3447](<https://cplusplus.github.io/LWG/issue3447>) | C++20 | o parâmetro de template `R` é restrito com [`range`](<#/doc/ranges/range>) | `R` não é restrito
(mas [`range_difference_t`](<#/doc/ranges/iterator_t>) requer [`range`](<#/doc/ranges/range>))