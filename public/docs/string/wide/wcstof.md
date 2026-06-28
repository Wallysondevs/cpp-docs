# std::wcstof, std::wcstod, std::wcstold

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
float wcstof( const wchar_t* str, wchar_t** str_end );
double wcstod( const wchar_t* str, wchar_t** str_end );
long double wcstold( const wchar_t* str, wchar_t** str_end );
```

Interpreta um valor de ponto flutuante em uma wide string apontada por str.

A função descarta quaisquer caracteres de espaço em branco (conforme determinado por [std::iswspace](<#/doc/string/wide/iswspace>)) até que o primeiro caractere não-espaço em branco seja encontrado. Em seguida, ela pega o máximo de caracteres possível para formar uma representação de ponto flutuante válida e os converte para um valor de ponto flutuante. O valor de ponto flutuante válido pode ser um dos seguintes:

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

  * expressão "não é um número" (not-a-number). Consiste nas seguintes partes:

    

  * (opcional) sinal de mais ou menos
  * `NAN` ou `NAN(`_char_sequence_`)` ignorando maiúsculas/minúsculas da parte `NAN`. _char_sequence_ pode conter apenas dígitos, letras latinas e underscores. O resultado é um valor de ponto flutuante NaN silencioso.

| (desde C++11)
  * qualquer outra expressão que possa ser aceita pela [locale](<#/doc/locale/setlocale>) C atualmente instalada

As funções definem o ponteiro apontado por str_end para apontar para o wide character após o último caractere interpretado. Se str_end for um ponteiro nulo, ele é ignorado.

### Parâmetros

- **str** — ponteiro para a wide string terminada em nulo a ser interpretada
- **str_end** — ponteiro para um ponteiro para um wide character

### Valor de retorno

Valor de ponto flutuante correspondente ao conteúdo de str em caso de sucesso. Se o valor convertido estiver fora do intervalo do tipo de retorno correspondente, ocorre um erro de intervalo e [HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), [HUGE_VALF](<#/doc/numeric/math/HUGE_VAL>) ou [HUGE_VALL](<#/doc/numeric/math/HUGE_VAL>) é retornado. Se nenhuma conversão puder ser realizada, ​0​ é retornado.

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    #include <string>
    
    int main()
    {
        const wchar_t* p = L"111.11 -2.22 0X1.BC70A3D70A3D7P+6 -Inf 1.18973e+4932zzz";
        wchar_t* end;
        std::wcout << "Parsing L\"" << p << "\":\n";
        for (double f = std::wcstod(p, &end); p != end; f = std::wcstod(p, &end))
        {
            std::wcout << "  '" << std::wstring(p, end-p) << "' -> ";
            p = end;
            if (errno == ERANGE)
            {
                std::wcout << "range error, got ";
                errno = 0;
            }
            std::wcout << f << '\n';
        }
    
        if (std::setlocale(LC_NUMERIC, "de_DE.utf8"))
        {
            std::wcout << L"With de_DE.utf8 locale:\n";
            std::wcout << L"  '123.45' -> " << std::wcstod(L"123.45", 0) << L'\n';
            std::wcout << L"  '123,45' -> " << std::wcstod(L"123,45", 0) << L'\n';
        }
    }
```

Output:
```
    Parsing L"111.11 -2.22 0X1.BC70A3D70A3D7P+6 -Inf 1.18973e+4932zzz":
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

[ strtofstrtodstrtold](<#/doc/string/byte/strtof>) | converte uma byte string para um valor de ponto flutuante
(função)
[Documentação C](<#/>) para wcstof