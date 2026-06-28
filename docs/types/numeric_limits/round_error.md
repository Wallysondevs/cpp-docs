# std::numeric_limits&lt;T&gt;::round_error

```cpp
static T round_error() throw();  // (até C++11)
static constexpr T round_error() noexcept;  // (desde C++11)
```

  
Retorna o maior erro de arredondamento possível em ULPs (unidades no último lugar), conforme definido pela ISO 10967, que pode variar de 0.5 (arredondamento para o dígito mais próximo) a 1.0 (arredondamento para zero ou para o infinito). É significativo apenas se [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_integer == false. 

### Valor de retorno

`T` |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::round_error()  
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
float |  0.5F  
double |  0.5  
long double |  0.5L  
  
### Veja também

[ round_style](<#/doc/types/numeric_limits/round_style>)[static] |  identifica o estilo de arredondamento usado pelo tipo   
(membro constante estático público)  