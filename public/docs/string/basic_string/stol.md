# std::stoi, std::stol, std::stoll

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
int stoi ( const std::string& str,
std::size_t* pos = nullptr, int base = 10 );
int stoi ( const std::wstring& str,
std::size_t* pos = nullptr, int base = 10 );
long stol ( const std::string& str,
std::size_t* pos = nullptr, int base = 10 );
long stol ( const std::wstring& str,
std::size_t* pos = nullptr, int base = 10 );
long long stoll( const std::string& str,
std::size_t* pos = nullptr, int base = 10 );
long long stoll( const std::wstring& str,
std::size_t* pos = nullptr, int base = 10 );
```

Interpreta um valor inteiro com sinal na string str.

Seja ptr um ponteiro interno (para as funções de conversão) do tipo char* (1,3,5) ou wchar_t* (2,4,6), respectivamente.

1) Calls [std::strtol](<#/doc/string/byte/strtol>)(str.c_str(), &ptr, base).

2) Calls [std::wcstol](<#/doc/string/wide/wcstol>)(str.c_str(), &ptr, base).

3) Calls [std::strtol](<#/doc/string/byte/strtol>)(str.c_str(), &ptr, base).

4) Calls [std::wcstol](<#/doc/string/wide/wcstol>)(str.c_str(), &ptr, base).

5) Calls [std::strtoll](<#/doc/string/byte/strtol>)(str.c_str(), &ptr, base).

6) Calls [std::wcstoll](<#/doc/string/wide/wcstol>)(str.c_str(), &ptr, base).

Descarta quaisquer caracteres de espaço em branco (conforme identificado pela chamada a [`std::isspace`](<#/doc/string/byte/isspace>)) até que o primeiro caractere não-espaço em branco seja encontrado, então pega o máximo de caracteres possível para formar uma representação de número inteiro válida de _base-n_ (onde n=`base`) e os converte para um valor inteiro. O valor inteiro válido consiste nas seguintes partes:

  * (opcional) sinal de mais ou menos
  * (opcional) prefixo (`0`) indicando base octal (aplica-se apenas quando a base é 8 ou ​0​)
  * (opcional) prefixo (`0x` ou `0X`) indicando base hexadecimal (aplica-se apenas quando a base é 16 ou ​0​)
  * uma sequência de dígitos

O conjunto de valores válidos para base é `{0, 2, 3, ..., 36}`. O conjunto de dígitos válidos para inteiros de base-`2` é `{0, 1}`, para inteiros de base-`3` é `{0, 1, 2}`, e assim por diante. Para bases maiores que `10`, os dígitos válidos incluem caracteres alfabéticos, começando de `Aa` para inteiros de base-`11`, até `Zz` para inteiros de base-`36`. A distinção entre maiúsculas e minúsculas dos caracteres é ignorada.

Formatos numéricos adicionais podem ser aceitos pela [locale](<#/doc/locale/setlocale>) C atualmente instalada.

Se o valor de `base` for ​0​, a base numérica é auto-detectada: se o prefixo for `0`, a base é octal, se o prefixo for `0x` ou `0X`, a base é hexadecimal, caso contrário a base é decimal.

Se o sinal de menos fez parte da sequência de entrada, o valor numérico calculado a partir da sequência de dígitos é negado como se por [menos unário](<#/doc/language/operator_arithmetic>) no tipo de resultado.

Se pos não for um ponteiro nulo, então ptr receberá o endereço do primeiro caractere não convertido em str.c_str(), e o índice desse caractere será calculado e armazenado em *pos, fornecendo o número de caracteres que foram processados pela conversão.

### Parâmetros

- **str** — a string a ser convertida
- **pos** — endereço de um inteiro para armazenar o número de caracteres processados
- **base** — a base numérica

### Valor de retorno

Valor inteiro correspondente ao conteúdo de str.

### Exceções

  * [std::invalid_argument](<#/doc/error/invalid_argument>) se nenhuma conversão pôde ser realizada.
  * [std::out_of_range](<#/doc/error/out_of_range>) se o valor convertido cairia fora do range do tipo de resultado ou se a função subjacente ([std::strtol](<#/doc/string/byte/strtol>) ou [std::strtoll](<#/doc/string/byte/strtol>)) definir [errno](<#/doc/error/errno>) para [ERANGE](<#/doc/error/errno_macros>).

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <stdexcept>
    #include <string>
    #include <utility>
    
    int main()
    {
        const auto data =
        {
            "45",
            "+45",
            " -45",
            "3.14159",
            "31337 with words",
            "words and 2",
            "12345678901",
        };
    
        for (const std::string s : data)
        {
            std::size_t pos{};
            try
            {
                std::cout << "std::stoi(" << std::quoted(s) << "): ";
                const int i{std::stoi(s, &pos)};
                std::cout << i << "; pos: " << pos << '\n';
            }
            catch (std::invalid_argument const& ex)
            {
                std::cout << "std::invalid_argument::what(): " << ex.what() << '\n';
            }
            catch (std::out_of_range const& ex)
            {
                std::cout << "std::out_of_range::what(): " << ex.what() << '\n';
                const long long ll{std::stoll(s, &pos)};
                std::cout << "std::stoll(" << std::quoted(s) << "): " << ll
                          << "; pos: " << pos << '\n';
            }
        }
    
        std::cout << "\nCalling with different radixes:\n";
        for (const auto& [s, base] : {std::pair<const char*, int>
            {"11",  2}, {"22",  3}, {"33",  4}, {"77",  8},
            {"99", 10}, {"FF", 16}, {"jJ", 20}, {"Zz", 36}})
        {
            const int i{std::stoi(s, nullptr, base)};
            std::cout << "std::stoi(" << std::quoted(s)
                      << ", nullptr, " << base << "): " << i << '\n';
        }
    }
```

Saída possível:
```
    std::stoi("45"): 45; pos: 2
    std::stoi("+45"): 45; pos: 3
    std::stoi(" -45"): -45; pos: 4
    std::stoi("3.14159"): 3; pos: 1
    std::stoi("31337 with words"): 31337; pos: 5
    std::stoi("words and 2"): std::invalid_argument::what(): stoi
    std::stoi("12345678901"): std::out_of_range::what(): stoi
    std::stoll("12345678901"): 12345678901; pos: 11
    
    Calling with different radixes:
    std::stoi("11", nullptr, 2): 3
    std::stoi("22", nullptr, 3): 8
    std::stoi("33", nullptr, 4): 15
    std::stoi("77", nullptr, 8): 63
    std::stoi("99", nullptr, 10): 99
    std::stoi("FF", nullptr, 16): 255
    std::stoi("jJ", nullptr, 20): 399
    std::stoi("Zz", nullptr, 36): 1295
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2009](<https://cplusplus.github.io/LWG/issue2009>) | C++11 | [std::out_of_range](<#/doc/error/out_of_range>) não seria lançada se
[std::strtol](<#/doc/string/byte/strtol>) ou [std::strtoll](<#/doc/string/byte/strtol>) definisse [errno](<#/doc/error/errno>) para [ERANGE](<#/doc/error/errno_macros>) | será lançada

### Veja também

[ stoulstoull](<#/doc/string/basic_string/stoul>)(desde C++11) | converte uma string para um inteiro sem sinal
(função)
[ stofstodstold](<#/doc/string/basic_string/stof>)(desde C++11) | converte uma string para um valor de ponto flutuante
(função)
[ strtolstrtoll](<#/doc/string/byte/strtol>)(desde C++11) | converte uma string de bytes para um valor inteiro
(função)
[ strtoulstrtoull](<#/doc/string/byte/strtoul>)(desde C++11) | converte uma string de bytes para um valor inteiro sem sinal
(função)
[ strtoimaxstrtoumax](<#/doc/string/byte/strtoimax>)(desde C++11) | converte uma string de bytes para [std::intmax_t](<#/doc/types/integer>) ou [std::uintmax_t](<#/doc/types/integer>)
(função)
[ from_chars](<#/doc/utility/from_chars>)(desde C++17) | converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante
(função)
[ atoiatolatoll](<#/doc/string/byte/atoi>)(desde C++11) | converte uma string de bytes para um valor inteiro
(função)
[ to_string](<#/doc/string/basic_string/to_string>)(desde C++11) | converte um valor integral ou de ponto flutuante para `string`
(função)
[ to_wstring](<#/doc/string/basic_string/to_wstring>)(desde C++11) | converte um valor integral ou de ponto flutuante para `wstring`
(função)