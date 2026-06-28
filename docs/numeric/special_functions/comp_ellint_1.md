# std::comp_ellint_1, std::comp_ellint_1f, std::comp_ellint_1l

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
double comp_ellint_1 ( double k );
float comp_ellint_1 ( float k );
long double comp_ellint_1 ( long double k );
(até C++23)
/* floating-point-type */ comp_ellint_1( /* floating-point-type */ k );
float comp_ellint_1f( float k );
long double comp_ellint_1l( long double k );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
double comp_ellint_1 ( Integer k );
```

1-3) Calcula a [integral elíptica completa de primeira espécie](<https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_first_kind> "enwiki:Elliptic integral") de k. A biblioteca fornece sobrecargas de `std::comp_ellint_1` para todos os tipos de ponto flutuante cv-não qualificados como o tipo do parâmetro k.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **k** — módulo elíptico ou excentricidade (um valor de ponto flutuante ou inteiro)

### Valor de retorno

Se nenhum erro ocorrer, o valor da integral elíptica completa de primeira espécie de k, ou seja, [std::ellint_1](<#/doc/numeric/special_functions/ellint_1>)(k, π/2), é retornado.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

*   Se o argumento for NaN, NaN é retornado e nenhum erro de domínio é relatado.
*   Se |k|>1, um erro de domínio pode ocorrer.

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da biblioteca padrão.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/ellint/ellint_1.html>).

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::comp_ellint_1(num) tenha o mesmo efeito que std::comp_ellint_1(static_cast&lt;double&gt;(num)).

### Exemplo

O [período de um pêndulo](<https://en.wikipedia.org/wiki/Pendulum_\(mechanics\)#Arbitrary-amplitude_period> "enwiki:Pendulum \(mechanics\)") de comprimento l, dada a aceleração devido à gravidade g, e o ângulo inicial θ é igual a 4⋅√l/g⋅K(sin(θ/2)), onde K é `std::comp_ellint_1`.

Run this code
```cpp
    #include <cmath>
    #include <iostream>
    #include <numbers>
    
    int main()
    {
        constexpr double π{std::numbers::pi};
    
        std::cout << "K(0) ≈ " << std::comp_ellint_1(0) << '\n'
                  << "π/2 ≈ " << π / 2 << '\n'
                  << "K(0.5) ≈ " << std::comp_ellint_1(0.5) << '\n'
                  << "F(0.5, π/2) ≈ " << std::ellint_1(0.5, π / 2) << '\n'
                  << "The period of a pendulum length 1m at 10° initial angle ≈ "
                  << 4 * std::sqrt(1 / 9.80665) * std::comp_ellint_1(std::sin(π / 18 / 2))
                  << "s,\n" "whereas the linear approximation gives ≈ "
                  << 2 * π * std::sqrt(1 / 9.80665) << '\n';
    }
```

Output:
```
    K(0) ≈ 1.5708
    π/2 ≈ 1.5708
    K(0.5) ≈ 1.68575
    F(0.5, π/2) ≈ 1.68575
    The period of a pendulum length 1 m at 10° initial angle ≈ 2.01024s,
    whereas the linear approximation gives ≈ 2.00641
```

### Veja também

[ ellint_1ellint_1fellint_1l](<#/doc/numeric/special_functions/ellint_1>)(C++17)(C++17)(C++17) | integral elíptica (incompleta) de primeira espécie
(função)

### Links externos

[Weisstein, Eric W. "Complete Elliptic Integral of the First Kind."](<https://mathworld.wolfram.com/CompleteEllipticIntegraloftheFirstKind.html>) De MathWorld — A Wolfram Web Resource.
---
\*\[Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão