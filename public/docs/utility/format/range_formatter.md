# std::range_formatter

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class T, class CharT = char >
requires std::same_as<std::remove_cvref_t<T>, T> && std::formattable<T, CharT>
class range_formatter;
```

`std::range_formatter` é um class template auxiliar para implementar especializações de [std::formatter](<#/doc/utility/format/formatter>) para ranges.

### Especificação de formato de range

A sintaxe de range-format-spec é:

---
range-fill-and-align ﻿(opcional) width ﻿(opcional) `n`(opcional) range-type ﻿(opcional) range-underlying-spec ﻿(opcional)
---

O range-fill-and-align é interpretado da mesma forma que um fill-and-align, exceto que o preenchimento em range-fill-and-align é qualquer caractere diferente de `{`, `}` ou `:`.

A largura é descrita na [especificação de largura de formato padrão](<#/doc/utility/format/spec>).

A opção `n` faz com que o range seja formatado sem os colchetes de abertura e fechamento.
```cpp
    assert(std::format("{}", views::iota(1, 5)) == "[1, 2, 3, 4]");
    assert(std::format("{:n}", views::iota(1, 5)) == "1, 2, 3, 4");
```

O format-spec em um range-underlying-spec (sua sintaxe é equivalente a `:` format-spec), se houver, é interpretado pelo formatador de elemento de range `std::formatter<T, CharT>`.
```cpp
    std::array ints{12, 10, 15, 14};
     
    assert(std::format("{}", ints) == "[12, 10, 15, 14]");
    assert(std::format("{::X}", ints) == "[C, A, F, E]");
    assert(std::format("{:n:_^4}", ints) == "_12_, _10_, _15_, _14_");
```

O range-type altera a forma como um range é formatado, com certas opções válidas apenas com certos tipos de argumento.

Os tipos de apresentação de range disponíveis são:

  * `m`: Indica que o colchete de abertura deve ser "{", o colchete de fechamento deve ser "}", o separador deve ser ", ", e cada elemento do range deve ser formatado como se `m` fosse especificado para seu tuple-type (em [tuple-format-spec](<#/doc/utility/format/tuple_formatter>)).

    

  * Se `m` for escolhido como o range-type, o programa é malformado a menos que `T` seja uma especialização de:

    

  * [std::pair](<#/doc/utility/pair>), ou
  * [std::tuple](<#/doc/utility/tuple>) tal que [std::tuple_size_v](<#/doc/utility/tuple_size>)&lt;T&gt; == 2 seja verdadeiro.

```cpp
    std::array char_pairs
    {
        std::pair{'A', 5}, std::pair{'B', 10}, std::pair{'C', 12}
    };
     
    assert(std::format("{}", char_pairs) == "[('A', 5), ('B', 10), ('C', 12)]");
    assert(std::format("{:m}", char_pairs) == "{'A': 5, 'B': 10, 'C': 12}");
```

  * `s`: Indica que o range deve ser formatado como uma string.
  * `?s`: Indica que o range deve ser formatado como uma [string escapada](<#/doc/utility/format/spec>).

    

  * Se `s` ou `?s` for escolhido como o range-type, tanto a opção `n` quanto o range-underlying-spec não devem ser incluídos no especificador de formato, e
  * o programa é malformado a menos que `T` seja `CharT`.

```cpp
    std::array star{'S', 'T', 'A', 'R'};
     
    assert(std::format("{}", star) == "['S', 'T', 'A', 'R']");
    assert(std::format("{:s}", star) == "STAR");
    assert(std::format("{:?s}", star) == "\"STAR\"");
```

### Membros de dados

Nome do membro | Definição
---|---
[std::formatter](<#/doc/utility/format/formatter>)<T, CharT> `_underlying__` (private) | o formatador subjacente para elementos
(objeto membro apenas para exposição*)
[std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt; `_separator__` (private) | uma string que representa o separador do resultado formatado do range. O separador padrão é ", ".
(objeto membro apenas para exposição*)
[std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt; `_opening-bracket__` (private) | uma string que representa o colchete de abertura do resultado formatado do range. O colchete de abertura padrão é "[".
(objeto membro apenas para exposição*)
[std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt; `_closing-bracket__` (private) | uma string que representa o colchete de fechamento do resultado formatado do range. O colchete de fechamento padrão é "]".
(objeto membro apenas para exposição*)

### Funções membro

set_separator | define um separador especificado para o resultado formatado do range
(função membro pública)
set_brackets | define colchetes de abertura e fechamento especificados para o resultado formatado do range
(função membro pública)
underlying | retorna o formatador subjacente
(função membro pública)
parse | analisa o especificador de formato conforme especificado por range-format-spec
(função membro pública)
format | escreve a saída formatada do range conforme especificado por range-format-spec
(função membro pública)

## std::range_formatter::set_separator

constexpr void set_separator( [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt; sep ) noexcept;

Atribui sep a `_separator__`.

## std::range_formatter::set_brackets

constexpr void set_brackets( [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt; opening,
[std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt; closing ) noexcept;

Atribui opening e closing a `_opening-bracket__` e `_closing-bracket__`, respectivamente.

## std::range_formatter::underlying

```cpp
constexpr std::formatter<T, CharT>& underlying();  // (1)
constexpr const std::formatter<T, CharT>& underlying() const;  // (2)
```

Retorna `_underlying__` (o formatador subjacente).

## std::range_formatter::parse

template< class ParseContext >
constexpr auto parse( ParseContext& ctx ) -> ParseContext::iterator;

Analisa os especificadores de formato como um range-format-spec e armazena os especificadores analisados no objeto atual.

Chama `_underlying__`.parse(ctx) para analisar o format-spec em range-format-spec ou, se este último não estiver presente, um format-spec vazio.

Se range-type ou a opção `n` estiver presente, os valores de `_opening-bracket__`, `_closing-bracket__` e `_separator__` são modificados conforme necessário.

Ele chama `_underlying__`.set_debug_format() se:

  * o range-type não for `s` nem `?s`,
  * `_underlying__`.set_debug_format() for uma expressão válida, e
  * não houver range-underlying-spec.

Retorna um iterator após o final do range-format-spec.

## std::range_formatter::format

template< [ranges::input_range](<#/doc/ranges/input_range>) R, class FormatContext >
requires [std::formattable](<#/doc/utility/format/formattable>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;R&gt;, CharT> &&
[std::same_as](<#/doc/concepts/same_as>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;R&gt;>, T>
auto format( R&& r, FormatContext& ctx ) const -> FormatContext::iterator;

Se o range-type for `s` ou `?s`, ele escreve a [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt; formatada([std::from_range](<#/doc/ranges/from_range>), r) como uma string ou uma string escapada, respectivamente, em ctx.out().

Caso contrário, ele escreve o seguinte em ctx.out() conforme especificado por range-format-spec, em ordem:

  * `_opening-bracket__` ,
  * para cada elemento formatável e do range r:

    

  * o resultado da escrita de e via `_underlying__`, e
  * `_separator__` , a menos que e seja o último elemento de r, e

  * `_closing-bracket__`.

Retorna um iterator após o final do range de saída.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3892](<https://cplusplus.github.io/LWG/issue3892>) | C++23 | a formatação de ranges aninhados estava incorreta | corrigido

### Ver também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(class template)