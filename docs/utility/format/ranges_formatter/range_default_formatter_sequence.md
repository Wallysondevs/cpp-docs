# std::range-default-formatter&lt;std::range_format::sequence&gt;

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< ranges::input_range R, class CharT >
struct /*range-default-formatter*/<range_format::sequence, R, CharT>;
(apenas para exposição*)
```

O template de classe /*range-default-formatter*/ para tipos range é especializado para formatar um range como uma sequência de elementos se [std::format_kind](<#/doc/utility/format/format_kind>)&lt;R&gt; for std::range_format::sequence.

### Tipos Membro

Membro | Definição
---|---
`_maybe-const-r_` (private) | `_[fmt-maybe-const](<#/doc/utility/format>)_` <R, CharT>
(tipo membro apenas para exposição*)

### Membros de Dados

Membro | Definição
---|---
`_underlying__` (private) | o formatador subjacente do tipo: [std::range_formatter](<#/doc/utility/format/range_formatter>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<
` `[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)<`_maybe-const-r_` >>, CharT>
(objeto membro apenas para exposição*)

### Funções Membro

(construtor)(declarado implicitamente) | constrói um /*range-default-formatter*/
(função membro pública)
set_separator | define um separador especificado para o resultado formatado do range
(função membro pública)
set_brackets | define colchetes de abertura e fechamento especificados para o resultado formatado do range
(função membro pública)
parse | analisa o especificador de formato conforme especificado por range-format-spec
(função membro pública)
format | escreve a saída formatada do range conforme especificado por range-format-spec
(função membro pública)

## std::_range-default-formatter_ <std::range_format::sequence>::set_separator

constexpr void set_separator( [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt; sep ) noexcept;

Equivalente a uma chamada para underlying_.set_separator(sep).

## std::_range-default-formatter_ <std::range_format::sequence>::set_brackets

constexpr void set_brackets( [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt; opening,
[std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt; closing ) noexcept;

Equivalente a uma chamada para underlying_.set_brackets(opening, closing).

## std::_range-default-formatter_ <std::range_format::sequence>::parse

template< class ParseContext >
constexpr auto parse( ParseContext& ctx ) -> ParseContext::iterator;

Equivalente a return underlying_.parse(ctx);.

Retorna um iterator após o final do _[range-format-spec](<#/doc/utility/format/range_formatter>)_.

## std::_range-default-formatter_ <std::range_format::sequence>::format

template< class FormatContext >
auto format( /*maybe-const-r*/& elems, FormatContext& ctx ) const -> FormatContext::iterator;

Equivalente a return underlying_.format(elems, ctx);.

Retorna um iterator após o final do range de saída.

### Ver também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(template de classe)
[ range_formatter](<#/doc/utility/format/range_formatter>)(C++23) | template de classe que auxilia na implementação de [std::formatter](<#/doc/utility/format/formatter>) specializations para tipos range
(template de classe)