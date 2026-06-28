# std::numeric_limits&lt;T&gt;::has_infinity

```cpp
static const bool has_infinity; |  |  (ate C++11)
static constexpr bool has_infinity;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_infinity é `true` para todos os tipos `T` capazes de representar o infinito positivo como um valor especial distinto. Esta constante é significativa para todos os tipos de ponto flutuante e é garantida como `true` se [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_iec559 == true. 

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_infinity  
---|---
/* não especializado */ |  false  
bool |  false  
char |  false  
signed char |  false  
unsigned char |  false  
wchar_t |  false  
char8_t (desde C++20) |  false  
char16_t (desde C++11) |  false  
char32_t (desde C++11) |  false  
short |  false  
unsigned short |  false  
int |  false  
unsigned int |  false  
long |  false  
unsigned long |  false  
long long (desde C++11) |  false  
unsigned long long (desde C++11) |  false  
float |  geralmente true  
double |  geralmente true  
long double |  geralmente true  
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <limits>
     
    int main()
    {
        std::cout << std::boolalpha
                  << std::numeric_limits<int>::has_infinity << '\n'
                  << std::numeric_limits<long>::has_infinity << '\n'
                  << std::numeric_limits<float>::has_infinity << '\n'
                  << std::numeric_limits<double>::has_infinity << '\n';
    }
```

Saída possível: 
```
    false
    false
    true
    true
```

### Ver também

[ infinity](<#/doc/types/numeric_limits/infinity>)[static] |  retorna o valor de infinito positivo do tipo de ponto flutuante fornecido   
(função membro estática pública)  
[ has_quiet_NaN](<#/doc/types/numeric_limits/has_quiet_NaN>)[static] |  identifica tipos de ponto flutuante que podem representar o valor especial "quiet not-a-number" (NaN)   
(constante membro estática pública)  
[ has_signaling_NaN](<#/doc/types/numeric_limits/has_signaling_NaN>)[static] |  identifica tipos de ponto flutuante que podem representar o valor especial "signaling not-a-number" (NaN)   
(constante membro estática pública)