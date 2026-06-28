# std::format_to

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class OutputIt, class... Args >
OutputIt format_to( OutputIt out,
std::format_string<Args...> fmt, Args&&... args );
template< class OutputIt, class... Args >
OutputIt format_to( OutputIt out,
std::wformat_string<Args...> fmt, Args&&... args );
template< class OutputIt, class... Args >
OutputIt format_to( OutputIt out, const std::locale& loc,
std::format_string<Args...> fmt, Args&&... args );
template< class OutputIt, class... Args >
OutputIt format_to( OutputIt out, const std::locale& loc,
std::wformat_string<Args...> fmt, Args&&... args );
```

Formata os `args` de acordo com a string de formato `fmt`, e escreve o resultado no iterator de saída `out`. Se presente, `loc` é usado para formatação específica de locale.

Equivalente a:

1) return [std::vformat_to](<#/doc/utility/format/vformat_to>)(std::move(out), fmt.str, [std::make_format_args](<#/doc/utility/format/make_format_args>)(args...));

2) return [std::vformat_to](<#/doc/utility/format/vformat_to>)(std::move(out), fmt.str, [std::make_wformat_args](<#/doc/utility/format/make_format_args>)(args...));

3) return [std::vformat_to](<#/doc/utility/format/vformat_to>)(std::move(out), loc, fmt.str, [std::make_format_args](<#/doc/utility/format/make_format_args>)(args...));

4) return [std::vformat_to](<#/doc/utility/format/vformat_to>)(std::move(out), loc, fmt.str, [std::make_wformat_args](<#/doc/utility/format/make_format_args>)(args...));.

Seja `CharT` `char` para as sobrecargas (1,3), `wchar_t` para as sobrecargas (2,4).

Essas sobrecargas participam da resolução de sobrecarga somente se `OutputIt` satisfizer o concept [std::output_iterator](<#/doc/iterator/output_iterator>)&lt;const CharT&&gt;.

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

*   `OutputIt` não modela [std::output_iterator](<#/doc/iterator/output_iterator>)&lt;const CharT&&gt;.
*   [std::formatter](<#/doc/utility/format/formatter>)<Ti, CharT> não atende aos requisitos de [BasicFormatter](<#/doc/named_req/BasicFormatter>) (conforme exigido por [std::make_format_args](<#/doc/utility/format/make_format_args>) e [std::make_wformat_args](<#/doc/utility/format/make_format_args>)) para algum `Ti` em `Args`.

### Parâmetros

- **out** — iterator para o buffer de saída
- **fmt** — um objeto que representa a string de formato. A string de formato consiste em

*   caracteres comuns (exceto `{` e `}`), que são copiados inalterados para a saída,
*   sequências de escape `{{` e `}}`, que são substituídas por `{` e `}` respectivamente na saída, e
*   campos de substituição.

Cada campo de substituição tem o seguinte formato: |
---
`{` arg-id (opcional) `}` | (1) |
---|---|---
`{` arg-id (opcional) `:` format-spec `}` | (2) |

1) campo de substituição sem uma especificação de formato

2) campo de substituição com uma especificação de formato

- **arg-id** — especifica o índice do argumento em `args` cujo valor deve ser usado para formatação; se for omitido, os argumentos são usados em ordem. Os `arg-id`s em uma string de formato devem estar todos presentes ou todos omitidos. Misturar indexação manual e automática é um erro.
- **format-spec** — a especificação de formato definida pela especialização de [std::formatter](<#/doc/utility/format/formatter>) para o argumento correspondente. Não pode começar com `}`.

*   Para tipos básicos e tipos de string padrão, a especificação de formato é interpretada como [especificação de formato padrão](<#/doc/utility/format/spec>).
*   Para tipos chrono, a especificação de formato é interpretada como [especificação de formato chrono](<#/doc/chrono/system_clock/formatter>).
*   Para tipos range, a especificação de formato é interpretada como [especificação de formato range](<#/doc/utility/format/range_formatter>).
*   Para [std::pair](<#/doc/utility/pair>) e [std::tuple](<#/doc/utility/tuple>), a especificação de formato é interpretada como [especificação de formato de tupla](<#/doc/utility/format/tuple_formatter>).
*   Para [std::thread::id](<#/doc/thread/thread/id>) e [`std::stacktrace_entry`](<#/doc/utility/stacktrace_entry>), veja [especificação de formato de id de thread](<#/doc/thread/thread/id/formatter>) e [especificação de formato de entrada de stacktrace](<#/doc/utility/stacktrace_entry/formatter>).
*   Para [`std::basic_stacktrace`](<#/doc/utility/basic_stacktrace>), nenhum especificador de formato é permitido.

| (desde C++23)

*   Para [`std::filesystem::path`](<#/doc/filesystem/path>), veja [especificação de formato de path](<#/doc/filesystem/path/formatter>).

| (desde C++26)

*   Para outros tipos formatáveis, a especificação de formato é determinada por especializações de `formatter` definidas pelo usuário.

- **args...** — argumentos a serem formatados
- **loc** — [std::locale](<#/doc/locale/locale>) usada para formatação específica de locale

### Valor de retorno

Iterator após o final do range de saída.

### Exceções

Propaga qualquer exceção lançada por operações de formatter ou iterator.

### Notas

A partir de [P2216R3](<https://wg21.link/P2216R3>), é um erro se a string de formato não for uma expressão constante. [std::vformat_to](<#/doc/utility/format/vformat_to>) ou `std::runtime_format` (desde C++26) podem ser usados neste caso.

### Exemplo

Execute este código
```cpp
    #include <format>
    #include <iostream>
    #include <iterator>
    #include <string>
    
    int main()
    {
        std::string buffer;
    
        std::format_to
        (
            std::back_inserter(buffer), // < OutputIt
            "Hello, C++{}!\n",          // < fmt
            "20"                        // < arg
        );
        std::cout << buffer;
        buffer.clear();
    
        std::format_to
        (
            std::back_inserter(buffer), // < OutputIt
            "Hello, {0}::{1}!{2}",      // < fmt
            "std",                      // < arg {0}
            "format_to()",              // < arg {1}
            "\n",                       // < arg {2}
            "extra param(s)..."         // < unused
        );
        std::cout << buffer << std::flush;
    
        std::wstring wbuffer;
        std::format_to
        (
            std::back_inserter(wbuffer),// < OutputIt
            L"Hello, {2}::{1}!{0}",     // < fmt
            L"\n",                      // < arg {0}
            L"format_to()",             // < arg {1}
            L"std",                     // < arg {2}
            L"...is not..."             // < unused
            L"...an error!"             // < unused
        );
        std::wcout << wbuffer;
    }
```

Saída:
```
    Hello, C++20!
    Hello, std::format_to()!
    Hello, std::format_to()!
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3539](<https://cplusplus.github.io/LWG/issue3539>) | C++20 | `out` não poderia ser um iterator move-only | pode ser
[P2216R3](<https://wg21.link/P2216R3>) | C++20 | lança [std::format_error](<#/doc/utility/format/format_error>) para string de formato inválida | resulta em erro em tempo de compilação em vez disso
[P2418R2](<https://wg21.link/P2418R2>) | C++20 | objetos que não são nem const-usáveis nem copiáveis (como objetos tipo gerador) não são formatáveis | permite formatar esses objetos
[P2508R1](<https://wg21.link/P2418R2>) | C++20 | não há nome visível para o usuário para esta facilidade | o nome `basic_format_string` é exposto

### Veja também

[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string (modelo de função)
---|---
[ format_to_n](<#/doc/utility/format/format_to_n>)(C++20) | escreve a representação formatada de seus argumentos através de um iterator de saída, não excedendo o tamanho especificado (modelo de função)