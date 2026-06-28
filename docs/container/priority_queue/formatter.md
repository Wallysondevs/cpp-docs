# std::formatter&lt;std::priority_queue&gt;

Definido no cabeçalho `[<queue>](<#/doc/header/queue>)`

```c
template< class CharT, class T, std::formattable<CharT> Container, class... U >
struct formatter<std::priority_queue<T, Container, U...>, CharT>;
```

A especialização de template de [std::formatter](<#/doc/utility/format/formatter>) para o tipo de adaptador de container [std::priority_queue](<#/doc/container/priority_queue>) permite aos usuários converter o container subjacente para sua representação textual como uma coleção de elementos usando [funções de formatação](<#/doc/utility/format>).

A especialização é habilitada se [std::formattable](<#/doc/utility/format/formattable>)<Container, CharT> for true.

### Tipos Membro

Nome | Definição
---|---
`_maybe-const-container_` | `_fmt-maybe-const_` ﻿<Container, CharT>
(tipo membro apenas para exposição*)
`_maybe-const-adaptor_` | [`_maybe-const_`](<#/doc/ranges>) ﻿<
` `[std::is_const_v](<#/doc/types/is_const>)<`_maybe-const-container_` >,
` `[std::priority_queue](<#/doc/container/priority_queue>)<T, Container, U...>>
(tipo membro apenas para exposição*)

### Membros de Dados

Nome | Definição
---|---
`_underlying__` | formatter subjacente do tipo [std::formatter](<#/doc/utility/format/formatter>)<[ranges::ref_view](<#/doc/ranges/ref_view>)<`_maybe-const-container_` >, CharT>
(objeto membro apenas para exposição*)

### Funções Membro

parse | analisa o especificador de formato conforme especificado por range-format-spec
(função membro pública)
format | escreve a saída formatada do range conforme especificado por range-format-spec
(função membro pública)

## std::formatter<std::priority_queue>::parse

template< class ParseContext >
constexpr auto parse( ParseContext& ctx ) -> ParseContext::iterator;

Equivalente a return` ` _[underlying_](<#/doc/container/priority_queue/formatter>)_` ﻿.parse(ctx);.

### Valor de retorno

Um iterator após o final do range-format-spec do container subjacente.

## std::formatter<std::priority_queue>::format

template< class FormatContext >
auto format( /*maybe-const-adaptor*/& r, FormatContext& ctx ) const
-> FormatContext::iterator;

Equivalente a return` ` _[underlying_](<#/doc/container/priority_queue/formatter>)_` ﻿.format(r.c, ctx);.

### Valor de retorno

Um iterator após o final do range de saída.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(template de classe)
[ range_formatter](<#/doc/utility/format/range_formatter>)(C++23) | template de classe que ajuda a implementar especializações de [std::formatter](<#/doc/utility/format/formatter>) para tipos range
(template de classe)