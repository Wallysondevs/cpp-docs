# std::format

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class... Args >
std::string format( std::format_string<Args...> fmt, Args&&... args );
template< class... Args >
std::wstring format( std::wformat_string<Args...> fmt, Args&&... args );
template< class... Args >
std::string format( const std::locale& loc,
std::format_string<Args...> fmt, Args&&... args );
template< class... Args >
std::wstring format( const std::locale& loc,
std::wformat_string<Args...> fmt, Args&&... args );
```

Formata os `args` de acordo com a string de formato `fmt`, e retorna o resultado como uma string. Se presente, `loc` é usado para formatação específica da locale.

1) Equivalente a `return [std::vformat](<#/doc/utility/format/vformat>)(fmt.get(), [std::make_format_args](<#/doc/utility/format/make_format_args>)(args...));`.

2) Equivalente a `return [std::vformat](<#/doc/utility/format/vformat>)(fmt.get(), [std::make_wformat_args](<#/doc/utility/format/make_format_args>)(args...));`.

3) Equivalente a `return [std::vformat](<#/doc/utility/format/vformat>)(loc, fmt.get(), [std::make_format_args](<#/doc/utility/format/make_format_args>)(args...));`.

4) Equivalente a `return [std::vformat](<#/doc/utility/format/vformat>)(loc, fmt.get(), [std::make_wformat_args](<#/doc/utility/format/make_format_args>)(args...));`.

Desde [P2216R3](<https://wg21.link/P2216R3>), `std::format` realiza uma verificação em tempo de compilação na string de formato (através do tipo auxiliar `std::format_string` ou `std::wformat_string`). Se for considerada inválida para os tipos dos argumentos a serem formatados, um erro de compilação será emitido. Se a string de formato não puder ser uma constante em tempo de compilação, ou se a verificação em tempo de compilação precisar ser evitada, use [std::vformat](<#/doc/utility/format/vformat>) ou [`std::runtime_format`](<#/doc/utility/format/runtime_format>) em `fmt` (desde C++26) em vez disso.

Os seguintes requisitos se aplicam a cada tipo `T` em `Args`, onde `CharT` é `char` para as sobrecargas (1,3), `wchar_t` para as sobrecargas (2,4):

  * [std::formatter](<#/doc/utility/format/formatter>)<T, CharT> deve satisfazer [BasicFormatter](<#/doc/named_req/BasicFormatter>)
  * [std::formatter](<#/doc/utility/format/formatter>)<T, CharT>::parse() deve ser `constexpr` desde [P2216R3](<https://wg21.link/P2216R3>) ([std::vformat](<#/doc/utility/format/vformat>) não tem este requisito)

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
- **format-spec** — a especificação de formato definida pela especialização de [std::formatter](<#/doc/utility/format/formatter>) para o argumento correspondente. Não pode começar com }.

  * Para tipos básicos e tipos de string padrão, a especificação de formato é interpretada como [especificação de formato padrão](<#/doc/utility/format/spec>).
  * Para tipos `chrono`, a especificação de formato é interpretada como [especificação de formato chrono](<#/doc/chrono/system_clock/formatter>).

  * Para tipos `range`, a especificação de formato é interpretada como [especificação de formato range](<#/doc/utility/format/range_formatter>).
  * Para [std::pair](<#/doc/utility/pair>) e [std::tuple](<#/doc/utility/tuple>), a especificação de formato é interpretada como [especificação de formato tuple](<#/doc/utility/format/tuple_formatter>).
  * Para [std::thread::id](<#/doc/thread/thread/id>) e [`std::stacktrace_entry`](<#/doc/utility/stacktrace_entry>), veja [especificação de formato thread id](<#/doc/thread/thread/id/formatter>) e [especificação de formato stacktrace entry](<#/doc/utility/stacktrace_entry/formatter>).
  * Para [`std::basic_stacktrace`](<#/doc/utility/basic_stacktrace>), nenhum especificador de formato é permitido.

| (desde C++23)

  * Para [`std::filesystem::path`](<#/doc/filesystem/path>), veja [especificação de formato path](<#/doc/filesystem/path/formatter>).

| (desde C++26)

  * Para outros tipos formatáveis, a especificação de formato é determinada por especializações `formatter` definidas pelo usuário.

- **args...** — argumentos a serem formatados
- **loc** — [std::locale](<#/doc/locale/locale>) usada para formatação específica da locale

### Valor de retorno

Um objeto string contendo o resultado formatado.

### Exceções

Lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em caso de falha de alocação. Também propaga exceções lançadas por qualquer `formatter`.

### Notas

Não é um erro fornecer mais argumentos do que a string de formato exige:
```cpp
    std::format("{} {}!", "Hello", "world", "something"); // OK, produz "Hello world!"
```

A partir de [P2216R3](<https://wg21.link/P2216R3>), é um erro se a string de formato não for uma expressão constante. [std::vformat](<#/doc/utility/format/vformat>) pode ser usado neste caso.
```cpp
    std::string f(std::string_view runtime_format_string)
    {
        // return std::format(runtime_format_string, "foo", "bar"); // erro
        return std::vformat(runtime_format_string, std::make_format_args("foo", "bar")); // OK
    }
```

`std::runtime_format` pode ser usado diretamente em `std::format` em vez de [std::vformat](<#/doc/utility/format/vformat>), que requer [std::basic_format_args](<#/doc/utility/format/basic_format_args>) como argumento.
```cpp
    std::string f(std::string_view runtime_format_string)
    {
        return std::format(std::runtime_format(runtime_format_string), "foo", "bar");
    }
```

| (desde C++26)

### Exemplo

Execute este código
```cpp
    #include <format>
    #include <iostream>
    #include <string>
    #include <string_view>
    
    template<typename... Args>
    std::string dyna_print(std::string_view rt_fmt_str, Args&&... args)
    {
        return std::vformat(rt_fmt_str, std::make_format_args(args...));
    }
    
    int main()
    {
        std::cout << std::format("Hello {}!\n", "world");
    
        std::string fmt;
        for (int i{}; i != 3; ++i)
        {
            fmt += "{} "; // constrói a string de formatação
            std::cout << fmt << " : ";
            std::cout << dyna_print(fmt, "alpha", 'Z', 3.14, "unused");
            std::cout << '\n';
        }
    }
```

Saída:
```
    Hello world!
    {}  : alpha
    {} {}  : alpha Z
    {} {} {}  : alpha Z 3.14
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2216R3](<https://wg21.link/P2216R3>) | C++20 | lança [std::format_error](<#/doc/utility/format/format_error>) para string de formato inválida | string de formato inválida resulta em erro em tempo de compilação
[P2418R2](<https://wg21.link/P2418R2>) | C++20 | objetos que não são nem const-utilizáveis nem copiáveis
(como objetos tipo gerador) não são formatáveis | permite formatar esses objetos
[P2508R1](<https://wg21.link/P2508R1>) | C++20 | não há nome visível para o usuário para esta facilidade | o nome `basic_format_string` é exposto

### Veja também

[ format_to](<#/doc/utility/format/format_to>)(C++20) | escreve a representação formatada de seus argumentos através de um iterador de saída
(modelo de função)
[ format_to_n](<#/doc/utility/format/format_to_n>)(C++20) | escreve a representação formatada de seus argumentos através de um iterador de saída, não excedendo o tamanho especificado
(modelo de função)