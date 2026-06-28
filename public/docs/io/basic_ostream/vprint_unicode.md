# std::vprint_unicode(std::ostream)

Definido no cabeçalho `[<ostream>](<#/doc/header/ostream>)`

```c
void vprint_unicode( std::ostream& os,
std::string_view fmt, std::format_args args );
```

Formata os argumentos (args) de acordo com a string de formato fmt, e escreve o resultado no stream de saída os. Comporta-se como [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>) de os, exceto que alguns detalhes do relatório de erros [diferem](<#/doc/io/basic_ostream/vprint_unicode>).

Executa as seguintes operações em ordem:

1.  Primeiro, a função constrói e verifica o objeto [sentry](<#/doc/io/basic_ostream/sentry>).
2.  Inicializa uma variável automática como se por [std::string](<#/doc/string/basic_string>) out = [std::vformat](<#/doc/utility/format/vformat>)(os.getloc(), fmt, args);.
3.  Escreve out para os:

    *   Se os se refere a um terminal que é capaz de exibir Unicode apenas através de uma [API Unicode nativa](<#/doc/io/vprint_unicode>), descarrega os e escreve para o terminal usando a API Unicode nativa.
    *   Caso contrário, insere a sequência de caracteres `[`out.begin()`, `out.end()`)` em os.

Se a escrita para o terminal ou a inserção em os falhar, chama os.setstate([std::ios_base::badbit](<#/doc/io/ios_base/iostate>)).

Se out contiver [unidades de código](<https://en.wikipedia.org/wiki/Character_encoding#Terminology> "enwiki:Character encoding") Unicode inválidas quando a API Unicode nativa for usada, o comportamento é indefinido.

### Parâmetros

- **os** — stream de saída para inserir dados
- **fmt** — um objeto que representa a string de formato. A string de formato consiste em

  * caracteres comuns (exceto { e }), que são copiados inalterados para a saída,
  * sequências de escape {{ e }}, que são substituídas por { e } respectivamente na saída, e
  * campos de substituição.

Cada campo de substituição tem o seguinte formato: |
---
`{` arg-id (opcional) `}` | (1) |
---|---|---
`{` arg-id (opcional) `:` format-spec `}` | (2) |

1) campo de substituição sem uma especificação de formato

2) campo de substituição com uma especificação de formato

- **arg-id** — especifica o índice do argumento em `args` cujo valor deve ser usado para formatação; se for omitido, os argumentos são usados em ordem. Os arg-id ﻿s em uma string de formato devem estar todos presentes ou todos omitidos. Misturar indexação manual e automática é um erro.
- **format-spec** — a especificação de formato definida pela especialização [std::formatter](<#/doc/utility/format/formatter>) para o argumento correspondente. Não pode começar com }.
  * Para tipos básicos e tipos de string padrão, a especificação de formato é interpretada como [especificação de formato padrão](<#/doc/utility/format/spec>).
  * Para tipos chrono, a especificação de formato é interpretada como [especificação de formato chrono](<#/doc/chrono/system_clock/formatter>).

  * Para tipos range, a especificação de formato é interpretada como [especificação de formato range](<#/doc/utility/format/range_formatter>).
  * Para [std::pair](<#/doc/utility/pair>) e [std::tuple](<#/doc/utility/tuple>), a especificação de formato é interpretada como [especificação de formato de tupla](<#/doc/utility/format/tuple_formatter>).
  * Para [std::thread::id](<#/doc/thread/thread/id>) e [`std::stacktrace_entry`](<#/doc/utility/stacktrace_entry>), veja [especificação de formato de thread id](<#/doc/thread/thread/id/formatter>) e [especificação de formato de stacktrace entry](<#/doc/utility/stacktrace_entry/formatter>).
  * Para [`std::basic_stacktrace`](<#/doc/utility/basic_stacktrace>), nenhum especificador de formato é permitido.

| (desde C++23)
  * Para [`std::filesystem::path`](<#/doc/filesystem/path>), veja [especificação de formato de path](<#/doc/filesystem/path/formatter>).

| (desde C++26)
  * Para outros tipos formatáveis, a especificação de formato é determinada por especializações de `formatter` definidas pelo usuário.

- **args** — argumentos a serem formatados

### Exceções

*   [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em caso de falha de alocação.
*   Propaga qualquer exceção lançada por qualquer [formatter](<#/doc/utility/format/formatter>), por exemplo, [std::format_error](<#/doc/utility/format/format_error>), sem considerar o valor de os.exceptions() e sem ativar [ios_base::badbit](<#/doc/io/ios_base/iostate>) no estado de erro de os.
*   Pode lançar [ios_base::failure](<#/doc/io/ios_base/failure>) causada por os.setstate(ios_base::badbit), que é chamada se uma inserção em os falhar.

### Notas

Se a invocação da API Unicode nativa exigir transcodificação, as unidades de código inválidas são substituídas pelo CARACTERE DE SUBSTITUIÇÃO `U+FFFD` (veja "The Unicode Standard - Core Specification", [Capítulo 3.9](<#/doc/io/basic_ostream/vprint_unicode>)).

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_print`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Saída formatada
[`__cpp_lib_format`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Expondo std::basic_format_string

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 4044](<https://cplusplus.github.io/LWG/issue4044>) | C++23 | a API Unicode nativa era sempre usada se o
terminal referido por os puder exibir Unicode | usada apenas se o terminal puder usar apenas
a API Unicode nativa para exibir Unicode

### Veja também

[ vprint_nonunicode(std::ostream)](<#/doc/io/basic_ostream/vprint_nonunicode>)(C++23) | gera dados de caracteres usando representação de argumento [type-erased](<#/doc/utility/format/basic_format_args>)
(função)
[ print(std::ostream)](<#/doc/io/basic_ostream/print>)(C++23) | gera representação [formatada](<#/doc/utility/format>) dos argumentos
(modelo de função)
[ operator<<(std::basic_ostream)](<#/doc/io/basic_ostream/operator_ltlt2>) | insere dados de caracteres ou insere em stream rvalue
(modelo de função)
[ vprint_unicodevprint_unicode_buffered](<#/doc/io/vprint_unicode>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) capaz de Unicode ou um stream de arquivo usando representação de argumento [type-erased](<#/doc/utility/format/basic_format_args>)
(função)
[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)

### Links externos

1.  | [Unicode](<https://en.wikipedia.org/wiki/Unicode> "enwiki:Unicode")
---|---
2.  | [The Unicode Standard Version 14.0 - Core Specification](<https://www.unicode.org/versions/Unicode14.0.0/UnicodeStandard-14.0.pdf>)