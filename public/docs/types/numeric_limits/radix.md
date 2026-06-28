# std::numeric_limits&lt;T&gt;::radix

```cpp
static const int radix;  // (até C++11)
static constexpr int radix;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::radix é a base do sistema numérico usado na representação do tipo. É 2 para todos os tipos numéricos binários, mas pode ser, por exemplo, 10 para [tipos de ponto flutuante decimais](<https://en.wikipedia.org/wiki/Decimal64_floating_point_format> "enwiki:Decimal64 floating-point format") IEEE 754 ou para inteiros de [decimal codificado em binário](<https://en.wikipedia.org/wiki/binary-coded_decimal> "enwiki:binary-coded decimal") de terceiros. Esta constante é significativa para todas as especializações. 

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::radix  
---|---
/* não especializado */ |  ​0​  
bool |  2  
char |  2  
signed char |  2  
unsigned char |  2  
wchar_t |  2  
char8_t (desde C++20) |  2  
char16_t (desde C++11) |  2  
char32_t (desde C++11) |  2  
short |  2  
unsigned short |  2  
int |  2  
unsigned int |  2  
long |  2  
unsigned long |  2  
long long (desde C++11) |  2  
unsigned long long (desde C++11) |  2  
float |  [FLT_RADIX](<#/doc/types/climits>)  
double |  [FLT_RADIX](<#/doc/types/climits>)  
long double |  [FLT_RADIX](<#/doc/types/climits>)  
  
### Veja também

[ digits](<#/doc/types/numeric_limits/digits>)[static] |  número de dígitos `radix` que podem ser representados sem alteração   
(constante membro estática pública)  
[ min_exponent](<#/doc/types/numeric_limits/min_exponent>)[static] |  um a mais que a menor potência negativa da base que é um valor de ponto flutuante normalizado válido   
(constante membro estática pública)  
[ max_exponent](<#/doc/types/numeric_limits/max_exponent>)[static] |  um a mais que a maior potência inteira da base que é um valor de ponto flutuante finito válido   
(constante membro estática pública)