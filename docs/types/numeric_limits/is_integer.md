# std::numeric_limits&lt;T&gt;::is_integer

```cpp
static const bool is_integer; |  | (ate C++11)
static constexpr bool is_integer;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_integer é `true` para todos os tipos aritméticos inteiros `T` e `false` caso contrário. Esta constante é significativa para todas as especializações. 

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_integer  
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
  
### Exemplo

Execute este código
```cpp 
    #include <cstddef>
    #include <cstdint>
    #include <limits>
    
    static_assert
    (
            std::numeric_limits<bool>::is_integer
        &&  std::numeric_limits<std::size_t>::is_integer
        &&  std::numeric_limits<std::int32_t>::is_integer
        &&  std::numeric_limits<std::int64_t>::is_integer
        &&  std::numeric_limits<decltype(42)>::is_integer
        && !std::numeric_limits<int*>::is_integer
        && !std::numeric_limits<float>::is_integer
        && !std::numeric_limits<double>::is_integer
        && ![std::numeric_limits.html])<long double>::is_integer
        && !std::numeric_limits<decltype({})>::is_integer // P0315R4
    );
    
    int main() {}
```

### Veja também

[ is_integral](<#/doc/types/is_integral>)(C++11) |  verifica se um tipo é um tipo integral   
(modelo de classe)  
[ is_signed](<#/doc/types/numeric_limits/is_signed>)[static] |  identifica tipos com sinal   
(constante membro estática pública)  
[ is_exact](<#/doc/types/numeric_limits/is_exact>)[static] |  identifica tipos exatos   
(constante membro estática pública)  
[ is_bounded](<#/doc/types/numeric_limits/is_bounded>)[static] |  identifica tipos que representam um conjunto finito de valores   
(constante membro estática pública)