# std::strtoimax, std::strtoumax

Definido no cabeçalho `[<cinttypes>](<#/doc/header/cinttypes>)`

```c
std::intmax_t strtoimax( const char* nptr, char** endptr, int base );
std::uintmax_t strtoumax( const char* nptr, char** endptr, int base );
```

  
Interpreta um valor inteiro em uma string de bytes apontada por nptr.

Descarta quaisquer caracteres de espaço em branco (identificados pela chamada de [`std::isspace`](<#/doc/string/byte/isspace>)) até que o primeiro caractere não-espaço em branco seja encontrado, então pega o máximo de caracteres possível para formar uma representação de número inteiro válida de _base-n_ (onde n=`base`) e os converte para um valor inteiro. O valor inteiro válido consiste nas seguintes partes:

  * sinal de mais ou menos (opcional)
  * prefixo (opcional) (`0`) indicando base octal (aplica-se apenas quando a base é 8 ou ​0​)
  * prefixo (opcional) (`0x` ou `0X`) indicando base hexadecimal (aplica-se apenas quando a base é 16 ou ​0​)
  * uma sequência de dígitos

O conjunto de valores válidos para base é `{0, 2, 3, ..., 36}`. O conjunto de dígitos válidos para inteiros de base-`2` é `{0, 1}`, para inteiros de base-`3` é `{0, 1, 2}`, e assim por diante. Para bases maiores que `10`, os dígitos válidos incluem caracteres alfabéticos, começando de `Aa` para inteiros de base-`11`, até `Zz` para inteiros de base-`36`. A distinção entre maiúsculas e minúsculas dos caracteres é ignorada.

Formatos numéricos adicionais podem ser aceitos pelo [locale](<#/doc/locale/setlocale>) C atualmente instalado.

Se o valor de `base` for ​0​, a base numérica é auto-detectada: se o prefixo for `0`, a base é octal, se o prefixo for `0x` ou `0X`, a base é hexadecimal, caso contrário a base é decimal.

Se o sinal de menos fez parte da sequência de entrada, o valor numérico calculado a partir da sequência de dígitos é negado como se por [menos unário](<#/doc/language/operator_arithmetic>) no tipo de resultado.

As funções definem o ponteiro apontado por endptr para apontar para o caractere após o último caractere interpretado. Se endptr for um ponteiro nulo, ele é ignorado.

Se nptr estiver vazio ou não tiver o formato esperado, nenhuma conversão é realizada, e (se endptr não for um ponteiro nulo) o valor de nptr é armazenado no objeto apontado por endptr.

### Parâmetros

nptr  |  \-  |  ponteiro para a string de bytes terminada em nulo a ser interpretada   
---|---|---
endptr  |  \-  |  ponteiro para um ponteiro para caractere.   
base  |  \-  |  _base_ do valor inteiro interpretado   
  
### Valor de retorno

  * Se bem-sucedido, um valor inteiro correspondente ao conteúdo de str é retornado.
  * Se o valor convertido estiver fora do intervalo do tipo de retorno correspondente, ocorre um erro de intervalo (definindo [errno](<#/doc/error/errno>) para [ERANGE](<#/doc/error/errno_macros>)) e [INTMAX_MAX](<#/doc/types/integer>), [INTMAX_MIN](<#/doc/types/integer>), [UINTMAX_MAX](<#/doc/types/integer>) ou ​0​ é retornado, conforme apropriado.
  * Se nenhuma conversão puder ser realizada, ​0​ é retornado.

### Exemplo

Execute este código
```cpp
    #include <cinttypes>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::string str = "helloworld";
        std::intmax_t val = std::strtoimax(str.c_str(), nullptr, 36);
        std::cout << str << " in base 36 is " << val << " in base 10\n";
     
        char* nptr;
        val = std::strtoimax(str.c_str(), &nptr, 30);
        if (nptr != &str[0] + str.size())
            std::cout << str << " in base 30 is invalid."
                      << " The first invalid digit is '" << *nptr << "'\n";
    }
```

Saída:
```
    helloworld in base 36 is 1767707668033969 in base 10
    helloworld in base 30 is invalid. The first invalid digit is 'w'
```

### Veja também

[ stoistolstoll](<#/doc/string/basic_string/stol>)(C++11)(C++11)(C++11) |  converte uma string para um inteiro com sinal   
(função)  
[ stoulstoull](<#/doc/string/basic_string/stoul>)(C++11)(C++11) |  converte uma string para um inteiro sem sinal   
(função)  
[ strtolstrtoll](<#/doc/string/byte/strtol>)(C++11) |  converte uma string de bytes para um valor inteiro   
(função)  
[ strtoulstrtoull](<#/doc/string/byte/strtoul>)(C++11) |  converte uma string de bytes para um valor inteiro sem sinal   
(função)  
[ wcstoimaxwcstoumax](<#/doc/string/wide/wcstoimax>)(C++11)(C++11) |  converte uma wide string para [std::intmax_t](<#/doc/types/integer>) ou [std::uintmax_t](<#/doc/types/integer>)   
(função)  
[ strtofstrtodstrtold](<#/doc/string/byte/strtof>) |  converte uma string de bytes para um valor de ponto flutuante   
(função)  
[ from_chars](<#/doc/utility/from_chars>)(C++17) |  converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante   
(função)  
[ atoiatolatoll](<#/doc/string/byte/atoi>)(C++11) |  converte uma string de bytes para um valor inteiro   
(função)  
[Documentação C](<#/>) para strtoimax, strtoumax