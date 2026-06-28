# std::stoul, std::stoull

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
unsigned long stoul ( const std::string& str,
std::size_t* pos = nullptr, int base = 10 );
unsigned long stoul ( const std::wstring& str,
std::size_t* pos = nullptr, int base = 10 );
unsigned long long stoull( const std::string& str,
std::size_t* pos = nullptr, int base = 10 );
unsigned long long stoull( const std::wstring& str,
std::size_t* pos = nullptr, int base = 10 );
```

Interpreta um valor inteiro sem sinal na string str.

Seja ptr um ponteiro interno (para as funções de conversão) do tipo char* (1,3) ou wchar_t* (2,4), respectivamente.

1) Chama [std::strtoul](<#/doc/string/byte/strtoul>)(str.c_str(), &ptr, base).

2) Chama [std::wcstoul](<#/doc/string/wide/wcstoul>)(str.c_str(), &ptr, base).

3) Chama [std::strtoull](<#/doc/string/byte/strtoul>)(str.c_str(), &ptr, base).

4) Chama [std::wcstoull](<#/doc/string/wide/wcstoul>)(str.c_str(), &ptr, base).

Descarta quaisquer caracteres de espaço em branco (conforme identificado pela chamada de [`std::isspace`](<#/doc/string/byte/isspace>)) até que o primeiro caractere não-espaço em branco seja encontrado, então pega o máximo de caracteres possível para formar uma representação de número inteiro sem sinal válida de _base-n_ (onde n=`base`) e os converte para um valor inteiro. O valor inteiro sem sinal válido consiste nas seguintes partes:

  * (opcional) sinal de mais ou menos
  * (opcional) prefixo (`0`) indicando base octal (aplica-se apenas quando a base é 8 ou ​0​)
  * (opcional) prefixo (`0x` ou `0X`) indicando base hexadecimal (aplica-se apenas quando a base é 16 ou ​0​)
  * uma sequência de dígitos

O conjunto de valores válidos para `base` é `{0, 2, 3, ..., 36}`. O conjunto de dígitos válidos para inteiros de base-`2` é `{0, 1}`, para inteiros de base-`3` é `{0, 1, 2}`, e assim por diante. Para bases maiores que `10`, os dígitos válidos incluem caracteres alfabéticos, começando de `Aa` para inteiros de base-`11`, até `Zz` para inteiros de base-`36`. A distinção entre maiúsculas e minúsculas dos caracteres é ignorada.

Formatos numéricos adicionais podem ser aceitos pela [locale](<#/doc/locale/setlocale>) C atualmente instalada.

Se o valor de `base` for ​0​, a base numérica é auto-detectada: se o prefixo for `0`, a base é octal; se o prefixo for `0x` ou `0X`, a base é hexadecimal; caso contrário, a base é decimal.

Se o sinal de menos fez parte da sequência de entrada, o valor numérico calculado a partir da sequência de dígitos é negado como se por [menos unário](<#/doc/language/operator_arithmetic>) no tipo de resultado, o que aplica as regras de "wraparound" de inteiros sem sinal.

Se `pos` não for um ponteiro nulo, então `ptr` receberá o endereço do primeiro caractere não convertido em `str.c_str()`, e o índice desse caractere será calculado e armazenado em `*pos`, fornecendo o número de caracteres que foram processados pela conversão.

### Parâmetros

- **str** — a string a ser convertida
- **pos** — endereço de um inteiro para armazenar o número de caracteres processados
- **base** — a base numérica

### Valor de retorno

A string convertida para o tipo inteiro sem sinal especificado.

### Exceções

  * [std::invalid_argument](<#/doc/error/invalid_argument>) se nenhuma conversão pôde ser realizada.
  * [std::out_of_range](<#/doc/error/out_of_range>) se o valor convertido cairia fora do range do tipo de resultado ou se a função subjacente ([std::strtoul](<#/doc/string/byte/strtoul>) ou [std::strtoull](<#/doc/string/byte/strtoul>)) definir [errno](<#/doc/error/errno>) para [ERANGE](<#/doc/error/errno_macros>).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2009](<https://cplusplus.github.io/LWG/issue2009>) | C++11 | [std::out_of_range](<#/doc/error/out_of_range>) não seria lançada se
[std::strtoul](<#/doc/string/byte/strtoul>) ou [std::strtoull](<#/doc/string/byte/strtoul>) definisse [errno](<#/doc/error/errno>) para [ERANGE](<#/doc/error/errno_macros>) | lançará

### Veja também

[ stolstoll](<#/doc/string/basic_string/stol>)(C++11)(C++11)(C++11) | converte uma string para um inteiro com sinal
(função)
[ stofstodstold](<#/doc/string/basic_string/stof>)(C++11)(C++11)(C++11) | converte uma string para um valor de ponto flutuante
(função)