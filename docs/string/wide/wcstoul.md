# std::wcstoul, std::wcstoull

Definido no cabeçalho `<cwchar>`

```c
unsigned long wcstoul ( const wchar_t* str, wchar_t** str_end, int base );
unsigned long long wcstoull( const wchar_t* str, wchar_t** str_end, int base );
```

  
Interpreta um valor inteiro sem sinal em uma wide string apontada por `str`.

Descarta quaisquer caracteres de espaço em branco (conforme identificado pela chamada a [`std::iswspace`](<#/doc/string/wide/iswspace>)) até que o primeiro caractere não-espaço em branco seja encontrado, então pega tantos caracteres quanto possível para formar uma representação de número inteiro sem sinal válida de _base-n_ (onde n=`base`) e os converte para um valor inteiro. O valor inteiro sem sinal válido consiste nas seguintes partes:

  * (opcional) sinal de mais ou menos
  * (opcional) prefixo (`0`) indicando base octal (aplica-se apenas quando a base é 8 ou ​0​)
  * (opcional) prefixo (`0x` ou `0X`) indicando base hexadecimal (aplica-se apenas quando a base é 16 ou ​0​)
  * uma sequência de dígitos

O conjunto de valores válidos para `base` é `{0, 2, 3, ..., 36}`. O conjunto de dígitos válidos para inteiros de base-`2` é `{0, 1}`, para inteiros de base-`3` é `{0, 1, 2}`, e assim por diante. Para bases maiores que `10`, os dígitos válidos incluem caracteres alfabéticos, começando de `Aa` para inteiros de base-`11`, até `Zz` para inteiros de base-`36`. A caixa dos caracteres é ignorada.

Formatos numéricos adicionais podem ser aceitos pelo [locale](<#/doc/locale/setlocale>) C atualmente instalado.

Se o valor de `base` for ​0​, a base numérica é auto-detectada: se o prefixo for `0`, a base é octal, se o prefixo for `0x` ou `0X`, a base é hexadecimal, caso contrário, a base é decimal.

Se o sinal de menos fez parte da sequência de entrada, o valor numérico calculado a partir da sequência de dígitos é negado como se por [menos unário](<#/doc/language/operator_arithmetic>) no tipo de resultado, o que aplica as regras de wraparound de inteiro sem sinal.

As funções definem o ponteiro apontado por `str_end` para apontar para o wide character após o último caractere interpretado. Se `str_end` for um ponteiro nulo, ele é ignorado.

### Parâmetros

str  |  \-  |  ponteiro para a wide string terminada em nulo a ser interpretada   
---|---|---
str_end  |  \-  |  ponteiro para um ponteiro para um wide character   
base  |  \-  |  _base_ do valor inteiro interpretado   
  
### Valor de retorno

Valor inteiro correspondente ao conteúdo de `str` em caso de sucesso. Se o valor convertido estiver fora do intervalo do tipo de retorno correspondente, ocorre um erro de intervalo e [ULONG_MAX](<#/doc/types/climits>) ou [ULLONG_MAX](<#/doc/types/climits>) é retornado. Se nenhuma conversão puder ser realizada, ​0​ é retornado.

### Exemplo

Execute este código
```
    #include <cwchar>
    #include <errno.h>
    #include <iostream>
    #include <string>
     
    int main()
    {
        const wchar_t* p = L"10 200000000000000000000000000000 30 40";
        wchar_t* end;
        std::wcout << "Parsing L'" << p << "':\n";
        for (unsigned long i = std::wcstoul(p, &end, 10);
             p != end;
             i = std::wcstoul(p, &end, 10))
        {
            std::wcout << '\'' << std::wstring(p, end - p) << "' -> ";
            p = end;
            if (errno == ERANGE)
            {
                std::wcout << "range error, got ";
                errno = 0;
            }
            std::wcout << i << '\n';
        }
    }
```

Saída possível: 
```
    Parsing L'10 200000000000000000000000000000 30 40':
    '10' -> 10
    ' 200000000000000000000000000000' -> range error, got 18446744073709551615
    ' 30' -> 30
    ' 40' -> 40
```

### Veja também

[ strtoulstrtoull](<#/doc/string/byte/strtoul>)(desde C++11) |  converte uma byte string para um valor inteiro sem sinal   
(função)  
[ wcstolwcstoll](<#/doc/string/wide/wcstol>) |  converte uma wide string para um valor inteiro   
(função)  
[Documentação C](<#/>) para wcstoul, wcstoull