# std::strtof, std::strtod, std::strtold

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
float strtof ( const char* str, char** str_end );
double strtod ( const char* str, char** str_end );
long double strtold( const char* str, char** str_end );
```

Interpreta um valor de ponto flutuante em uma string de bytes apontada por str.

A função descarta quaisquer caracteres de espaço em branco (conforme determinado por std::isspace) até que o primeiro caractere não-espaço em branco seja encontrado. Em seguida, ela pega o maior número possível de caracteres para formar uma representação de ponto flutuante válida e os converte para um valor de ponto flutuante. O valor de ponto flutuante válido pode ser um dos seguintes:

  * expressão de ponto flutuante decimal. Consiste nas seguintes partes:

    

  * (opcional) sinal de mais ou menos
  * sequência não vazia de dígitos decimais opcionalmente contendo um caractere de ponto decimal (conforme determinado pela [locale](<#/doc/locale/setlocale>) C atual) (define a mantissa)
  * (opcional) `e` ou `E` seguido por um sinal de menos ou mais opcional e uma sequência não vazia de dígitos decimais (define o expoente na base 10)

  * expressão de ponto flutuante hexadecimal. Consiste nas seguintes partes:

    

  * (opcional) sinal de mais ou menos
  * `0x` ou `0X`
  * sequência não vazia de dígitos hexadecimais opcionalmente contendo um caractere de ponto decimal (conforme determinado pela [locale](<#/doc/locale/setlocale>) C atual) (define a mantissa)
  * (opcional) `p` ou `P` seguido por um sinal de menos ou mais opcional e uma sequência não vazia de dígitos decimais (define o expoente na base 2)

  * expressão de infinito. Consiste nas seguintes partes:

    

  * (opcional) sinal de mais ou menos
  * `INF` ou `INFINITY` ignorando maiúsculas/minúsculas

  * expressão de não-número (NaN). Consiste nas seguintes partes:

    

  * (opcional) sinal de mais ou menos
  * `NAN` ou `NAN(`_char_sequence_`)` ignorando maiúsculas/minúsculas da parte `NAN`. _char_sequence_ pode conter apenas dígitos, letras latinas e underscores. O resultado é um valor de ponto flutuante NaN silencioso.

| (desde C++11)

  * qualquer outra expressão que possa ser aceita pela [locale](<#/doc/locale/setlocale>) C atualmente instalada

As funções definem o ponteiro apontado por str_end para apontar para o caractere após o último caractere interpretado. Se str_end for um ponteiro nulo, ele é ignorado.

### Parâmetros

- **str** — ponteiro para a string de bytes terminada em nulo a ser interpretada
- **str_end** — ponteiro para um ponteiro para caractere.

### Valor de retorno

Valor de ponto flutuante correspondente ao conteúdo de str em caso de sucesso. Se o valor convertido estiver fora do intervalo do tipo de retorno correspondente, ocorre um erro de intervalo e [HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), [HUGE_VALF](<#/doc/numeric/math/HUGE_VAL>) ou [HUGE_VALL](<#/doc/numeric/math/HUGE_VAL>) é retornado. Se nenhuma conversão puder ser realizada, ​0​ é retornado e *str_end é definido como str.

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <clocale>
    #include <cstdlib>
    #include <iostream>
    #include <string>
     
    int main()
    {
        const char* p = "111.11 -2.22 0X1.BC70A3D70A3D7P+6 -Inf 1.18973e+4932zzz";
        char* end{};
        std::cout << "Parsing \"" << p << "\":\n";
        errno = 0;
        for (double f = std::strtod(p, &end); p != end; f = std::strtod(p, &end))
        {
            std::cout << "  '" << std::string(p, end - p) << "' -> ";
            p = end;
            if (errno == ERANGE)
            {
                std::cout << "range error, got ";
                errno = 0;
            }
            std::cout << f << '\n';
        }
     
        if (std::setlocale(LC_NUMERIC, "de_DE.utf8"))
        {
            std::cout << "With de_DE.utf8 locale:\n";
            std::cout << "  '123.45' -> " << std::strtod("123.45", 0) << '\n';
            std::cout << "  '123,45' -> " << std::strtod("123,45", 0) << '\n';
        }
    }
```

Saída possível:
```
    Parsing "111.11 -2.22 0X1.BC70A3D70A3D7P+6 -Inf 1.18973e+4932zzz":
      '111.11' -> 111.11
      ' -2.22' -> -2.22
      ' 0X1.BC70A3D70A3D7P+6' -> 111.11
      ' -Inf' -> -inf
      ' 1.18973e+4932' -> range error, got inf
    With de_DE.utf8 locale:
      '123.45' -> 123
      '123,45' -> 123.45
```

### Veja também

[ atof](<#/doc/string/byte/atof>) | converte uma string de bytes para um valor de ponto flutuante
(função)
[ wcstofwcstodwcstold](<#/doc/string/wide/wcstof>) | converte uma wide string para um valor de ponto flutuante
(função)
[ from_chars](<#/doc/utility/from_chars>)(C++17) | converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante
(função)
[Documentação C](<#/>) para strtof, strtod, strtold