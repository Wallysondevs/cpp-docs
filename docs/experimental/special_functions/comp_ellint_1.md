# std::comp_ellint_1, std::comp_ellint_1f, std::comp_ellint_1l

```cpp
double comp_ellint_1( double arg );
double comp_ellint_1( float arg );
double comp_ellint_1( long double arg );
float comp_ellint_1f( float arg );
long double comp_ellint_1l( long double arg );  // (1)
double comp_ellint_1( IntegralType arg );  // (2)
```

  
1) Calcula a [integral elíptica completa de primeira espécie](<https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_first_kind> "enwiki:Elliptic integral") de arg.

2) Um conjunto de sobrecargas ou um modelo de função que aceita um argumento de qualquer [tipo integral](<#/doc/types/is_integral>). Equivalente a (1) após converter o argumento para double.

Como todas as funções especiais, `comp_ellint_1` tem sua disponibilidade garantida em `<cmath>` apenas se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer headers da standard library.

### Parâmetros

arg  |  \-  |  valor de um tipo de ponto flutuante ou integral   
  
### Valor de retorno

Se nenhum erro ocorrer, o valor da integral elíptica completa de primeira espécie de arg, ou seja, ellint_1(arg, π/2), é retornado.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

  * Se o argumento for NaN, NaN é retornado e erro de domínio não é relatado.
  * Se |arg| > 1, um erro de domínio pode ocorrer.

### Observações

Implementações que não suportam TR 29124, mas suportam TR 19768, fornecem esta função no header `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/1_60_0/libs/math/doc/html/math_toolkit/ellint/ellint_1.html>).

### Exemplo

(funciona como mostrado com gcc 6.0)

Execute este código
```cpp
    #define __STDCPP_WANT_MATH_SPEC_FUNCS__ 1
    #include <cmath>
    #include <iostream>
     
    int main()
    {
        double hpi = std::acos(-1) / 2;
        std::cout << "K(0) = " << std::comp_ellint_1(0) << '\n'
                  << "π/2 = " << hpi << '\n'
                  << "K(0.5) = " << std::comp_ellint_1(0.5) << '\n'
                  << "F(0.5, π/2) = " << std::ellint_1(0.5, hpi) << '\n';
    }
```

Saída:
```
    K(0) = 1.5708
    π/2 = 1.5708
    K(0.5) = 1.68575
    F(0.5, π/2) = 1.68575
```

### Links externos

[Weisstein, Eric W. "Complete Elliptic Integral of the First Kind."](<https://mathworld.wolfram.com/CompleteEllipticIntegraloftheFirstKind.html>) De MathWorld--Um Recurso Web da Wolfram.

### Veja também

[ ellint_1ellint_1fellint_1l](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/special_functions/ellint_1&action=edit&redlink=1> "cpp/experimental/special functions/ellint 1 \(page does not exist\)") | integral elíptica (incompleta) de primeira espécie
(função)