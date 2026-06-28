# Guias de dedução para std::ranges::subrange

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< std::input_or_output_iterator I, std::sentinel_for<I> S >
subrange(I, S) -> subrange<I, S>;
template< std::input_or_output_iterator I, std::sentinel_for<I> S >
subrange(I, S, /*make-unsigned-like-t*/<std::iter_difference_t<I>>) ->
subrange<I, S, ranges::subrange_kind::sized>;
template< ranges::borrowed_range<R> >
subrange(R&&) ->
subrange<ranges::iterator_t<R>, ranges::sentinel_t<R>,
(ranges::sized_range<R>
std::sized_sentinel_for<ranges::sentinel_t<R>,
ranges::iterator_t<R>>) ?
ranges::subrange_kind::sized : ranges::subrange_kind::unsized>;
template< ranges::borrowed_range<R> >
subrange(R&&, /*make-unsigned-like-t*/<ranges::range_difference_t<R>>) ->
subrange<ranges::iterator_t<R>, ranges::sentinel_t<R>,
ranges::subrange_kind::sized>;
```

Estes [guias de dedução](<#/doc/language/ctad>) são fornecidos para [std::ranges::subrange](<#/doc/ranges/subrange>).

1) Deduz os argumentos do template a partir do tipo do iterator e do sentinel. O `subrange` é sized se [std::sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>)<S, I> for satisfeito, conforme determinado pelo argumento de template padrão.

2) Deduz os argumentos do template a partir do tipo do iterator e do sentinel, enquanto o tamanho do range é especificado. O `subrange` é sempre sized.

3) Deduz os argumentos do template a partir do tipo do range. O `subrange` é sized se o tamanho puder ser obtido do range ou de seu iterator e sentinel.

4) Deduz os argumentos do template a partir do tipo do range, enquanto o tamanho do range é especificado. O `subrange` é sempre sized.

Para a definição de /* make-unsigned-like-t */, veja `_[make-unsigned-like-t](<#/doc/ranges>)_` ﻿.

### Notas

Ao construir o objeto `subrange`,

*   para (1,2), o comportamento é indefinido se o par iterator-sentinel não denotar um range válido,
*   para (2,4), o comportamento é indefinido se o tamanho fornecido não for igual ao tamanho do range.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3404](<https://cplusplus.github.io/LWG/issue3404>) | C++20 | guias de dedução sem sentido de tipos semelhantes a pares foram fornecidos | removido