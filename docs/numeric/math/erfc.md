# std::erfc, std::erfcf, std::erfcl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float erfc ( float num );
double erfc ( double num );
long double erfc ( long double num );
/*floating-point-type*/
erfc ( /*floating-point-type*/ num );
(constexpr desde C++26)
float erfcf( float num );
(constexpr desde C++26)
long double erfcl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
erfc ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double erfc ( Integer num );
```

  
1-3) Calcula a [função erro complementar](<https://en.wikipedia.org/wiki/Complementary_error_function> "enwiki:Complementary error function") de num, ou seja, 1.0 - [std::erf](<#/doc/numeric/math/erf>)(num), mas sem perda de precisão para valores grandes de num. A biblioteca fornece sobrecargas de `std::erfc` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro.(desde C++23)

S) A sobrecarga SIMD executa um `std::erfc` elemento a elemento em v_num.

    

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)  
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)  
  
### Parâmetros

num  |  \-  |  valor de ponto flutuante ou inteiro   
  
### Valor de retorno

Se nenhum erro ocorrer, o valor da função erro complementar de num, ou seja \\(\frac{2}{\sqrt{\pi} }\int_{num}^{\infty}{e^{-{t^2} }\mathsf{d}t}\\)2  
---  
√π  
∫∞  
num _e_ -t2  
d _t_ ou \\({\small 1-\operatorname{erf}(num)}\\)1-erf(num), é retornado. 

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado. 

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559), 

  * Se o argumento for +∞, +0 é retornado. 
  * Se o argumento for -∞, 2 é retornado. 
  * Se o argumento for NaN, NaN é retornado. 

### Notas

Para o tipo double compatível com IEEE, underflow é garantido se num > 26.55. 

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::erfc(num) tenha o mesmo efeito que std::erfc(static_cast&lt;double&gt;(num)). 

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iomanip>
    #include <iostream>
     
    double normalCDF(double x) // Phi(-∞, x) aka N(x)
    {
        return std::erfc(-x / std::sqrt(2)) / 2;
    }
     
    int main()
    {
        std::cout << "normal cumulative distribution function:\n"
                  << std::fixed << std::setprecision(2);
        for (double n = 0; n < 1; n += 0.1)
            std::cout << "normalCDF(" << n << ") = " << 100 * normalCDF(n) << "%\n";
     
        std::cout << "special values:\n"
                  << "erfc(-Inf) = " << std::erfc(-INFINITY) << '\n'
                  << "erfc(Inf) = " << std::erfc(INFINITY) << '\n';
    }
```

Saída: 
```
    normal cumulative distribution function:
    normalCDF(0.00) = 50.00%
    normalCDF(0.10) = 53.98%
    normalCDF(0.20) = 57.93%
    normalCDF(0.30) = 61.79%
    normalCDF(0.40) = 65.54%
    normalCDF(0.50) = 69.15%
    normalCDF(0.60) = 72.57%
    normalCDF(0.70) = 75.80%
    normalCDF(0.80) = 78.81%
    normalCDF(0.90) = 81.59%
    normalCDF(1.00) = 84.13%
    special values:
    erfc(-Inf) = 2.00
    erfc(Inf) = 0.00
```

### Veja também

[ erferfferfl](<#/doc/numeric/math/erf>)(C++11)(C++11)(C++11) |  função erro   
(função)  
[Documentação C](<#/>) para erfc  
  
### Links externos

[Weisstein, Eric W. "Erfc."](<https://mathworld.wolfram.com/Erfc.html>) De MathWorld — Um Recurso Web da Wolfram.   
---