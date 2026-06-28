# std::numeric_limits&lt;T&gt;::max

Definido no cabeçalho `[<limits>](<#/doc/header/limits>)`

```c
static T max() throw();
static constexpr T max() noexcept;
```

  
Retorna o valor finito máximo representável pelo tipo numérico `T`. Significativo para todos os tipos limitados (bounded types). 

### Valor de retorno

`T` |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::max()  
---|---
/* não-especializado */ |  T()  
bool |  true  
char |  [CHAR_MAX](<#/doc/types/climits>)  
signed char |  [SCHAR_MAX](<#/doc/types/climits>)  
unsigned char |  [UCHAR_MAX](<#/doc/types/climits>)  
wchar_t |  [WCHAR_MAX](<#/doc/types/climits>)  
char8_t (desde C++20) |  [UCHAR_MAX](<#/doc/types/climits>)  
char16_t (desde C++11) |  [UINT_LEAST16_MAX](<#/doc/types/integer>)  
char32_t (desde C++11) |  [UINT_LEAST32_MAX](<#/doc/types/integer>)  
short |  [SHRT_MAX](<#/doc/types/climits>)  
unsigned short |  [USHRT_MAX](<#/doc/types/climits>)  
int |  [INT_MAX](<#/doc/types/climits>)  
unsigned int |  [UINT_MAX](<#/doc/types/climits>)  
long |  [LONG_MAX](<#/doc/types/climits>)  
unsigned long |  [ULONG_MAX](<#/doc/types/climits>)  
long long (desde C++11) |  [LLONG_MAX](<#/doc/types/climits>)  
unsigned long long (desde C++11) |  [ULLONG_MAX](<#/doc/types/climits>)  
float |  [FLT_MAX](<#/doc/types/climits>)  
double |  [DBL_MAX](<#/doc/types/climits>)  
long double |  [LDBL_MAX](<#/doc/types/climits>)  
  
### Exemplo

Demonstra o uso de `max()` com alguns tipos fundamentais e alguns typedefs da biblioteca padrão (a saída é específica do sistema):

Execute este código
```
    #include <boost/type_index.hpp>
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <limits>
    #include <type_traits>
     
    template<typename T>
    void print_max_value_of()
    {
        constexpr T max{std::numeric_limits<T>::max()};
     
        std::cout << std::setw(16) << boost::typeindex::type_id<T>() << ": ";
        if constexpr (std::is_floating_point_v<T>)
            std::cout << std::defaultfloat << max << " = " << std::hexfloat << max << '\n';
        else
        {
            constexpr auto m{static_cast<unsigned long long>(max)};
            std::cout << std::dec << m << " = " << std::hex << m << '\n';
        }
    }
     
    int main()
    {
        std::cout << std::showbase;
     
        print_max_value_of<bool>();
        print_max_value_of<short>();
        print_max_value_of<int>();
        print_max_value_of<std::streamsize>();
        print_max_value_of<std::size_t>();
        print_max_value_of<char>();
        print_max_value_of<char16_t>();
        print_max_value_of<wchar_t>();
        print_max_value_of<float>();
        print_max_value_of<double>();
        print_max_value_of<long double>();
    }
```

Saída possível: 
```
                bool: 1 = 0x1
               short: 32767 = 0x7fff
                 int: 2147483647 = 0x7fffffff
                long: 9223372036854775807 = 0x7fffffffffffffff
       unsigned long: 18446744073709551615 = 0xffffffffffffffff
                char: 127 = 0x7f
            char16_t: 65535 = 0xffff
             wchar_t: 2147483647 = 0x7fffffff
               float: 3.40282e+38 = 0x1.fffffep+127
              double: 1.79769e+308 = 0x1.fffffffffffffp+1023
         long double: 1.18973e+4932 = 0xf.fffffffffffffffp+16380
```

### Veja também

[ lowest](<#/doc/types/numeric_limits/lowest>)[static] (C++11) |  retorna o menor valor finito do tipo dado, ou seja, o valor mais negativo para tipos com sinal, ​0​ para tipos sem sinal   
(função membro estática pública)  
[ min](<#/doc/types/numeric_limits/min>)[static] |  retorna o menor valor finito do tipo não-ponto-flutuante dado, ou o menor valor normal positivo do tipo ponto-flutuante dado   
(função membro estática pública)