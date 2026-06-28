# std::exp2, std::exp2f, std::exp2l

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float exp2 ( float num );
double exp2 ( double num );
long double exp2 ( long double num );
/*floating-point-type*/
exp2 ( /*floating-point-type*/ num );
(constexpr desde C++26)
float exp2f( float num );
(constexpr desde C++26)
long double exp2l( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
exp2 ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double exp2 ( Integer num );
```

1-3) Calcula 2 elevado à potência `num`. A biblioteca fornece sobrecargas de `std::exp2` para todos os tipos de ponto flutuante cv-não qualificados como o tipo do parâmetro.(desde C++23)

S) A sobrecarga SIMD executa um `std::exp2` elemento a elemento em `v_num`.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o exponencial de base 2 de `num` (2<sup>num</sup>) é retornado.

Se ocorrer um erro de range devido a overflow, `+HUGE_VAL`, `+HUGE_VALF`, ou `+HUGE_VALL` é retornado.

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Os erros são relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

*   Se o argumento é ±0, 1 é retornado.
*   Se o argumento é -∞, +0 é retornado.
*   Se o argumento é +∞, +∞ é retornado.
*   Se o argumento é NaN, NaN é retornado.

### Notas

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::exp2(num)` tenha o mesmo efeito que `std::exp2(static_cast<double>(num))`.

Para expoentes inteiros, pode ser preferível usar [std::ldexp](<#/doc/numeric/math/ldexp>).

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
        std::cout << "exp2(4) = " << std::exp2(4) << '\n'
                  << "exp2(0.5) = " << std::exp2(0.5) << '\n'
                  << "exp2(-4) = " << std::exp2(-4) << '\n';
    
        // special values
        std::cout << "exp2(-0) = " << std::exp2(-0.0) << '\n'
                  << "exp2(-Inf) = " << std::exp2(-INFINITY) << '\n';
    
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
        const double inf = std::exp2(1024);
        const bool is_range_error = errno == ERANGE;
    
        std::cout << "exp2(1024) = " << inf << '\n';
        if (is_range_error)
            std::cout << "    errno == ERANGE: " << std::strerror(ERANGE) << '\n';
        if (std::fetestexcept(FE_OVERFLOW))
            std::cout << "    FE_OVERFLOW raised\n";
    }
```

Saída possível:
```
    exp2(4) = 16
    exp2(0.5) = 1.41421
    exp2(-4) = 0.0625
    exp2(-0) = 1
    exp2(-Inf) = 0
    exp2(1024) = inf
        errno == ERANGE: Numerical result out of range
        FE_OVERFLOW raised
```

### Ver também

[ expexpfexpl](<#/doc/numeric/math/exp>)(C++11)(C++11) | retorna e elevado à potência dada (\\({\small e^x}\\)ex)
(função)
[ expm1expm1fexpm1l](<#/doc/numeric/math/expm1>)(C++11)(C++11)(C++11) | retorna e elevado à potência dada, menos 1 (\\({\small e^x-1}\\)ex-1)
(função)
[ ldexpldexpfldexpl](<#/doc/numeric/math/ldexp>)(C++11)(C++11) | multiplica um número por 2 elevado a uma potência inteira
(função)
[ log2log2flog2l](<#/doc/numeric/math/log2>)(C++11)(C++11)(C++11) | logaritmo de base 2 do número dado (\\({\small\log_{2}{x}}\\)log2(x))
(função)
[Documentação C](<#/>) para exp2