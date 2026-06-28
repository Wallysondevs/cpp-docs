# std::vprint_nonunicode, std::vprint_nonunicode_buffered

Definido no cabeçalho `[<print>](<#/doc/header/print>)`

```c
void vprint_nonunicode( std::FILE* stream,
std::string_view fmt, std::format_args args );
void vprint_nonunicode_buffered
( std::FILE* stream, std::string_view fmt, std::format_args args );
void vprint_nonunicode_buffered
( std::string_view fmt, std::format_args args );
```

Formata os argumentos (args) de acordo com a string de formato (fmt) e escreve o resultado no stream de saída.

1) Enquanto mantém o bloqueio no stream, escreve a representação de caracteres dos argumentos de formatação fornecidos por args, formatados de acordo com as especificações dadas em fmt, para o stream.

Se stream não for um ponteiro válido para um stream C de saída, o comportamento é indefinido.

2) Equivalente a [std::string](<#/doc/string/basic_string>) out = [std::vformat](<#/doc/utility/format/vformat>)(fmt, args);
std::vprint_nonunicode(stream, "{}", [std::make_format_args](<#/doc/utility/format/make_format_args>)(out));.

3) Equivalente a std::vprint_nonunicode_buffered(stdout, fmt, args).

### Parâmetros

- **stream** — stream de arquivo de saída para escrever
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
  * Para [std::thread::id](<#/doc/thread/thread/id>) e [`std::stacktrace_entry`](<#/doc/utility/stacktrace_entry>), veja [especificação de formato de id de thread](<#/doc/thread/thread/id/formatter>) e [especificação de formato de entrada de stacktrace](<#/doc/utility/stacktrace_entry/formatter>).
  * Para [`std::basic_stacktrace`](<#/doc/utility/basic_stacktrace>), nenhum especificador de formato é permitido.

| (desde C++23)

  * Para [`std::filesystem::path`](<#/doc/filesystem/path>), veja [especificação de formato de path](<#/doc/filesystem/path/formatter>).

| (desde C++26)

  * Para outros tipos formatáveis, a especificação de formato é determinada por especializações `formatter` definidas pelo usuário.

- **args** — argumentos a serem formatados

### Exceções

  * [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em caso de falha de alocação.
  * [std::system_error](<#/doc/error/system_error>), se a escrita no stream falhar.
  * Propaga qualquer exceção lançada pelos [formatters](<#/doc/utility/format/formatter>) utilizados, por exemplo, [std::format_error](<#/doc/utility/format/format_error>).

### Notas

Macro de teste de recurso | Valor | Std | Recurso [`__cpp_lib_print`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Saída formatada [`202403L`](<#/>) | (C++26)
---|---
(DR23) | Saída formatada não armazenada em buffer
[`202406L`](<#/>) | (C++26)
(DR23) | Habilitando saída formatada não armazenada em buffer para mais tipos formatáveis
[`__cpp_lib_format`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Expondo std::basic_format_string

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P3107R5](<https://wg21.link/P3107R5>) | C++23 | operações de impressão eram sempre armazenadas em buffer | fornece operações de impressão não armazenadas em buffer
[P3235R3](<https://wg21.link/P3235R3>) | C++23 | os nomes das funções adicionadas
por [P3107R5](<https://wg21.link/P3107R5>) eram enganosos | alterou os nomes das funções

### Veja também

[ vprint_unicodevprint_unicode_buffered](<#/doc/io/vprint_unicode>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) com capacidade Unicode ou um stream de arquivo usando representação de argumento [type-erased](<#/doc/utility/format/basic_format_args>)
(função)
[ vprint_nonunicode(std::ostream)](<#/doc/io/basic_ostream/vprint_nonunicode>)(C++23) | gera dados de caracteres usando representação de argumento [type-erased](<#/doc/utility/format/basic_format_args>)
(função)
[ print](<#/doc/io/print>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) ou um stream de arquivo usando representação [formatada](<#/doc/utility/format>) dos argumentos
(modelo de função)
[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)