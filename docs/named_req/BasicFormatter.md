# Requisitos nomeados C++: BasicFormatter (desde C++20)

**BasicFormatter** é um tipo que abstrai operações de formatação para um dado tipo de argumento de formatação e tipo de caractere. Especializações de [std::formatter](<#/doc/utility/format/formatter>) são exigidas para satisfazer os requisitos de BasicFormatter.

Um BasicFormatter é um [Formatter](<#/doc/named_req/Formatter>) se for capaz de formatar argumentos const e não-const.

### Requisitos

Um tipo satisfaz BasicFormatter se for semiregular, o que significa que ele satisfaz:

  * [DefaultConstructible](<#/doc/named_req/DefaultConstructible>)
  * [CopyConstructible](<#/doc/named_req/CopyConstructible>)
  * [CopyAssignable](<#/doc/named_req/CopyAssignable>)
  * [Destructible](<#/doc/named_req/Destructible>)
  * [Swappable](<#/doc/named_req/Swappable>)

E, dados os seguintes tipos e valores, as expressões mostradas na tabela abaixo são válidas e possuem a semântica indicada:

Tipo | Definição
---|---
`CharT` | um tipo de caractere
`Arg` | um tipo de argumento de formatação
`Formatter` | um tipo Formatter para os tipos `Arg` e `CharT`
`OutputIt` | um tipo [LegacyOutputIterator](<#/doc/named_req/OutputIterator>)
`ParseCtx` | [std::basic_format_parse_context](<#/doc/utility/format/basic_format_parse_context>)&lt;CharT&gt;
`FmtCtx` | [std::basic_format_context](<#/doc/utility/format/basic_format_context>)<OutputIt, CharT>
Valor | Definição
f | um valor do tipo `Formatter` (possivelmente qualificado como const)
g | um valor do tipo `Formatter`
arg | um lvalue do tipo `Arg`
t | um valor do tipo conversível para `Arg` (possivelmente qualificado como const)
parse_ctx | um lvalue do tipo `ParseCtx` que satisfaz todas as seguintes condições:

  * `parse_ctx.begin()` aponta para o início do format-spec do campo de substituição sendo formatado na [string de formato](<#/doc/utility/format/basic_format_string>).
  * Se format-spec não estiver presente ou estiver vazio, então `parse_ctx.begin() == parse_ctx.end()` ou `*parse_ctx.begin() == '}'`.

fmt_ctx | um lvalue do tipo `FmtCtx`
---|---|---
Expressão | Tipo de retorno | Semântica
g.parse(parse_ctx) | `ParseCtx::iterator` |

  * No range `[`parse_ctx.begin()`, `parse_ctx.end()`)`, analisa o format-spec para o tipo `Arg` até o primeiro caractere não correspondente.
  * Lança [std::format_error](<#/doc/utility/format/format_error>) a menos que todo o range seja analisado ou o caractere não correspondente seja }. [nota 1](<#/doc/named_req/BasicFormatter>)
  * Armazena os especificadores de formato analisados em g e retorna um iterador de fim do range analisado.

f.format(arg, fmt_ctx) | `FmtCtx::iterator` |

  * Formata arg de acordo com os especificadores armazenados em f, escreve a saída para `fmt_ctx.out()` e retorna um iterador de fim do range de saída.
  * A saída deve depender apenas de
    * arg,
    * fmt_ctx.locale(),
    * o range `[`parse_ctx.begin()`, `parse_ctx.end()`)` da última chamada para `f.parse(parse_ctx)`, e
    * `fmt_ctx.arg(n)` para qualquer valor `n` do tipo [std::size_t](<#/doc/types/size_t>).

  1. [↑](<#/doc/named_req/BasicFormatter>) Isso permite que os formatters emitam mensagens de erro significativas.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3892](<https://cplusplus.github.io/LWG/issue3892>) | C++20 | o valor de pc.begin() era incerto se format-spec não estivesse presente | esclarecido
  *[_(as is)_]: A::pointer