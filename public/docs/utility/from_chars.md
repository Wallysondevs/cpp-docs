# std::from_chars

Definido no cabeçalho `[<charconv>](<#/doc/header/charconv>)`

```c
std::from_chars_result
from_chars( const char* first, const char* last,
/* integer-type */& value, int base = 10 );
(constexpr desde C++23)
std::from_chars_result
from_chars( const char* first, const char* last,
/* floating-point-type */& value,
std::chars_format fmt = std::chars_format::general );
```

  
Analisa a sequência de caracteres `[`first`, `last`)` em busca de um padrão descrito abaixo. Se nenhum caractere corresponder ao padrão ou se o valor obtido pela análise dos caracteres correspondentes não for representável no tipo de `value`, `value` permanece inalterado; caso contrário, os caracteres correspondentes ao padrão são interpretados como uma representação textual de um valor aritmético, que é armazenado em `value`.

1) Analisadores de inteiros: Espera o padrão idêntico ao usado por [std::strtol](<#/doc/string/byte/strtol>) no locale padrão ("C") e na base numérica não-zero fornecida, exceto que:

  * prefixos "0x" ou "0X" não são reconhecidos se `base` for 16
  * apenas o sinal de menos é reconhecido (não o sinal de mais), e apenas para tipos inteiros com sinal de `value`
  * espaços em branco iniciais não são ignorados.

A biblioteca fornece sobrecargas para todos os tipos inteiros com e sem sinal e `char` sem qualificadores cv (desde C++23) como o tipo referenciado do parâmetro `value`.

2) Analisadores de ponto flutuante: Espera o padrão idêntico ao usado por [std::strtod](<#/doc/string/byte/strtof>) no locale padrão ("C"), exceto que:

  * o sinal de mais não é reconhecido fora do expoente (apenas o sinal de menos é permitido no início)
  * se `fmt` tiver [`std::chars_format::scientific`](<#/doc/utility/chars_format>) definido, mas não [`std::chars_format::fixed`](<#/doc/utility/chars_format>), a parte do expoente é obrigatória (caso contrário, é opcional)
  * se `fmt` tiver [`std::chars_format::fixed`](<#/doc/utility/chars_format>) definido, mas não [`std::chars_format::scientific`](<#/doc/utility/chars_format>), o expoente opcional não é permitido
  * se `fmt` for [`std::chars_format::hex`](<#/doc/utility/chars_format>), o prefixo "0x" ou "0X" não é permitido (a string "0x123" é analisada como o valor "0" com o resto não analisado "x123")
  * espaços em branco iniciais não são ignorados.

Em qualquer caso, o valor resultante é um dos, no máximo, dois valores de ponto flutuante mais próximos do valor da string que corresponde ao padrão, após arredondamento de acordo com [std::round_to_nearest](<#/doc/types/numeric_limits/float_round_style>).

A biblioteca fornece sobrecargas para todos os tipos de ponto flutuante padrão sem qualificadores cv (até C++23) como o tipo referenciado do parâmetro `value`.

### Parâmetros

first, last  |  \-  |  intervalo de caracteres válido para analisar   
---|---|---
value  |  \-  |  o parâmetro de saída onde o valor analisado é armazenado se bem-sucedido   
base  |  \-  |  base inteira a ser usada: um valor entre 2 e 36 (inclusive).   
fmt  |  \-  |  formatação de ponto flutuante a ser usada, uma máscara de bits do tipo [`std::chars_format`](<#/doc/utility/chars_format>)  
  
### Valor de retorno

Em caso de sucesso, retorna um valor do tipo [`std::from_chars_result`](<#/doc/utility/from_chars_result>) tal que `ptr` aponta para o primeiro caractere que não corresponde ao padrão, ou tem o valor igual a `last` se todos os caracteres corresponderem e `ec` for inicializado por valor.

Se não houver correspondência de padrão, retorna um valor do tipo [`std::from_chars_result`](<#/doc/utility/from_chars_result>) tal que `ptr` é igual a `first` e `ec` é igual a [std::errc::invalid_argument](<#/doc/error/errc>). `value` permanece inalterado.

Se o padrão foi correspondido, mas o valor analisado não está no intervalo representável pelo tipo de `value`, retorna um valor do tipo [`std::from_chars_result`](<#/doc/utility/from_chars_result>) tal que `ec` é igual a [std::errc::result_out_of_range](<#/doc/error/errc>) e `ptr` aponta para o primeiro caractere que não corresponde ao padrão. `value` permanece inalterado.

### Exceções

Não lança exceções.

### Notas

Ao contrário de outras funções de análise em bibliotecas C++ e C, `std::from_chars` é independente de locale, não aloca memória e não lança exceções. Apenas um pequeno subconjunto das políticas de análise usadas por outras bibliotecas (como [std::sscanf](<#/doc/io/c/scanf>)) é fornecido. Isso tem como objetivo permitir a implementação mais rápida possível, útil em contextos comuns de alto rendimento, como intercâmbio baseado em texto ([JSON](<https://en.wikipedia.org/wiki/JSON> "enwiki:JSON") ou [XML](<https://en.wikipedia.org/wiki/XML> "enwiki:XML")).

A garantia de que `std::from_chars` pode recuperar exatamente cada valor de ponto flutuante formatado por [`std::to_chars`](<#/doc/utility/to_chars>) é fornecida apenas se ambas as funções forem da mesma implementação.

Um padrão que consiste em um sinal sem dígitos seguintes é tratado como um padrão que não correspondeu a nada.

Macro de [teste de recurso](<#/doc/utility/feature_test>)  | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_to_chars`](<#/doc/feature_test>) | [`201611L`](<#/>) | (C++17) | Conversões de string elementares (`std::from_chars`, [`std::to_chars`](<#/doc/utility/to_chars>))   
[`202306L`](<#/>) | (C++26) | Testando sucesso ou falha das funções de [`<charconv>`](<#/doc/header/charconv>)   
[`__cpp_lib_constexpr_charconv`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Adiciona modificadores constexpr a sobrecargas de `std::from_chars` e [`std::to_chars`](<#/doc/utility/to_chars>) para tipos integrais   
  
### Exemplo

Execute este código
```
    #include <cassert>
    #include <charconv>
    #include <iomanip>
    #include <iostream>
    #include <optional>
    #include <string_view>
    #include <system_error>
     
    int main()
    {
        for (std::string_view const str : {"1234", "15 foo", "bar", " 42", "5000000000"})
        {
            std::cout << "String: " << std::quoted(str) << ". ";
            int result{};
            auto [ptr, ec] = std::from_chars(str.data(), str.data() + str.size(), result);
     
            if (ec == std::errc())
                std::cout << "Result: " << result << ", ptr -> " << std::quoted(ptr) << '\n';
            else if (ec == std::errc::invalid_argument)
                std::cout << "Isto não é um número.\n";
            else if (ec == std::errc::result_out_of_range)
                std::cout << "Este número é maior que um int.\n";
        }
     
        // Demonstração de constexpr from_char do C++23 / Demonstração de operator bool() do C++26:
        auto to_int =  s) -> std::optional<int>
        {
            int value{};
    #if __cpp_lib_to_chars >= 202306L
            if (std::from_chars(s.data(), s.data() + s.size(), value))
    #else
            if (std::from_chars(s.data(), s.data() + s.size(), value).ec == std::errc{})
    #endif
                return value;
            else
                return std::nullopt;
        };
     
        assert(to_int("42") == 42);
        assert(to_int("foo") == std::nullopt);
    #if __cpp_lib_constexpr_charconv and __cpp_lib_optional >= 202106
        static_assert(to_int("42") == 42);
        static_assert(to_int("foo") == std::nullopt);
    #endif
    }
```

Saída: 
```
    String: "1234". Result: 1234, ptr -> ""
    String: "15 foo". Result: 15, ptr -> " foo"
    String: "bar". Isto não é um número.
    String: " 42". Isto não é um número.
    String: "5000000000". Este número é maior que um int.
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2955](<https://cplusplus.github.io/LWG/issue2955>) | C++17  | esta função estava em [`<utility>`](<#/doc/header/utility>) e usava [std::error_code](<#/doc/error/error_code>) | movida para [`<charconv>`](<#/doc/header/charconv>) e usa [std::errc](<#/doc/error/errc>)  
[LWG 3373](<https://cplusplus.github.io/LWG/issue3373>) | C++17  | `std::from_chars_result` poderia ter membros adicionais  | membros adicionais são proibidos   
  
### Veja também

[ from_chars_result](<#/doc/utility/from_chars_result>)(C++17) |  o tipo de retorno de `std::from_chars`   
(classe)  
[ to_chars](<#/doc/utility/to_chars>)(C++17) |  converte um valor inteiro ou de ponto flutuante para uma sequência de caracteres   
(função)  
[ stoistolstoll](<#/doc/string/basic_string/stol>)(C++11)(C++11)(C++11) |  converte uma string para um inteiro com sinal   
(função)  
[ stofstodstold](<#/doc/string/basic_string/stof>)(C++11)(C++11)(C++11) |  converte uma string para um valor de ponto flutuante   
(função)  
[ strtolstrtoll](<#/doc/string/byte/strtol>)(C++11) |  converte uma string de bytes para um valor inteiro   
(função)  
[ strtofstrtodstrtold](<#/doc/string/byte/strtof>) |  converte uma string de bytes para um valor de ponto flutuante   
(função)  
[ scanffscanfsscanf](<#/doc/io/c/scanf>) |  lê entrada formatada de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer   
(função)  
[ operator>>](<#/doc/io/basic_istream/operator_gtgt>) |  extrai dados formatados   
(função membro pública de `std::basic_istream<CharT,Traits>`)