# std::hermite, std::hermitef, std::hermitel

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
double hermite ( unsigned int n, double x );
float hermite ( unsigned int n, float x );
long double hermite ( unsigned int n, long double x );
(até C++23)
/* floating-point-type */ hermite( unsigned int n,
/* floating-point-type */ x );
float hermitef( unsigned int n, float x );
long double hermitel( unsigned int n, long double x );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
double hermite ( unsigned int n, Integer x );
```

1-3) Calcula os [polinômios de Hermite](<https://en.wikipedia.org/wiki/Hermite_polynomials> "enwiki:Hermite polynomials") (do físico) de grau n e argumento x. A biblioteca fornece sobrecargas de `std::hermite` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro x. (desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **n** — o grau do polinômio
- **x** — o argumento, um valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o valor do polinômio de Hermite de ordem n de x, ou seja, (-1)n
_e_ x2
dn

---
dxn

_e_ -x2
, é retornado.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

* Se o argumento for NaN, NaN é retornado e o erro de domínio não é relatado.
* Se n for maior ou igual a 128, o comportamento é definido pela implementação.

### Observações

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da biblioteca padrão.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/sf_poly/hermite.html>).

Os polinômios de Hermite são as soluções polinomiais da equação u,,
-2xu,
= -2nu.

Os primeiros são:

Função | Polinômio
---|---
hermite(0, x) | 1
hermite(1, x) | 2x
hermite(2, x) | 4x2
\- 2
hermite(3, x) | 8x3
\- 12x
hermite(4, x) | 16x4
\- 48x2
\+ 12

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::hermite(int_num, num) tenha o mesmo efeito que std::hermite(int_num, static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
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

[ laguerrelaguerreflaguerrel](<#/doc/numeric/special_functions/laguerre>)(C++17)(C++17)(C++17) | Polinômios de Laguerre
(função)
[ legendrelegendreflegendrel](<#/doc/numeric/special_functions/legendre>)(C++17)(C++17)(C++17) | Polinômios de Legendre
(função)

### Links externos

[Weisstein, Eric W. "Hermite Polynomial."](<https://mathworld.wolfram.com/HermitePolynomial.html>) De MathWorld — Um Recurso Web da Wolfram.
---