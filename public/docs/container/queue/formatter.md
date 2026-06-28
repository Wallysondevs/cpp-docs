# std::formatter&lt;std::queue&gt;

Definido no cabeçalho `[<queue>](<#/doc/header/queue>)`

```c
template< class CharT, class T, std::formattable<CharT> Container, class... U >
struct formatter<std::queue<T, Container, U...>, CharT>;
```

A especialização de template de [std::formatter](<#/doc/utility/format/formatter>) para o tipo de adaptador de container [std::queue](<#/doc/container/queue>) permite aos usuários converter o container subjacente para sua representação textual como uma coleção de elementos usando [funções de formatação](<#/doc/utility/format>).

A especialização é habilitada se [std::formattable](<#/doc/utility/format/formattable>)<Container, CharT> for verdadeiro.

### Tipos Membro

Nome | Definição
---|---
`_maybe-const-container_` | `_fmt-maybe-const_` ﻿`<Container, CharT>`
(tipo membro apenas para exposição*)
`_maybe-const-adaptor_` | [`_maybe-const_`](<#/doc/ranges>) ﻿`<`
` `[std::is_const_v](<#/doc/types/is_const>)<`_maybe-const-container_` >,`
` `[std::queue](<#/doc/container/queue>)<T, Container, U...>>`
(tipo membro apenas para exposição*)

### Membros de Dados

Nome | Definição
---|---
`_underlying__` | formatador subjacente do tipo [std::formatter](<#/doc/utility/format/formatter>)<[ranges::ref_view](<#/doc/ranges/ref_view>)<`_maybe-const-container_` >, CharT>
(objeto membro apenas para exposição*)

### Funções Membro

parse | analisa o especificador de formato conforme especificado por range-format-spec
(função membro pública)
format | escreve a saída formatada do range conforme especificado por range-format-spec
(função membro pública)

## std::formatter<std::queue>::parse

template< class ParseContext >
constexpr auto parse( ParseContext& ctx ) -> ParseContext::iterator;

Equivalente a `return` ` ` _[underlying_](<#/doc/container/queue/formatter>)_` ` ` ﻿.parse(ctx);`.

### Valor de retorno

Um iterator após o final do range-format-spec do container subjacente.

## std::formatter<std::queue>::format

template< class FormatContext >
auto format( /*maybe-const-adaptor*/& r, FormatContext& ctx ) const
-> FormatContext::iterator;

Equivalente a `return` ` ` _[underlying_](<#/doc/container/queue/formatter>)_` ` ` ﻿.format(r.c, ctx);`.

### Valor de retorno

Um iterator após o final do range de saída.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(modelo de classe)
[ range_formatter](<#/doc/utility/format/range_formatter>)(C++23) | modelo de classe que auxilia na implementação de especializações de [std::formatter](<#/doc/utility/format/formatter>) para tipos range
(modelo de classe)