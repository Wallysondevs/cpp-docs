# std::comp_ellint_3, std::comp_ellint_3f, std::comp_ellint_3l

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float comp_ellint_3 ( float k, float nu );
double comp_ellint_3 ( double k, double nu );
long double comp_ellint_3 ( long double k, long double nu );
(até C++23)
/* floating-point-type */ comp_ellint_3( /* floating-point-type */ k,
/* floating-point-type */ nu );
float comp_ellint_3f( float k, float nu );
long double comp_ellint_3l( long double k, long double nu );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Arithmetic1, class Arithmetic2 >
/* common-floating-point-type */
comp_ellint_3( Arithmetic1 k, Arithmetic2 nu );
```

1-3) Calcula a [integral elíptica completa de terceira espécie](<https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_third_kind> "enwiki:Elliptic integral") dos argumentos k e nu. A biblioteca fornece sobrecargas de `std::comp_ellint_3` para todos os tipos de ponto flutuante cv-não qualificados como o tipo dos parâmetros k e nu.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

- **k** — módulo elíptico ou excentricidade (um valor de ponto flutuante ou inteiro)
- **nu** — característica elíptica (um valor de ponto flutuante ou inteiro)

### Valor de retorno

Se nenhum erro ocorrer, o valor da integral elíptica completa de terceira espécie de k e nu, ou seja, [std::ellint_3](<#/doc/numeric/special_functions/ellint_3>)(k, nu, π/2), é retornado.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

*   Se o argumento for NaN, NaN é retornado e o erro de domínio não é relatado
*   Se |k|>1, um erro de domínio pode ocorrer

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer headers da biblioteca padrão.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no header `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está disponível em [boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/ellint/ellint_3.html>).

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que para seu primeiro argumento num1 e segundo argumento num2:

*   Se num1 ou num2 tiver o tipo long double, então std::comp_ellint_3(num1, num2) tem o mesmo efeito que std::comp_ellint_3(static_cast&lt;long double&gt;(num1),
    static_cast<long double>(num2)).
*   Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::comp_ellint_3(num1, num2) tem o mesmo efeito que std::comp_ellint_3(static_cast&lt;double&gt;(num1),
    static_cast<double>(num2)).
*   Caso contrário, se num1 ou num2 tiver o tipo float, então std::comp_ellint_3(num1, num2) tem o mesmo efeito que std::comp_ellint_3(static_cast&lt;float&gt;(num1),
    static_cast<float>(num2)).

| (até C++23)
Se num1 e num2 tiverem tipos aritméticos, então std::comp_ellint_3(num1, num2) tem o mesmo efeito que std::comp_ellint_3(static_cast</* common-floating-point-type */>(num1),
static_cast</* common-floating-point-type */>(num2)), onde /* common-floating-point-type */ é o tipo de ponto flutuante com a maior [classificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subclassificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo a mesma classificação de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com a maior classificação e subclassificação existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    
    int main()
    {
        std::cout << std::fixed
                  << "Π(0.5,0) = " << std::comp_ellint_3(0.5, 0) << '\n'
                  << "K(0.5)   = " << std::comp_ellint_1(0.5) << '\n'
                  << "Π(0,0)   = " << std::comp_ellint_3(0, 0) << '\n'
                  << "π/2      = " << std::acos(-1) / 2 << '\n'
                  << "Π(0.5,1) = " << std::comp_ellint_3(0.5, 1) << '\n';
    }
```

Saída:
```
    Π(0.5,0) = 1.685750
    K(0.5)   = 1.685750
    Π(0,0)   = 1.570796
    π/2      = 1.570796
    Π(0.5,1) = inf
```

### Veja também

[ ellint_3ellint_3fellint_3l](<#/doc/numeric/special_functions/ellint_3>)(C++17)(C++17)(C++17) | integral elíptica (incompleta) de terceira espécie
(função)

### Links externos

[Weisstein, Eric W. "Integral Elíptica de Terceira Espécie."](<https://mathworld.wolfram.com/EllipticIntegraloftheThirdKind.html>) De MathWorld — Um Recurso Web da Wolfram.
---