# std::wcstoimax, std::wcstoumax

Definido no cabeçalho `[<cinttypes>](<#/doc/header/cinttypes>)`

```c
std::intmax_t wcstoimax( const wchar_t* nptr, wchar_t** endptr, int base );
std::uintmax_t wcstoumax( const wchar_t* nptr, wchar_t** endptr, int base );
```

Interpreta um valor inteiro sem sinal em uma wide string apontada por nptr.

Descarta quaisquer caracteres de espaço em branco (identificados pela chamada a [`std::iswspace`](<#/doc/string/wide/iswspace>)) até que o primeiro caractere não-espaço em branco seja encontrado, então pega o máximo de caracteres possível para formar uma representação numérica inteira sem sinal válida de _base-n_ (onde n=`base`) e os converte para um valor inteiro. O valor inteiro sem sinal válido consiste nas seguintes partes:

*   (opcional) sinal de mais ou menos
*   (opcional) prefixo (`0`) indicando base octal (aplica-se apenas quando a base é 8 ou ​0​)
*   (opcional) prefixo (`0x` ou `0X`) indicando base hexadecimal (aplica-se apenas quando a base é 16 ou ​0​)
*   uma sequência de dígitos

O conjunto de valores válidos para base é `{0, 2, 3, ..., 36}`. O conjunto de dígitos válidos para inteiros de base-`2` é `{0, 1}`, para inteiros de base-`3` é `{0, 1, 2}`, e assim por diante. Para bases maiores que `10`, os dígitos válidos incluem caracteres alfabéticos, começando de `Aa` para inteiros de base-`11`, até `Zz` para inteiros de base-`36`. A caixa dos caracteres é ignorada.

Formatos numéricos adicionais podem ser aceitos pelo [`locale`](<#/doc/locale/setlocale>) C atualmente instalado.

Se o valor de `base` for ​0​, a base numérica é auto-detectada: se o prefixo for `0`, a base é octal; se o prefixo for `0x` ou `0X`, a base é hexadecimal; caso contrário, a base é decimal.

Se o sinal de menos fez parte da sequência de entrada, o valor numérico calculado a partir da sequência de dígitos é negado como se por [`menos unário`](<#/doc/language/operator_arithmetic>) no tipo de resultado, o que aplica as regras de "wraparound" de inteiros sem sinal.

As funções definem o ponteiro apontado por endptr para apontar para o wide character após o último caractere interpretado. Se endptr for um ponteiro nulo, ele é ignorado.

### Parâmetros

- **nptr** — ponteiro para a wide string terminada em nulo a ser interpretada
- **endptr** — ponteiro para um ponteiro para um wide character
- **base** — _base_ do valor inteiro interpretado

### Valor de retorno

Valor inteiro correspondente ao conteúdo de str em caso de sucesso. Se o valor convertido estiver fora do intervalo do tipo de retorno correspondente, ocorre um erro de intervalo e [`INTMAX_MAX`](<#/doc/types/integer>), [`INTMAX_MIN`](<#/doc/types/integer>), [`UINTMAX_MAX`](<#/doc/types/integer>), ou ​0​ é retornado, conforme apropriado. Se nenhuma conversão puder ser realizada, ​0​ é retornado.

### Exemplo

Execute este código
```cpp
    #include <cinttypes>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::wstring str = L"helloworld";
        std::intmax_t val = std::wcstoimax(str.c_str(), nullptr, 36);
        std::wcout << str << " in base 36 is " << val << " in base 10\n";
    
        wchar_t* nptr;
        val = std::wcstoimax(str.c_str(), &nptr, 30);
        if (nptr != &str[0] + str.size())
            std::wcout << str << " in base 30 is invalid."
                       << " The first invalid digit is " << *nptr << '\n';
    }
```

Saída:
```
    helloworld in base 36 is 1767707668033969 in base 10
    helloworld in base 30 is invalid. The first invalid digit is w
```

### Veja também

[ strtoimaxstrtoumax](<#/doc/string/byte/strtoimax>)(C++11)(C++11) | converte uma byte string para [`std::intmax_t`](<#/doc/types/integer>) ou [`std::uintmax_t`](<#/doc/types/integer>)
(função)
[ wcstolwcstoll](<#/doc/string/wide/wcstol>) | converte uma wide string para um valor inteiro
(função)
[ wcstoulwcstoull](<#/doc/string/wide/wcstoul>) | converte uma wide string para um valor inteiro sem sinal
(função)
[Documentação C](<#/>) para wcstoimax, wcstoumax