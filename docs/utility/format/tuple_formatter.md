# std::formatter&lt;pair-or-tuple&gt;

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class CharT, std::formattable<CharT>... Ts >
struct formatter</*pair-or-tuple*/<Ts...>, CharT>;
```

A especialização de template de [std::formatter](<#/doc/utility/format/formatter>) para [std::pair](<#/doc/utility/pair>) e [std::tuple](<#/doc/utility/tuple>) permite aos usuários converter um par ou uma tupla para sua representação textual como uma coleção de elementos usando [funções de formatação](<#/doc/utility/format>).

O nome apenas para exposição /*pair-or-tuple*/ denota o template de classe [std::pair](<#/doc/utility/pair>) ou [std::tuple](<#/doc/utility/tuple>).

Esta especialização atende aos requisitos de [Formatter](<#/doc/named_req/Formatter>) se ([std::formattable](<#/doc/utility/format/formattable>)&lt;const Ts, CharT&gt; && ...) for verdadeiro. Ela sempre atende aos requisitos de [BasicFormatter](<#/doc/named_req/BasicFormatter>).

### Especificação de Formato

A sintaxe de tuple-format-spec é:
---
tuple-fill-and-align ﻿(opcional) width ﻿(opcional) tuple-type ﻿(opcional)
---

O tuple-fill-and-align é interpretado da mesma forma que um fill-and-align, exceto que o preenchimento em tuple-fill-and-align é qualquer caractere diferente de `{`, `}`, ou `:`.

A largura é descrita na [especificação de largura de formato padrão](<#/doc/utility/format/spec>).

O tuple-type altera a forma como uma tupla é formatada, com certas opções válidas apenas com certos tipos de argumento.

Os tipos de apresentação de tupla disponíveis são:

*   `m`: Indica que tanto os colchetes de abertura quanto os de fechamento devem ser "" enquanto o separador deve ser ": ".

    *   Se `m` for escolhido como o tuple-type, o programa é malformado a menos que sizeof...(Ts) == 2 seja verdadeiro.

*   `n`: Indica que o separador, os colchetes de abertura e fechamento devem ser "".

### Objetos Membro

Nome do membro | Definição
---|---
`_underlying__` (privado) | tupla de formatadores subjacentes do tipo [std::tuple](<#/doc/utility/tuple>)<[std::formatter](<#/doc/utility/format/formatter>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;Ts&gt;, CharT>...>
(objeto membro apenas para exposição*)
`_separator__` (privado) | uma string representando o separador do resultado formatado da tupla (padrão é ", ")
(objeto membro apenas para exposição*)
`_opening-bracket__` (privado) | uma string representando o colchete de abertura do resultado formatado da tupla (padrão é "(")
(objeto membro apenas para exposição*)
`_closing-bracket__` (privado) | uma string representando o colchete de fechamento do resultado formatado da tupla (padrão é ")")
(objeto membro apenas para exposição*)

### Funções Membro

set_separator | define um separador especificado para o resultado formatado da tupla
(função membro pública)
set_brackets | define colchetes de abertura e fechamento especificados para o resultado formatado da tupla
(função membro pública)
parse | analisa o especificador de formato conforme especificado por tuple-format-spec
(função membro pública)
format | escreve a saída formatada da tupla conforme especificado por tuple-format-spec
(função membro pública)

## std::formatter<_pair-or-tuple_ >::set_separator

constexpr void set_separator( [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt; sep ) noexcept;

Atribui sep a `_separator__`.

## std::formatter<_pair-or-tuple_ >::set_brackets

constexpr void set_brackets( [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt; opening,
[std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt; closing ) noexcept;

Atribui opening e closing a `_opening-bracket__` e `_closing-bracket__`, respectivamente.

## std::formatter<_pair-or-tuple_ >::parse

template< class ParseContext >
constexpr auto parse( ParseContext& ctx ) -> ParseContext::iterator;

Analisa os especificadores de formato como um tuple-format-spec e armazena os especificadores analisados no objeto atual.

Se tuple-type ou a opção `n` estiver presente, os valores de `_opening-bracket_`, `_closing-bracket_`, e `_separator_` são modificados conforme necessário.

Para cada elemento e em `_underlying__` , chama e.parse(ctx) para analisar um format-spec vazio e, se e.set_debug_format() for uma expressão válida, chama e.set_debug_format().

Retorna um iterator após o final do tuple-format-spec.

## std::formatter<_pair-or-tuple_ >::format

template< class FormatContext >
FormatContext::iterator
format( /*maybe-const-pair-or-tuple*/<Ts...>& elems, FormatContext& ctx ) const;

/*maybe-const-pair-or-tuple*/ denota:

*   const /*pair-or-tuple*/, se ([std::formattable](<#/doc/utility/format/formattable>)&lt;const Ts, CharT&gt; && ...) for verdadeiro,
*   /*pair-or-tuple*/ caso contrário.

Escreve o seguinte em ctx.out() conforme especificado por tuple-format-spec, em ordem:

*   `_opening-bracket__` ,
*   para cada índice I em `[`​0​`, `sizeof...(Ts)`)`:

    *   se I != 0, `_separator__` ,
    *   o resultado de escrever std::get<I>(elems) via std::get<I>(`_underlying__`), e

*   `_closing-bracket__`.

Retorna um iterator após o final do range de saída.

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3892](<https://cplusplus.github.io/LWG/issue3892>) | C++23 | a formatação de tuplas aninhadas estava incorreta | corrigido

### Veja também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(template de classe)