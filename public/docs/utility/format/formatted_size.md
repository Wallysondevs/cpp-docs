# std::formatted_size

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class... Args >
std::size_t formatted_size( std::format_string<Args...> fmt, Args&&... args );
template< class... Args >
std::size_t formatted_size( std::wformat_string<Args...> fmt, Args&&... args );
template< class... Args >
std::size_t formatted_size( const std::locale& loc,
std::format_string<Args...> fmt, Args&&... args );
template< class... Args >
std::size_t formatted_size( const std::locale& loc,
std::wformat_string<Args...> fmt, Args&&... args );
```

Determina o número total de caracteres na string formatada, formatando `args` de acordo com a string de formato `fmt`. Se presente, `loc` é usado para formatação específica da locale.

O comportamento é indefinido se `[std::formatter](<#/doc/utility/format/formatter>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<Ti>, CharT>` não atender aos requisitos de `[BasicFormatter](<#/doc/named_req/BasicFormatter>)` para qualquer `Ti` em `Args`.

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
- **format-spec** — a especificação de formato definida pela especialização de `[std::formatter](<#/doc/utility/format/formatter>)` para o argumento correspondente. Não pode começar com }.
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

- **args...** — argumentos a serem formatados
- **loc** — `[std::locale](<#/doc/locale/locale>)` usado para formatação específica da locale

### Valor de retorno

O número total de caracteres na string formatada.

### Exceções

Propaga qualquer exceção lançada por formatter.

### Exemplo

Execute este código
```cpp
    #include <format>
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    #include <vector>
    
    int main()
    {
        using namespace std::literals::string_view_literals;
    
        constexpr auto fmt_str{"Hubble's H{0} {1} {2:*^4} miles/sec/mpc."sv};
        constexpr auto sub_zero{"\N{SUBSCRIPT ZERO}"sv}; // "₀" or {0342, 130, 128}
        constexpr auto aprox_equ{"\N{APPROXIMATELY EQUAL TO}"sv}; // "≅" or {0342, 137, 133}
        constexpr int Ho{42}; // H₀
    
        const auto min_buffer_size{std::formatted_size(fmt_str, sub_zero, aprox_equ, Ho)};
        std::cout << "Min buffer size = " << min_buffer_size << '\n';
    
        // Use std::vector as dynamic buffer. The buffer does not include the trailing '\0'.
        std::vector<char> buffer(min_buffer_size);
    
        std::format_to_n(buffer.data(), buffer.size(), fmt_str, sub_zero, aprox_equ, Ho);
        std::cout << "Buffer: "
                  << std::quoted(std::string_view{buffer.data(), min_buffer_size})
                  << '\n';
    
        // Print the buffer directly after adding the trailing '\0'.
        buffer.push_back('\0');
        std::cout << "Buffer: " << std::quoted(buffer.data()) << '\n';
    }
```

Saída:
```
    Min buffer size = 37
    Buffer: "Hubble's H₀ ≅ *42* miles/sec/mpc."
    Buffer: "Hubble's H₀ ≅ *42* miles/sec/mpc."
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P2216R3](<https://wg21.link/P2216R3>) | C++20 | lança `[std::format_error](<#/doc/utility/format/format_error>)` para string de formato inválida | string de formato inválida resulta em erro em tempo de compilação
[P2418R2](<https://wg21.link/P2418R2>) | C++20 | objetos que não são nem const-utilizáveis nem copiáveis (como objetos tipo gerador) não são formatáveis | permite formatar esses objetos
[P2508R1](<https://wg21.link/P2508R1>) | C++20 | não há nome visível para o usuário para esta facilidade | o nome `basic_format_string` é exposto

### Veja também

[ format_to](<#/doc/utility/format/format_to>)(C++20) | escreve a representação formatada de seus argumentos através de um iterator de saída
(modelo de função)
[ format_to_n](<#/doc/utility/format/format_to_n>)(C++20) | escreve a representação formatada de seus argumentos através de um iterator de saída, não excedendo o tamanho especificado
(modelo de função)