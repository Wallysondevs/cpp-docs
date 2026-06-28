# std::comp_ellint_2, std::comp_ellint_2f, std::comp_ellint_2l

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float comp_ellint_2 ( float k );
double comp_ellint_2 ( double k );
long double comp_ellint_2 ( long double k );
(até C++23)
/* floating-point-type */ comp_ellint_2( /* floating-point-type */ k );
float comp_ellint_2f( float k );
long double comp_ellint_2l( long double k );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
double comp_ellint_2 ( Integer k );
```

1-3) Calcula a [integral elíptica completa de segunda espécie](<https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_second_kind> "enwiki:Elliptic integral") de k. A biblioteca fornece sobrecargas de `std::comp_ellint_2` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro k.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **k** — módulo elíptico ou excentricidade (um valor de ponto flutuante ou inteiro)

### Valor de retorno

Se nenhum erro ocorrer, o valor da integral elíptica completa de segunda espécie de k, ou seja, std::ellint_2(k, π/2), é retornado.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

*   Se o argumento for NaN, NaN é retornado e o erro de domínio não é relatado.
*   Se |k|>1, um erro de domínio pode ocorrer.

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da standard library.

Implementações que não suportam ISO 29124:2010, mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/ellint/ellint_2.html>).

O perímetro de uma elipse com excentricidade k e semieixo maior a é igual a 4aE(k), onde E é `std::comp_ellint_2`. Quando a excentricidade é igual a 0, a elipse degenera para um círculo com raio a e o perímetro é igual a 2πa, então E(0) = π/2. Quando a excentricidade é igual a 1, a elipse degenera para uma linha de comprimento 2a, cujo perímetro é 4a, então E(1) = 1.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::comp_ellint_2(num) tenha o mesmo efeito que std::comp_ellint_2(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    #include <numbers>
    
    int main()
    {
        constexpr double hpi = std::numbers::pi / 2.0;
    
        std::cout << "E(0) = " << std::comp_ellint_2(0) << '\n'
                  << "π/2 = " << hpi << '\n'
                  << "E(1) = " << std::comp_ellint_2(1) << '\n'
                  << "E(1, π/2) = " << std::ellint_2(1, hpi) << '\n';
    }
```

Saída:
```
    E(0) = 1.5708
    π/2 = 1.5708
    E(1) = 1
    E(1, π/2) = 1
```

### Veja também

[ ellint_2ellint_2fellint_2l](<#/doc/numeric/special_functions/ellint_2>)(C++17)(C++17)(C++17) | integral elíptica (incompleta) de segunda espécie
(função)

### Links externos

[Weisstein, Eric W. "Complete Elliptic Integral of the Second Kind."](<https://mathworld.wolfram.com/CompleteEllipticIntegraloftheSecondKind.html>) De MathWorld — Um Recurso Web da Wolfram.
---