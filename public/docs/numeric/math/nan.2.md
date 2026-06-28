# std::nan, std::nanf, std::nanl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float nanf( const char* arg );
double nan ( const char* arg );
long double nanl( const char* arg );
```

Converte a string de caracteres arg no valor NaN silencioso correspondente, como se chamasse [std::strtof](<#/doc/string/byte/strtof>), [std::strtod](<#/doc/string/byte/strtof>), ou [std::strtold](<#/doc/string/byte/strtof>), respectivamente.

1) A chamada std::nanf("n-char-sequence"), onde n-char-sequence é uma sequência de dígitos, letras ASCII e underscores, é equivalente à chamada [std::strtof](<#/doc/string/byte/strtof>)("NAN(n-char-sequence)", (char**)nullptr);.

A chamada std::nanf("") é equivalente à chamada [std::strtof](<#/doc/string/byte/strtof>)("NAN()", (char**)nullptr);.

A chamada std::nanf("string"), onde string não é uma n-char-sequence nem uma string vazia, é equivalente à chamada [std::strtof](<#/doc/string/byte/strtof>)("NAN", (char**)nullptr);.

2) O mesmo que (1), mas chama [std::strtod](<#/doc/string/byte/strtof>) em vez de [std::strtof](<#/doc/string/byte/strtof>).

3) O mesmo que (1), mas chama [std::strtold](<#/doc/string/byte/strtof>) em vez de [std::strtof](<#/doc/string/byte/strtof>).

### Parâmetros

- **arg** — string de caracteres estreitos identificando o conteúdo de um NaN

### Valor de retorno

O valor NaN silencioso que corresponde à string identificadora arg ou zero se a implementação não suportar NaNs silenciosos.

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559), ela também suporta NaNs silenciosos.

### Tratamento de erros

Esta função não está sujeita a nenhuma das condições de erro especificadas em [`math_errhandling`](<#/doc/numeric/math/math_errhandling>).

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <cstdint>
    #include <cstring>
    #include <iostream>
     
    int main()
    {
        double f1 = std::nan("1");
        std::uint64_t f1n; std::memcpy(&f1n, &f1, sizeof f1);
        std::cout << "nan(\"1\") = " << f1 << " (" << std::hex << f1n << ")\n";
     
        double f2 = std::nan("2");
        std::uint64_t f2n; std::memcpy(&f2n, &f2, sizeof f2);
        std::cout << "nan(\"2\") = " << f2 << " (" << std::hex << f2n << ")\n";
    }
```

Saída possível:
```
    nan("1") = nan (7ff0000000000001)
    nan("2") = nan (7ff0000000000002)
```

### Veja também

[ isnan](<#/doc/numeric/math/isnan>)(desde C++11) | verifica se o número dado é NaN
(função)
[ NAN](<#/doc/numeric/math/NAN>)(desde C++11) | avalia para um NaN silencioso do tipo float
(macro constante)
[ has_quiet_NaN](<#/doc/types/numeric_limits/has_quiet_NaN>)[static] | identifica tipos de ponto flutuante que podem representar o valor especial "quiet not-a-number" (NaN)
(membro constante estático público de `std::numeric_limits<T>`)
[ has_signaling_NaN](<#/doc/types/numeric_limits/has_signaling_NaN>)[static] | identifica tipos de ponto flutuante que podem representar o valor especial "signaling not-a-number" (NaN)
(membro constante estático público de `std::numeric_limits<T>`)
[ quiet_NaN](<#/doc/types/numeric_limits/quiet_NaN>)[static] | retorna um valor NaN silencioso do tipo de ponto flutuante dado
(membro função estático público de `std::numeric_limits<T>`)
[ signaling_NaN](<#/doc/types/numeric_limits/signaling_NaN>)[static] | retorna um valor NaN de sinalização do tipo de ponto flutuante dado
(membro função estático público de `std::numeric_limits<T>`)
[Documentação C](<#/>) para nanf, nan, nanl