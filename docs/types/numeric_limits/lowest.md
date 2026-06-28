# std::numeric_limits&lt;T&gt;::lowest

```cpp
static constexpr T lowest() noexcept;  // (desde C++11)
```

  
Retorna o menor valor finito representável pelo tipo numérico `T`, ou seja, um valor finito x tal que não existe outro valor finito y onde y < x. Isso é diferente de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::min() para tipos de ponto flutuante. Somente significativo para tipos limitados. 

### Valor de retorno

`T` |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::lowest()  
---|---
/* não especializado */ |  T()  
bool |  false  
char |  [CHAR_MIN](<#/doc/types/climits>)  
signed char |  [SCHAR_MIN](<#/doc/types/climits>)  
unsigned char |  ​0​  
wchar_t |  [WCHAR_MIN](<#/doc/types/climits>)  
char8_t (desde C++20) |  ​0​  
char16_t |  ​0​  
char32_t |  ​0​  
short |  [SHRT_MIN](<#/doc/types/climits>)  
unsigned short |  ​0​  
int |  [INT_MIN](<#/doc/types/climits>)  
unsigned int |  ​0​  
long |  [LONG_MIN](<#/doc/types/climits>)  
unsigned long |  ​0​  
long long |  [LLONG_MIN](<#/doc/types/climits>)  
unsigned long long |  ​0​  
float |  -[FLT_MAX](<#/doc/types/climits>)  
double |  -[DBL_MAX](<#/doc/types/climits>)  
long double |  -[LDBL_MAX](<#/doc/types/climits>)  
  
### Observações

Para cada tipo de ponto flutuante padrão C++ `T`, [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::lowest() == -[std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::max(), mas isso não precisa ser necessariamente o caso para qualquer especialização de terceiros. 

### Exemplo

Demonstra [min()](<#/doc/types/numeric_limits/min>), [max()](<#/doc/types/numeric_limits/max>), e `lowest()` para tipos de ponto flutuante:

Execute este código
```
    #include <iostream>
    #include <limits>
    #include <string_view>
     
    template<typename T>
    void print_twice(std::string_view type, T value)
    {
        std::cout << '\t' << type << ": "
                  << std::defaultfloat << value << " or "
                  << std::hexfloat << value << '\n';
    }
     
    int main()
    {
        // min()
        std::cout << "std::numeric_limits<T>::min():\n";
        print_twice("float", std::numeric_limits<float>::min());
        print_twice("double", std::numeric_limits<double>::min());
        print_twice("long double", std::numeric_limits<long double>::min());
     
        // lowest()
        std::cout << "std::numeric_limits<T>::lowest():\n";
        print_twice("float", std::numeric_limits<float>::lowest());
        print_twice("double", std::numeric_limits<double>::lowest());
        print_twice("long double", std::numeric_limits<long double>::lowest());
     
        // max()
        std::cout << "std::numeric_limits<T>::max():\n";
        print_twice("float", std::numeric_limits<float>::max());
        print_twice("double", std::numeric_limits<double>::max());
        print_twice("long double", std::numeric_limits<long double>::max());
    }
```

Saída: 
```
    std::numeric_limits<T>::min():
    	float: 1.17549e-38 or 0x1p-126
    	double: 2.22507e-308 or 0x1p-1022
    	long double: 3.3621e-4932 or 0x8p-16385
    std::numeric_limits<T>::lowest():
    	float: -3.40282e+38 or -0x1.fffffep+127
    	double: -1.79769e+308 or -0x1.fffffffffffffp+1023
    	long double: -1.18973e+4932 or -0xf.fffffffffffffffp+16380
    std::numeric_limits<T>::max():
    	float: 3.40282e+38 or 0x1.fffffep+127
    	double: 1.79769e+308 or 0x1.fffffffffffffp+1023
    	long double: 1.18973e+4932 or 0xf.fffffffffffffffp+16380
```

### Veja também

[ min](<#/doc/types/numeric_limits/min>)[static] |  retorna o menor valor finito do tipo não-ponto-flutuante fornecido, ou o menor valor normal positivo do tipo de ponto flutuante fornecido   
(função membro estática pública)  
[ denorm_min](<#/doc/types/numeric_limits/denorm_min>)[static] |  retorna o menor valor subnormal positivo do tipo de ponto flutuante fornecido   
(função membro estática pública)  
[ max](<#/doc/types/numeric_limits/max>)[static] |  retorna o maior valor finito do tipo fornecido   
(função membro estática pública)