# std::numeric_limits&lt;T&gt;::is_bounded

```cpp
static const bool is_bounded; |  | (ate C++11)
static constexpr bool is_bounded;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_bounded é `true` para todos os tipos aritméticos `T` que representam um conjunto finito de valores. Embora todos os tipos fundamentais sejam limitados (bounded), esta constante seria `false` em uma especialização de [std::numeric_limits](<#/doc/types/numeric_limits>) para um tipo aritmético de precisão arbitrária fornecido por uma biblioteca. 

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_bounded  
---|---
/* não especializado */ |  false  
bool |  true  
char |  true  
signed char |  true  
unsigned char |  true  
wchar_t |  true  
char8_t (desde C++20) |  true  
char16_t (desde C++11) |  true  
char32_t (desde C++11) |  true  
short |  true  
unsigned short |  true  
int |  true  
unsigned int |  true  
long |  true  
unsigned long |  true  
long long (desde C++11) |  true  
unsigned long long (desde C++11) |  true  
float |  true  
double |  true  
long double |  true  
  
### Veja também

[ is_integer](<#/doc/types/numeric_limits/is_integer>)[static] |  identifica tipos inteiros   
(constante membro estática pública)  
[ is_signed](<#/doc/types/numeric_limits/is_signed>)[static] |  identifica tipos com sinal   
(constante membro estática pública)  
[ is_exact](<#/doc/types/numeric_limits/is_exact>)[static] |  identifica tipos exatos   
(constante membro estática pública)