# std::atof

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
double atof( const char* str );
```

Interpreta um valor de ponto flutuante em uma string de bytes apontada por str.

A função descarta quaisquer caracteres de espaço em branco (conforme determinado por std::isspace) até que o primeiro caractere não-espaço em branco seja encontrado. Em seguida, ela pega o maior número possível de caracteres para formar uma representação de ponto flutuante válida e os converte para um valor de ponto flutuante. O valor de ponto flutuante válido pode ser um dos seguintes:

*   expressão de ponto flutuante decimal. Consiste nas seguintes partes:

    *   (opcional) sinal de mais ou menos
    *   sequência não vazia de dígitos decimais opcionalmente contendo um caractere de ponto decimal (conforme determinado pela [locale](<#/doc/locale/setlocale>) C atual) (define a significância)
    *   (opcional) `e` ou `E` seguido por um sinal opcional de menos ou mais e uma sequência não vazia de dígitos decimais (define o expoente na base 10)

*   expressão de ponto flutuante hexadecimal. Consiste nas seguintes partes:

    *   (opcional) sinal de mais ou menos
    *   `0x` ou `0X`
    *   sequência não vazia de dígitos hexadecimais opcionalmente contendo um caractere de ponto decimal (conforme determinado pela [locale](<#/doc/locale/setlocale>) C atual) (define a significância)
    *   (opcional) `p` ou `P` seguido por um sinal opcional de menos ou mais e uma sequência não vazia de dígitos decimais (define o expoente na base 2)

*   expressão de infinito. Consiste nas seguintes partes:

    *   (opcional) sinal de mais ou menos
    *   `INF` ou `INFINITY` ignorando maiúsculas/minúsculas

*   expressão de não-número. Consiste nas seguintes partes:

    *   (opcional) sinal de mais ou menos
    *   `NAN` ou `NAN(`_char_sequence_`)` ignorando maiúsculas/minúsculas da parte `NAN`. _char_sequence_ pode conter apenas dígitos, letras latinas e underscores. O resultado é um valor de ponto flutuante NaN silencioso.

| (desde C++11)

*   qualquer outra expressão que possa ser aceita pela [locale](<#/doc/locale/setlocale>) C atualmente instalada

### Parâmetros

- **str** — ponteiro para a string de bytes terminada em nulo a ser interpretada

### Valor de retorno

Valor `double` correspondente ao conteúdo de `str` em caso de sucesso. Se o valor convertido estiver fora do intervalo do tipo de retorno, o valor de retorno é comportamento indefinido. Se nenhuma conversão puder ser realizada, 0.0 é retornado.

### Exemplo

Execute este código
```cpp
#include <cstdlib>
#include <iostream>
 
int main()
{
    std::cout << std::atof("0.0000000123") << '\n'
              << std::atof("0.012") << '\n'
              << std::atof("15e16") << '\n'
              << std::atof("-0x1afp-2") << '\n'
              << std::atof("inF") << '\n'
              << std::atof("Nan") << '\n'
              << std::atof("invalid") << '\n';
}
```

Saída:
```
1.23e-08
0.012
1.5e+17
-107.75
inf
nan
0
```

### Veja também

[ stofstodstold](<#/doc/string/basic_string/stof>)(C++11)(C++11)(C++11) | converte uma string para um valor de ponto flutuante
(função)
[ strtofstrtodstrtold](<#/doc/string/byte/strtof>) | converte uma string de bytes para um valor de ponto flutuante
(função)
[ from_chars](<#/doc/utility/from_chars>)(C++17) | converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante
(função)
[ atoiatolatoll](<#/doc/string/byte/atoi>)(C++11) | converte uma string de bytes para um valor inteiro
(função)
[Documentação C](<#/>) para atof