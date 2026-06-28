# std::strtoul, std::strtoull

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
unsigned long strtoul ( const char* str, char** str_end, int base );
unsigned long long strtoull( const char* str, char** str_end, int base );
```

Interpreta um valor inteiro sem sinal em uma string de bytes apontada por `str`.

Descarta quaisquer caracteres de espaço em branco (identificados pela chamada a [`std::isspace`](<#/doc/string/byte/isspace>)) até que o primeiro caractere não-espaço em branco seja encontrado, então pega o máximo de caracteres possível para formar uma representação de número inteiro sem sinal válida de _base-n_ (onde n=`base`) e os converte para um valor inteiro. O valor inteiro sem sinal válido consiste nas seguintes partes:

*   (opcional) sinal de mais ou menos
*   (opcional) prefixo (`0`) indicando base octal (aplica-se apenas quando a base é 8 ou ​0​)
*   (opcional) prefixo (`0x` ou `0X`) indicando base hexadecimal (aplica-se apenas quando a base é 16 ou ​0​)
*   uma sequência de dígitos

O conjunto de valores válidos para `base` é `{0, 2, 3, ..., 36}`. O conjunto de dígitos válidos para inteiros de base-`2` é `{0, 1}`, para inteiros de base-`3` é `{0, 1, 2}`, e assim por diante. Para bases maiores que `10`, os dígitos válidos incluem caracteres alfabéticos, começando de `Aa` para inteiros de base-`11`, até `Zz` para inteiros de base-`36`. A distinção entre maiúsculas e minúsculas dos caracteres é ignorada.

Formatos numéricos adicionais podem ser aceitos pelo [locale](<#/doc/locale/setlocale>) C atualmente instalado.

Se o valor de `base` for ​0​, a base numérica é auto-detectada: se o prefixo for `0`, a base é octal; se o prefixo for `0x` ou `0X`, a base é hexadecimal; caso contrário, a base é decimal.

Se o sinal de menos fez parte da sequência de entrada, o valor numérico calculado a partir da sequência de dígitos é negado como se por [menos unário](<#/doc/language/operator_arithmetic>) no tipo de resultado, o que aplica as regras de *wraparound* de inteiros sem sinal.

As funções definem o ponteiro apontado por `str_end` para apontar para o caractere após o último caractere interpretado. Se `str_end` for um ponteiro nulo, ele é ignorado.

### Parâmetros

- **str** — ponteiro para a string de bytes terminada em nulo a ser interpretada
- **str_end** — ponteiro para um ponteiro para caractere, pode ser definido para uma posição após o último caractere interpretado
- **base** — _base_ do valor inteiro interpretado

### Valor de retorno

Valor inteiro correspondente ao conteúdo de `str` em caso de sucesso. Se o valor convertido estiver fora do intervalo do tipo de retorno correspondente, ocorre um erro de intervalo ([errno](<#/doc/error/errno>) é definido como `ERANGE`) e [ULONG_MAX](<#/doc/types/climits>) ou [ULLONG_MAX](<#/doc/types/climits>) é retornado. Se nenhuma conversão puder ser realizada, ​0​ é retornado.

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <errno.h>
    #include <iostream>
    #include <string>
     
    int main()
    {
        const char* p = "10 200000000000000000000000000000 30 -40 - 42";
        char* end = nullptr;
        std::cout << "Parsing '" << p << "':\n";
        for (unsigned long i = std::strtoul(p, &end, 10);
            p != end;
            i = std::strtoul(p, &end, 10))
        {
            std::cout << "'" << std::string(p, end - p) << "' -> ";
            p = end;
            if (errno == ERANGE)
            {
                errno = 0;
                std::cout << "range error, got ";
            }
            std::cout << i << '\n';
        }
        std::cout << "After the loop p points to '" << p << "'\n";
    }
```

Saída possível:
```
    Parsing '10 200000000000000000000000000000 30 -40 - 42':
    '10' -> 10
    ' 200000000000000000000000000000' -> range error, got 18446744073709551615
    ' 30' -> 30
    ' -40' -> 18446744073709551576
    After the loop p points to ' - 42'
```

### Veja também

[ stoulstoull](<#/doc/string/basic_string/stoul>)(C++11)(C++11) | converte uma string para um inteiro sem sinal
---|---
(função) |
[ strtolstrtoll](<#/doc/string/byte/strtol>)(C++11) | converte uma string de bytes para um valor inteiro
(função) |
[ strtoimaxstrtoumax](<#/doc/string/byte/strtoimax>)(C++11)(C++11) | converte uma string de bytes para [std::intmax_t](<#/doc/types/integer>) ou [std::uintmax_t](<#/doc/types/integer>)
(função) |
[ wcstoulwcstoull](<#/doc/string/wide/wcstoul>) | converte uma wide string para um valor inteiro sem sinal
(função) |
[ strtofstrtodstrtold](<#/doc/string/byte/strtof>) | converte uma string de bytes para um valor de ponto flutuante
(função) |
[ from_chars](<#/doc/utility/from_chars>)(C++17) | converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante
(função) |
[ atoiatolatoll](<#/doc/string/byte/atoi>)(C++11) | converte uma string de bytes para um valor inteiro
(função) |
[C documentation](<#/>) para strtoul, strtoull
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão