# std::numeric_limits&lt;T&gt;::min

Definido no cabeçalho `[<limits>](<#/doc/header/limits>)`

```c
static T min() throw();
static constexpr T min() noexcept;
```

Retorna o valor finito mínimo representável pelo tipo numérico `T`.

Para tipos de ponto flutuante com desnormalização, `min()` retorna o valor normalizado positivo mínimo. _Note que este comportamento pode ser inesperado_ , especialmente quando comparado ao comportamento de `min()` para tipos integrais. Para encontrar o valor que não possui valores menores que ele, use [`lowest()`](<#/doc/types/numeric_limits/lowest>).(desde C++11)

`min()` é significativo apenas para tipos limitados e para tipos não-assinados ilimitados.

### Valor de retorno

`T` | [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::min()
---|---
/* não-especializado */ | T()
bool | false
char | [CHAR_MIN](<#/doc/types/climits>)
signed char | [SCHAR_MIN](<#/doc/types/climits>)
unsigned char | ​0​
wchar_t | [WCHAR_MIN](<#/doc/types/climits>)
char8_t (desde C++20) | ​0​
char16_t (desde C++11) | ​0​
char32_t (desde C++11) | ​0​
short | [SHRT_MIN](<#/doc/types/climits>)
unsigned short | ​0​
int | [INT_MIN](<#/doc/types/climits>)
unsigned int | ​0​
long | [LONG_MIN](<#/doc/types/climits>)
unsigned long | ​0​
long long (desde C++11) | [LLONG_MIN](<#/doc/types/climits>)
unsigned long long (desde C++11) | ​0​
float | [FLT_MIN](<#/doc/types/climits>)
double | [DBL_MIN](<#/doc/types/climits>)
long double | [LDBL_MIN](<#/doc/types/climits>)

### Exemplo

Demonstra o uso com tipos typedef, e a diferença no sinal do resultado entre tipos inteiros e de ponto flutuante:

Execute este código
```cpp
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <limits>
    
    // we want to print char types as an integer without leading Fs
    auto p(auto x) { return x; }
    auto p(char x) { return x & static_cast<unsigned char>(-1); }
    
    template <typename T>
    void print_one(std::string_view type_name)
    {
        constexpr T min = std::numeric_limits<T>::min();
    
        std::cout 
            << std::dec << std::defaultfloat << std::setw(14) << type_name
            << " (" << std::setw(2) << sizeof(T) << " bytes): " << +min;
    
        if constexpr (min != 0)
            std::cout << " or " << std::showbase << std::hex << std::hexfloat << p(min);
    
        std::cout << '\n';
    }
    
    #define SHOW(T) print_one<T>(#T)
    
    int main()
    {
        SHOW(bool);
        SHOW(char);
        SHOW(unsigned char);
        SHOW(short);
        SHOW(unsigned short);
        SHOW(signed);
        SHOW(unsigned);
        SHOW(std::ptrdiff_t);
        SHOW(std::size_t);
        SHOW(float);
        SHOW(double);
        SHOW(long double);
    }
```

Saída possível:
```
              bool ( 1 bytes): 0
              char ( 1 bytes): -128 or 0x80
     unsigned char ( 1 bytes): 0
             short ( 2 bytes): -32768 or 0x8000
    unsigned short ( 2 bytes): 0
            signed ( 4 bytes): -2147483648 or 0x80000000
          unsigned ( 4 bytes): 0
    std::ptrdiff_t ( 8 bytes): -9223372036854775808 or 0x8000000000000000
       std::size_t ( 8 bytes): 0
             float ( 4 bytes): 1.17549e-38 or 0x1p-126
            double ( 8 bytes): 2.22507e-308 or 0x1p-1022
       long double (16 bytes): 3.3621e-4932 or 0x8p-16385
```

### Veja também

[ lowest](<#/doc/types/numeric_limits/lowest>)[static] (desde C++11) | retorna o menor valor finito do tipo dado, ou seja, o valor mais negativo para tipos assinados, ​0​ para tipos não-assinados
(função membro estática pública)
[ denorm_min](<#/doc/types/numeric_limits/denorm_min>)[static] | retorna o menor valor subnormal positivo do tipo de ponto flutuante dado
(função membro estática pública)
[ max](<#/doc/types/numeric_limits/max>)[static] | retorna o maior valor finito do tipo dado
(função membro estática pública)