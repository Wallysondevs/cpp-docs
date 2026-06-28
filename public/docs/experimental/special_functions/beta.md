# std::beta, std::betaf, std::betal

```cpp
double beta( double x, double y );
float betaf( float x, float y );
long double betal( long double x, long double y );  // (1)
Promoted beta( Arithmetic x, Arithmetic y );  // (2)
```

  
1) Calcula a [função beta](<https://en.wikipedia.org/wiki/Beta_function> "enwiki:Beta function") de x e y.

2) Um conjunto de sobrecargas ou um template de função para todas as combinações de argumentos de tipo aritmético não cobertas por (1). Se qualquer argumento tiver [tipo integral](<#/doc/types/is_integral>), ele é convertido para double. Se qualquer argumento for long double, então o tipo de retorno `Promoted` também é long double; caso contrário, o tipo de retorno é sempre double.

Como todas as funções especiais, `beta` tem sua disponibilidade garantida em `<cmath>` apenas se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer headers da standard library.

### Parâmetros

x, y  |  \-  |  valores de um tipo de ponto flutuante ou integral   
  
### Valor de retorno

Se nenhum erro ocorrer, o valor da função beta de x e y, ou seja, ∫1  
0tx-1  
(1 - t)(y-1)  
d _t_ , ou, equivalentemente, Γ(x)Γ(y)  
---  
Γ(x + y)  
é retornado.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

  * Se qualquer argumento for NaN, NaN é retornado e erro de domínio não é relatado.
  * A função é exigida apenas onde x e y são maiores que zero, e é permitido relatar um erro de domínio caso contrário.

### Observações

Implementações que não suportam TR 29124 mas suportam TR 19768, fornecem esta função no header `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/sf_beta/beta_function.html>).

beta(x, y) é igual a beta(y, x).

Quando x e y são inteiros positivos, beta(x, y) é igual a \\(\frac{(x - 1)!(y - 1)!}{(x + y - 1)!}\\)(x - 1)!(y - 1)!  
---  
(x + y - 1)!  
. Coeficientes binomiais podem ser expressos em termos da função beta: \\(\binom{n}{k} = \frac{1}{(n + 1)B(n - k + 1, k + 1)}\\)⎛  
⎜  
⎝n  
k⎞  
⎟  
⎠=1  
---  
(n + 1)Β(n - k + 1, k + 1)  
.

### Exemplo

(funciona como mostrado com gcc 6.0)

Execute este código
```cpp
    #define __STDCPP_WANT_MATH_SPEC_FUNCS__ 1
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    #include <string>
     
    double binom(int n, int k)
    {
        return 1 / ((n + 1) * std::beta(n - k + 1, k + 1));
    }
     
    int main()
    {
        std::cout << "Pascal's triangle:\n";
        for (int n = 1; n < 10; ++n)
        {
            std::cout << std::string(20 - n * 2, ' ');
            for (int k = 1; k < n; ++k)
                std::cout << std::setw(3) << binom(n, k) << ' ';
            std::cout << '\n';
        }
    }
```

Saída:
```
    Pascal's triangle:
     
                      2 
                    3   3 
                  4   6   4 
                5  10  10   5 
              6  15  20  15   6 
            7  21  35  35  21   7 
          8  28  56  70  56  28   8 
        9  36  84 126 126  84  36   9
```

### Veja também

[ tgammatgammaftgammal](<#/doc/numeric/math/tgamma>)(desde C++11)(desde C++11)(desde C++11) |  função gamma   
(função)  
  
### Links externos

[Weisstein, Eric W. "Beta Function."](<https://mathworld.wolfram.com/BetaFunction.html>) De MathWorld--Um Recurso Web da Wolfram.