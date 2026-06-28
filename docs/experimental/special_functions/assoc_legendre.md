# std::assoc_legendre, std::assoc_legendref, std::assoc_legendrel

```cpp
double assoc_legendre( unsigned int n, unsigned int m, double x );
double assoc_legendre( unsigned int n, unsigned int m, float x );
double assoc_legendre( unsigned int n, unsigned int m, long double x );
float assoc_legendref( unsigned int n, unsigned int m, float x );
long double assoc_legendrel( unsigned int n, unsigned int m, long double x );  // (1)
double assoc_legendre( unsigned int n, unsigned int m, IntegralType x );  // (2)
```

  
1) Calcula os [polinômios de Legendre associados](<https://en.wikipedia.org/wiki/Associated_Legendre_polynomials> "enwiki:Associated Legendre polynomials") de grau n, ordem m e argumento x.

2) Um conjunto de sobrecargas ou um template de função que aceita um argumento de qualquer [tipo integral](<#/doc/types/is_integral>). Equivalente a (1) após converter o argumento para double.

Como todas as funções especiais, `assoc_legendre` tem sua disponibilidade garantida em `<cmath>` apenas se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer headers da standard library. 

### Parâmetros

n  |  \-  |  o grau do polinômio, um valor de tipo inteiro sem sinal   
---|---|---
m  |  \-  |  a ordem do polinômio, um valor de tipo inteiro sem sinal   
x  |  \-  |  o argumento, um valor de tipo de ponto flutuante ou integral   
  
### Valor de retorno

Se nenhum erro ocorrer, o valor do polinômio de Legendre associado Pm  
n de x, ou seja (1 - x2  
)m/2  
dm  
  
---  
dxm  
  
Pn(x), é retornado (onde Pn(x) é o polinômio de Legendre não associado, [std::legendre](<#/doc/numeric/special_functions/legendre>)(n, x)). 

### Tratamento de erros

Erros podem ser reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

  * Se o argumento for NaN, NaN é retornado e erro de domínio não é reportado. 
  * Se |x| > 1, um erro de domínio pode ocorrer. 
  * Se `n` for maior ou igual a 128, o comportamento é definido pela implementação. 

### Notas

Implementações que não suportam TR 29124, mas suportam TR 19768, fornecem esta função no header `tr1/cmath` e no namespace `std::tr1`. 

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/sf_poly/legendre.html>). 

Os primeiros polinômios de Legendre associados são: 

  * assoc_legendre(0, 0, x) = 1. 
  * assoc_legendre(1, 0, x) = x. 
  * assoc_legendre(1, 1, x) = -(1 - x2  
)1/2  
. 
  * assoc_legendre(2, 0, x) = 1  
---  
2  
(3x2  
\- 1). 
  * assoc_legendre(2, 1, x) = -3x(1 - x2  
)1/2  
. 
  * assoc_legendre(2, 2, x) = 3(1 - x2  
). 

### Exemplo

(funciona como mostrado com gcc 6.0)

Execute este código
```cpp 
    #define __STDCPP_WANT_MATH_SPEC_FUNCS__ 1
    #include <cmath>
    #include <iostream>
    
    double P20(double x)
    {
        return 0.5 * (3 * x * x - 1);
    }
    
    double P21(double x)
    {
        return -3.0 * x * std::sqrt(1 - x * x);
    }
    
    double P22(double x)
    {
        return 3 * (1 - x * x);
    }
    
    int main()
    {
        std::cout << std::assoc_legendre(2, 0, 0.5) << '=' << P20(0.5) << '\n'
                  << std::assoc_legendre(2, 1, 0.5) << '=' << P21(0.5) << '\n'
                  << std::assoc_legendre(2, 2, 0.5) << '=' << P22(0.5) << '\n';
    }
```

Saída: 
```
    -0.125=-0.125
    -1.29904=-1.29904
    2.25=2.25
```

### Veja também

[ legendrelegendreflegendrel](<#/doc/experimental/special_functions/legendre>) | Polinômios de Legendre   
(função)  
  
### Links externos

[Weisstein, Eric W. "Associated Legendre Polynomial."](<https://mathworld.wolfram.com/AssociatedLegendrePolynomial.html>) De MathWorld--A Wolfram Web Resource. 