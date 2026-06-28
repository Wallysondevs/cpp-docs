# std::ellint_3, std::ellint_3f, std::ellint_3l

```cpp
Definido no header `<cmath>`
  // (1)
float ellint_3 ( float k, float nu, float phi );
double ellint_3 ( double k, double nu, double phi );
long double ellint_3 ( long double k, long double nu, long double phi );  // (desde C++17)
(até C++23)
/* floating-point-type */ ellint_3( /* floating-point-type */ k,
/* floating-point-type */ nu,
/* floating-point-type */ phi );  // (desde C++23)
float ellint_3f( float k, float nu, float phi );  // (2) (desde C++17)
long double ellint_3l( long double k, long double nu, long double phi );  // (3) (desde C++17)
Sobrecargas adicionais
```

Definido no header `[<cmath>](<#/doc/header/cmath>)`

```cpp
template< class Arithmetic1, class Arithmetic2, class Arithmetic3 >
/* common-floating-point-type */
ellint_3( Arithmetic1 k, Arithmetic2 nu, Arithmetic3 phi );  // (desde C++17)
```

1-3) Calcula a [integral elíptica incompleta de terceira espécie](<https://en.wikipedia.org/wiki/Elliptic_integral#Incomplete_elliptic_integral_of_the_third_kind> "enwiki:Elliptic integral") de k, nu e phi. A biblioteca fornece sobrecargas de `std::ellint_3` para todos os tipos de ponto flutuante cv-unqualified como o tipo dos parâmetros k, nu e phi.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

- **k** — módulo elíptico ou excentricidade (um valor de ponto flutuante ou inteiro)
- **nu** — característica elíptica (um valor de ponto flutuante ou inteiro)
- **phi** — amplitude de Jacobi (um valor de ponto flutuante ou inteiro, medido em radianos)

### Valor de retorno

Se nenhum erro ocorrer, o valor da integral elíptica incompleta de terceira espécie de k, nu e phi, que é ∫phi
0dθ
---
(1-nusin2
θ)√1-k2
sin2
θ
, é retornado.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>):

*   Se o argumento for NaN, NaN é retornado e o erro de domínio não é relatado.
*   Se |k|>1, um erro de domínio pode ocorrer.

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer headers da standard library.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no header `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está disponível em [boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/ellint/ellint_3.html>).

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que para seu primeiro argumento num1, segundo argumento num2 e terceiro argumento num3:

*   Se num1, num2 ou num3 tiver o tipo long double, então std::ellint_3(num1, num2, num3) tem o mesmo efeito que std::ellint_3(static_cast&lt;long double&gt;(num1),
    static_cast<long double>(num2),
    static_cast<long double>(num3)).
*   Caso contrário, se num1, num2 e/ou num3 tiver o tipo double ou um tipo inteiro, então std::ellint_3(num1, num2, num3) tem o mesmo efeito que std::ellint_3(static_cast&lt;double&gt;(num1),
    static_cast<double>(num2),
    static_cast<double>(num3)).
*   Caso contrário, se num1, num2 ou num3 tiver o tipo float, então std::ellint_3(num1, num2, num3) tem o mesmo efeito que std::ellint_3(static_cast&lt;float&gt;(num1),
    static_cast<float>(num2),
    static_cast<float>(num3)).

| (até C++23)
Se num1, num2 e num3 tiverem tipos aritméticos, então std::ellint_3(num1, num2, num3) tem o mesmo efeito que std::ellint_3(static_cast</* common-floating-point-type */>(num1),
static_cast</* common-floating-point-type */>(num2),
static_cast</* common-floating-point-type */>(num3)), onde /* common-floating-point-type */ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e o maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1, num2 e num3, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável a partir das sobrecargas fornecidas. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    #include <numbers>
    
    int main()
    {
        const double hpi = std::numbers::pi / 2;
    
        std::cout << "Π(0,0,π/2) = " << std::ellint_3(0, 0, hpi) << '\n'
                  << "π/2 = " << hpi << '\n';
    }
```

Saída:
```
    Π(0,0,π/2) = 1.5708
    π/2 = 1.5708
```

| Esta seção está incompleta
Razão: esta e outras integrais elípticas merecem exemplos melhores.. talvez calcular o comprimento de arco elíptico?

### Veja também

[ comp_ellint_3comp_ellint_3fcomp_ellint_3l](<#/doc/numeric/special_functions/comp_ellint_3>)(C++17)(C++17)(C++17) | integral elíptica (completa) de terceira espécie
(função)

### Links externos

[Weisstein, Eric W. "Elliptic Integral of the Third Kind."](<https://mathworld.wolfram.com/EllipticIntegraloftheThirdKind.html>) De MathWorld — Um Recurso Web da Wolfram.
---