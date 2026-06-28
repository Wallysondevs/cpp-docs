# std::assoc_laguerre, std::assoc_laguerref, std::assoc_laguerrel

```cpp
double assoc_laguerre ( unsigned int n, unsigned int m, double x );
double assoc_laguerre ( unsigned int n, unsigned int m, float x );
double assoc_laguerre ( unsigned int n, unsigned int m, long double x );
float assoc_laguerref( unsigned int n, unsigned int m, float x );
long double assoc_laguerrel( unsigned int n, unsigned int m, long double x );  // (1)
double assoc_laguerre ( unsigned int n, unsigned int m, IntegralType x );  // (2)
```

  
1) Calcula os [polinômios de Laguerre associados](<https://en.wikipedia.org/wiki/Laguerre_polynomials#Generalized_Laguerre_polynomials> "enwiki:Laguerre polynomials") de grau n, ordem m e argumento x.

2) Um conjunto de sobrecargas ou um function template que aceita um argumento de qualquer [tipo integral](<#/doc/types/is_integral>). Equivalente a (1) após converter o argumento para double.

Assim como todas as funções especiais, `assoc_laguerre` tem sua disponibilidade garantida em `<cmath>` apenas se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação com um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer headers da standard library. 

### Parâmetros

n  |  \-  |  o grau do polinômio, um valor de tipo inteiro sem sinal   
---|---|---
m  |  \-  |  a ordem do polinômio, um valor de tipo inteiro sem sinal   
x  |  \-  |  o argumento, um valor de tipo de ponto flutuante ou integral   
  
### Valor de retorno

Se nenhum erro ocorrer, o valor do polinômio de Laguerre associado de x, ou seja, (-1)m  
dm  
  
---  
dxm  
  
Ln + m(x), é retornado (onde Ln + m(x) é o polinômio de Laguerre não associado, [std::laguerre](<#/doc/numeric/special_functions/laguerre>)(n + m, x)). 

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

  * Se o argumento for NaN, NaN é retornado e o erro de domínio não é relatado. 
  * Se x for negativo, um erro de domínio pode ocorrer. 
  * Se n ou m for maior ou igual a 128, o comportamento é definido pela implementação. 

### Observações

Implementações que não suportam TR 29124, mas suportam TR 19768, fornecem esta função no header `tr1/cmath` e no namespace `std::tr1`. 

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/sf_poly/laguerre.html>). 

Os polinômios de Laguerre associados são as soluções polinomiais da equação xy,,  
\+ (m + 1 - x)y,  
\+ ny = 0. 

Os primeiros são: 

  * `assoc_laguerre(0, m, x)` = 1. 
  * `assoc_laguerre(1, m, x)` = -x + m + 1. 
  * `assoc_laguerre(2, m, x)` = 1  
---  
2  
[x2  
\- 2(m + 2)x + (m + 1)(m + 2)]. 
  * `assoc_laguerre(3, m, x)` = 1  
---  
6  
[-x3  
\- 3(m + 3)x2  
\- 3(m + 2)(m + 3)x + (m + 1)(m + 2)(m + 3)]. 

### Exemplo

Execute este código
```cpp 
    #define __STDCPP_WANT_MATH_SPEC_FUNCS__ 1
    #include <cmath>
    #include <iostream>
    
    double L1(unsigned m, double x)
    {
        return -x + m + 1;
    }
    
    double L2(unsigned m, double x)
    {
        return 0.5 * (x * x - 2 * (m + 2) * x + (m + 1) * (m + 2));
    }
    
    int main()
    {
        std::cout << std::assoc_laguerre(1, 10, 0.5) << '=' << L1(10, 0.5) << '\n'
                  << std::assoc_laguerre(2, 10, 0.5) << '=' << L2(10, 0.5) << '\n';
    }
```

Saída: 
```
    10.5=10.5
    60.125=60.125
```

### Veja também

[ laguerrelaguerreflaguerrel](<#/doc/experimental/special_functions/laguerre>) |  Polinômios de Laguerre   
(função)  
  
### Links externos

[Weisstein, Eric W. "Associated Laguerre Polynomial."](<https://mathworld.wolfram.com/AssociatedLaguerrePolynomial.html>) De MathWorld — Um Recurso Web da Wolfram.   
---