# std::comp_ellint_3, std::comp_ellint_3f, std::comp_ellint_3l

```cpp
double comp_ellint_3( double k, double nu );
float comp_ellint_3( float k, float nu );
long double comp_ellint_3( long double k, long double nu );
float comp_ellint_3f( float k, float nu );
long double comp_ellint_3l( long double k, long double nu );  // (1)
double comp_ellint_3( IntegralType k, IntegralType nu );  // (2)
```

  
1) Calcula a [integral elíptica completa de terceira espécie](<https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_third_kind> "enwiki:Elliptic integral") de arg.

2) Um conjunto de sobrecargas ou um template de função que aceita um argumento de qualquer [tipo integral](<#/doc/types/is_integral>). Equivalente a (1) após converter o argumento para double.

Como todas as funções especiais, `comp_ellint_3` tem sua disponibilidade em `<cmath>` garantida apenas se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação com um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer headers da standard library. 

### Parâmetros

nu  |  \-  |  valor de um tipo de ponto flutuante ou integral   
---|---|---
k  |  \-  |  valor de um tipo de ponto flutuante ou integral   
  
### Valor de retorno

Se nenhum erro ocorrer, o valor da integral elíptica completa de segunda espécie de arg, ou seja, ellint_3(k, nu, π/2), é retornado. 

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

  * Se o argumento for NaN, NaN é retornado e um erro de domínio não é relatado. 
  * Se |k| > 1 ou |nu| > 1, um erro de domínio pode ocorrer. 

### Observações

Implementações que não suportam TR 29124, mas suportam TR 19768, fornecem esta função no header `tr1/cmath` e no namespace `std::tr1`. 

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/1_60_0/libs/math/doc/html/math_toolkit/ellint/ellint_3.html>). 

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
        std::cout << "Π(0, 0.75) = " << std::comp_ellint_3(0, 0.75) << '\n'
                  << "π/2 = " << hpi << '\n'
                  << "Π(0.5, 0.75) = " << std::comp_ellint_3(0.5, 0.75) << '\n'
                  << "Π(0.5, 0.75, π/2) = " << std::ellint_3(0.5, 0.75, hpi) << '\n';
    }
```

Saída: 
```
    Π(0, 0.75) = 3.14159
    π/2 = 1.5708
    Π(0.5, 0.75) = 3.45372
    Π(0.5, 0.75, π/2) = 3.45372
```

### Links externos

[Weisstein, Eric W. "Integral Elíptica Completa de Terceira Espécie."](<https://mathworld.wolfram.com/CompleteEllipticIntegraloftheThirdKind.html>) De MathWorld--Um Recurso Web da Wolfram. 

### Veja também

[ ellint_3ellint_3fellint_3l](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/special_functions/ellint_3&action=edit&redlink=1> "cpp/experimental/special functions/ellint 3 \(page does not exist\)") | integral elíptica (incompleta) de terceira espécie   
(função)  