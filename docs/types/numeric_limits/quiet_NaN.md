# std::numeric_limits&lt;T&gt;::quiet_NaN

```cpp
static T quiet_NaN() throw();  // (até C++11)
static constexpr T quiet_NaN() noexcept;  // (desde C++11)
```

  
Retorna o valor especial "quiet [NaN](<https://en.wikipedia.org/wiki/NaN> "enwiki:NaN")", conforme representado pelo tipo de ponto flutuante `T`. Somente significativo se [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_quiet_NaN == true. No IEEE 754, a representação binária mais comum de números de ponto flutuante, qualquer valor com todos os bits do expoente definidos e pelo menos um bit da fração definido representa um NaN. É definido pela implementação quais valores da fração representam NaNs quiet ou signaling, e se o bit de sinal é significativo. 

### Valor de retorno

`T` |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::quiet_NaN()  
---|---
/* não-especializado */ |  T()  
bool |  false  
char |  ​0​  
signed char |  ​0​  
unsigned char |  ​0​  
wchar_t |  ​0​  
char8_t (desde C++20) |  ​0​  
char16_t (desde C++11) |  ​0​  
char32_t (desde C++11) |  ​0​  
short |  ​0​  
unsigned short |  ​0​  
int |  ​0​  
unsigned int |  ​0​  
long |  ​0​  
unsigned long |  ​0​  
long long (desde C++11) |  ​0​  
unsigned long long (desde C++11) |  ​0​  
float |  definido pela implementação (pode ser [NAN](<#/doc/numeric/math/NAN>))   
double |  definido pela implementação   
long double |  definido pela implementação   
  
### Observações

Um NaN nunca se compara como igual a si mesmo. Copiar um NaN pode não preservar sua representação de bits. 

### Exemplo

Várias maneiras de gerar um NaN (a string de saída é específica do compilador):

Execute este código
```cpp
    #include <iostream>
    #include <limits>
    #include <cmath>
    
    int main()
    {
        std::cout << std::numeric_limits<double>::quiet_NaN()     << ' ' // nan
                  << std::numeric_limits<double>::signaling_NaN() << ' ' // nan
                  << std::acos(2)    << ' '   // nan
                  << std::tgamma(-1) << ' '   // nan
                  << std::log(-1)    << ' '   // nan
                  << std::sqrt(-1)   << ' '   // -nan
                  << 0 / 0.0         << '\n'; // -nan
    
        std::cout << "NaN == NaN? " << std::boolalpha
                  << ( std::numeric_limits<double>::quiet_NaN() ==
                       std::numeric_limits<double>::quiet_NaN() ) << '\n';
    }
```

Saída possível: 
```
    nan nan nan nan nan -nan -nan
    NaN == NaN? false
```

### Veja também

[ has_quiet_NaN](<#/doc/types/numeric_limits/has_quiet_NaN>)[static] |  identifica tipos de ponto flutuante que podem representar o valor especial "quiet NaN"   
(constante membro estática pública)  
[ signaling_NaN](<#/doc/types/numeric_limits/signaling_NaN>)[static] |  retorna um valor signaling NaN do tipo de ponto flutuante fornecido   
(função membro estática pública)  
[ nannanfnanl](<#/doc/numeric/math/nan.2>)(C++11)(C++11)(C++11) |  NaN   
(função)  
[ isnan](<#/doc/numeric/math/isnan>)(C++11) |  verifica se o número fornecido é NaN   
(função)