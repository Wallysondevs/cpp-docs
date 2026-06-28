# std::tgamma, std::tgammaf, std::tgammal

```cpp
Definido no header `<cmath>`
  // (1)
float tgamma ( float num );
double tgamma ( double num );
long double tgamma ( long double num );  // (até C++23)
/*floating-point-type*/
tgamma ( /*floating-point-type*/ num );  // (desde C++23)
(constexpr desde C++26)
float tgammaf( float num );  // (2) (desde C++11)
(constexpr desde C++26)
long double tgammal( long double num );  // (3) (desde C++11)
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no header `<simd>`
```

```cpp
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
tgamma ( const V& v_num );  // (desde C++26)
Sobrecargas adicionais (desde C++11)
Definido no header `<cmath>`
template< class Integer >
double tgamma ( Integer num );
```

  
1-3) Calcula a [função gama](<https://en.wikipedia.org/wiki/Gamma_function> "enwiki:Gamma function") de num. A biblioteca fornece sobrecargas de `std::tgamma` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::tgamma` elemento a elemento em v_num.

    

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)  
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)  
  
### Parâmetros

num  |  \-  |  valor de ponto flutuante ou inteiro   
  
### Valor de retorno

Se nenhum erro ocorrer, o valor da função gama de num, ou seja \\(\Gamma(\mathtt{num}) = \displaystyle\int_0^\infty\\!\\! t^{\mathtt{num}-1} e^{-t}\, dt\\)∫∞  
0 _t_ num-1  
_e_ -t d _t_ , é retornado. 

Se ocorrer um erro de domínio, um valor definido pela implementação (NaN onde suportado) é retornado. 

Se ocorrer um erro de polo, [±HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `±HUGE_VALF`, ou `±HUGE_VALL` é retornado. 

Se ocorrer um erro de range devido a overflow, [±HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `±HUGE_VALF`, ou `±HUGE_VALL` é retornado. 

Se ocorrer um erro de range devido a underflow, o valor correto (após arredondamento) é retornado. 

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se num for zero ou um inteiro menor que zero, um erro de polo ou um erro de domínio pode ocorrer. 

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559), 

  * Se o argumento for ±0, ±∞ é retornado e [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) é levantado. 
  * Se o argumento for um inteiro negativo, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado. 
  * Se o argumento for -∞, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado. 
  * Se o argumento for +∞, +∞ é retornado. 
  * Se o argumento for NaN, NaN é retornado. 

### Notas

Se num for um número natural, std::tgamma(num) é o fatorial de num - 1. Muitas implementações calculam o fatorial exato no domínio inteiro se o argumento for um inteiro suficientemente pequeno. 

Para o tipo double compatível com IEEE, overflow ocorre se 0 < num && num < 1 / [DBL_MAX](<#/doc/types/climits>) ou se num > 171.7. 

[POSIX exige](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/tgamma.html>) que um erro de polo ocorra se o argumento for zero, mas um erro de domínio ocorra quando o argumento for um inteiro negativo. Também especifica que, no futuro, erros de domínio podem ser substituídos por erros de polo para argumentos inteiros negativos (nesse caso, o valor de retorno nessas situações mudaria de NaN para ±∞). 

Existe uma função não-padrão chamada `gamma` em várias implementações, mas sua definição é inconsistente. Por exemplo, as versões glibc e 4.2BSD de `gamma` executam `lgamma`, mas a versão 4.4BSD de `gamma` executa `tgamma`. 

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::tgamma(num) tenha o mesmo efeito que std::tgamma(static_cast&lt;double&gt;(num)). 

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <cfenv>
    #include <cmath>
    #include <cstring>
    #include <iostream>
    // #pragma STDC FENV_ACCESS ON
    
    int main()
    {
        std::cout << "tgamma(10) = " << std::tgamma(10)
                  << ", 9! = " << 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9 << '\n'
                  << "tgamma(0.5) = " << std::tgamma(0.5)
                  << ", sqrt(pi) = " << std::sqrt(std::acos(-1)) << '\n';
    
        // special values
        std::cout << "tgamma(1) = " << std::tgamma(1) << '\n'
                  << "tgamma(+Inf) = " << std::tgamma(INFINITY) << '\n';
    
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "tgamma(-1) = " << std::tgamma(-1) << '\n';
    
        if (errno == EDOM)
            std::cout << "    errno == EDOM: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID raised\n";
    }
```

Saída possível: 
```
    tgamma(10) = 362880, 9! = 362880
    tgamma(0.5) = 1.77245, sqrt(pi) = 1.77245
    tgamma(1) = 1
    tgamma(+Inf) = inf
    tgamma(-1) = nan
        errno == EDOM: Numerical argument out of domain
        FE_INVALID raised
```

### Veja também

[ lgammalgammaflgammal](<#/doc/numeric/math/lgamma>)(C++11)(C++11)(C++11) |  logaritmo natural da função gama   
(function)  
[ betabetafbetal](<#/doc/numeric/special_functions/beta>)(C++17)(C++17)(C++17) |  função beta   
(function)  
[Documentação C](<#/>) para tgamma  
  
### Links externos

[Weisstein, Eric W. "Função Gama."](<https://mathworld.wolfram.com/GammaFunction.html>) De MathWorld — Um Recurso Web da Wolfram.   
---