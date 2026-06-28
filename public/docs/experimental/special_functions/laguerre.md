# std::laguerre, std::laguerref, std::laguerrel

```cpp
double laguerre( unsigned int n, double x );
double laguerre( unsigned int n, float x );
double laguerre( unsigned int n, long double x );
float laguerref( unsigned int n, float x );
long double laguerrel( unsigned int n, long double x );  // (1)
double laguerre( unsigned int n, IntegralType x );  // (2)
```

  
1) Calcula os [polinômios de Laguerre](<https://en.wikipedia.org/wiki/Laguerre_polynomials> "enwiki:Laguerre polynomials") não associados de grau n e argumento x.

2) Um conjunto de sobrecargas ou um function template que aceita um argumento de qualquer [tipo integral](<#/doc/types/is_integral>). Equivalente a (1) após converter o argumento para double.

Assim como todas as funções especiais, `laguerre` tem sua disponibilidade garantida em `<cmath>` apenas se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer headers da standard library. 

### Parâmetros

n  |  \-  |  o grau do polinômio, um valor de tipo inteiro sem sinal   
---|---|---
x  |  \-  |  o argumento, um valor de tipo de ponto flutuante ou integral   
  
### Valor de retorno

Se nenhum erro ocorrer, o valor do polinômio de Laguerre não associado de `x`, ou seja _e_ x  
---  
n!  
dn  
  
---  
dxn  
  
(xn  
 _e_ -x), é retornado. 

### Tratamento de erros

Erros podem ser reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

  * Se o argumento for NaN, NaN é retornado e erro de domínio não é reportado. 
  * Se x for negativo, um erro de domínio pode ocorrer. 
  * Se n for maior ou igual a 128, o comportamento é definido pela implementação. 

### Notas

Implementações que não suportam TR 29124, mas suportam TR 19768, fornecem esta função no header `tr1/cmath` e no namespace `std::tr1`. 

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/sf_poly/laguerre.html>). 

Os polinômios de Laguerre são as soluções polinomiais da equação xy,,  
\+ (1 - x)y,  
\+ ny = 0. 

Os primeiros são: 

  * laguerre(0, x) = 1. 
  * laguerre(1, x) = -x + 1. 
  * laguerre(2, x) = 1  
---  
2  
[x2  
\- 4x + 2]. 
  * laguerre(3, x) = 1  
---  
6  
[-x3  
\- 9x2  
\- 18x + 6]. 

### Exemplo

(funciona como mostrado com gcc 6.0)

Execute este código
```
    #define __STDCPP_WANT_MATH_SPEC_FUNCS__ 1
    #include <cmath>
    #include <iostream>
     
    double L1(double x)
    {
        return -x + 1;
    }
     
    double L2(double x)
    {
        return 0.5 * (x * x - 4 * x + 2);
    }
     
    int main()
    {
        // spot-checks
        std::cout << std::laguerre(1, 0.5) << '=' << L1(0.5) << '\n'
                  << std::laguerre(2, 0.5) << '=' << L2(0.5) << '\n';
    }
```

Saída: 
```
    0.5=0.5
    0.125=0.125
```

### Veja também

[ assoc_laguerreassoc_laguerrefassoc_laguerrel](<#/doc/experimental/special_functions/assoc_laguerre>) |  polinômios de Laguerre associados   
(function)  
  
### Links externos

[Weisstein, Eric W. "Laguerre Polynomial."](<https://mathworld.wolfram.com/LaguerrePolynomial.html>) De MathWorld--A Wolfram Web Resource. 