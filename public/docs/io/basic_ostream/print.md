# std::print(std::ostream)

Definido no cabeçalho `[<ostream>](<#/doc/header/ostream>)`

```c
template< class... Args >
void print( std::ostream& os, std::format_string<Args...> fmt, Args&&... args );
```

Formata os argumentos `args` de acordo com a string de formato `fmt`, e insere o resultado no stream `os`.

Se a [codificação literal ordinária](<#/doc/language/charset>) for UTF-8, equivalente a:

* [`std::vprint_unicode`](<#/doc/io/basic_ostream/vprint_unicode>)(os, fmt.get(), [std::make_format_args](<#/doc/utility/format/make_format_args>)(args...));. Caso contrário,
* [`std::vprint_nonunicode`](<#/doc/io/basic_ostream/vprint_nonunicode>)(os, fmt.get(), [std::make_format_args](<#/doc/utility/format/make_format_args>)(args...));.

O comportamento é indefinido se [std::formatter](<#/doc/utility/format/formatter>)<Ti, char> não atender aos requisitos de [BasicFormatter](<#/doc/named_req/BasicFormatter>) para qualquer `Ti` em `Args` (conforme exigido por [std::make_format_args](<#/doc/utility/format/make_format_args>)).

### Parâmetros

- **os** — stream de saída para inserir dados
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

- **arg-id** — especifica o índice do argumento em `args` cujo valor deve ser usado para formatação; se for omitido, os argumentos são usados em ordem. Os arg-id ﻿s em uma string de formato devem estar todos presentes ou todos omitidos. Misturar indexação manual e automática é um erro.
- **format-spec** — a especificação de formato definida pela especialização [std::formatter](<#/doc/utility/format/formatter>) para o argumento correspondente. Não pode começar com }.
---
* Para tipos básicos e tipos de string padrão, a especificação de formato é interpretada como [especificação de formato padrão](<#/doc/utility/format/spec>).
* Para tipos chrono, a especificação de formato é interpretada como [especificação de formato chrono](<#/doc/chrono/system_clock/formatter>).

* Para tipos range, a especificação de formato é interpretada como [especificação de formato range](<#/doc/utility/format/range_formatter>).
* Para [std::pair](<#/doc/utility/pair>) e [std::tuple](<#/doc/utility/tuple>), a especificação de formato é interpretada como [especificação de formato de tupla](<#/doc/utility/format/tuple_formatter>).
* Para [std::thread::id](<#/doc/thread/thread/id>) e [`std::stacktrace_entry`](<#/doc/utility/stacktrace_entry>), veja [especificação de formato de thread id](<#/doc/thread/thread/id/formatter>) e [especificação de formato de stacktrace entry](<#/doc/utility/stacktrace_entry/formatter>).
* Para [`std::basic_stacktrace`](<#/doc/utility/basic_stacktrace>), nenhum especificador de formato é permitido.

| (desde C++23)
* Para [`std::filesystem::path`](<#/doc/filesystem/path>), veja [especificação de formato de path](<#/doc/filesystem/path/formatter>).

| (desde C++26)
* Para outros tipos formatáveis, a especificação de formato é determinada por especializações `formatter` definidas pelo usuário.

- **args...** — argumentos a serem formatados

### Valor de retorno

(nenhum)

### Exceções

* [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em caso de falha de alocação.
* Propaga qualquer exceção lançada por qualquer [formatter](<#/doc/utility/format/formatter>), por exemplo, [std::format_error](<#/doc/utility/format/format_error>), sem considerar o valor de `os.exceptions()` e sem ativar [ios_base::badbit](<#/doc/io/ios_base/iostate>) no estado de erro de `os`.
* Pode lançar [ios_base::failure](<#/doc/io/ios_base/failure>) causada por `os.setstate(ios_base::badbit)`, que é chamada se uma inserção em `os` falhar.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_print`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Saída formatada
[`__cpp_lib_format`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Expondo std::basic_format_string

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <cctype>
    #include <cstdio>
    #include <format>
    #include <numbers>
    #include <ranges>
    #include <sstream>
    
    int main()
    {
        std::array<char, 24> buf;
        std::format_to(buf.begin(), "{:.15f}", std::numbers::sqrt2);
    
        unsigned num{}, sum{};
    
        auto v = buf
               | std::views::filter(isdigit)
               | std::views::transform( { return x - '0'; })
               | std::views::take_while(&sum { return sum < 42; });
    
        for (auto n : v)
            sum += n, ++num;
    
        std::stringstream stream;
    
    #ifdef __cpp_lib_print
        std::print(stream,
    #else
        stream << std::format(
    #endif
            "√2 = {}...\n"
            "The sum of its first {} digits is {}{}",
            std::numbers::sqrt2, num, sum, '.'
        );
    
        std::puts(stream.str().data());
    }
```

Saída:
```
    √2 = 1.4142135623730951...
    The sum of its first 13 digits is 42.
```

### Veja também

[ println(std::ostream)](<#/doc/io/basic_ostream/println>)(C++23) | imprime a representação [formatada](<#/doc/utility/format>) dos argumentos com '\n' anexado
(modelo de função)
[ print](<#/doc/io/print>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) ou um stream de arquivo usando a representação [formatada](<#/doc/utility/format>) dos argumentos
(modelo de função)
[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)