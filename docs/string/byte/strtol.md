# std::strtol, std::strtoll

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
long strtol( const char* str, char** str_end, int base );
long long strtoll( const char* str, char** str_end, int base );
```

Interpreta um valor inteiro em uma string de bytes apontada por str.

Descarta quaisquer caracteres de espaço em branco (identificados pela chamada de [`std::isspace`](<#/doc/string/byte/isspace>)) até que o primeiro caractere não-espaço em branco seja encontrado, então pega o máximo de caracteres possível para formar uma representação numérica inteira válida de _base-n_ (onde n=`base`) e os converte para um valor inteiro. O valor inteiro válido consiste nas seguintes partes:

*   (opcional) sinal de mais ou menos
*   (opcional) prefixo (`0`) indicando base octal (aplica-se apenas quando a base é 8 ou ​0​)
*   (opcional) prefixo (`0x` ou `0X`) indicando base hexadecimal (aplica-se apenas quando a base é 16 ou ​0​)
*   uma sequência de dígitos

O conjunto de valores válidos para base é `{0, 2, 3, ..., 36}`. O conjunto de dígitos válidos para inteiros de base-`2` é `{0, 1}`, para inteiros de base-`3` é `{0, 1, 2}`, e assim por diante. Para bases maiores que `10`, os dígitos válidos incluem caracteres alfabéticos, começando de `Aa` para inteiros de base-`11`, até `Zz` para inteiros de base-`36`. A distinção entre maiúsculas e minúsculas dos caracteres é ignorada.

Formatos numéricos adicionais podem ser aceitos pelo [locale](<#/doc/locale/setlocale>) C atualmente instalado.

Se o valor de `base` for ​0​, a base numérica é auto-detectada: se o prefixo for `0`, a base é octal; se o prefixo for `0x` ou `0X`, a base é hexadecimal; caso contrário, a base é decimal.

Se o sinal de menos fez parte da sequência de entrada, o valor numérico calculado a partir da sequência de dígitos é negado como se por [menos unário](<#/doc/language/operator_arithmetic>) no tipo de resultado.

A função define o ponteiro apontado por str_end para apontar para o caractere após o último caractere interpretado. Se str_end for um ponteiro nulo, ele é ignorado.

Se str estiver vazio ou não tiver o formato esperado, nenhuma conversão é realizada e (se str_end não for um ponteiro nulo) o valor de str é armazenado no objeto apontado por str_end.

### Parâmetros

- **str** — ponteiro para a string de bytes terminada em nulo a ser interpretada
- **str_end** — ponteiro para um ponteiro para caractere
- **base** — _base_ do valor inteiro interpretado

### Valor de retorno

*   Se bem-sucedido, um valor inteiro correspondente ao conteúdo de str é retornado.
*   Se o valor convertido estiver fora do intervalo do tipo de retorno correspondente, ocorre um erro de intervalo (definindo [errno](<#/doc/error/errno>) para [ERANGE](<#/doc/error/errno_macros>)) e [LONG_MAX](<#/doc/types/climits>), [LONG_MIN](<#/doc/types/climits>), [LLONG_MAX](<#/doc/types/climits>) ou [LLONG_MIN](<#/doc/types/climits>) é retornado.
*   Se nenhuma conversão puder ser realizada, ​0​ é retornado.

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <cstdlib>
    #include <iomanip>
    #include <iostream>
    #include <string>
    
    int main()
    {
        const char* p = "10 200000000000000000000000000000 30 -40";
        std::cout << "Parsing " << std::quoted(p) << ":\n";
    
        for (;;)
        {
            // errno can be set to any non-zero value by a library function call
            // regardless of whether there was an error, so it needs to be cleared
            // in order to check the error set by strtol
            errno = 0;
            char* p_end{};
            const long i = std::strtol(p, &p_end, 10);
            if (p == p_end)
                break;
    
            const bool range_error = errno == ERANGE;
            const std::string extracted(p, p_end - p);
            p = p_end;
    
            std::cout << "Extracted " << std::quoted(extracted)
                      << ", strtol returned " << i << '.';
            if (range_error)
                std::cout << "\n  Range error occurred.";
    
            std::cout << '\n';
        }
    }
```

Saída possível:
```
    Parsing "10 200000000000000000000000000000 30 -40":
    Extracted "10", strtol returned 10.
    Extracted " 200000000000000000000000000000", strtol returned 9223372036854775807.
      Range error occurred.
    Extracted " 30", strtol returned 30.
    Extracted " -40", strtol returned -40.
```

### Veja também

[ stoistolstoll](<#/doc/string/basic_string/stol>)(C++11)(C++11)(C++11) | converte uma string para um inteiro com sinal
(função)
[ strtoulstrtoull](<#/doc/string/byte/strtoul>)(C++11) | converte uma string de bytes para um valor inteiro sem sinal
(função)
[ strtoimaxstrtoumax](<#/doc/string/byte/strtoimax>)(C++11)(C++11) | converte uma string de bytes para [std::intmax_t](<#/doc/types/integer>) ou [std::uintmax_t](<#/doc/types/integer>)
(função)
[ wcstolwcstoll](<#/doc/string/wide/wcstol>) | converte uma wide string para um valor inteiro
(função)
[ strtofstrtodstrtold](<#/doc/string/byte/strtof>) | converte uma string de bytes para um valor de ponto flutuante
(função)
[ from_chars](<#/doc/utility/from_chars>)(C++17) | converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante
(função)
[ atoiatolatoll](<#/doc/string/byte/atoi>)(C++11) | converte uma string de bytes para um valor inteiro
(função)
[Documentação C](<#/>) para strtol, strtoll