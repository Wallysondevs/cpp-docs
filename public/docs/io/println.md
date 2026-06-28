# std::println

Definido no cabeçalho `[<print>](<#/doc/header/print>)`

```c
template< class... Args >
void println( std::format_string<Args...> fmt, Args&&... args );
template< class... Args >
void println( std::FILE* stream,
std::format_string<Args...> fmt, Args&&... args );
void println();
void println( std::FILE* stream );
```

Formata os argumentos de acordo com a string de formato fmt com '\n' anexado (o que significa que cada saída termina com uma nova linha), e imprime o resultado em um stream.

1) Equivalente a std::println(stdout, fmt, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...).

2) Equivalente a realizar as seguintes operações: [std::print](<#/doc/io/print>)(stream, "{}\n", [std::format](<#/doc/utility/format/format>)(fmt, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...)); | (até C++26)
[std::print](<#/doc/io/print>)(stream, [std::runtime_format](<#/doc/utility/format/runtime_format>)([std::string](<#/doc/string/basic_string>)(fmt.get()) + '\n'),
[std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...) | (desde C++26)

3) Equivalente a std::println(stdout).

4) Equivalente a [std::print](<#/doc/io/print>)(stream, "\n").

Se [std::formatter](<#/doc/utility/format/formatter>)<Ti, char> não atender aos requisitos de [BasicFormatter](<#/doc/named_req/BasicFormatter>) para qualquer `Ti` em `Args` (conforme exigido por [std::make_format_args](<#/doc/utility/format/make_format_args>)), o comportamento é indefinido.

### Parâmetros

- **stream** — stream de arquivo de saída para escrever
- **fmt** — um objeto que representa a string de formato. A string de formato consiste em

  * caracteres comuns (exceto { e }), que são copiados inalterados para a saída,
  * sequências de escape {{ e }}, que são substituídas por { e } respectivamente na saída, e
  * campos de substituição.

Cada campo de substituição tem o seguinte formato: |
---
`{` arg-id (optional) `}` | (1) |
---|---|---
`{` arg-id (optional) `:` format-spec `}` | (2) |

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

  * Para outros tipos formatáveis, a especificação de formato é determinada por especializações de `formatter` definidas pelo usuário.

- **args...** — argumentos a serem formatados

### Exceções

  * [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em falha de alocação.
  * [std::system_error](<#/doc/error/system_error>), se a escrita no stream falhar.
  * Propaga qualquer exceção lançada pelos [formatters](<#/doc/utility/format/formatter>) utilizados, por exemplo, [std::format_error](<#/doc/utility/format/format_error>).

### Notas

Embora as sobrecargas ([3,4](<#/doc/io/println>)) sejam adicionadas no C++26, todas as implementações conhecidas as tornam disponíveis no modo C++23.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_print`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Saída formatada
[`202403L`](<#/>) | (C++26) | Saída formatada sem buffer[1](<#/doc/io/println>)
[`__cpp_lib_format`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Expondo std::basic_format_string

1. [↑](<#/doc/io/println>) Embora P3107R5 seja aceito como um DR, std::runtime_format está disponível apenas desde C++26. Como resultado, a resolução não pode ser aplicada no C++23.

### Exemplo

Execute este código
```cpp
    #include <print>
    
    int main()
    {
        // Cada chamada para std::println termina com uma nova linha
        std::println("Please"); // sobrecarga (1)
        std::println("enter"); // (1)
    
        std::print("pass");
        std::print("word");
    
        std::println(); // (3); válido desde C++26; mesmo efeito que std::print("\n");
    }
```

Saída:
```
    Please
    enter
    password
    
    
```

### Veja também

[ print](<#/doc/io/print>)(C++23) | imprime em [stdout](<#/doc/io/c/std_streams>) ou em um stream de arquivo usando representação [formatada](<#/doc/utility/format>) dos argumentos
(modelo de função)
[ println(std::ostream)](<#/doc/io/basic_ostream/println>)(C++23) | gera representação [formatada](<#/doc/utility/format/format>) dos argumentos com '\n' anexado
(modelo de função)
[ format](<#/doc/utility/format/format>)(C++20) | armazena representação formatada dos argumentos em uma nova string
(modelo de função)
[ printffprintfsprintfsnprintf](<#/doc/io/c/printf>)(C++11) | imprime saída formatada para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)