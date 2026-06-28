# std::numeric_limits&lt;T&gt;::min_exponent10

```cpp
static const int min_exponent10;  // (até C++11)
static constexpr int min_exponent10;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::min_exponent10 é o menor número negativo n tal que \\(\scriptsize 10^n\\)10n é um valor normalizado válido do tipo de ponto flutuante `T`. 

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::min_exponent10  
---|---
/* não especializado */ |  ​0​  
bool |  ​0​  
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
float |  [FLT_MIN_10_EXP](<#/doc/types/climits>)  
double |  [DBL_MIN_10_EXP](<#/doc/types/climits>)  
long double |  [LDBL_MIN_10_EXP](<#/doc/types/climits>)  
  
### Exemplo

Demonstra as relações de [min_exponent](<#/doc/types/numeric_limits/min_exponent>), `min_exponent10`, [min()](<#/doc/types/numeric_limits/min>), e [radix](<#/doc/types/numeric_limits/radix>) para o tipo float:

Execute este código
```cpp 
    #include <iostream>
    #include <limits>
     
    int main()
    {
        std::cout << "min() = " << std::numeric_limits<float>::min() << '\n'
                  << "min_exponent10 = " << std::numeric_limits<float>::min_exponent10 << '\n'
                  << std::hexfloat << '\n'
                  << "min() = " << std::numeric_limits<float>::min() << '\n'
                  << "min_exponent = " << std::numeric_limits<float>::min_exponent << '\n';
    }
```

Saída: 
```
    min() = 1.17549e-38
    min_exponent10 = -37
     
    min() = 0x1p-126
    min_exponent = -125
```

### Veja também

[ min_exponent](<#/doc/types/numeric_limits/min_exponent>)[static] |  um a mais que a menor potência negativa da radix que é um valor de ponto flutuante normalizado válido   
(membro constante estático público)  
[ max_exponent](<#/doc/types/numeric_limits/max_exponent>)[static] |  um a mais que a maior potência inteira da radix que é um valor de ponto flutuante finito válido   
(membro constante estático público)  
[ max_exponent10](<#/doc/types/numeric_limits/max_exponent10>)[static] |  a maior potência inteira de 10 que é um valor de ponto flutuante finito válido   
(membro constante estático público)