# std::log, std::logf, std::logl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float log ( float num );
double log ( double num );
long double log ( long double num );
/*floating-point-type*/
log ( /*floating-point-type*/ num );
(constexpr desde C++26)
float logf( float num );
(constexpr desde C++26)
long double logl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
log ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double log ( Integer num );
```

1-3) Calcula o [logaritmo natural (base _e_)](<https://en.wikipedia.org/wiki/Natural_logarithm> "enwiki:Natural logarithm") de num. A biblioteca fornece sobrecargas de `std::log` para todos os tipos floating-point não qualificados por cv como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::log` elemento a elemento em v_num.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor floating-point ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o logaritmo natural (base-_e_) de num (ln(num) ou loge(num)) é retornado.

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de polo, [-HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `-HUGE_VALF`, ou `-HUGE_VALL` é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Ocorre erro de domínio se num for menor que zero.

Pode ocorrer erro de polo se num for zero.

Se a implementação suportar aritmética floating-point IEEE (IEC 60559),

  * Se o argumento for ±0, -∞ é retornado e [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se o argumento for 1, +0 é retornado.
  * Se o argumento for negativo, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se o argumento for +∞, +∞ é retornado.
  * Se o argumento for NaN, NaN é retornado.

### Notas

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::log(num) tenha o mesmo efeito que std::log(static_cast&lt;double&gt;(num)).

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
        std::cout << "log(1) = " << std::log(1) << '\n'
                  << "base-5 logarithm of 125 = " << std::log(125) / std::log(5) << '\n';
    
        // special values
        std::cout << "log(1) = " << std::log(1) << '\n'
                  << "log(+Inf) = " << std::log(INFINITY) << '\n';
    
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "log(0) = " << std::log(0) << '\n';
    
        if (errno == ERANGE)
            std::cout << "    errno == ERANGE: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_DIVBYZERO))
            std::cout << "    FE_DIVBYZERO raised\n";
    }
```

Saída possível:
```
    log(1) = 0
    base-5 logarithm of 125 = 3
    log(1) = 0
    log(+Inf) = inf
    log(0) = -inf
        errno == ERANGE: Numerical result out of range
        FE_DIVBYZERO raised
```

### Veja também

[ log10log10flog10l](<#/doc/numeric/math/log10>)(C++11)(C++11) | calcula o logaritmo comum (base 10) (\\({\small\log_{10}{x}}\\)log10(x))
(função)
[ log2log2flog2l](<#/doc/numeric/math/log2>)(C++11)(C++11)(C++11) | logaritmo de base 2 do número dado (\\({\small\log_{2}{x}}\\)log2(x))
(função)
[ log1plog1pflog1pl](<#/doc/numeric/math/log1p>)(C++11)(C++11)(C++11) | logaritmo natural (base e) de 1 mais o número dado (\\({\small\ln{(1+x)}}\\)ln(1+x))
(função)
[ expexpfexpl](<#/doc/numeric/math/exp>)(C++11)(C++11) | retorna e elevado à potência dada (\\({\small e^x}\\)ex)
(função)
[ log(std::complex)](<#/doc/numeric/complex/log>) | logaritmo natural complexo com os cortes de ramo ao longo do eixo real negativo
(modelo de função)
[ log(std::valarray)](<#/doc/numeric/valarray/log>) | aplica a função **std::log** a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para log