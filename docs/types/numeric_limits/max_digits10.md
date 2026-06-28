# std::numeric_limits&lt;T&gt;::max_digits10

```cpp
static constexpr int max_digits10  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::max_digits10 é o número de dígitos de base 10 que são necessários para representar unicamente todos os valores distintos do tipo `T`, como o necessário para serialização/desserialização para texto. Esta constante é significativa para todos os tipos de ponto flutuante.

### Especializações padrão

`T` |  Valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::max_digits10  
---|---
/* não especializado */ |  ​0​  
bool |  ​0​  
char |  ​0​  
signed char |  ​0​  
unsigned char |  ​0​  
wchar_t |  ​0​  
char8_t (desde C++20) |  ​0​  
char16_t |  ​0​  
char32_t |  ​0​  
short |  ​0​  
unsigned short |  ​0​  
int |  ​0​  
unsigned int |  ​0​  
long |  ​0​  
unsigned long |  ​0​  
long long |  ​0​  
unsigned long long |  ​0​  
float |  [FLT_DECIMAL_DIG](<#/doc/types/climits>) ou [std::ceil](<#/doc/numeric/math/ceil>)([std::numeric_limits](<#/doc/types/numeric_limits>)&lt;float&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2) + 1)  
double |  [DBL_DECIMAL_DIG](<#/doc/types/climits>) ou [std::ceil](<#/doc/numeric/math/ceil>)([std::numeric_limits](<#/doc/types/numeric_limits>)&lt;double&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2) + 1)  
long double |  [DECIMAL_DIG](<#/doc/types/climits>) ou [LDBL_DECIMAL_DIG](<#/doc/types/climits>) ou [std::ceil](<#/doc/numeric/math/ceil>)([std::numeric_limits](<#/doc/types/numeric_limits>)&lt;long double&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2) + 1)  
  
### Notas

Ao contrário da maioria das operações matemáticas, a conversão de um valor de ponto flutuante para texto e vice-versa é _exata_ desde que pelo menos `max_digits10` tenham sido usados (9 para float, 17 para double): é garantido que produzirá o mesmo valor de ponto flutuante, mesmo que a representação de texto intermediária não seja exata. Pode levar mais de cem dígitos decimais para representar o valor preciso de um float em notação decimal.

### Exemplo

Execute este código
```
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    #include <limits>
    #include <sstream>
     
    int main()
    {
        float value = 10.0000086;
     
        constexpr auto digits10 = std::numeric_limits<decltype(value)>::digits10;
        constexpr auto max_digits10 = std::numeric_limits<decltype(value)>::max_digits10;
        constexpr auto submax_digits10 = max_digits10 - 1;
     
        std::cout << "float:\n"
                     "       digits10 is " << digits10 << " digits\n"
                     "   max_digits10 is " << max_digits10 << " digits\n"
                     "submax_digits10 is " << submax_digits10 << " digits\n\n";
     
        const auto original_precision = std::cout.precision();
        for (auto i = 0; i < 5; ++i)
        {
            std::cout
                << "   max_digits10: " << std::setprecision(max_digits10) << value << "\n"
                   "submax_digits10: " << std::setprecision(submax_digits10) << value
                << "\n\n";
     
            value = std::nextafter(value, std::numeric_limits<decltype(value)>::max());
        }
        std::cout.precision(original_precision);
    }
```

Saída: 
```
    float:
           digits10 is 6 digits
       max_digits10 is 9 digits
    submax_digits10 is 8 digits
     
       max_digits10: 10.0000086
    submax_digits10: 10.000009
     
       max_digits10: 10.0000095
    submax_digits10: 10.00001
     
       max_digits10: 10.0000105
    submax_digits10: 10.00001
     
       max_digits10: 10.0000114
    submax_digits10: 10.000011
     
       max_digits10: 10.0000124
    submax_digits10: 10.000012
```

### Veja também

[ radix](<#/doc/types/numeric_limits/radix>)[static] |  a base ou base inteira usada pela representação do tipo dado   
(public static member constant)  
[ digits](<#/doc/types/numeric_limits/digits>)[static] |  número de dígitos `radix` que podem ser representados sem alteração   
(public static member constant)  
[ digits10](<#/doc/types/numeric_limits/digits10>)[static] |  número de dígitos decimais que podem ser representados sem alteração   
(public static member constant)  
[ min_exponent](<#/doc/types/numeric_limits/min_exponent>)[static] |  um a mais que a menor potência negativa da base que é um valor de ponto flutuante normalizado válido   
(public static member constant)  
[ max_exponent](<#/doc/types/numeric_limits/max_exponent>)[static] |  um a mais que a maior potência inteira da base que é um valor de ponto flutuante finito válido   
(public static member constant)