# std::range-default-formatter&lt;std::range_format::string&gt;, std::range-default-formatter&lt;std::range_format::debug_string&gt;

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< std::range_format K, ranges::input_range R, class CharT >
requires (K == std::range_format::string
struct /*range-default-formatter*/<K, R, CharT>;
(apenas para exposição*)
```

O template de classe /*range-default-formatter*/ para tipos range é especializado para formatar um range como uma string ou uma string escapada se [std::format_kind](<#/doc/utility/format/format_kind>)&lt;R&gt; for std::range_format::string ou std::range_format::debug_string.

### Membros de dados

Membro | Definição
---|---
`_underlying__` (privado) | o formatter subjacente do tipo [std::formatter](<#/doc/utility/format/formatter>)<[std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;, CharT>
(objeto membro apenas para exposição*)

### Funções membro

(construtor)(implicitamente declarado) | constrói um `_range-default-formatter_`
(função membro pública)
parse | analisa o especificador de formato conforme especificado por _[std-format-spec](<#/doc/utility/format/spec>)_
(função membro pública)
format | escreve a saída formatada conforme especificado por _[std-format-spec](<#/doc/utility/format/spec>)_
(função membro pública)

## std::_range-default-formatter_ <std::range_format::string>::parse
std::_range-default-formatter_ <std::range_format::debug_string>::parse

template< class ParseContext >
constexpr auto parse( ParseContext& ctx ) -> ParseContext::iterator;

Equivalente a:

```cpp
auto i = underlying_.parse(ctx);
if constexpr (K == std::range_format::debug_string)
underlying_.set_debug_format();
return i;
```

Retorna um iterator após o final do _[std-format-spec](<#/doc/utility/format/spec>)_.

## std::_range-default-formatter_ <std::range_format::string>::format
std::_range-default-formatter_ <std::range_format::debug_string>::format

template< class FormatContext >
auto format( /* see below */& r, FormatContext& ctx ) const -> FormatContext::iterator;

Se [ranges::input_range](<#/doc/ranges/input_range>)&lt;const R&gt; for true, o tipo de r é const R&. Caso contrário, o tipo é R&.

Seja s uma [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt; como se fosse construída com [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;([std::from_range](<#/doc/ranges/from_range>), r) de tal forma que [ranges::equal](<#/doc/algorithm/ranges/equal>)(s, r) seja true.

Equivalente a return underlying_.format(s, ctx);.

Retorna um iterator após o final do range de saída.

### Ver também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(template de classe)
[ range_formatter](<#/doc/utility/format/range_formatter>)(C++23) | template de classe que auxilia na implementação de especializações de [std::formatter](<#/doc/utility/format/formatter>) para tipos range
(template de classe)