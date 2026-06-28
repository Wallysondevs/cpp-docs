# std::vformat

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
std::string vformat( std::string_view fmt, std::format_args args );
std::wstring vformat( std::wstring_view fmt, std::wformat_args args );
std::string vformat( const std::locale& loc,
std::string_view fmt, std::format_args args );
std::wstring vformat( const std::locale& loc,
std::wstring_view fmt, std::wformat_args args );
```

Formata os argumentos contidos em `args` de acordo com a string de formato `fmt`, e retorna o resultado como uma string. Se presente, `loc` é usado para formatação específica da localidade.

### Parâmetros

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

- **arg-id** — especifica o índice do argumento em `args` cujo valor deve ser usado para formatação; se for omitido, os argumentos são usados em ordem. Os `arg-id`s em uma string de formato devem estar todos presentes ou todos omitidos. Misturar indexação manual e automática é um erro.
- **format-spec** — a especificação de formato definida pela especialização de `std::formatter` para o argumento correspondente. Não pode começar com }.

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
- **loc** — [std::locale](<#/doc/locale/locale>) usada para formatação específica da localidade

### Valor de retorno

Um objeto string contendo o resultado formatado.

### Exceções

Lança [std::format_error](<#/doc/utility/format/format_error>) se `fmt` não for uma string de formato válida para os argumentos fornecidos, ou [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em caso de falha de alocação. Também propaga qualquer exceção lançada por operações de formatter ou iterator.

### Exemplo

Execute este código
```cpp
    #include <format>
    #include <iostream>
     
    template<typename... Args>
    inline void println(const std::format_string<Args...> fmt, Args&&... args)
    {
        std::cout << std::vformat(fmt.get(), std::make_format_args(args...)) << '\n';
    }
     
    int main()
    {
        println("{}{} {}{}", "Hello", ',', "C++", -1 + 2 * 3 * 4);
    }
```

Saída:
```
    Hello, C++23
```

### Ver também