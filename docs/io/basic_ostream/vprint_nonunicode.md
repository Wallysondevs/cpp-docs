# std::vprint_nonunicode(std::ostream)

Definido no cabeçalho `[<ostream>](<#/doc/header/ostream>)`

```c
void vprint_nonunicode( std::ostream& os, std::string_view fmt, std::format_args args );
```

Comporta-se como [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>) (exceto que alguns detalhes do tratamento de erros [diferem](<#/doc/io/basic_ostream/vprint_nonunicode>)):

* Primeiro, constrói e verifica o objeto [sentry](<#/doc/io/basic_ostream/sentry>).
* Em seguida, inicializa uma variável automática como se por [std::string](<#/doc/string/basic_string>) out = [std::vformat](<#/doc/utility/format/vformat>)(os.getloc(), fmt, args);.
* Finalmente, insere a sequência de caracteres `[out.begin(), out.end())` em os.

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
* Para [std::thread::id](<#/doc/thread/thread/id>) e [`std::stacktrace_entry`](<#/doc/utility/stacktrace_entry>), consulte [especificação de formato de id de thread](<#/doc/thread/thread/id/formatter>) e [especificação de formato de entrada de stacktrace](<#/doc/utility/stacktrace_entry/formatter>).
* Para [`std::basic_stacktrace`](<#/doc/utility/basic_stacktrace>), nenhum especificador de formato é permitido.

| (desde C++23)

* Para [`std::filesystem::path`](<#/doc/filesystem/path>), consulte [especificação de formato de path](<#/doc/filesystem/path/formatter>).

| (desde C++26)

* Para outros tipos formatáveis, a especificação de formato é determinada por especializações `formatter` definidas pelo usuário.

- **args** — argumentos a serem formatados

### Valor de retorno

(nenhum)

### Exceções

* [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em caso de falha de alocação.
* Propaga qualquer exceção lançada por qualquer [formatter](<#/doc/utility/format/formatter>), por exemplo, [std::format_error](<#/doc/utility/format/format_error>), sem considerar o valor de os.exceptions() e sem ativar [ios_base::badbit](<#/doc/io/ios_base/iostate>) no estado de erro de os.
* Pode lançar [ios_base::failure](<#/doc/io/ios_base/failure>) causada por os.setstate(ios_base::badbit), que é chamada se uma inserção em os falhar.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_print`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Saída formatada
[`__cpp_lib_format`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Expondo std::basic_format_string

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ vprint_unicode(std::ostream)](<#/doc/io/basic_ostream/vprint_unicode>)(C++23) | realiza saída com reconhecimento Unicode usando representação de argumento [type-erased](<#/doc/utility/format/basic_format_args>)
(função)
[ print(std::ostream)](<#/doc/io/basic_ostream/print>)(C++23) | gera representação [formatada](<#/doc/utility/format>) dos argumentos
(modelo de função)
[ operator<<(std::basic_ostream)](<#/doc/io/basic_ostream/operator_ltlt2>) | insere dados de caractere ou insere em stream rvalue
(modelo de função)
[ vprint_nonunicodevprint_nonunicode_buffered](<#/doc/io/vprint_nonunicode>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) ou um stream de arquivo usando representação de argumento [type-erased](<#/doc/utility/format/basic_format_args>)
(função)
[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)