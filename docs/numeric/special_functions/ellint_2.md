# std::ellint_2, std::ellint_2f, std::ellint_2l

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float ellint_2 ( float k, float phi );
double ellint_2 ( double k, double phi );
long double ellint_2 ( long double k, long double phi );
(até C++23)
/* floating-point-type */ ellint_2( /* floating-point-type */ k,
/* floating-point-type */ phi );
float ellint_2f( float k, float phi );
long double ellint_2l( long double k, long double phi );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Arithmetic1, class Arithmetic2 >
/* common-floating-point-type */
ellint_2( Arithmetic1 k, Arithmetic2 phi );
```

1-3) Calcula a [integral elíptica incompleta de segunda espécie](<https://en.wikipedia.org/wiki/Elliptic_integral#Incomplete_elliptic_integral_of_the_second_kind> "enwiki:Elliptic integral") de k e phi. A biblioteca fornece sobrecargas de `std::ellint_2` para todos os tipos de ponto flutuante não qualificados por cv como o tipo dos parâmetros k e phi.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

- **k** — módulo elíptico ou excentricidade (um valor de ponto flutuante ou inteiro)
- **phi** — amplitude de Jacobi (um valor de ponto flutuante ou inteiro, medido em radianos)

### Valor de retorno

Se nenhum erro ocorrer, o valor da integral elíptica incompleta de segunda espécie de k e phi, ou seja ∫phi
0√1-k2
sin2
θdθ, é retornado.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>):

*   Se o argumento for NaN, NaN é retornado e nenhum erro de domínio é relatado
*   Se |k|>1, um erro de domínio pode ocorrer

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da standard library.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está disponível em [boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/ellint/ellint_2.html>).

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu primeiro argumento num1 e segundo argumento num2:

*   Se num1 ou num2 tiver o tipo long double, então std::ellint2(num1, num2) tem o mesmo efeito que std::ellint2(static_cast&lt;long double&gt;(num1),
    static_cast<long double>(num2)).
*   Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::ellint2(num1, num2) tem o mesmo efeito que std::ellint2(static_cast&lt;double&gt;(num1),
    static_cast<double>(num2)).
*   Caso contrário, se num1 ou num2 tiver o tipo float, então std::ellint2(num1, num2) tem o mesmo efeito que std::ellint2(static_cast&lt;float&gt;(num1),
    static_cast<float>(num2)).

| (até C++23)
Se num1 e num2 tiverem tipos aritméticos, então std::ellint2(num1, num2) tem o mesmo efeito que std::ellint2(static_cast</* common-floating-point-type */>(num1),
static_cast</* common-floating-point-type */>(num2)), onde /* common-floating-point-type */ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [sub-rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e sub-rank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    #include <numbers>

    int main()
    {
        const double hpi = std::numbers::pi / 2.0;

        std::cout << "E(0,π/2)  = " << std::ellint_2(0, hpi) << '\n'
                  << "E(0,-π/2) = " << std::ellint_2(0, -hpi) << '\n'
                  << "π/2       = " << hpi << '\n'
                  << "E(0.7,0)  = " << std::ellint_2(0.7, 0) << '\n'
                  << "E(1,π/2)  = " << std::ellint_2(1, hpi) << '\n';
    }
```

Saída:
```
    E(0,π/2)  = 1.5708
    E(0,-π/2) = -1.5708
    π/2       = 1.5708
    E(0.7,0)  = 0
    E(1,π/2)  = 1
```

### Ver também

[ comp_ellint_2comp_ellint_2fcomp_ellint_2l](<#/doc/numeric/special_functions/comp_ellint_2>)(C++17)(C++17)(C++17) | integral elíptica (completa) de segunda espécie
---|---
(function) |

### Links externos

[Weisstein, Eric W. "Elliptic Integral of the Second Kind."](<https://mathworld.wolfram.com/EllipticIntegraloftheSecondKind.html>) De MathWorld — Um Recurso Web da Wolfram.
---