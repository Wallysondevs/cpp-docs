# std::numeric_limits&lt;T&gt;::min_exponent

```cpp
static const int min_exponent;  // (até C++11)
static constexpr int min_exponent;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::min_exponent é o menor número negativo n tal que \\(\scriptsize r^{n-1}\\)rn-1  
, onde r é [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::radix, é um valor normalizado válido do tipo de ponto flutuante `T`. 

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::min_exponent  
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
float |  [FLT_MIN_EXP](<#/doc/types/climits>)  
double |  [DBL_MIN_EXP](<#/doc/types/climits>)  
long double |  [LDBL_MIN_EXP](<#/doc/types/climits>)  
  
### Exemplo

Demonstra as relações de `min_exponent`, [min_exponent10](<#/doc/types/numeric_limits/min_exponent10>), [min()](<#/doc/types/numeric_limits/min>), e [radix](<#/doc/types/numeric_limits/radix>) para o tipo float:

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

[ radix](<#/doc/types/numeric_limits/radix>)[static] |  a base ou base inteira usada pela representação do tipo fornecido   
(constante membro estática pública)  
[ min_exponent10](<#/doc/types/numeric_limits/min_exponent10>)[static] |  a menor potência negativa de dez que é um valor de ponto flutuante normalizado válido   
(constante membro estática pública)  
[ max_exponent](<#/doc/types/numeric_limits/max_exponent>)[static] |  um a mais que a maior potência inteira da base que é um valor de ponto flutuante finito válido   
(constante membro estática pública)  
[ max_exponent10](<#/doc/types/numeric_limits/max_exponent10>)[static] |  a maior potência inteira de 10 que é um valor de ponto flutuante finito válido   
(constante membro estática pública)