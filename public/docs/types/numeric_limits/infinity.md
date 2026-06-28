# std::numeric_limits&lt;T&gt;::infinity

```cpp
static T infinity() throw();  // (até C++11)
static constexpr T infinity() noexcept;  // (desde C++11)
```

  
Retorna o valor especial "infinito positivo", conforme representado pelo tipo de ponto flutuante `T`. Somente significativo se [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_infinity == true. No IEEE 754, a representação binária mais comum de números de ponto flutuante, o infinito positivo é o valor com todos os bits do expoente definidos e todos os bits da fração zerados. 

### Valor de retorno

`T` |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::infinity()  
---|---
/* não especializado */ |  T()  
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
float |  [HUGE_VALF](<#/doc/numeric/math/HUGE_VAL>)  
double |  [HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>)  
long double |  [HUGE_VALL](<#/doc/numeric/math/HUGE_VAL>)  
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <limits>
    
    int main()
    {
        double max = std::numeric_limits<double>::max();
        double inf = std::numeric_limits<double>::infinity();
    
        if (inf > max)
            std::cout << inf << " is greater than " << max << '\n';
    }
```

Saída: 
```
    inf is greater than 1.79769e+308
```

### Veja também

[ has_infinity](<#/doc/types/numeric_limits/has_infinity>)[static] |  identifica tipos de ponto flutuante que podem representar o valor especial "infinito positivo"   
(constante membro estática pública)  