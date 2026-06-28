# Requisitos nomeados C++: Formatter (desde C++20)

Um **Formatter** é um tipo que abstrai operações de formatação para um dado tipo de argumento de formatação e tipo de caractere. Especializações de [std::formatter](<#/doc/utility/format/formatter>) fornecidas pela standard library devem atender aos requisitos de Formatter, exceto quando indicado de outra forma.

Um **Formatter** é capaz de formatar argumentos `const` e não-`const`, tipicamente fornecendo uma função membro `format` que recebe uma referência `const`.

### Requisitos

Um tipo satisfaz Formatter se ele satisfaz [BasicFormatter](<#/doc/named_req/BasicFormatter>) e, dados os seguintes tipos e valores, as expressões mostradas na tabela abaixo são válidas e possuem a semântica indicada:

Tipo | Definição
---|---
`CharT` | um tipo de caractere
`Arg` | um tipo de argumento de formatação
`Formatter` | um tipo Formatter para os tipos `Arg` e `CharT`
`OutputIt` | um tipo [LegacyOutputIterator](<#/doc/named_req/OutputIterator>)
`ParseCtx` | [std::basic_format_parse_context](<#/doc/utility/format/basic_format_parse_context>)&lt;CharT&gt;
`FmtCtx` | [std::basic_format_context](<#/doc/utility/format/basic_format_context>)<OutputIt, CharT>
Valor | Definição
f | um valor do tipo `Formatter` (possivelmente qualificado com `const`)
arg | um lvalue do tipo `Arg`
t | um valor do tipo conversível para `Arg` (possivelmente qualificado com `const`)
parse_ctx | um lvalue do tipo `ParseCtx` que satisfaz todas as seguintes condições:

  * parse_ctx.begin() aponta para o início do format-spec do campo de substituição sendo formatado na [string de formato](<#/doc/utility/format/basic_format_string>).
  * Se format-spec não estiver presente ou estiver vazio, então ou parse_ctx.begin() == parse_ctx.end() ou *parse_ctx.begin() == '}'.

fmt_ctx | um lvalue do tipo `FmtCtx`
---|---|---
Expressão | Tipo de retorno | Semântica
f.format(t, fmt_ctx) | `FmtCtx::iterator` |

  * Formata t de acordo com os especificadores armazenados em f, escreve a saída para fmt_ctx.out() e retorna um iterator de fim do range de saída.
  * A saída pode depender apenas de
    * t,
    * fmt_ctx.locale(),
    * o range `[`parse_ctx.begin()`, `parse_ctx.end()`)` da última chamada para f.parse(parse_ctx), e
    * fmt_ctx.arg(n) para qualquer valor n do tipo [std::size_t](<#/doc/types/size_t>).

f.format(arg, fmt_ctx) | `FmtCtx::iterator` | Como acima, mas não modifica arg.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3892](<https://cplusplus.github.io/LWG/issue3892>) | C++20 | o valor de pc.begin() era incerto se format-spec não estivesse presente | esclarecido
*[_(as is)_]: A::pointer