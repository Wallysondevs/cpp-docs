# std::basic_format_string, std::format_string, std::wformat_string

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class CharT, class... Args >
struct basic_format_string;
template< class... Args >
using format_string =
basic_format_string<char, std::type_identity_t<Args>...>;
template< class... Args >
using wformat_string =
basic_format_string<wchar_t, std::type_identity_t<Args>...>;
```

O modelo de classe `std::basic_format_string` encapsula um [std::basic_string_view](<#/doc/string/basic_string_view>) que será usado por funções de formatação.

O construtor de `std::basic_format_string` realiza verificações de string de formato em tempo de compilação, a menos que o argumento do construtor seja retornado por [`std::runtime_format`](<#/doc/utility/format/runtime_format>)(desde C++26).

### Funções membro

(construtor) | constrói um `basic_format_string`, gerando erro de compilação se o argumento não for uma string de formato
(função membro pública)
get | retorna a string encapsulada
(função membro pública)

## std::basic_format_string::basic_format_string

```cpp
template< class T >
consteval basic_format_string( const T& s );  // (1)
basic_format_string( /* runtime-format-string */<CharT> s ) noexcept;  // (2) (desde C++26)
```

1) Constrói um objeto `basic_format_string` que armazena uma view da string s. Se o argumento não for uma constante em tempo de compilação, ou se não puder ser analisado como uma string de formato para os tipos de argumento de formatação `Args`, a construção é malformada.

Esta sobrecarga participa da resolução de sobrecarga apenas se const T& modelar [std::convertible_to](<#/doc/concepts/convertible_to>)<[std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt;>.

2) Constrói um objeto `basic_format_string` que armazena uma view da string s conforme retornado por std::runtime_format. Ele não realiza verificações de string de formato na construção.

### Parâmetros

- **s** — um objeto que representa a string de formato. A string de formato consiste em

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

- **arg-id** — especifica o índice do argumento em `args` cujo valor deve ser usado para formatação; se for omitido, os argumentos são usados em ordem. Os arg-id s em uma string de formato devem estar todos presentes ou todos omitidos. Misturar indexação manual e automática é um erro.
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

## std::basic_format_string::get

constexpr [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt; get() const noexcept;

Retorna a string view armazenada.

### Notas

Os modelos de alias `format_string` e `wformat_string` usam std::type_identity_t para inibir a dedução de argumentos de modelo. Tipicamente, quando aparecem como um parâmetro de função, seus argumentos de modelo são deduzidos de outros argumentos de função.
```cpp
    template<class... Args>
    std::string format(std::format_string<Args...> fmt, Args&&... args);
    
    auto s = format("{} {}", 1.0, 2);
    // Calls format<double, int>. Args are deduced from 1.0, 2
    // Due to the use of type_identity_t in format_string, template argument deduction
    // does not consider the type of the format string.
```

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2508R1](<https://wg21.link/P2508R1>) | C++20 | não há nome visível para o usuário para esta facilidade | o nome `basic_format_string` é exposto