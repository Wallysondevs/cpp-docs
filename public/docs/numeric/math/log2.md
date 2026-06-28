# std::log2, std::log2f, std::log2l

```cpp
Definido no header `<cmath>`
  // (1)
float log2 ( float num );
double log2 ( double num );
long double log2 ( long double num );  // (até C++23)
/*floating-point-type*/
log2 ( /*floating-point-type*/ num );  // (desde C++23)
(constexpr desde C++26)
float log2f( float num );  // (2) (desde C++11)
(constexpr desde C++26)
long double log2l( long double num );  // (3) (desde C++11)
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no header `<simd>`
```

```cpp
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
log2 ( const V& v_num );  // (desde C++26)
Sobrecargas adicionais (desde C++11)
Definido no header `<cmath>`
template< class Integer >
double log2 ( Integer num );
```

  
1-3) Calcula o [logaritmo binário (base-2)](<https://en.wikipedia.org/wiki/Binary_logarithm> "enwiki:Binary logarithm") de num. A biblioteca fornece sobrecargas de `std::log2` para todos os tipos floating-point cv-unqualified como o tipo do parâmetro.(desde C++23)

S) A sobrecarga SIMD executa um `std::log2` elemento a elemento em v_num.

    

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)  
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)  
  
### Parâmetros

num  |  \-  |  valor floating-point ou inteiro   
  
### Valor de retorno

Se nenhum erro ocorrer, o logaritmo de base-2 de num (log2(num) ou lb(num)) é retornado. 

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado). 

Se ocorrer um erro de polo, [-HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `-HUGE_VALF`, ou `-HUGE_VALL` é retornado. 

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Ocorre erro de domínio se num for menor que zero. 

Pode ocorrer erro de polo se num for zero. 

Se a implementação suporta aritmética floating-point IEEE (IEC 60559), 

  * Se o argumento for ±0, -∞ é retornado e [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) é levantado. 
  * Se o argumento for 1, +0 é retornado. 
  * Se o argumento for negativo, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado. 
  * Se o argumento for +∞, +∞ é retornado. 
  * Se o argumento for NaN, NaN é retornado. 

### Notas

Para num inteiro, o logaritmo binário pode ser interpretado como o índice baseado em zero do bit 1 mais significativo na entrada. 

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::log2(num) tenha o mesmo efeito que std::log2(static_cast&lt;double&gt;(num)). 

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
        std::cout << "log2(65536) = " << std::log2(65536) << '\n'
                  << "log2(0.125) = " << std::log2(0.125) << '\n'
                  << "log2(0x020f) = " << std::log2(0x020f)
                  << " (highest set bit is in position 9)\n"
                  << "base-5 logarithm of 125 = "
                  << std::log2(125) / std::log2(5) << '\n';
     
        // special values
        std::cout << "log2(1) = " << std::log2(1) << '\n'
                  << "log2(+Inf) = " << std::log2(INFINITY) << '\n';
     
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
     
        std::cout << "log2(0) = " << std::log2(0) << '\n';
     
        if (errno == ERANGE)
            std::cout << "    errno == ERANGE: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_DIVBYZERO))
            std::cout << "    FE_DIVBYZERO raised\n";
    }
```

Saída possível: 
```
    log2(65536) = 16
    log2(0.125) = -3
    log2(0x020f) = 9.04166 (highest set bit is in position 9)
    base-5 logarithm of 125 = 3
    log2(1) = 0
    log2(+Inf) = inf
    log2(0) = -inf
        errno == ERANGE: Numerical result out of range
        FE_DIVBYZERO raised
```

### Veja também

[ loglogflogl](<#/doc/numeric/math/log>)(C++11)(C++11) |  calcula o logaritmo natural (base e) (\\({\small\ln{x}}\\)ln(x))   
(função)  
[ log10log10flog10l](<#/doc/numeric/math/log10>)(C++11)(C++11) |  calcula o logaritmo comum (base 10) (\\({\small\log_{10}{x}}\\)log10(x))   
(função)  
[ log1plog1pflog1pl](<#/doc/numeric/math/log1p>)(C++11)(C++11)(C++11) |  logaritmo natural (base e) de 1 mais o número dado (\\({\small\ln{(1+x)}}\\)ln(1+x))   
(função)  
[ exp2exp2fexp2l](<#/doc/numeric/math/exp2>)(C++11)(C++11)(C++11) |  retorna 2 elevado à potência dada (\\({\small 2^x}\\)2x)   
(função)  
[Documentação C](<#/>) para log2