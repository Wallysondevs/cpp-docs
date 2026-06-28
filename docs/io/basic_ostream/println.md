# std::println(std::ostream)

Definido no header `[<ostream>](<#/doc/header/ostream>)`

```cpp
template< class... Args >
void println( std::ostream& os, std::format_string<Args...> fmt, Args&&... args );  // (1) (desde C++23)
void println( std::ostream& os );  // (2) (desde C++26)
```

Formata `args` de acordo com a string de formato `fmt` com '\n' anexado (o que significa que cada saída termina com uma nova linha), e insere o resultado no stream `os`.

1) Equivalente a: [`std::print`](<#/doc/io/basic_ostream/print>)(os, "{}\n", [std::format](<#/doc/utility/format/format>)(os.getloc(), fmt, args...));

2) Equivalente a: [`std::print`](<#/doc/io/basic_ostream/print>)(os, "\n");

O comportamento é indefinido se [std::formatter](<#/doc/utility/format/formatter>)<Ti, char> não atender aos requisitos de [BasicFormatter](<#/doc/named_req/BasicFormatter>) para qualquer `Ti` em `Args` (conforme exigido por [std::make_format_args](<#/doc/utility/format/make_format_args>)).

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

- **arg-id** — especifica o índice do argumento em `args` cujo valor deve ser usado para formatação; se for omitido, os argumentos são usados em ordem. Os arg-id s em uma string de formato devem estar todos presentes ou todos omitidos. Misturar indexação manual e automática é um erro.
- **format-spec** — a especificação de formato definida pela especialização [std::formatter](<#/doc/utility/format/formatter>) para o argumento correspondente. Não pode começar com }.

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
  * Propaga qualquer exceção lançada por qualquer [formatter](<#/doc/utility/format/formatter>), por exemplo, [std::format_error](<#/doc/utility/format/format_error>), sem considerar o valor de os.exceptions() e sem ativar [ios_base::badbit](<#/doc/io/ios_base/iostate>) no estado de erro de os.
  * Pode lançar [ios_base::failure](<#/doc/io/ios_base/failure>) causada por os.setstate(ios_base::badbit), que é chamada se uma inserção em os falhar.

### Notas

Embora a sobrecarga ([2](<#/doc/io/basic_ostream/println>)) seja adicionada no C++26, todas as implementações conhecidas a disponibilizam no modo C++23.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_print`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Saída formatada
[`__cpp_lib_format`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Expondo std::basic_format_string

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 4088](<https://cplusplus.github.io/LWG/issue4088>) | C++23 | ([1](<#/doc/io/basic_ostream/println>)) ignorava o locale imbuído em os nos argumentos de formatação | tal locale é usado

### Veja também

[ print(std::ostream)](<#/doc/io/basic_ostream/print>)(C++23) | gera representação [formatada](<#/doc/utility/format>) dos argumentos
(modelo de função)
[ println](<#/doc/io/println>)(C++23) | o mesmo que std::print, exceto que cada impressão é terminada por uma nova linha adicional
(modelo de função)
[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)