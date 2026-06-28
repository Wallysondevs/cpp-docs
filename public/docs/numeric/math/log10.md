# std::log10, std::log10f, std::log10l

```cpp
Definido no header `<cmath>`
  // (1)
float log10 ( float num );
double log10 ( double num );
long double log10 ( long double num );  // (até C++23)
/*floating-point-type*/
log10 ( /*floating-point-type*/ num );  // (desde C++23)
(constexpr desde C++26)
float log10f( float num );  // (2) (desde C++11)
(constexpr desde C++26)
long double log10l( long double num );  // (3) (desde C++11)
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no header `<simd>`
```

```cpp
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
log10 ( const V& v_num );  // (desde C++26)
Sobrecargas adicionais (desde C++11)
Definido no header `<cmath>`
template< class Integer >
double log10 ( Integer num );
```

1-3) Calcula o [logaritmo comum (base-10)](<https://en.wikipedia.org/wiki/Common_logarithm> "enwiki:Common logarithm") de num. A biblioteca fornece sobrecargas de `std::log10` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::log10` elemento a elemento em v_num.

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o logaritmo comum (base-10) de num (log10(num) ou lg(num)) é retornado.

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de polo, [-HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `-HUGE_VALF`, ou `-HUGE_VALL` é retornado.

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Ocorre um erro de domínio se num for menor que zero.

Pode ocorrer um erro de polo se num for zero.

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

  * Se o argumento for ±0, -∞ é retornado e [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se o argumento for 1, +0 é retornado.
  * Se o argumento for negativo, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se o argumento for +∞, +∞ é retornado.
  * Se o argumento for NaN, NaN é retornado.

### Observações

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, `std::log10(num)` tenha o mesmo efeito que `std::log10(static_cast<double>(num))`.

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
        std::cout << "log10(1000) = " << std::log10(1000) << '\n'
                  << "log10(0.001) = " << std::log10(0.001) << '\n'
                  << "base-5 logarithm of 125 = "
                  << std::log10(125) / std::log10(5) << '\n';
    
        // special values
        std::cout << "log10(1) = " << std::log10(1) << '\n'
                  << "log10(+Inf) = " << std::log10(INFINITY) << '\n';
    
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "log10(0) = " << std::log10(0) << '\n';
    
        if (errno == ERANGE)
            std::cout << "    errno == ERANGE: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_DIVBYZERO))
            std::cout << "    FE_DIVBYZERO raised\n";
    }
```

Saída possível:
```
    log10(1000) = 3
    log10(0.001) = -3
    base-5 logarithm of 125 = 3
    log10(1) = 0
    log10(+Inf) = inf
    log10(0) = -inf
        errno == ERANGE: Numerical result out of range
        FE_DIVBYZERO raised
```

### Veja também

[ loglogflogl](<#/doc/numeric/math/log>)(C++11)(C++11) | calcula o logaritmo natural (base e) (\\({\small\ln{x}}\\)ln(x))
(function)
[ log2log2flog2l](<#/doc/numeric/math/log2>)(C++11)(C++11)(C++11) | logaritmo de base 2 do número dado (\\({\small\log_{2}{x}}\\)log2(x))
(function)
[ log1plog1pflog1pl](<#/doc/numeric/math/log1p>)(C++11)(C++11)(C++11) | logaritmo natural (base e) de 1 mais o número dado (\\({\small\ln{(1+x)}}\\)ln(1+x))
(function)
[ log10(std::complex)](<#/doc/numeric/complex/log10>) | logaritmo comum complexo com os cortes de ramo ao longo do eixo real negativo
(function template)
[ log10(std::valarray)](<#/doc/numeric/valarray/log10>) | aplica a função **std::log10** a cada elemento de valarray
(function template)
[Documentação C](<#/>) para log10