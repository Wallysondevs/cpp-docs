# std::exp, std::expf, std::expl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float exp ( float num );
double exp ( double num );
long double exp ( long double num );
/*floating-point-type*/
exp ( /*floating-point-type*/ num );
(constexpr desde C++26)
float expf( float num );
(constexpr desde C++26)
long double expl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
exp ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double exp ( Integer num );
```

  
1-3) Calcula e ([número de Euler](<https://en.wikipedia.org/wiki/E_\(mathematical_constant\)> "enwiki:E \(mathematical constant\)"), 2.7182818...) elevado à potência `num`. A biblioteca fornece sobrecargas de `std::exp` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::exp` elemento a elemento em `v_num`.

    

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)  
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)  
  
### Parâmetros

num  |  \-  |  valor de ponto flutuante ou inteiro   
  
### Valor de retorno

Se nenhum erro ocorrer, o exponencial de base e de `num` (enum  
) é retornado. 

Se ocorrer um erro de range devido a overflow, `+HUGE_VAL`, `+HUGE_VALF`, ou `+HUGE_VALL` é retornado. 

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado. 

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559), 

  * Se o argumento é ±0, 1 é retornado. 
  * Se o argumento é -∞, +0 é retornado. 
  * Se o argumento é +∞, +∞ é retornado. 
  * Se o argumento é NaN, NaN é retornado. 

### Notas

Para o tipo double compatível com IEEE, overflow é garantido se 709.8 < num, e underflow é garantido se num < -708.4. 

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::exp(num)` tenha o mesmo efeito que `std::exp(static_cast<double>(num))`. 

### Exemplo

Execute este código
```
    #include <cerrno>
    #include <cfenv>
    #include <cmath>
    #include <cstring>
    #include <iomanip>
    #include <iostream>
    #include <numbers>
     
    // #pragma STDC FENV_ACCESS ON
     
    consteval double approx_e()
    {
        long double e{1.0};
        for (auto fac{1ull}, n{1llu}; n != 18; ++n, fac *= n)
            e += 1.0 / fac;
        return e;
    }
     
    int main()
    {
        std::cout << std::setprecision(16)
                  << "exp(1) = e¹ = " << std::exp(1) << '\n'
                  << "numbers::e  = " << std::numbers::e << '\n'
                  << "approx_e    = " << approx_e() << '\n'
                  << "FV of $100, continuously compounded at 3% for 1 year = "
                  << std::setprecision(6) << 100 * std::exp(0.03) << '\n';
     
        // special values
        std::cout << "exp(-0) = " << std::exp(-0.0) << '\n'
                  << "exp(-Inf) = " << std::exp(-INFINITY) << '\n';
     
        // error handling 
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
     
        std::cout << "exp(710) = " << std::exp(710) << '\n';
     
        if (errno == ERANGE)
            std::cout << "    errno == ERANGE: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_OVERFLOW))
            std::cout << "    FE_OVERFLOW raised\n";
    }
```

Saída possível: 
```
    exp(1) = e¹ = 2.718281828459045
    numbers::e  = 2.718281828459045
    approx_e    = 2.718281828459045
    FV of $100, continuously compounded at 3% for 1 year = 103.045
    exp(-0) = 1
    exp(-Inf) = 0
    exp(710) = inf
        errno == ERANGE: Numerical result out of range
        FE_OVERFLOW raised
```

### Veja também

[ exp2exp2fexp2l](<#/doc/numeric/math/exp2>)(C++11)(C++11)(C++11) |  retorna 2 elevado à potência dada (\\({\small 2^x}\\)2x)   
(function)  
[ expm1expm1fexpm1l](<#/doc/numeric/math/expm1>)(C++11)(C++11)(C++11) |  retorna e elevado à potência dada, menos 1 (\\({\small e^x-1}\\)ex-1)   
(function)  
[ loglogflogl](<#/doc/numeric/math/log>)(C++11)(C++11) |  calcula o logaritmo natural (base e) (\\({\small\ln{x}}\\)ln(x))   
(function)  
[ exp(std::complex)](<#/doc/numeric/complex/exp>) |  exponencial complexo de base _e_   
(function template)  
[ exp(std::valarray)](<#/doc/numeric/valarray/exp>) |  aplica a função **std::exp** a cada elemento de valarray   
(function template)  
[Documentação C](<#/>) para exp