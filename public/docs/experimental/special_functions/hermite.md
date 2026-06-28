# std::hermite, std::hermitef, std::hermitel

```cpp
double hermite( unsigned int n, double x );
double hermite( unsigned int n, float x );
double hermite( unsigned int n, long double x );
float hermitef( unsigned int n, float x );
long double hermitel( unsigned int n, long double x );  // (1)
double hermite( unsigned int n, IntegralType x );  // (2)
```

  
1) Calcula os [polinômios de Hermite](<https://en.wikipedia.org/wiki/Hermite_polynomials> "enwiki:Hermite polynomials") (do físico) de grau n e argumento x.

2) Um conjunto de sobrecargas ou um function template que aceita um argumento de qualquer [tipo integral](<#/doc/types/is_integral>). Equivalente a (1) após converter o argumento para double.

Como todas as funções especiais, `hermite` tem sua disponibilidade garantida em `<cmath>` apenas se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer headers da standard library.

### Parâmetros

n  |  \-  |  o grau do polinômio   
---|---|---
x  |  \-  |  o argumento, um valor de tipo de ponto flutuante ou integral   
  
### Valor de retorno

Se nenhum erro ocorrer, o valor do polinômio de Hermite de ordem n de x, ou seja (-1)n  
 _e_ x2  
dn  
  
---  
dxn  
  
 _e_ -x2  
, é retornado.

### Tratamento de erros

Erros podem ser reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

  * Se o argumento for NaN, NaN é retornado e erro de domínio não é reportado.
  * Se n for maior ou igual a 128, o comportamento é definido pela implementação.

### Notas

Implementações que não suportam TR 29124, mas suportam TR 19768, fornecem esta função no header `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/sf_poly/hermite.html>).

Os polinômios de Hermite são as soluções polinomiais da equação u,,  
\- 2xu,  
= -2nu.

Os primeiros são:

  * hermite(0, x) = 1.
  * hermite(1, x) = 2x.
  * hermite(2, x) = 4x2  
\- 2.
  * hermite(3, x) = 8x3  
\- 12x.
  * hermite(4, x) = 16x4  
\- 48x2  
\+ 12.

### Exemplo

(funciona como mostrado com gcc 6.0)

Execute este código
```cpp
    #define __STDCPP_WANT_MATH_SPEC_FUNCS__ 1
    #include <cmath>
    #include <iostream>
     
    double H3(double x)
    {
        return 8 * std::pow(x, 3) - 12 * x;
    }
     
    double H4(double x)
    {
        return 16 * std::pow(x, 4) - 48 * x * x + 12;
    }
     
    int main()
    {
        // spot-checks
        std::cout << std::hermite(3, 10) << '=' << H3(10) << '\n'
                  << std::hermite(4, 10) << '=' << H4(10) << '\n';
    }
```

Saída:
```
    7880=7880
    155212=155212
```

### Veja também

[ laguerrelaguerreflaguerrel](<#/doc/experimental/special_functions/laguerre>) |  Polinômios de Laguerre   
(function)  
[ legendrelegendreflegendrel](<#/doc/experimental/special_functions/legendre>) |  Polinômios de Legendre   
(function)  
  
### Links externos

[Weisstein, Eric W. ""Hermite Polynomial."](<https://mathworld.wolfram.com/HermitePolynomial.html>) De MathWorld--Um Recurso Web da Wolfram.