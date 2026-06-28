# std::expint, std::expintf, std::expintl

```cpp
double expint( double arg );
double expint( float arg );
double expint( long double arg );
float expintf( float arg );
long double expintl( long double arg );  // (1)
double expint( IntegralType arg );  // (2)
```

  
1) Calcula a [integral exponencial](<https://en.wikipedia.org/wiki/Exponential_integral> "enwiki:Exponential integral") de arg.

2) Um conjunto de sobrecargas ou um function template que aceita um argumento de qualquer [tipo integral](<#/doc/types/is_integral>). Equivalente a (1) após converter o argumento para double.

Assim como todas as funções especiais, `expint` tem sua disponibilidade garantida em `<cmath>` apenas se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação com um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer headers da standard library. 

### Parâmetros

arg  |  \-  |  valor de um tipo de ponto flutuante ou [Integral](<#/doc/types/is_integral>)  
  
### Valor de retorno

Se nenhum erro ocorrer, o valor da integral exponencial de arg, ou seja, -∫∞  
-arg _e_ -t  
---  
t  
d _t_ , é retornado. 

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

  * Se o argumento for NaN, NaN é retornado e erro de domínio não é relatado. 
  * Se o argumento for ±0, -∞ é retornado. 

### Notas

Implementações que não suportam TR 29124 mas suportam TR 19768, fornecem esta função no header `tr1/cmath` e no namespace `std::tr1`. 

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/expint/expint_i.html>). 

### Exemplo

(funciona como mostrado com gcc 6.0)

Execute este código
```cpp 
    #define __STDCPP_WANT_MATH_SPEC_FUNCS__ 1
    #include <cmath>
    #include <iostream>
     
    int main()
    {
        std::cout << "Ei(0) = " << std::expint(0) << '\n'
                  << "Ei(1) = " << std::expint(1) << '\n'
                  << "Gompetz constant = " << -std::exp(1) * std::expint(-1) << '\n';
    }
```

Saída: 
```
    Ei(0) = -inf
    Ei(1) = 1.89512
    Gompetz constant = 0.596347
```

### Links externos

[Weisstein, Eric W. "Exponential Integral."](<https://mathworld.wolfram.com/ExponentialIntegral.html>) De MathWorld--Um Recurso Web da Wolfram. 