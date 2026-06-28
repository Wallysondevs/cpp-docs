# std::vformat_to

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class OutputIt >
OutputIt vformat_to( OutputIt out, std::string_view fmt, std::format_args args );
template< class OutputIt >
OutputIt vformat_to( OutputIt out, std::wstring_view fmt, std::wformat_args args );
template< class OutputIt >
OutputIt vformat_to( OutputIt out, const std::locale& loc,
std::string_view fmt, std::format_args args );
template< class OutputIt >
OutputIt vformat_to( OutputIt out, const std::locale& loc,
std::wstring_view fmt, std::wformat_args args );
```

Formata os argumentos contidos em `args` de acordo com a string de formato `fmt`, e escreve o resultado no iterator de saída `out`. Se presente, `loc` é usado para formatação específica de locale.

Seja `CharT` decltype(fmt)::char_type (char para as sobrecargas (1,3), wchar_t para as sobrecargas (2,4)).

Essas sobrecargas participam da resolução de sobrecarga somente se `OutputIt` satisfaz o concept [std::output_iterator](<#/doc/iterator/output_iterator>)&lt;const CharT&&gt;.

`OutputIt` deve modelar (atender aos requisitos semânticos de) o concept [std::output_iterator](<#/doc/iterator/output_iterator>)&lt;const CharT&&gt;, e [std::formatter](<#/doc/utility/format/formatter>)<Ti, CharT> deve atender aos requisitos [Formatter](<#/doc/named_req/Formatter>) para qualquer `Ti` no tipo dos argumentos. Caso contrário, o comportamento é indefinido.

### Parâmetros

- **out** — iterator para o buffer de saída
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

- **arg-id** — especifica o índice do argumento em `args` cujo valor deve ser usado para formatação; se for omitido, os argumentos são usados em ordem. Os arg-id's em uma string de formato devem estar todos presentes ou todos omitidos. Misturar indexação manual e automática é um erro.
- **format-spec** — a especificação de formato definida pela especialização [std::formatter](<#/doc/utility/format/formatter>) para o argumento correspondente. Não pode começar com }.

  * Para tipos básicos e tipos de string padrão, a especificação de formato é interpretada como [especificação de formato padrão](<#/doc/utility/format/spec>).
  * Para tipos chrono, a especificação de formato é interpretada como [especificação de formato chrono](<#/doc/chrono/system_clock/formatter>).
  * Para tipos range, a especificação de formato é interpretada como [especificação de formato range](<#/doc/utility/format/range_formatter>).
  * Para [std::pair](<#/doc/utility/pair>) e [std::tuple](<#/doc/utility/tuple>), a especificação de formato é interpretada como [especificação de formato tuple](<#/doc/utility/format/tuple_formatter>).
  * Para [std::thread::id](<#/doc/thread/thread/id>) e [`std::stacktrace_entry`](<#/doc/utility/stacktrace_entry>), veja [especificação de formato thread id](<#/doc/thread/thread/id/formatter>) e [especificação de formato stacktrace entry](<#/doc/utility/stacktrace_entry/formatter>).
  * Para [`std::basic_stacktrace`](<#/doc/utility/basic_stacktrace>), nenhum especificador de formato é permitido.

| (desde C++23)

  * Para [`std::filesystem::path`](<#/doc/filesystem/path>), veja [especificação de formato path](<#/doc/filesystem/path/formatter>).

| (desde C++26)

  * Para outros tipos formatáveis, a especificação de formato é determinada por especializações `formatter` definidas pelo usuário.

- **args** — argumentos a serem formatados
- **loc** — [std::locale](<#/doc/locale/locale>) usado para formatação específica de locale

### Valor de retorno

Iterator após o final do range de saída.

### Exceções

Lança [std::format_error](<#/doc/utility/format/format_error>) se `fmt` não for uma string de formato válida para os argumentos fornecidos. Também propaga qualquer exceção lançada por operações de formatter ou iterator.

### Exemplo

| Esta seção está incompleta
Motivo: sem exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2216R3](<https://wg21.link/P2216R3>) | C++20 | o tipo de args é parametrizado em `OutputIt` | não parametrizado

### Veja também