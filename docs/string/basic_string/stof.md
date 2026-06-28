# std::stof, std::stod, std::stold

Definido no header `[<string>](<#/doc/header/string>)`

```cpp
float stof ( const std::string& str, std::size_t* pos = nullptr );  // (1) (desde C++11)
float stof ( const std::wstring& str, std::size_t* pos = nullptr );  // (2) (desde C++11)
double stod ( const std::string& str, std::size_t* pos = nullptr );  // (3) (desde C++11)
double stod ( const std::wstring& str, std::size_t* pos = nullptr );  // (4) (desde C++11)
long double stold( const std::string& str, std::size_t* pos = nullptr );  // (5) (desde C++11)
long double stold( const std::wstring& str, std::size_t* pos = nullptr );  // (6) (desde C++11)
```

Interpreta um valor de ponto flutuante em uma string str.

Seja ptr um ponteiro interno (para as funções de conversão) do tipo char* (1,3,5) ou wchar_t* (2,4,6), respectivamente.

1) Chama [std::strtof](<#/doc/string/byte/strtof>)(str.c_str(), &ptr).

2) Chama [std::wcstof](<#/doc/string/wide/wcstof>)(str.c_str(), &ptr).

3) Chama [std::strtod](<#/doc/string/byte/strtof>)(str.c_str(), &ptr).

4) Chama [std::wcstod](<#/doc/string/wide/wcstof>)(str.c_str(), &ptr).

5) Chama [std::strtold](<#/doc/string/byte/strtof>)(str.c_str(), &ptr).

6) Chama [std::wcstold](<#/doc/string/wide/wcstof>)(str.c_str(), &ptr).

A função descarta quaisquer caracteres de espaço em branco (conforme determinado por std::isspace) até que o primeiro caractere não-espaço em branco seja encontrado. Em seguida, ela pega o máximo de caracteres possível para formar uma representação de ponto flutuante válida e os converte para um valor de ponto flutuante. O valor de ponto flutuante válido pode ser um dos seguintes:

  * expressão de ponto flutuante decimal. Consiste nas seguintes partes:

    

  * (opcional) sinal de mais ou menos
  * sequência não vazia de dígitos decimais opcionalmente contendo um caractere de ponto decimal (conforme determinado pelo [locale](<#/doc/locale/setlocale>) C atual) (define o significando)
  * (opcional) `e` ou `E` seguido por um sinal de menos ou mais opcional e uma sequência não vazia de dígitos decimais (define o expoente na base 10)

  * expressão de ponto flutuante hexadecimal. Consiste nas seguintes partes:

    

  * (opcional) sinal de mais ou menos
  * `0x` ou `0X`
  * sequência não vazia de dígitos hexadecimais opcionalmente contendo um caractere de ponto decimal (conforme determinado pelo [locale](<#/doc/locale/setlocale>) C atual) (define o significando)
  * (opcional) `p` ou `P` seguido por um sinal de menos ou mais opcional e uma sequência não vazia de dígitos decimais (define o expoente na base 2)

  * expressão de infinito. Consiste nas seguintes partes:

    

  * (opcional) sinal de mais ou menos
  * `INF` ou `INFINITY` ignorando maiúsculas/minúsculas

  * expressão not-a-number. Consiste nas seguintes partes:

    

  * (opcional) sinal de mais ou menos
  * `NAN` ou `NAN(`_char_sequence_`)` ignorando maiúsculas/minúsculas da parte `NAN`. _char_sequence_ pode conter apenas dígitos, letras latinas e underscores. O resultado é um valor de ponto flutuante quiet NaN.

  * qualquer outra expressão que possa ser aceita pelo [locale](<#/doc/locale/setlocale>) C atualmente instalado

Se pos não for um ponteiro nulo, então ptr receberá o endereço do primeiro caractere não convertido em str.c_str(), e o índice desse caractere será calculado e armazenado em *pos, fornecendo o número de caracteres que foram processados pela conversão.

### Parâmetros

- **str** — a string a ser convertida
- **pos** — endereço de um inteiro para armazenar o número de caracteres processados

### Valor de retorno

A string convertida para o tipo de ponto flutuante especificado.

### Exceções

[std::invalid_argument](<#/doc/error/invalid_argument>) se nenhuma conversão pôde ser realizada.

[std::out_of_range](<#/doc/error/out_of_range>) se o valor convertido cairia fora do range do tipo de resultado ou se a função subjacente ([std::strtof](<#/doc/string/byte/strtof>), [std::strtod](<#/doc/string/byte/strtof>) ou [std::strtold](<#/doc/string/byte/strtof>)) definir [errno](<#/doc/error/errno>) para [ERANGE](<#/doc/error/errno_macros>).

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2009](<https://cplusplus.github.io/LWG/issue2009>) | C++11 | [std::out_of_range](<#/doc/error/out_of_range>) não seria lançada se o valor convertido
caísse fora do range do tipo de resultado | será lançada
[LWG 2403](<https://cplusplus.github.io/LWG/issue2403>) | C++11 | `stof` chamava [std::strtod](<#/doc/string/byte/strtof>) ou [std::wcstod](<#/doc/string/wide/wcstof>) | `stof` chama [std::strtof](<#/doc/string/byte/strtof>) ou [std::wcstof](<#/doc/string/wide/wcstof>)

### Veja também

[ stoistolstoll](<#/doc/string/basic_string/stol>)(C++11)(C++11)(C++11) | converte uma string para um inteiro com sinal
(função)
[ stoulstoull](<#/doc/string/basic_string/stoul>)(C++11)(C++11) | converte uma string para um inteiro sem sinal
(função)
[ from_chars](<#/doc/utility/from_chars>)(C++17) | converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante
(função)