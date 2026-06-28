# std::format_to_n, std::format_to_n_result

Definido no header `[<format>](<#/doc/header/format>)`

```cpp
template< class OutputIt, class... Args >
std::format_to_n_result<OutputIt>
format_to_n( OutputIt out, std::iter_difference_t<OutputIt> n,
std::format_string<Args...> fmt, Args&&... args );  // (1) (desde C++20)
template< class OutputIt, class... Args >
std::format_to_n_result<OutputIt>
format_to_n( OutputIt out, std::iter_difference_t<OutputIt> n,
std::wformat_string<Args...> fmt, Args&&... args );  // (2) (desde C++20)
template< class OutputIt, class... Args >
std::format_to_n_result<OutputIt>
format_to_n( OutputIt out, std::iter_difference_t<OutputIt> n,
const std::locale& loc,
std::format_string<Args...> fmt, Args&&... args );  // (3) (desde C++20)
template< class OutputIt, class... Args >
std::format_to_n_result<OutputIt>
format_to_n( OutputIt out, std::iter_difference_t<OutputIt> n,
const std::locale& loc,
std::wformat_string<Args...> fmt, Args&&... args );  // (4) (desde C++20)
Tipos auxiliares
template< class OutputIt >
struct format_to_n_result {
OutputIt out;
std::iter_difference_t<OutputIt> size;
};  // (5) (desde C++20)
```

  
Formata os argumentos de acordo com a string de formato `fmt`, e escreve o resultado no iterator de saída `out`. No máximo `n` caracteres são escritos. Se presente, `loc` é usado para formatação específica de locale.

Seja `CharT` char para as sobrecargas (1,3), `wchar_t` para as sobrecargas (2,4).

Essas sobrecargas participam da resolução de sobrecarga apenas se `OutputIt` satisfizer o concept [std::output_iterator](<#/doc/iterator/output_iterator>)&lt;const CharT&&gt;.

O comportamento é indefinido se `OutputIt` não modelar (atender aos requisitos semânticos de) o concept [std::output_iterator](<#/doc/iterator/output_iterator>)&lt;const CharT&&gt;, ou se [std::formatter](<#/doc/utility/format/formatter>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;Ti&gt;, CharT> não atender aos requisitos [BasicFormatter](<#/doc/named_req/BasicFormatter>) para qualquer `Ti` em `Args`.

5) `std::format_to_n_result` não possui classes base, ou membros além de `out`, `size` e funções membro especiais implicitamente declaradas.

### Parâmetros

out  |  \-  |  iterator para o buffer de saída   
---|---|---
n  |  \-  |  número máximo de caracteres a serem escritos no buffer   
fmt  |  \-  |  um objeto que representa a string de formato. A string de formato consiste em 

  * caracteres comuns (exceto { e }), que são copiados inalterados para a saída, 
  * sequências de escape {{ e }}, que são substituídas por { e } respectivamente na saída, e 
  * campos de substituição. 

Cada campo de substituição tem o seguinte formato:  |   
---  
`{` arg-id (opcional) `}` |  (1)  |   
---|---|---
`{` arg-id (opcional) `:` format-spec `}` |  (2)  |   
  
1) campo de substituição sem uma especificação de formato

2) campo de substituição com uma especificação de formato

arg-id |  \-  |  especifica o índice do argumento em `args` cujo valor deve ser usado para formatação; se for omitido, os argumentos são usados em ordem. Os arg-ids em uma string de formato devem estar todos presentes ou todos omitidos. Misturar indexação manual e automática é um erro.   
---|---|---
format-spec |  \-  |  a especificação de formato definida pela especialização [std::formatter](<#/doc/utility/format/formatter>) para o argumento correspondente. Não pode começar com }.   
  
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

  
args...  |  \-  |  argumentos a serem formatados   
---|---|---
loc  |  \-  |  [std::locale](<#/doc/locale/locale>) usado para formatação específica de locale   
  
### Valor de retorno

Um `format_to_n_result` tal que o membro `out` é um iterator após o final do range de saída, e o membro `size` é o tamanho total (não truncado) da saída.

### Exceções

Propaga qualquer exceção lançada por operações de formatter ou iterator.

### Notas

A implementação libstdc++ anterior ao GCC-13.3 tinha um [bug](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=110990>) ao reportar o valor correto de `format_to_n_result::out`.

### Exemplo

No Godbolt's Compiler Explorer: [clang (trunk) + libc++](<https://godbolt.org/z/s7a5d76ET>), [GCC (trunk) + libstdc++](<https://godbolt.org/z/bdvxnPb1T>).

Execute este código
```
    #include <format>
    #include <initializer_list>
    #include <iomanip>
    #include <iostream>
    #include <string_view>
     
    int main()
    {
        char buffer[64];
     
        for (std::size_t max_chars_to_write : {std::size(buffer) - 1, 23uz, 21uz})
        {
            const std::format_to_n_result result =
                std::format_to_n(
                    buffer, max_chars_to_write,
                    "Hubble's H{2} {3} {0}{4}{1} km/sec/Mpc.", // 24 bytes w/o formatters
                    71,       // {0}, occupies 2 bytes
                    8,        // {1}, occupies 1 byte
                    "\u2080", // {2}, occupies 3 bytes, '₀' (SUBSCRIPT ZERO)
                    "\u2245", // {3}, occupies 3 bytes, '≅' (APPROXIMATELY EQUAL TO)
                    "\u00B1"  // {4}, occupies 2 bytes, '±' (PLUS-MINUS SIGN)
                    ); // 24 + 2 + 1 + 3 + 3 + 2 == 35, no trailing '\0'
     
            *result.out = '\0'; // adds terminator to buffer
     
            const std::string_view str(buffer, result.out);
     
            std::cout << "Buffer until '\\0': " << std::quoted(str) << '\n'
                      << "Max chars to write: " << max_chars_to_write << '\n'
                      << "result.out offset: " << result.out - buffer << '\n'
                      << "Untruncated output size: " << result.size << "\n\n";
        }
    }
```

Output: 
```
    Buffer until '\0': "Hubble's H₀ ≅ 71±8 km/sec/Mpc."
    Max chars to write: 63
    result.out offset: 35
    Untruncated output size: 35
     
    Buffer until '\0': "Hubble's H₀ ≅ 71±8"
    Max chars to write: 23
    result.out offset: 23
    Untruncated output size: 35
     
    Buffer until '\0': "Hubble's H₀ ≅ 71"
    Max chars to write: 21
    result.out offset: 21
    Untruncated output size: 35
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2216R3](<https://wg21.link/P2216R3>) | C++20  | lança [std::format_error](<#/doc/utility/format/format_error>) para string de formato inválida  | string de formato inválida resulta em erro em tempo de compilação   
[P2418R2](<https://wg21.link/P2418R2>) | C++20  | objetos que não são nem const-utilizáveis nem copiáveis  
(como objetos tipo gerador) não são formatáveis  | permite formatar esses objetos   
[P2508R1](<https://wg21.link/P2508R1>) | C++20  | não há nome visível para o usuário para esta facilidade  | o nome `basic_format_string` é exposto   
  
### Veja também

[ format](<#/doc/utility/format/format>)(C++20) |  armazena a representação formatada dos argumentos em uma nova string   
(modelo de função)  
[ format_to](<#/doc/utility/format/format_to>)(C++20) |  escreve a representação formatada de seus argumentos através de um iterator de saída   
(modelo de função)  
[ formatted_size](<#/doc/utility/format/formatted_size>)(C++20) |  determina o número de caracteres necessários para armazenar a representação formatada de seus argumentos   
(modelo de função)