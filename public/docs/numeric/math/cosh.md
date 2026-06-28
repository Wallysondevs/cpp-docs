# std::cosh, std::coshf, std::coshl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float cosh ( float num );
double cosh ( double num );
long double cosh ( long double num );
/*floating-point-type*/
cosh ( /*floating-point-type*/ num );
(constexpr desde C++26)
float coshf( float num );
(constexpr desde C++26)
long double coshl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
cosh ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double cosh ( Integer num );
```

1-3) Calcula o cosseno hiperbólico de num. A biblioteca fornece sobrecargas de `std::cosh` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::cosh` elemento a elemento em v_num.

    

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

num | \- | valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o cosseno hiperbólico de num (cosh(num), ou enum
+e-num
  
---
2
) é retornado.

Se ocorrer um erro de range devido a overflow, [+HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `+HUGE_VALF`, ou `+HUGE_VALL` é retornado.

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559),

  * se o argumento for ±0, 1 é retornado.
  * Se o argumento for ±∞, +∞ é retornado.
  * se o argumento for NaN, NaN é retornado.

### Notas

Para o tipo double compatível com IEEE, se |num| > 710.5, então std::cosh(num) causa overflow.

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::cosh(num) tenha o mesmo efeito que std::cosh(static_cast&lt;double&gt;(num)).

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
        const double x = 42;
    
        std::cout << "cosh(1) = " << std::cosh(1) << '\n'
                  << "cosh(-1) = " << std::cosh(-1) << '\n'
                  << "log(sinh(" << x << ")+cosh(" << x << ")) = "
                  << std::log(std::sinh(x) + std::cosh(x)) << '\n';
    
        // special values
        std::cout << "cosh(+0) = " << std::cosh(0.0) << '\n'
                  << "cosh(-0) = " << std::cosh(-0.0) << '\n';
    
        // error handling
        errno=0;
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "cosh(710.5) = " << std::cosh(710.5) << '\n';
    
        if (errno == ERANGE)
            std::cout << "    errno == ERANGE: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_OVERFLOW))
            std::cout << "    FE_OVERFLOW raised\n";
    }
```

Saída possível:
```
    cosh(1) = 1.54308
    cosh(-1) = 1.54308
    log(sinh(42)+cosh(42)) = 42
    cosh(+0) = 1
    cosh(-0) = 1
    cosh(710.5) = inf
        errno == ERANGE: Numerical result out of range
        FE_OVERFLOW raised
```

### Veja também

[ sinhsinhfsinhl](<#/doc/numeric/math/sinh>)(C++11)(C++11) | calcula o seno hiperbólico (\\({\small\sinh{x}}\\)sinh(x))
(função)
[ tanhtanhftanhl](<#/doc/numeric/math/tanh>)(C++11)(C++11) | calcula a tangente hiperbólica (\\({\small\tanh{x}}\\)tanh(x))
(função)
[ acoshacoshfacoshl](<#/doc/numeric/math/acosh>)(C++11)(C++11)(C++11) | calcula o cosseno hiperbólico inverso (\\({\small\operatorname{arcosh}{x}}\\)arcosh(x))
(função)
[ cosh(std::complex)](<#/doc/numeric/complex/cosh>) | calcula o cosseno hiperbólico de um número complexo (\\({\small\cosh{z}}\\)cosh(z))
(modelo de função)
[ cosh(std::valarray)](<#/doc/numeric/valarray/cosh>) | aplica a função **std::cosh** a cada elemento de valarray
(modelo de função)
[documentação C](<#/>) para cosh