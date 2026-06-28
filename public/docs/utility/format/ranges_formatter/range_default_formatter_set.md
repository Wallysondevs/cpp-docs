# std::range-default-formatter&lt;std::range_format::set&gt;

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< ranges::input_range R, class CharT >
struct /*range-default-formatter*/<range_format::set, R, CharT>;
(apenas para exposição*)
```

O modelo de classe /*range-default-formatter*/ para tipos range é especializado para formatar um range como um conjunto de chaves se [std::format_kind](<#/doc/utility/format/format_kind>)&lt;R&gt; for std::range_format::set.

### Tipos Membro

Membro | Definição
---|---
`_maybe-const-set_` (private) | `_[fmt-maybe-const](<#/doc/utility/format>)_` <R, CharT>
(tipo membro apenas para exposição*)

### Membros de Dados

Membro | Definição
---|---
`_underlying__` (private) | o formatador subjacente do tipo: [std::range_formatter](<#/doc/utility/format/range_formatter>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<
` `[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)`<`_maybe-const-set_` >>, CharT>
(objeto membro apenas para exposição*)

### Funções Membro

(construtor) | constrói um `_range-default-formatter_`
(função membro pública)
parse | analisa o especificador de formato conforme especificado por range-format-spec
(função membro pública)
format | escreve a saída formatada do range conforme especificado por range-format-spec
(função membro pública)

## std::_range-default-formatter_ <std::range_format::set>::_range-default-formatter_

constexpr /*range-default-formatter*/();

Equivalente a uma chamada para underlying_.set_brackets(STATICALLY_WIDEN<CharT>("{"), STATICALLY_WIDEN<CharT>("}"))

onde STATICALLY_WIDEN<CharT>("...") é "..." se `CharT` for char, e L"..." se `CharT` for wchar_t.

## std::_range-default-formatter_ <std::range_format::set>::parse

template< class ParseContext >
constexpr auto parse( ParseContext& ctx ) -> ParseContext::iterator;

Equivalente a return underlying_.parse(ctx);.

Retorna um iterator após o final do _[range-format-spec](<#/doc/utility/format/range_formatter>)_.

## std::_range-default-formatter_ <std::range_format::set>::format

template< class FormatContext >
auto format( maybe-const-set& r, FormatContext& ctx ) const -> FormatContext::iterator;

Equivalente a return underlying_.format(r, ctx);.

Retorna um iterator após o final do range de saída.

### Veja também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(modelo de classe)
[ range_formatter](<#/doc/utility/format/range_formatter>)(C++23) | modelo de classe que auxilia na implementação de [std::formatter](<#/doc/utility/format/formatter>) especializações para tipos range
(modelo de classe)