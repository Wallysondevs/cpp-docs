# std::numeric_limits&lt;T&gt;::is_exact

```cpp
static const bool is_exact;  // (até C++11)
static constexpr bool is_exact;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_exact é true para todos os tipos aritméticos `T` que usam representação exata. 

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_exact  
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
float |  false  
double |  false  
long double |  false  
  
### Observações

Embora todos os tipos fundamentais `T` para os quais [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_exact == true sejam tipos inteiros, uma biblioteca pode definir tipos exatos que não são inteiros, por exemplo, um tipo aritmético racional que representa frações. 

### Veja também

[ is_integer](<#/doc/types/numeric_limits/is_integer>)[static] |  identifica tipos inteiros   
(membro constante estático público)  
[ is_signed](<#/doc/types/numeric_limits/is_signed>)[static] |  identifica tipos com sinal   
(membro constante estático público)  
[ is_bounded](<#/doc/types/numeric_limits/is_bounded>)[static] |  identifica tipos que representam um conjunto finito de valores   
(membro constante estático público)