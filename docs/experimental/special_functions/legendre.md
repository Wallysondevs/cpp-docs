# std::legendre, std::legendref, std::legendrel

```cpp
double legendre( unsigned int n, double x );
double legendre( unsigned int n, float x );
double legendre( unsigned int n, long double x );
float legendref( unsigned int n, float x );
long double legendrel( unsigned int n, long double x );  // (1)
double legendre( unsigned int n, IntegralType x );  // (2)
```

  
1) Calcula os [polinômios de Legendre](<https://en.wikipedia.org/wiki/Legendre_polynomials> "enwiki:Legendre polynomials") não associados de grau n e argumento x.

2) Um conjunto de sobrecargas ou um template de função que aceita um argumento de qualquer [tipo integral](<#/doc/types/is_integral>). Equivalente a (1) após converter o argumento para double.

Como todas as funções especiais, `legendre` tem sua disponibilidade em `<cmath>` garantida apenas se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação com um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer headers da standard library.

### Parâmetros

n  |  \-  |  o grau do polinômio   
---|---|---
x  |  \-  |  o argumento, um valor de um tipo de ponto flutuante ou integral   
  
### Valor de retorno

Se nenhum erro ocorrer, o valor do polinômio de Legendre não associado de ordem `n` de `x`, que é 1  
---  
2n  
n!  
dn  
  
---  
dxn  
  
(x2  
\- 1)n  
, é retornado.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

  * Se o argumento for NaN, NaN é retornado e erro de domínio não é relatado.
  * A função não é obrigada a ser definida para |x| > 1.
  * Se n for maior ou igual a 128, o comportamento é definido pela implementação.

### Observações

Implementações que não suportam TR 29124, mas suportam TR 19768, fornecem esta função no header `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/sf_poly/legendre.html>).

Os primeiros polinômios de Legendre são:

  * legendre(0, x) = 1.
  * legendre(1, x) = x.
  * legendre(2, x) = 1  
---  
2  
(3x2  
\- 1).
  * legendre(3, x) = 1  
---  
2  
(5x3  
\- 3x).
  * legendre(4, x) = 1  
---  
8  
(35x4  
\- 30x2  
\+ 3).

### Exemplo

(funciona como mostrado com gcc 6.0)

Execute este código
```cpp
    #define __STDCPP_WANT_MATH_SPEC_FUNCS__ 1
    #include <cmath>
    #include <iostream>
    
    double P3(double x)
    {
        return 0.5 * (5 * std::pow(x, 3) - 3 * x);
    }
    
    double P4(double x)
    {
        return 0.125 * (35 * std::pow(x, 4) - 30 * x * x + 3);
    }
    
    int main()
    {
        // spot-checks
        std::cout << std::legendre(3, 0.25) << '=' << P3(0.25) << '\n'
                  << std::legendre(4, 0.25) << '=' << P4(0.25) << '\n';
    }
```

Saída:
```
    -0.335938=-0.335938
    0.157715=0.157715
```

### Veja também

[ laguerrelaguerreflaguerrel](<#/doc/experimental/special_functions/laguerre>) | Polinômios de Laguerre   
(função)  
[ hermitehermitefhermitel](<#/doc/experimental/special_functions/hermite>) | Polinômios de Hermite   
(função)  
  
### Links externos

[Weisstein, Eric W. "Legendre Polynomial."](<https://mathworld.wolfram.com/LegendrePolynomial.html>) De MathWorld — Um Recurso Web da Wolfram.   
---