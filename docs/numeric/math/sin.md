# std::sin, std::sinf, std::sinl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float sin ( float num );
double sin ( double num );
long double sin ( long double num );
/*floating-point-type*/
sin ( /*floating-point-type*/ num );
(constexpr desde C++26)
float sinf( float num );
(constexpr desde C++26)
long double sinl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
sin ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double sin ( Integer num );
```

1-3) Calcula o seno de num (medido em radianos). A biblioteca fornece sobrecargas de `std::sin` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro.(desde C++23)

S) A sobrecarga SIMD executa um `std::sin` elemento a elemento em `v_num`.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro representando o ângulo em radianos

### Valor de retorno

Se nenhum erro ocorrer, o seno de num (sin(num)) no intervalo `[`-1`, `+1`]`, é retornado.

O resultado pode ter pouca ou nenhuma significância se a magnitude de num for grande. | (até C++11)

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

  * se o argumento for ±0, ele é retornado sem modificação.
  * se o argumento for ±∞, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * se o argumento for NaN, NaN é retornado.

### Notas

O caso em que o argumento é infinito não é especificado como um erro de domínio em C (ao qual C++ se refere), mas é definido como um [erro de domínio em POSIX](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/sin.html>).

POSIX também especifica que, em caso de underflow, num é retornado sem modificação, e se isso não for suportado, um valor definido pela implementação não maior que [DBL_MIN](<#/doc/types/climits>), [FLT_MIN](<#/doc/types/climits>), e [LDBL_MIN](<#/doc/types/climits>) é retornado.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::sin(num) tenha o mesmo efeito que std::sin(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <cfenv>
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    
    // #pragma STDC FENV_ACCESS ON
    
    const double pi = std::acos(-1); // or std::numbers::pi since C++20
    
    constexpr double your_sin(double x)
    {
        double sin{0}, pow{x};
        for (auto fac{1LLU}, n{1ULL}; n != 20; fac *= ++n, pow *= x)
            if (n & 1)
                sin += (n & 2 ? -pow : pow) / fac;
        return sin;
    }
    
    int main()
    {
        std::cout << std::setprecision(10) << std::showpos
                  << "Typical usage:\n"
                  << "std::sin(pi/6) = " << std::sin(pi / 6) << '\n'
                  << "your sin(pi/6) = " << your_sin(pi / 6) << '\n'
                  << "std::sin(pi/2) = " << std::sin(pi / 2) << '\n'
                  << "your sin(pi/2) = " << your_sin(pi / 2) << '\n'
                  << "std::sin(-3*pi/4) = " << std::sin(-3 * pi / 4) << '\n'
                  << "your sin(-3*pi/4) = " << your_sin(-3 * pi / 4) << '\n'
                  << "Special values:\n"
                  << "std::sin(+0) = " << std::sin(0.0) << '\n'
                  << "std::sin(-0) = " << std::sin(-0.0) << '\n';
    
        // error handling
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "std::sin(INFINITY) = " << std::sin(INFINITY) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID raised\n";
    }
```

Saída possível:
```
    Typical usage:
    std::sin(pi/6) = +0.5
    your sin(pi/6) = +0.5
    std::sin(pi/2) = +1
    your sin(pi/2) = +1
    std::sin(-3*pi/4) = -0.7071067812
    your sin(-3*pi/4) = -0.7071067812
    Special values:
    std::sin(+0) = +0
    std::sin(-0) = -0
    std::sin(INFINITY) = -nan
        FE_INVALID raised
```

### Veja também

[ coscosfcosl](<#/doc/numeric/math/cos>)(C++11)(C++11) | calcula o cosseno (\\({\small\cos{x}}\\)cos(x))
(função)
[ tantanftanl](<#/doc/numeric/math/tan>)(C++11)(C++11) | calcula a tangente (\\({\small\tan{x}}\\)tan(x))
(função)
[ asinasinfasinl](<#/doc/numeric/math/asin>)(C++11)(C++11) | calcula o arco seno (\\({\small\arcsin{x}}\\)arcsin(x))
(função)
[ sin(std::complex)](<#/doc/numeric/complex/sin>) | calcula o seno de um número complexo (\\({\small\sin{z}}\\)sin(z))
(modelo de função)
[ sin(std::valarray)](<#/doc/numeric/valarray/sin>) | aplica a função **std::sin** a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para sin