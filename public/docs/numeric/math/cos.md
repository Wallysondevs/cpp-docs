# std::cos, std::cosf, std::cosl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float cos ( float num );
double cos ( double num );
long double cos ( long double num );
/*floating-point-type*/
cos ( /*floating-point-type*/ num );
(constexpr desde C++26)
float cosf( float num );
(constexpr desde C++26)
long double cosl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
cos ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double cos ( Integer num );
```

1-3) Calcula o cosseno de num (medido em radianos). A biblioteca fornece sobrecargas de `std::cos` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::cos` elemento a elemento em v_num.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro representando o ângulo em radianos

### Valor de retorno

Se nenhum erro ocorrer, o cosseno de num (cos(num)) no intervalo `[`-1.0`, `+1.0`]`, é retornado.

O resultado pode ter pouca ou nenhuma significância se a magnitude de num for grande. | (ate C++11)

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559),

*   se o argumento for ±0, o resultado é 1.0.
*   se o argumento for ±∞, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
*   se o argumento for NaN, NaN é retornado.

### Notas

O caso em que o argumento é infinito não é especificado como um erro de domínio em C, mas é definido como um [erro de domínio em POSIX](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/cos.html>).

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::cos(num) tenha o mesmo efeito que std::cos(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <cfenv>
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    #include <numbers>
    
    // #pragma STDC FENV_ACCESS ON
    
    constexpr double pi = std::numbers::pi; // or std::acos(-1) before C++20
    
    constexpr double your_cos(double x)
    {
        double cos{1}, pow{x};
        for (auto fac{1ull}, n{1ull}; n != 19; fac *= ++n, pow *= x)
            if ((n & 1) == 0)
                cos += (n & 2 ? -pow : pow) / fac;
        return cos;
    }
    
    int main()
    {
        std::cout << std::setprecision(10) << std::showpos
                  << "Typical usage:\n"
                  << "std::cos(pi/3) = " << std::cos(pi / 3) << '\n'
                  << "your cos(pi/3) = " << your_cos(pi / 3) << '\n'
                  << "std::cos(pi/2) = " << std::cos(pi / 2) << '\n'
                  << "your cos(pi/2) = " << your_cos(pi / 2) << '\n'
                  << "std::cos(-3*pi/4) = " << std::cos(-3 * pi / 4) << '\n'
                  << "your cos(-3*pi/4) = " << your_cos(-3 * pi / 4) << '\n'
                  << "Special values:\n"
                  << "std::cos(+0) = " << std::cos(0.0) << '\n'
                  << "std::cos(-0) = " << std::cos(-0.0) << '\n';
    
        // error handling
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "cos(INFINITY) = " << std::cos(INFINITY) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID raised\n";
    }
```

Saída possível:
```
    Typical usage:
    std::cos(pi/3) = +0.5
    your cos(pi/3) = +0.5
    std::cos(pi/2) = +6.123233996e-17
    your cos(pi/2) = -3.373452105e-15
    std::cos(-3*pi/4) = -0.7071067812
    your cos(-3*pi/4) = -0.7071067812
    Special values:
    std::cos(+0) = +1
    std::cos(-0) = +1
    cos(INFINITY) = -nan
        FE_INVALID raised
```

### Veja também

[ sinsinfsinl](<#/doc/numeric/math/sin>)(C++11)(C++11) | calcula seno (\\({\small\sin{x}}\\)sin(x))
(função)
[ tantanftanl](<#/doc/numeric/math/tan>)(C++11)(C++11) | calcula tangente (\\({\small\tan{x}}\\)tan(x))
(função)
[ acosacosfacosl](<#/doc/numeric/math/acos>)(C++11)(C++11) | calcula arco cosseno (\\({\small\arccos{x}}\\)arccos(x))
(função)
[ cos(std::complex)](<#/doc/numeric/complex/cos>) | calcula cosseno de um número complexo (\\({\small\cos{z}}\\)cos(z))
(modelo de função)
[ cos(std::valarray)](<#/doc/numeric/valarray/cos>) | aplica a função **std::cos** a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para cos