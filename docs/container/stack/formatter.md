# std::formatter&lt;std::stack&gt;

Definido no cabeçalho `[<stack>](<#/doc/header/stack>)`

```c
template< class CharT, class T, std::formattable<CharT> Container, class... U >
struct formatter<std::stack<T, Container, U...>, CharT>;
```

A especialização de template de [std::formatter](<#/doc/utility/format/formatter>) para o tipo de adaptador de container [std::stack](<#/doc/container/stack>) permite aos usuários converter o container subjacente para sua representação textual como uma coleção de elementos usando [funções de formatação](<#/doc/utility/format>).

A especialização é habilitada se [std::formattable](<#/doc/utility/format/formattable>)<Container, CharT> for true.

### Tipos de membros

Nome | Definição
---|---
`_maybe-const-container_` | `_fmt-maybe-const_` <Container, CharT>
(tipo de membro apenas para exposição*)
`_maybe-const-adaptor_` | [`_maybe-const_`](<#/doc/ranges>) <
` `[std::is_const_v](<#/doc/types/is_const>)<`_maybe-const-container_` >,
` `[std::stack](<#/doc/container/stack>)<T, Container, U...>>
(tipo de membro apenas para exposição*)

### Membros de dados

Nome | Definição
---|---
`_underlying__` | formatter subjacente do tipo [std::formatter](<#/doc/utility/format/formatter>)<[ranges::ref_view](<#/doc/ranges/ref_view>)<`_maybe-const-container_` >, CharT>
(objeto membro apenas para exposição*)

### Funções membro

parse | analisa o especificador de formato conforme especificado por range-format-spec
(função membro pública)
format | escreve a saída formatada do range conforme especificado por range-format-spec
(função membro pública)

## std::formatter<std::stack>::parse

template< class ParseContext >
constexpr auto parse( ParseContext& ctx ) -> ParseContext::iterator;

Equivalente a return` ` _[underlying_](<#/doc/container/stack/formatter>)_` ` ` .parse(ctx);.

### Valor de retorno

Um iterator após o final do range-format-spec do container subjacente.

## std::formatter<std::stack>::format

template< class FormatContext >
auto format( /*maybe-const-adaptor*/& r, FormatContext& ctx ) const
-> FormatContext::iterator;

Equivalente a return` ` _[underlying_](<#/doc/container/stack/formatter>)_` ` ` .format(r.c, ctx);.

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