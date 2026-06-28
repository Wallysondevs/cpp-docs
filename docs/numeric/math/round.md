# std::round, std::roundf, std::roundl, std::lround, std::lroundf, std::lroundl, std::llround, std::llroundf

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
Arredondamento para tipos de ponto flutuante
float round ( float num );
double round ( double num );
long double round ( long double num );
(até C++23)
constexpr /* floating-point-type */
round ( /* floating-point-type */ num );
float roundf( float num );
(constexpr desde C++23)
long double roundl( long double num );
(constexpr desde C++23)
Arredondamento para long
long lround ( float num );
long lround ( double num );
long lround ( long double num );
(até C++23)
constexpr long lround( /* floating-point-type */ num );
long lroundf( float num );
(constexpr desde C++23)
long lroundl( long double num );
(constexpr desde C++23)
Arredondamento para long long
long long llround ( float num );
long long llround ( double num );
long long llround ( long double num );
(até C++23)
constexpr long long llround( /* floating-point-type */ num );
long long llroundf( float num );
(constexpr desde C++23)
long long llroundl( long double num );
(constexpr desde C++23)
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
double round( Integer num );
(constexpr desde C++23)
template< class Integer >
long lround( Integer num );
(constexpr desde C++23)
template< class Integer >
long long llround( Integer num );
(constexpr desde C++23)
```

1-3) Calcula o valor inteiro mais próximo de num (em formato de ponto flutuante), arredondando casos de meio-termo para longe de zero, independentemente do modo de arredondamento atual. A biblioteca fornece sobrecargas de `std::round` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro num.(desde C++23)

4-9) Calcula o valor inteiro mais próximo de num (em formato inteiro), arredondando casos de meio-termo para longe de zero, independentemente do modo de arredondamento atual. A biblioteca fornece sobrecargas de `std::lround` e `std::llround` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro num.(desde C++23)

A-C) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o valor inteiro mais próximo de num, arredondando casos de meio-termo para longe de zero, é retornado.

Valor de retorno

num

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se o resultado de `std::lround` ou `std::llround` estiver fora do intervalo representável pelo tipo de retorno, um erro de domínio ou um erro de intervalo pode ocorrer.

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559),

Para a função `std::round`:

*   O [modo de arredondamento](<#/doc/numeric/fenv/FE_round>) atual não tem efeito.
*   Se num for ±∞, ele é retornado, sem modificação.
*   Se num for ±0, ele é retornado, sem modificação.
*   Se num for NaN, NaN é retornado.

Para as funções `std::lround` e `std::llround`:

*   [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) nunca é levantado.
*   O [modo de arredondamento](<#/doc/numeric/fenv/FE_round>) atual não tem efeito.
*   Se num for ±∞, [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado e um valor definido pela implementação é retornado.
*   Se o resultado do arredondamento estiver fora do intervalo do tipo de retorno, [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado e um valor definido pela implementação é retornado.
*   Se num for NaN, [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado e um valor definido pela implementação é retornado.

### Notas

[FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) pode ser (mas não é obrigatório ser) levantado por `std::round` ao arredondar um valor finito não inteiro.

Os maiores valores de ponto flutuante representáveis são inteiros exatos em todos os formatos de ponto flutuante padrão, então `std::round` nunca transborda por si só; no entanto, o resultado pode transbordar qualquer tipo inteiro (incluindo [std::intmax_t](<#/doc/types/integer>)), quando armazenado em uma variável inteira.

[POSIX especifica](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/lround.html>) que todos os casos em que `std::lround` ou `std::llround` levantam [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) são erros de domínio.

A versão double de `std::round` se comporta como se implementada da seguinte forma:
```cpp
    #include <cfenv>
    #include <cmath>
    
    #pragma STDC FENV_ACCESS ON
    
    double round(double x)
    {
        const int save_round = std::fegetround();
        std::fesetround(FE_TOWARDZERO);
        const double result = std::rint(std::copysign(0.5 + std::fabs(x), x));
        std::fesetround(save_round);
        return result;
    }
```

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A-C). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro:

*   std::round(num) tem o mesmo efeito que std::round(static_cast&lt;double&gt;(num)).
*   std::lround(num) tem o mesmo efeito que std::lround(static_cast&lt;double&gt;(num)).
*   std::llround(num) tem o mesmo efeito que std::llround(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cfenv>
    #include <cfloat>
    #include <climits>
    #include <cmath>
    #include <iostream>
    
    // #pragma STDC FENV_ACCESS ON
    
    double custom_round(double x)
    {
        const int save_round = std::fegetround();
        std::fesetround(FE_TOWARDZERO);
        const double result = std::rint(std::copysign(0.5 + std::fabs(x), x));
        std::fesetround(save_round);
        return result;
    }
    
    void test_custom_round()
    {
        for (const double x :
            {
                0.0, 0.3,
                0.5 - DBL_EPSILON / 2,
                0.5,
                0.5 + DBL_EPSILON / 2,
                0.7, 1.0, 2.3, 2.5, 2.7, 3.0,
                static_cast<double>(INFINITY)
            })
            assert(round(+x) == custom_round(+x) && round(-x) == custom_round(-x));
    }
    
    int main()
    {
        test_custom_round();
    
        std::cout << std::showpos;
    
        // round
        std::cout << "round(+2.3) = " << std::round(2.3)
                  << "  round(+2.5) = " << std::round(2.5)
                  << "  round(+2.7) = " << std::round(2.7) << '\n'
                  << "round(-2.3) = " << std::round(-2.3)
                  << "  round(-2.5) = " << std::round(-2.5)
                  << "  round(-2.7) = " << std::round(-2.7) << '\n';
    
        std::cout << "round(-0.0) = " << std::round(-0.0)  << '\n'
                  << "round(-Inf) = " << std::round(-INFINITY) << '\n';
    
        // lround
        std::cout << "lround(+2.3) = " << std::lround(2.3)
                  << "  lround(+2.5) = " << std::lround(2.5)
                  << "  lround(+2.7) = " << std::lround(2.7) << '\n'
                  << "lround(-2.3) = " << std::lround(-2.3)
                  << "  lround(-2.5) = " << std::lround(-2.5)
                  << "  lround(-2.7) = " << std::lround(-2.7) << '\n';
    
        std::cout << "lround(-0.0) = " << std::lround(-0.0)  << '\n'
                  << "lround(-Inf) = " << std::lround(-INFINITY) << '\n';
    
        // error handling
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "std::lround(LONG_MAX+1.5) = "
                  << std::lround(LONG_MAX + 1.5) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID was raised\n";
    }
```

Saída possível:
```
    round(+2.3) = +2  round(+2.5) = +3  round(+2.7) = +3
    round(-2.3) = -2  round(-2.5) = -3  round(-2.7) = -3
    round(-0.0) = -0
    round(-Inf) = -inf
    lround(+2.3) = +2  lround(+2.5) = +3  lround(+2.7) = +3
    lround(-2.3) = -2  lround(-2.5) = -3  lround(-2.7) = -3
    lround(-0.0) = +0
    lround(-Inf) = -9223372036854775808
    std::lround(LONG_MAX+1.5) = -9223372036854775808
        FE_INVALID was raised
```

### Veja também

[ floorfloorffloorl](<#/doc/numeric/math/floor>)(C++11)(C++11) | inteiro mais próximo não maior que o valor dado
(function)
[ ceilceilfceill](<#/doc/numeric/math/ceil>)(C++11)(C++11) | inteiro mais próximo não menor que o valor dado
(function)
[ trunctruncftruncl](<#/doc/numeric/math/trunc>)(C++11)(C++11)(C++11) | inteiro mais próximo não maior em magnitude que o valor dado
(function)
[Documentação C](<#/>) para round