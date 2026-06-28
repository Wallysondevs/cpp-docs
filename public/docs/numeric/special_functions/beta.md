# std::beta, std::betaf, std::betal

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float beta ( float x, float y );
double beta ( double x, double y );
long double beta ( long double x, long double y );
(até C++23)
/* floating-point-type */ beta( /* floating-point-type */ x,
/* floating-point-type */ y );
float betaf( float x, float y );
long double betal( long double x, long double y );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Arithmetic1, class Arithmetic2 >
/* common-floating-point-type */ beta( Arithmetic1 x, Arithmetic2 y );
```

1-3) Calcula a [função Beta](<https://en.wikipedia.org/wiki/Beta_function> "enwiki:Beta function") de x e y. A biblioteca fornece sobrecargas de `std::beta` para todos os tipos de ponto flutuante não qualificados por cv como o tipo dos parâmetros x e y.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

- **x, y** — valores de ponto flutuante ou inteiros

### Valor de retorno

Se nenhum erro ocorrer, o valor da função beta de x e y, que é \\(\int_{0}^{1}{ {t}^{x-1}{(1-t)}^{y-1}\mathsf{d}t}\\)∫1
0tx-1
(1-t)(y-1)
d _t_ , ou, equivalentemente, \\(\frac{\Gamma(x)\Gamma(y)}{\Gamma(x+y)}\\)Γ(x)Γ(y)
---
Γ(x+y)
é retornado.

### Tratamento de erros

Erros podem ser reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

*   Se qualquer argumento for NaN, NaN é retornado e o erro de domínio não é reportado.
*   A função é exigida apenas onde x e y são maiores que zero, e é permitido reportar um erro de domínio caso contrário.

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da standard library.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/sf_beta/beta_function.html>).

`std::beta(x, y)` é igual a `std::beta(y, x)`.

Quando x e y são inteiros positivos, `std::beta(x, y)` é igual a \\(\frac{(x-1)!(y-1)!}{(x+y-1)!}\\)(x-1)!(y-1)!
---
(x+y-1)!
. Coeficientes binomiais podem ser expressos em termos da função beta: \\(\binom{n}{k} = \frac{1}{(n+1)B(n-k+1,k+1)}\\)⎛
⎜
⎝n
k⎞
⎟
⎠=1
---
(n+1)Β(n-k+1,k+1)
.

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que para seu primeiro argumento `num1` e segundo argumento `num2`:

*   Se `num1` ou `num2` tiver o tipo `long double`, então `std::beta(num1, num2)` tem o mesmo efeito que `std::beta(static_cast<long double>(num1),`
    `static_cast<long double>(num2))`.
*   Caso contrário, se `num1` e/ou `num2` tiver o tipo `double` ou um tipo inteiro, então `std::beta(num1, num2)` tem o mesmo efeito que `std::beta(static_cast<double>(num1),`
    `static_cast<double>(num2))`.
*   Caso contrário, se `num1` ou `num2` tiver o tipo `float`, então `std::beta(num1, num2)` tem o mesmo efeito que `std::beta(static_cast<float>(num1),`
    `static_cast<float>(num2))`.

| (até C++23)
Se `num1` e `num2` tiverem tipos aritméticos, então `std::beta(num1, num2)` tem o mesmo efeito que `std::beta(static_cast</* common-floating-point-type */>(num1),`
`static_cast</* common-floating-point-type */>(num2))`, onde `/* common-floating-point-type */` é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de `num1` e `num2`, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que `double`. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    #include <numbers>
    #include <string>
    
    long binom_via_beta(int n, int k)
    {
        return std::lround(1 / ((n + 1) * std::beta(n - k + 1, k + 1)));
    }
    
    long binom_via_gamma(int n, int k)
    {
        return std::lround(std::tgamma(n + 1) /
                          (std::tgamma(n - k + 1) * 
                           std::tgamma(k + 1)));
    }
    
    int main()
    {
        std::cout << "Pascal's triangle:\n";
        for (int n = 1; n < 10; ++n)
        {
            std::cout << std::string(20 - n * 2, ' ');
            for (int k = 1; k < n; ++k)
            {
                std::cout << std::setw(3) << binom_via_beta(n, k) << ' ';
                assert(binom_via_beta(n, k) == binom_via_gamma(n, k));
            }
            std::cout << '\n';
        }
    
        // A spot-check
        const long double p = 0.123; // a random value in [0, 1]
        const long double q = 1 - p;
        const long double π = std::numbers::pi_v<long double>;
        std::cout << "\n\n" << std::setprecision(19)
                  << "β(p,1-p)   = " << std::beta(p, q) << '\n'
                  << "π/sin(π*p) = " << π / std::sin(π * p) << '\n';
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
    
    β(p,1-p)   = 8.335989149587307836
    π/sin(π*p) = 8.335989149587307834
```

### Veja também

[ tgammatgammaftgammal](<#/doc/numeric/math/tgamma>)(C++11)(C++11)(C++11) | função gamma
(função)

### Links externos

[Weisstein, Eric W. "Beta Function."](<https://mathworld.wolfram.com/BetaFunction.html>) De MathWorld — Um Recurso Web da Wolfram.
---