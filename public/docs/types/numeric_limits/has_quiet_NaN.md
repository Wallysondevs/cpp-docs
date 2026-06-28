# std::numeric_limits&lt;T&gt;::has_quiet_NaN

```cpp
static const bool has_quiet_NaN;  // (até C++11)
static constexpr bool has_quiet_NaN;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_quiet_NaN é `true` para todos os tipos `T` capazes de representar o valor especial "NaN silencioso" ([Not-A-Number](<https://en.wikipedia.org/wiki/NaN> "enwiki:NaN")). Esta constante é significativa para todos os tipos de ponto flutuante e é garantida como `true` se [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_iec559 == true. 

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_quiet_NaN  
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
  
### Veja também

[ quiet_NaN](<#/doc/types/numeric_limits/quiet_NaN>)[static] |  retorna um valor NaN silencioso do tipo de ponto flutuante fornecido   
(função membro estática pública)  
[ has_infinity](<#/doc/types/numeric_limits/has_infinity>)[static] |  identifica tipos de ponto flutuante que podem representar o valor especial "infinito positivo"   
(constante membro estática pública)  
[ has_signaling_NaN](<#/doc/types/numeric_limits/has_signaling_NaN>)[static] |  identifica tipos de ponto flutuante que podem representar o valor especial "NaN sinalizador" (NaN)   
(constante membro estática pública)