# std::sinh, std::sinhf, std::sinhl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float sinh ( float num );
double sinh ( double num );
long double sinh ( long double num );
/*floating-point-type*/
sinh ( /*floating-point-type*/ num );
(constexpr desde C++26)
float sinhf( float num );
(constexpr desde C++26)
long double sinhl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
sinh ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double sinh ( Integer num );
```

1-3) Calcula o seno hiperbólico de num. A biblioteca fornece sobrecargas de `std::sinh` para todos os tipos de ponto flutuante cv-não qualificados como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::sinh` elemento a elemento em v_num.

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o seno hiperbólico de num (sinh(num), ou enum
-e-num

---
2
) é retornado.

Se ocorrer um erro de range devido a overflow, [±HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `±HUGE_VALF`, ou `±HUGE_VALL` é retornado.

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

  * se o argumento for ±0 ou ±∞, ele é retornado sem modificações.
  * se o argumento for NaN, NaN é retornado.

### Notas

[POSIX especifica](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/sinh.html>) que, em caso de underflow, num é retornado sem modificações, e se isso não for suportado, um valor definido pela implementação não maior que [DBL_MIN](<#/doc/types/climits>), [FLT_MIN](<#/doc/types/climits>), e [LDBL_MIN](<#/doc/types/climits>) é retornado.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::sinh(num) tenha o mesmo efeito que std::sinh(static_cast&lt;double&gt;(num)).

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
    
        std::cout << "sinh(1) = " << std::sinh(1) << '\n'
                  << "sinh(-1) = " << std::sinh(-1) << '\n'
                  << "log(sinh(" << x << ")+cosh(" << x << ")) = "
                  << std::log(std::sinh(x) + std::cosh(x)) << '\n';
    
        // special values
        std::cout << "sinh(+0) = " << std::sinh(0.0) << '\n'
                  << "sinh(-0) = " << std::sinh(-0.0) << '\n';
    
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "sinh(710.5) = " << std::sinh(710.5) << '\n';
    
        if (errno == ERANGE)
            std::cout << "    errno == ERANGE: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_OVERFLOW))
            std::cout << "    FE_OVERFLOW raised\n";
    }
```

Output:
```
    sinh(1) = 1.1752
    sinh(-1) = -1.1752
    log(sinh(42)+cosh(42)) = 42
    sinh(+0) = 0
    sinh(-0) = -0
    sinh(710.5) = inf
        errno == ERANGE: Numerical result out of range
        FE_OVERFLOW raised
```

### Veja também

[ coshcoshfcoshl](<#/doc/numeric/math/cosh>)(C++11)(C++11) | calcula o cosseno hiperbólico (\\({\small\cosh{x}}\\)cosh(x))
(função)
[ tanhtanhftanhl](<#/doc/numeric/math/tanh>)(C++11)(C++11) | calcula a tangente hiperbólica (\\({\small\tanh{x}}\\)tanh(x))
(função)
[ asinhasinhfasinhl](<#/doc/numeric/math/asinh>)(C++11)(C++11)(C++11) | calcula o seno hiperbólico inverso (\\({\small\operatorname{arsinh}{x}}\\)arsinh(x))
(função)
[ sinh(std::complex)](<#/doc/numeric/complex/sinh>) | calcula o seno hiperbólico de um número complexo (\\({\small\sinh{z}}\\)sinh(z))
(modelo de função)
[ sinh(std::valarray)](<#/doc/numeric/valarray/sinh>) | aplica a função **std::sinh** a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para sinh