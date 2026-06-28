# std::range-default-formatter&lt;std::range_format::map&gt;

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< ranges::input_range R, class CharT >
struct /*range-default-formatter*/<range_format::map, R, CharT>;
(apenas para exposição*)
```

O template de classe /*range-default-formatter*/ para tipos range é especializado para formatar um range como um mapa de chaves para valores se [std::format_kind](<#/doc/utility/format/format_kind>)&lt;R&gt; for std::range_format::map.

### Tipos Membro

Membro | Definição
---|---
`_maybe-const-map_` (private) | `_[fmt-maybe-const](<#/doc/utility/format>)_` <R, CharT>
(tipo membro apenas para exposição*)
`_element-type_` (private) | [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)<`_maybe-const-map_` >>
(tipo membro apenas para exposição*)

### Membros de Dados

Membro | Definição
---|---
`_underlying__` (private) | o formatador subjacente do tipo [std::range_formatter](<#/doc/utility/format/range_formatter>)<`_element-type_` , CharT>
(objeto membro apenas para exposição*)

### Funções Membro

(construtor) | constrói um `_range-default-formatter_`
(função membro pública)
parse | analisa o especificador de formato conforme especificado por _[range-format-spec](<#/doc/utility/format/range_formatter>)_
(função membro pública)
format | escreve a saída formatada do range conforme especificado por _[range-format-spec](<#/doc/utility/format/range_formatter>)_
(função membro pública)

## std::_range-default-formatter_ <std::range_format::map>::_range-default-formatter_

constexpr /*range-default-formatter*/();

Equivalente a:
underlying_.set_brackets(STATICALLY_WIDEN&lt;CharT&gt;("{"), STATICALLY_WIDEN&lt;CharT&gt;("}"));
underlying_.underlying().set_brackets({}, {});
underlying_.underlying().set_separator(STATICALLY_WIDEN&lt;charT&gt;(": "));

onde STATICALLY_WIDEN&lt;CharT&gt;("...") é "..." se `CharT` for char, e L"..." se `CharT` for wchar_t.

O programa é malformado a menos que:

  * `_element-type_` seja uma especialização de [std::pair](<#/doc/utility/pair>), ou
  * `_element-type_` seja uma especialização de [std::tuple](<#/doc/utility/tuple>) e `std::tuple_size_v<_element-type_ >` seja 2.

## std::_range-default-formatter_ <std::range_format::map>::parse

template< class ParseContext >
constexpr auto parse( ParseContext& ctx ) -> ParseContext::iterator;

Equivalente a: `return` ` _[underlying_](<#/doc/utility/format/ranges_formatter/range_default_formatter_map>)_`.format(ctx);`.

Retorna um iterator após o final do _[range-format-spec](<#/doc/utility/format/range_formatter>)_.

## std::_range-default-formatter_ <std::range_format::map>::format

template< class FormatContext >
auto format( maybe-const-map& r, FormatContext& ctx ) const -> FormatContext::iterator;

Equivalente a: `return` ` _[underlying_](<#/doc/utility/format/ranges_formatter/range_default_formatter_map>)_`.format(r, ctx);`.

Retorna um iterator após o final do range de saída.

### Veja também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(template de classe)
[ range_formatter](<#/doc/utility/format/range_formatter>)(C++23) | template de classe que auxilia na implementação de especializações de [std::formatter](<#/doc/utility/format/formatter>) para tipos range
(template de classe)