# std::numeric_limits&lt;T&gt;::is_specialized

```cpp
static const bool is_specialized; |  | (ate C++11)
static constexpr bool is_specialized;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_specialized é true para todos os `T` para os quais existe uma especialização de [std::numeric_limits](<#/doc/types/numeric_limits>). 

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_specialized  
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
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <limits>
    #include <type_traits>
     
    int main()
    {
        enum E{};
     
        std::cout << std::boolalpha
                  << std::numeric_limits<bool>::is_specialized << '\n'
                  << std::numeric_limits<long long>::is_specialized << '\n'
                  << std::numeric_limits<std::true_type>::is_specialized << '\n'
                  << std::numeric_limits<E>::is_specialized << '\n';
    }
```

Saída possível: 
```
    true
    true
    false
    false
```

### Veja também

[ is_integer](<#/doc/types/numeric_limits/is_integer>)[static] |  identifica tipos inteiros   
(membro constante estático público)  
[ is_iec559](<#/doc/types/numeric_limits/is_iec559>)[static] |  identifica os tipos de ponto flutuante IEC 559/IEEE 754   
(membro constante estático público)  
[ is_exact](<#/doc/types/numeric_limits/is_exact>)[static] |  identifica tipos exatos   
(membro constante estático público)  
[ is_bounded](<#/doc/types/numeric_limits/is_bounded>)[static] |  identifica tipos que representam um conjunto finito de valores   
(membro constante estático público)