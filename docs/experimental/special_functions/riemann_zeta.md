# std::riemann_zeta, std::riemann_zetaf, std::riemann_zetal

```cpp
double riemann_zeta( double arg );
double riemann_zeta( float arg );
double riemann_zeta( long double arg );
float riemann_zetaf( float arg );
long double riemann_zetal( long double arg );  // (1)
double riemann_zeta( IntegralType arg );  // (2)
```

  
1) Calcula a [função zeta de Riemann](<https://en.wikipedia.org/wiki/Riemann_zeta_function> "enwiki:Riemann zeta function") de arg.

2) Um conjunto de sobrecargas ou um function template que aceita um argumento de qualquer [tipo integral](<#/doc/types/is_integral>). Equivalente a (1) após converter o argumento para double.

Assim como todas as funções especiais, `riemann_zeta` tem sua disponibilidade garantida em `<cmath>` apenas se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer headers da standard library.

### Parâmetros

arg  |  \-  |  valor de um tipo de ponto flutuante ou integral   
  
### Valor de retorno

Se nenhum erro ocorrer, o valor da função zeta de Riemann de arg, ζ(arg), definido para todo o eixo real: 

  * Para arg > 1, Σ∞  
n=1n-arg  
. 
  * Para 0 ≤ arg ≤ 1, 1  
---  
1 - 21-arg  
  
Σ∞  
n=1(-1)n-1  
n-arg  
. 
  * Para arg < 0, 2arg  
πarg-1  
sin(πarg  
---  
2  
)Γ(1 − arg)ζ(1 − arg). 

### Tratamento de erros

Erros podem ser reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

  * Se o argumento for NaN, NaN é retornado e o erro de domínio não é reportado. 

### Observações

Implementações que não suportam TR 29124, mas suportam TR 19768, fornecem esta função no header `tr1/cmath` e no namespace `std::tr1`. 

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/1_60_0/libs/math/doc/html/math_toolkit/zetas/zeta.html>). 

### Exemplo

(funciona como mostrado com gcc 6.0)

Execute este código
```cpp
    #define __STDCPP_WANT_MATH_SPEC_FUNCS__ 1
    #include <cmath>
    #include <iostream>
    
    int main()
    {
        // verificações pontuais para valores conhecidos
        std::cout << "ζ(-1) = " << std::riemann_zeta(-1) << '\n'
                  << "ζ(0) = " << std::riemann_zeta(0) << '\n'
                  << "ζ(1) = " << std::riemann_zeta(1) << '\n'
                  << "ζ(0.5) = " << std::riemann_zeta(0.5) << '\n'
                  << "ζ(2) = " << std::riemann_zeta(2) << ' '
                  << "(π²/6 = " << std::pow(std::acos(-1), 2) / 6 << ")\n";
    }
```

Saída: 
```
    ζ(-1) = -0.0833333
    ζ(0) = -0.5
    ζ(1) = inf
    ζ(0.5) = -1.46035
    ζ(2) = 1.64493 (π²/6 = 1.64493)
```

### Links externos

[Weisstein, Eric W. "Riemann Zeta Function."](<https://mathworld.wolfram.com/RiemannZetaFunction.html>) De MathWorld--Um Recurso Web da Wolfram. 