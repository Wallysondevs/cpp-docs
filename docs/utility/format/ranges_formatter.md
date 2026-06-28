# std::formatter&lt;range&gt;

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< ranges::input_range R, class CharT >
requires (std::format_kind<R> != std::range_format::disabled) &&
std::formattable<ranges::range_reference_t<R>, CharT>
struct formatter<R, CharT>;
Templates auxiliares
template< std::range_format K, ranges::input_range R, class CharT >
struct /*range-default-formatter*/;
```

  
A especialização de template de [std::formatter](<#/doc/utility/format/formatter>) para os tipos range permite aos usuários converter um range para sua representação textual como uma coleção de elementos ou uma string usando [funções de formatação](<#/doc/utility/format>).

A especialização é derivada de `_range-default-formatter_` <[std::format_kind](<#/doc/utility/format/format_kind>)&lt;R&gt;, R, CharT>.

A especialização é habilitada se R satisfaz [`input_range`](<#/doc/ranges/input_range>), [std::format_kind](<#/doc/utility/format/format_kind>)&lt;R&gt; não é std::range_format::disabled, e [std::formattable](<#/doc/utility/format/formattable>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;R&gt;, CharT> é verdadeiro.

Esta especialização atende aos requisitos de [Formatter](<#/doc/named_req/Formatter>) se const R modela [`input_range`](<#/doc/ranges/input_range>) e [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;const R&gt; modela [std::formattable](<#/doc/utility/format/formattable>)&lt;CharT&gt;. Ela sempre atende aos requisitos de [BasicFormatter](<#/doc/named_req/BasicFormatter>).

### Especificação de Formato

A sintaxe de range-format-spec é:   
  
---  
range-fill-and-align ﻿(optional) width ﻿(optional) `n`(optional) range-type ﻿(optional) range-underlying-spec ﻿(optional)
  
A sintaxe é totalmente descrita na [especificação de formato de range](<#/doc/utility/format/range_formatter>).

Para especializações de `std::formatter` onde [std::format_kind](<#/doc/utility/format/format_kind>)&lt;R&gt; é std::range_format::string ou std::range_format::debug_string, o format-spec é std-format-spec em vez de range-format-spec (que usa [std::formatter](<#/doc/utility/format/formatter>)<[std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;, CharT> como o formatador subjacente).

### Especializações de `_range-default-formatter_`

[ _range-default-formatter_ <std::range_format::sequence>](<#/doc/utility/format/ranges_formatter/range_default_formatter_sequence>)(C++23) |  utilitário de formatação para ranges em formato de sequência   
(especialização de template de classe)  
[ _range-default-formatter_ <std::range_format::map>](<#/doc/utility/format/ranges_formatter/range_default_formatter_map>)(C++23) |  utilitário de formatação para ranges em formato de mapa   
(especialização de template de classe)  
[ _range-default-formatter_ <std::range_format::set>](<#/doc/utility/format/ranges_formatter/range_default_formatter_set>)(C++23) |  utilitário de formatação para ranges em formato de conjunto   
(especialização de template de classe)  
[ _range-default-formatter_ <std::range_format::string>_range-default-formatter_ <std::range_format::debug_string>](<#/doc/utility/format/ranges_formatter/range_default_formatter_string>)(C++23) |  utilitário de formatação para ranges em formato de string ou string escapada   
(especialização de template de classe)  
  
### Exemplo

| Esta seção está incompleta  
Razão: exemplo   
  
### Veja também

[ formatter](<#/doc/utility/format/formatter>)(C++20) |  define regras de formatação para um dado tipo   
(template de classe)  
[ range_formatter](<#/doc/utility/format/range_formatter>)(C++23) |  template de classe que ajuda a implementar especializações de [std::formatter](<#/doc/utility/format/formatter>) para tipos range   
(template de classe)