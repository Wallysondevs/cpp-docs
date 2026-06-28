# std::numeric_limits&lt;T&gt;::max_exponent

```cpp
static const int max_exponent;  // (até C++11)
static constexpr int max_exponent;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::max_exponent é o maior número positivo n tal que \\(\scriptsize r^{n-1}\\)rn-1  
, onde r é [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::radix, é um valor finito representável do tipo de ponto flutuante `T`. 

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::max_exponent  
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
float |  [FLT_MAX_EXP](<#/doc/types/climits>)  
double |  [DBL_MAX_EXP](<#/doc/types/climits>)  
long double |  [LDBL_MAX_EXP](<#/doc/types/climits>)  
  
### Exemplo

Demonstra as relações de `max_exponent`, [max_exponent10](<#/doc/types/numeric_limits/max_exponent10>), e [max()](<#/doc/types/numeric_limits/max>) para o tipo float:

Execute este código
```cpp
    #include <iostream>
    #include <limits>
    
    int main()
    {
        std::cout << "max() = " << std::numeric_limits<float>::max() << '\n'
                  << "max_exponent10 = " << std::numeric_limits<float>::max_exponent10 << '\n'
                  << std::hexfloat << '\n'
                  << "max() = " << std::numeric_limits<float>::max() << '\n'
                  << "max_exponent = " << std::numeric_limits<float>::max_exponent << '\n';
    }
```

Saída: 
```
    max() = 3.40282e+38
    max_exponent10 = 38
    
    max() = 0x1.fffffep+127
    max_exponent = 128
```

### Ver também

[ min_exponent10](<#/doc/types/numeric_limits/min_exponent10>)[static] |  a menor potência negativa de dez que é um valor de ponto flutuante normalizado válido   
(constante membro estática pública)  
[ min_exponent](<#/doc/types/numeric_limits/min_exponent>)[static] |  um a mais que a menor potência negativa da base que é um valor de ponto flutuante normalizado válido   
(constante membro estática pública)  
[ max_exponent10](<#/doc/types/numeric_limits/max_exponent10>)[static] |  a maior potência inteira de 10 que é um valor de ponto flutuante finito válido   
(constante membro estática pública)