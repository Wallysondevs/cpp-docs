# std::print

Definido no cabeçalho `[<print>](<#/doc/header/print>)`

```c
template< class... Args >
void print( std::format_string<Args...> fmt, Args&&... args );
template< class... Args >
void print( std::FILE* stream,
std::format_string<Args...> fmt, Args&&... args );
```

Formata os argumentos de acordo com a string de formato `fmt`, e imprime o resultado em um stream de saída.

1) Equivalente a std::print(stdout, fmt, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...).

2) Se a [codificação literal ordinária](<#/doc/language/charset>) for UTF-8, equivalente a (std::enable_nonlocking_formatter_optimization<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;Args&gt;> && ...)
? [std::vprint_unicode](<#/doc/io/vprint_unicode>)(stream, fmt.str, [std::make_format_args](<#/doc/utility/format/make_format_args>)(args...))
: std::vprint_unicode_buffered(stream, fmt.str, [std::make_format_args](<#/doc/utility/format/make_format_args>)(args...));.

Caso contrário, equivalente a (std::enable_nonlocking_formatter_optimization<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;Args&gt;> && ...)
? [std::vprint_nonunicode](<#/doc/io/vprint_nonunicode>)(stream, fmt.str, [std::make_format_args](<#/doc/utility/format/make_format_args>)(args...))
: std::vprint_nonunicode_buffered(stream, fmt.str, [std::make_format_args](<#/doc/utility/format/make_format_args>)(args...));.

Se [std::formatter](<#/doc/utility/format/formatter>)<Ti, char> não atender aos requisitos de [BasicFormatter](<#/doc/named_req/BasicFormatter>) para qualquer `Ti` em `Args` (conforme exigido por [std::make_format_args](<#/doc/utility/format/make_format_args>)), o comportamento é indefinido.

### Parâmetros

- **stream** — stream de arquivo de saída para escrever
- **fmt** — um objeto que representa a string de formato. A string de formato consiste em

  * caracteres ordinários (exceto { e }), que são copiados inalterados para a saída,
  * sequências de escape {{ e }}, que são substituídas por { e } respectivamente na saída, e
  * campos de substituição.

Cada campo de substituição tem o seguinte formato: |
---
`{` arg-id (opcional) `}` | (1) |
---|---|---
`{` arg-id (opcional) `:` format-spec `}` | (2) |

1) campo de substituição sem uma especificação de formato

2) campo de substituição com uma especificação de formato

- **arg-id** — especifica o índice do argumento em `args` cujo valor será usado para formatação; se for omitido, os argumentos são usados em ordem. Os arg-id ﻿s em uma string de formato devem estar todos presentes ou todos omitidos. Misturar indexação manual e automática é um erro.
- **format-spec** — a especificação de formato definida pela especialização de [std::formatter](<#/doc/utility/format/formatter>) para o argumento correspondente. Não pode começar com }.

  * Para tipos básicos e tipos de string padrão, a especificação de formato é interpretada como [especificação de formato padrão](<#/doc/utility/format/spec>).
  * Para tipos chrono, a especificação de formato é interpretada como [especificação de formato chrono](<#/doc/chrono/system_clock/formatter>).

  * Para tipos range, a especificação de formato é interpretada como [especificação de formato range](<#/doc/utility/format/range_formatter>).
  * Para [std::pair](<#/doc/utility/pair>) e [std::tuple](<#/doc/utility/tuple>), a especificação de formato é interpretada como [especificação de formato tuple](<#/doc/utility/format/tuple_formatter>).
  * Para [std::thread::id](<#/doc/thread/thread/id>) e [`std::stacktrace_entry`](<#/doc/utility/stacktrace_entry>), veja [especificação de formato thread id](<#/doc/thread/thread/id/formatter>) e [especificação de formato stacktrace entry](<#/doc/utility/stacktrace_entry/formatter>).
  * Para [`std::basic_stacktrace`](<#/doc/utility/basic_stacktrace>), nenhuma especificação de formato é permitida.

| (desde C++23)

  * Para [`std::filesystem::path`](<#/doc/filesystem/path>), veja [especificação de formato path](<#/doc/filesystem/path/formatter>).

| (desde C++26)

  * Para outros tipos formatáveis, a especificação de formato é determinada por especializações de `formatter` definidas pelo usuário.

- **args...** — argumentos a serem formatados

### Exceções

  * [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em caso de falha de alocação.
  * [std::system_error](<#/doc/error/system_error>), se a escrita no stream falhar.
  * Propaga qualquer exceção lançada por [formatters](<#/doc/utility/format/formatter>) usados, por exemplo, [std::format_error](<#/doc/utility/format/format_error>).

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso [`__cpp_lib_print`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Saída formatada [`202403L`](<#/>) | (C++26)
---|---
(DR23) | Saída formatada sem buffer
[`202406L`](<#/>) | (C++26)
(DR23) | Habilitando saída formatada sem buffer para mais tipos formatáveis
[`__cpp_lib_format`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Expondo std::basic_format_string

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <filesystem>
    #include <print>
    
    int main()
    {
        std::print("{0} {2}{1}!\n", "Hello", 23, "C++");  // overload (1)
    
        const auto tmp {std::filesystem::temp_directory_path() / "test.txt"};
    
        if (std::FILE* stream{std::fopen(tmp.c_str(), "w")})
        {
            std::print(stream, "File: {}", tmp.string()); // overload (2)
            std::fclose(stream);
        }
    }
```

Saída:
```
    Hello C++23!
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P3107R5](<https://wg21.link/P3107R5>) | C++23 | apenas operações de impressão em buffer podem ser realizadas | pode realizar operações de impressão sem buffer
[P3235R3](<https://wg21.link/P3235R3>) | C++23 | os nomes das funções adicionadas
por [P3107R5](<https://wg21.link/P3107R5>) eram enganosos | alterou os nomes das funções

### Ver também

[ println](<#/doc/io/println>)(C++23) | o mesmo que std::print, exceto que cada impressão é terminada por uma nova linha adicional
(function template)
[ print(std::ostream)](<#/doc/io/basic_ostream/print>)(C++23) | imprime a representação [formatada](<#/doc/utility/format>) dos argumentos
(function template)
[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(function template)
[ format_to](<#/doc/utility/format/format_to>)(C++20) | escreve a representação formatada de seus argumentos através de um iterator de saída
(function template)
[ printffprintfsprintfsnprintf](<#/doc/io/c/printf>)(C++11) | imprime saída formatada para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(function)