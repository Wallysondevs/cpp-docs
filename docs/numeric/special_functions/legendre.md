# std::legendre, std::legendref, std::legendrel

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float legendre ( unsigned int n, float x );
double legendre ( unsigned int n, double x );
long double legendre ( unsigned int n, long double x );
(até C++23)
/* floating-point-type */ legendre( unsigned int n,
/* floating-point-type */ x );
float legendref( unsigned int n, float x );
long double legendrel( unsigned int n, long double x );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
double legendre ( unsigned int n, Integer x );
```

1-3) Calcula os [polinômios de Legendre](<https://en.wikipedia.org/wiki/Legendre_polynomials> "enwiki:Legendre polynomials") não associados de grau n e argumento x. A biblioteca fornece sobrecargas de `std::legendre` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro x.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **n** — o grau do polinômio
- **x** — o argumento, um valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o valor do polinômio de Legendre não associado de ordem n de x, ou seja, \\(\mathsf{P}_n(x) = \frac{1}{2^n n!} \frac{\mathsf{d}^n}{\mathsf{d}x^n} (x^2-1)^n \\), é retornado.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

*   Se o argumento for NaN, NaN é retornado e o erro de domínio não é relatado
*   A função não é obrigada a ser definida para |x|>1
*   Se n for maior ou igual a 128, o comportamento é definido pela implementação

### Observações

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da biblioteca padrão.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/sf_poly/legendre.html>).

Os primeiros polinômios de Legendre são:

Função | Polinômio
---|---
legendre(0, x) | 1
legendre(1, x) | x
legendre(2, x) | | 1
---
2
(3x2
\- 1)
legendre(3, x) | | 1
---
2
(5x3
\- 3x)
legendre(4, x) | | 1
---
8
(35x4
\- 30x2
\+ 3)

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::legendre(int_num, num) tenha o mesmo efeito que std::legendre(int_num, static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
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

[ laguerrelaguerreflaguerrel](<#/doc/numeric/special_functions/laguerre>)(C++17)(C++17)(C++17) | Polinômios de Laguerre
(função)
[ hermitehermitefhermitel](<#/doc/numeric/special_functions/hermite>)(C++17)(C++17)(C++17) | Polinômios de Hermite
(função)

### Links externos

[Weisstein, Eric W. "Legendre Polynomial."](<https://mathworld.wolfram.com/LegendrePolynomial.html>) De MathWorld — Um Recurso Web da Wolfram.
---
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com uma entrada para o recurso fornecido.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão