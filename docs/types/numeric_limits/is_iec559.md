# std::numeric_limits&lt;T&gt;::is_iec559

```cpp
static const bool is_iec559; |  | (ate C++11)
static constexpr bool is_iec559;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_iec559 é verdadeiro para todos os tipos de ponto flutuante `T` que satisfazem os requisitos do padrão IEC 559 ([IEEE 754](<https://en.wikipedia.org/wiki/IEEE_754-2008> "enwiki:IEEE 754-2008")). Se [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_iec559 for verdadeiro, então [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_infinity, [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_quiet_NaN, e [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_signaling_NaN também são verdadeiros. 

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_iec559  
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
float |  geralmente verdadeiro  
double |  geralmente verdadeiro  
long double |  geralmente verdadeiro  
  
### Ver também

[ has_infinity](<#/doc/types/numeric_limits/has_infinity>)[static] |  identifica tipos de ponto flutuante que podem representar o valor especial "infinito positivo"   
(constante membro estática pública)  
[ has_quiet_NaN](<#/doc/types/numeric_limits/has_quiet_NaN>)[static] |  identifica tipos de ponto flutuante que podem representar o valor especial "not-a-number silencioso" (NaN)   
(constante membro estática pública)  
[ has_signaling_NaN](<#/doc/types/numeric_limits/has_signaling_NaN>)[static] |  identifica tipos de ponto flutuante que podem representar o valor especial "not-a-number sinalizador" (NaN)   
(constante membro estática pública)