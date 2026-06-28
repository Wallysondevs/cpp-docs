# std::numeric_limits&lt;T&gt;::denorm_min

```cpp
static T denorm_min() throw();  // (até C++11)
static constexpr T denorm_min() noexcept;  // (desde C++11)
```

  
Retorna o mínimo valor positivo [subnormal](<https://en.wikipedia.org/wiki/Denormal_number> "enwiki:Denormal number") do tipo `T`, se [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_denorm != [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>), caso contrário retorna [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::min() para tipos de ponto flutuante e T() para todos os outros tipos. Somente significativo para tipos de ponto flutuante. 

### Valor de retorno

`T` |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::denorm_min()  
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
float |  [FLT_TRUE_MIN](<#/doc/types/climits>) (\\(\scriptsize 2^{-149}\\)2-149  
se  
[std::numeric_limits](<#/doc/types/numeric_limits>)&lt;float&gt;::is_iec559 for true)   
double |  [DBL_TRUE_MIN](<#/doc/types/climits>) (\\(\scriptsize 2^{-1074}\\)2-1074  
se  
[std::numeric_limits](<#/doc/types/numeric_limits>)&lt;double&gt;::is_iec559 for true)   
long double |  [LDBL_TRUE_MIN](<#/doc/types/climits>)  
  
### Exemplo

Demonstra a estrutura de bits subjacente de `denorm_min()` e imprime os valores:

Execute este código
```
    #include <cassert>
    #include <cstdint>
    #include <cstring>
    #include <iostream>
    #include <limits>
     
    int main()
    {
        // the smallest subnormal value has sign bit = 0, exponent = 0
        // and only the least significant bit of the fraction is 1
        std::uint32_t denorm_bits = 0x0001;
        float denorm_float;
        std::memcpy(&denorm_float, &denorm_bits, sizeof(float));
     
        assert(denorm_float == std::numeric_limits<float>::denorm_min());
     
        std::cout << "float\tmin()\t\tdenorm_min()\n";
        std::cout << "\t" << std::numeric_limits<float>::min() << '\t';
        std::cout <<         std::numeric_limits<float>::denorm_min() << '\n';
     
        std::cout << "double\tmin()\t\tdenorm_min()\n";
        std::cout << "\t" << std::numeric_limits<double>::min() << '\t';
        std::cout <<         std::numeric_limits<double>::denorm_min() << '\n';
    }
```

Saída possível: 
```
    float	min()		denorm_min()
    	1.17549e-38	1.4013e-45
    double	min()		denorm_min()
    	2.22507e-308	4.94066e-324
```

### Veja também

[ min](<#/doc/types/numeric_limits/min>)[static] |  retorna o menor valor finito do tipo não-ponto-flutuante fornecido, ou o menor valor normal positivo do tipo de ponto flutuante fornecido   
(função membro estática pública)  
[ has_denorm](<#/doc/types/numeric_limits/has_denorm>)[static] |  identifica o estilo de desnormalização usado pelo tipo de ponto flutuante   
(constante membro estática pública)  
[ lowest](<#/doc/types/numeric_limits/lowest>)[static] (C++11) |  retorna o menor valor finito do tipo fornecido, ou seja, o valor mais negativo para tipos com sinal, ​0​ para tipos sem sinal   
(função membro estática pública)