# std::numeric_limits&lt;T&gt;::is_signed

```cpp
static const bool is_signed;  // (até C++11)
static constexpr bool is_signed;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_signed é `true` para todos os tipos aritméticos com sinal `T` e `false` para os tipos sem sinal. Esta constante é significativa para todas as especializações. 

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_signed  
---|---
/* não especializado */ |  false  
bool |  false  
char |  definido pela implementação   
signed char |  true  
unsigned char |  false  
wchar_t |  definido pela implementação   
char8_t (desde C++20) |  false  
char16_t (desde C++11) |  false  
char32_t (desde C++11) |  false  
short |  true  
unsigned short |  false  
int |  true  
unsigned int |  false  
long |  true  
unsigned long |  false  
long long (desde C++11) |  true  
unsigned long long (desde C++11) |  false  
float |  true  
double |  true  
long double |  true  
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <iomanip>
    #include <limits>
     
    template<typename T>
    struct test
    {
        test(const char* name, int w = 15)
        {
            std::cout
                << std::left << std::setw(w)
                << (std::numeric_limits<T>::is_specialized ? name : "non-specialized")
                << " : "
                << (std::numeric_limits<T>::is_signed ? "" : "un") << "signed\n";
        }
    };
     
    int main()
    {
        test<bool>{"bool"};
        test<char>{"char"};
        test<wchar_t>{"wchar_t"};
        test<char16_t>{"char16_t"};
        test<char32_t>{"char32_t"};
        test<float>{"float"};
        struct delusion{};
        test<delusion>{"delusion"};
        test<decltype(42)>{"decltype(42)"};
    }
```

Saída possível: 
```
    bool            : unsigned
    char            : signed
    wchar_t         : signed
    char16_t        : unsigned
    char32_t        : unsigned
    float           : signed
    non-specialized : unsigned
    decltype(42)    : signed
```

### Veja também

[ is_signed](<#/doc/types/is_signed>)(C++11) |  verifica se um tipo é um tipo aritmético com sinal   
(modelo de classe)  
[ is_integer](<#/doc/types/numeric_limits/is_integer>)[static] |  identifica tipos inteiros   
(constante membro estática pública)  
[ is_exact](<#/doc/types/numeric_limits/is_exact>)[static] |  identifica tipos exatos   
(constante membro estática pública)  
[ is_bounded](<#/doc/types/numeric_limits/is_bounded>)[static] |  identifica tipos que representam um conjunto finito de valores   
(constante membro estática pública)