# std::vprint_unicode, std::vprint_unicode_buffered

Definido no cabeçalho `[<print>](<#/doc/header/print>)`

```c
void vprint_unicode( std::FILE* stream,
std::string_view fmt, std::format_args args );
void vprint_unicode_buffered( std::FILE* stream,
std::string_view fmt, std::format_args args );
void vprint_unicode_buffered( std::string_view fmt, std::format_args args );
```

Formata os `args` de acordo com a string de formato `fmt`, e escreve o resultado no stream de saída.

1) Executa as seguintes operações em ordem:

  1. Bloqueia o `stream`.
  2. Seja `out` a representação de caracteres dos argumentos de formatação fornecidos por `args`, formatados de acordo com as especificações dadas em `fmt`.
  3. Escreve `out` para o `stream`:

    

  * Se o `stream` se refere a um terminal que é capaz de exibir Unicode apenas através de uma [API Unicode nativa](<#/doc/io/vprint_unicode>), descarrega o `stream` e escreve `out` para o terminal usando a API Unicode nativa.
  * Caso contrário, escreve `out` não modificado para o `stream`.

Desbloqueia incondicionalmente o `stream` na saída da função.

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

  * `stream` não é um ponteiro válido para um stream C de saída.
  * `out` contém [unidades de código](<https://en.wikipedia.org/wiki/Character_encoding#Terminology> "enwiki:Character encoding") Unicode inválidas quando a API Unicode nativa é usada.

2) Equivalente a [std::string](<#/doc/string/basic_string>) out = [std::vformat](<#/doc/utility/format/vformat>)(fmt, args);
std::vprint_unicode(stream, "{}", [std::make_format_args](<#/doc/utility/format/make_format_args>)(out));.

3) Equivalente a std::vprint_unicode_buffered(stdout, fmt, args).

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

- **arg-id** — especifica o índice do argumento em `args` cujo valor será usado para formatação; se for omitido, os argumentos são usados em ordem. Os `arg-id`s em uma string de formato devem estar todos presentes ou todos omitidos. Misturar indexação manual e automática é um erro.
- **format-spec** — a especificação de formato definida pela especialização [std::formatter](<#/doc/utility/format/formatter>) para o argumento correspondente. Não pode começar com }.
  
  * Para tipos básicos e tipos de string padrão, a especificação de formato é interpretada como [especificação de formato padrão](<#/doc/utility/format/spec>).
  * Para tipos chrono, a especificação de formato é interpretada como [especificação de formato chrono](<#/doc/chrono/system_clock/formatter>).

  * Para tipos range, a especificação de formato é interpretada como [especificação de formato range](<#/doc/utility/format/range_formatter>).
  * Para [std::pair](<#/doc/utility/pair>) e [std::tuple](<#/doc/utility/tuple>), a especificação de formato é interpretada como [especificação de formato tuple](<#/doc/utility/format/tuple_formatter>).
  * Para [std::thread::id](<#/doc/thread/thread/id>) e [`std::stacktrace_entry`](<#/doc/utility/stacktrace_entry>), consulte [especificação de formato thread id](<#/doc/thread/thread/id/formatter>) e [especificação de formato stacktrace entry](<#/doc/utility/stacktrace_entry/formatter>).
  * Para [`std::basic_stacktrace`](<#/doc/utility/basic_stacktrace>), nenhuma especificação de formato é permitida.

| (desde C++23)
  
  * Para [`std::filesystem::path`](<#/doc/filesystem/path>), consulte [especificação de formato path](<#/doc/filesystem/path/formatter>).

| (desde C++26)
  
  * Para outros tipos formatáveis, a especificação de formato é determinada por especializações `formatter` definidas pelo usuário.

  
- **args** — argumentos a serem formatados
  
### Exceções

  * [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em falha de alocação.
  * [std::system_error](<#/doc/error/system_error>), se a escrita para o stream falhar.
  * Propaga qualquer exceção lançada pelos [formatters](<#/doc/utility/format/formatter>) utilizados, por exemplo, [std::format_error](<#/doc/utility/format/format_error>).

### Notas

O padrão C++ encoraja os implementadores a produzir uma mensagem de diagnóstico se `out` contiver unidades de código Unicode inválidas.

No POSIX, a escrita para um terminal é feita usando as funções de E/S padrão usuais, então não há necessidade de tratar um terminal de forma diferente de qualquer outro stream de arquivo.

No Windows, o `stream` se refere a um terminal se GetConsoleMode(_get_osfhandle(_fileno(stream))) retornar um valor diferente de zero (consulte a documentação do Windows para [`GetConsoleMode`](<https://docs.microsoft.com/en-us/windows/console/getconsolemode>), [`_get_osfhandle`](<https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/get-osfhandle>), e [`_fileno`](<https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/fileno>)). A API Unicode nativa no Windows é [`WriteConsoleW`](<https://docs.microsoft.com/en-us/windows/console/writeconsole>).

Se a invocação da API Unicode nativa exigir transcodificação, as unidades de código inválidas são substituídas pelo CARACTERE DE SUBSTITUIÇÃO `U+FFFD` (consulte "The Unicode Standard - Core Specification", [Capítulo 3.9](<#/doc/io/vprint_unicode>)).

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso [`__cpp_lib_print`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Saída formatada [`202403L`](<#/>) | (C++26)
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

DR | Aplicado a | Comportamento como publicado | Comportamento correto
[LWG 4044](<https://cplusplus.github.io/LWG/issue4044>) | C++23 | a API Unicode nativa era sempre usada se o
terminal referido por `stream` pudesse exibir Unicode | usada apenas se o terminal puder usar apenas
a API Unicode nativa para exibir Unicode
[P3107R5](<https://wg21.link/P3107R5>) | C++23 | as operações de impressão eram sempre armazenadas em buffer | fornece operações de impressão não armazenadas em buffer
[P3235R3](<https://wg21.link/P3235R3>) | C++23 | os nomes das funções adicionadas
por [P3107R5](<https://wg21.link/P3107R5>) eram enganosos | alterou os nomes das funções
  
### Veja também

[ vprint_nonunicodevprint_nonunicode_buffered](<#/doc/io/vprint_nonunicode>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) ou um stream de arquivo usando representação de argumento [com tipo apagado](<#/doc/utility/format/basic_format_args>)
(função)
[ vprint_unicode(std::ostream)](<#/doc/io/basic_ostream/vprint_unicode>)(C++23) | realiza saída com reconhecimento de Unicode usando representação de argumento [com tipo apagado](<#/doc/utility/format/basic_format_args>)
(função)
[ print](<#/doc/io/print>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) ou um stream de arquivo usando representação [formatada](<#/doc/utility/format>) dos argumentos
(modelo de função)
[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)
  
### Links externos

1\. | [Unicode](<https://en.wikipedia.org/wiki/Unicode> "enwiki:Unicode")
---|---
2\. | [The Unicode Standard Version 14.0 - Core Specification](<https://www.unicode.org/versions/Unicode14.0.0/UnicodeStandard-14.0.pdf>)