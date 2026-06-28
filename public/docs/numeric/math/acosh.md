# std::acosh, std::acoshf, std::acoshl

```cpp
Definido no header `<cmath>`
  // (1)
float acosh ( float num );
double acosh ( double num );
long double acosh ( long double num ); |  | (ate C++23)
/*floating-point-type*/
acosh ( /*floating-point-type*/ num );  // (desde C++23)
(constexpr desde C++26)
float acoshf( float num );  // (2) (desde C++11)
(constexpr desde C++26)
long double acoshl( long double num );  // (3) (desde C++11)
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no header `<simd>`
```

```cpp
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
acosh ( const V& v_num );  // (desde C++26)
Sobrecargas adicionais (desde C++11)
Definido no header `<cmath>`
template< class Integer >
double acosh ( Integer num );
```

  
1-3) Calcula o cosseno hiperbólico inverso de num. A biblioteca fornece sobrecargas de `std::acosh` para todos os tipos floating-point cv-unqualified como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::acosh` elemento a elemento em v_num.

    

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)  
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)  
  
### Parâmetros

num  |  \-  |  valor floating-point ou inteiro   
  
### Valor de retorno

Se nenhum erro ocorrer, o cosseno hiperbólico inverso de num (cosh-1  
(num), ou arcosh(num)) no intervalo [0, +∞], é retornado. 

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado). 

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se o argumento for menor que 1, ocorre um erro de domínio. 

Se a implementação suportar aritmética floating-point IEEE (IEC 60559), 

  * se o argumento for menor que 1, [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado e um NaN é retornado. 
  * se o argumento for 1, +0 é retornado. 
  * se o argumento for +∞, +∞ é retornado. 
  * se o argumento for NaN, NaN é retornado. 

### Notas

Embora o padrão C (ao qual C++ se refere para esta função) nomeie esta função como "cosseno hiperbólico de arco", as funções inversas das funções hiperbólicas são as funções de área. Seu argumento é a área de um setor hiperbólico, não um arco. O nome correto é "cosseno hiperbólico inverso" (usado por POSIX) ou "cosseno hiperbólico de área". 

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::acosh(num) tenha o mesmo efeito que std::acosh(static_cast&lt;double&gt;(num)). 

### Exemplos

Execute este código
```cpp
    #include <cerrno>
    #include <cfenv>
    #include <cfloat>
    #include <cmath>
    #include <cstring>
    #include <iostream>
     
    // #pragma STDC FENV_ACCESS ON
     
    int main()
    {
        std::cout << "acosh(1) = " << std::acosh(1) << '\n'
                  << "acosh(10) = " << std::acosh(10) << '\n'
                  << "acosh(DBL_MAX) = " << std::acosh(DBL_MAX) << '\n'
                  << "acosh(Inf) = " << std::acosh(INFINITY) << '\n';
     
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
     
        std::cout << "acosh(0.5) = " << std::acosh(0.5) << '\n';
     
        if (errno == EDOM)
            std::cout << "    errno == EDOM: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID raised\n";
    }
```

Saída possível: 
```
    acosh(1) = 0
    acosh(10) = 2.99322
    acosh(DBL_MAX) = 710.476
    acosh(Inf) = inf
    acosh(0.5) = -nan
        errno == EDOM: Numerical argument out of domain
        FE_INVALID raised
```

### Veja também

[ asinhasinhfasinhl](<#/doc/numeric/math/asinh>)(C++11)(C++11)(C++11) | calcula o seno hiperbólico inverso (\\({\small\operatorname{arsinh}{x}}\\)arsinh(x))   
(função)  
[ atanhatanhfatanhl](<#/doc/numeric/math/atanh>)(C++11)(C++11)(C++11) | calcula a tangente hiperbólica inversa (\\({\small\operatorname{artanh}{x}}\\)artanh(x))   
(função)  
[ coshcoshfcoshl](<#/doc/numeric/math/cosh>)(C++11)(C++11) | calcula o cosseno hiperbólico (\\({\small\cosh{x}}\\)cosh(x))   
(função)  
[ acosh(std::complex)](<#/doc/numeric/complex/acosh>)(C++11) | calcula o cosseno hiperbólico de área de um número complexo (\\({\small\operatorname{arcosh}{z}}\\)arcosh(z))   
(modelo de função)  
[Documentação C](<#/>) para acosh  
  
### Links externos

[Weisstein, Eric W. "Inverse Hyperbolic Cosine."](<https://mathworld.wolfram.com/InverseHyperbolicCosine.html>) De MathWorld — Um Recurso Web da Wolfram.   
---