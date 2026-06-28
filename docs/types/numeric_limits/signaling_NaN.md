# std::numeric_limits&lt;T&gt;::signaling_NaN

```cpp
static T signaling_NaN() throw(); |  | (ate C++11)
static constexpr T signaling_NaN() noexcept;  // (desde C++11)
```

  
Retorna o valor especial "signaling [not-a-number](<https://en.wikipedia.org/wiki/NaN> "enwiki:NaN")", conforme representado pelo tipo de ponto flutuante `T`. Somente significativo se [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_signaling_NaN == true. No IEEE 754, a representação binária mais comum de números de ponto flutuante, qualquer valor com todos os bits do expoente definidos e pelo menos um bit da fração definido representa um NaN. É definido pela implementação quais valores da fração representam NaNs quietos ou sinalizadores, e se o bit de sinal é significativo. 

### Valor de retorno

`T` |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::signaling_NaN()  
---|---
/* não-especializado */ |  T()  
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
float |  definido pela implementação (pode ser FLT_SNAN)   
double |  definido pela implementação (pode ser DBL_SNAN)   
long double |  definido pela implementação (pode ser LDBL_SNAN)   
  
### Observações

Um NaN nunca se compara como igual a si mesmo. Copiar um NaN não é exigido, pelo IEEE-754, para preservar sua representação de bits (sinal e [payload](<#/doc/numeric/math/nan.2>)), embora a maioria das implementações o faça. 

Quando um NaN sinalizador é usado como argumento para uma expressão aritmética, a exceção de ponto flutuante apropriada pode ser levantada e o NaN é "silenciado", ou seja, a expressão retorna um NaN quieto. 

### Exemplo

Demonstra o uso de um NaN sinalizador para levantar uma exceção de ponto flutuante:

Execute este código
```cpp
    #include <cfenv>
    #include <iostream>
    #include <limits>
    
    #pragma STDC_FENV_ACCESS on
    
    void show_fe_exceptions()
    {
        int n = std::fetestexcept(FE_ALL_EXCEPT);
    
        if (n & FE_INVALID)
            std::cout << "FE_INVALID is raised\n";
        else if (n == 0)
            std::cout << "no exceptions are raised\n";
    
        std::feclearexcept(FE_ALL_EXCEPT);
    }
    
    int main()
    {
        double snan = std::numeric_limits<double>::signaling_NaN();
        std::cout << "After sNaN was obtained, ";
        show_fe_exceptions();
    
        double qnan = snan * 2.0;
        std::cout << "After sNaN was multiplied by 2, ";
        show_fe_exceptions();
    
        double qnan2 = qnan * 2.0;
        std::cout << "After the quieted NaN was multiplied by 2, ";
        show_fe_exceptions();
    
        std::cout << "The result is " << qnan2 << '\n';
    }
```

Saída: 
```
    After sNaN was obtained, no exceptions are raised
    After sNaN was multiplied by 2, FE_INVALID is raised
    After the quieted NaN was multiplied by 2, no exceptions are raised
    The result is nan
```

### Veja também

[ has_signaling_NaN](<#/doc/types/numeric_limits/has_signaling_NaN>)[static] | identifica tipos de ponto flutuante que podem representar o valor especial "NaN sinalizador" (NaN)   
(constante membro estática pública)  
[ quiet_NaN](<#/doc/types/numeric_limits/quiet_NaN>)[static] | retorna um valor NaN quieto do tipo de ponto flutuante fornecido   
(função membro estática pública)  
[ isnan](<#/doc/numeric/math/isnan>)(C++11) | verifica se o número fornecido é NaN   
(função)