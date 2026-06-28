# std::assoc_legendre, std::assoc_legendref, std::assoc_legendrel

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float assoc_legendre ( unsigned int n, unsigned int m, float x );
double assoc_legendre ( unsigned int n, unsigned int m, double x );
long double assoc_legendre ( unsigned int n, unsigned int m, long double x );
(até C++23)
/* floating-point-type */ assoc_legendre( unsigned int n, unsigned int m,
/* floating-point-type */ x );
float assoc_legendref( unsigned int n, unsigned int m, float x );
long double assoc_legendrel( unsigned int n, unsigned int m, long double x );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
double assoc_legendre ( unsigned int n, unsigned int m, Integer x );
```

1-3) Calcula os [Polinômios de Legendre Associados](<https://en.wikipedia.org/wiki/Associated_Legendre_polynomials> "enwiki:Associated Legendre polynomials") de grau n, ordem m e argumento x. A biblioteca fornece sobrecargas de `std::assoc_legendre` para todos os tipos de ponto flutuante cv-não qualificados como o tipo do parâmetro x.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **n** — o grau do polinômio, um valor inteiro sem sinal
- **m** — a ordem do polinômio, um valor inteiro sem sinal
- **x** — o argumento, um valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o valor do polinômio de Legendre associado \\(\mathsf{P}_n^m\\)Pm
n de x, ou seja, \\((1 - x^2) ^ {m/2} \: \frac{ \mathsf{d} ^ m}{ \mathsf{d}x ^ m} \, \mathsf{P}_n(x)\\)(1-x2
)m/2
dm

---
dxm

Pn(x), é retornado (onde \\(\mathsf{P}_n(x)\\)Pn(x) é o polinômio de Legendre não associado, [std::legendre](<#/doc/numeric/special_functions/legendre>)(n, x)).

Note que o [termo de fase de Condon-Shortley](<https://mathworld.wolfram.com/Condon-ShortleyPhase.html>) \\((-1)^m\\)(-1)m
é omitido desta definição.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>)

  * Se o argumento for NaN, NaN é retornado e o erro de domínio não é relatado
  * Se |x| > 1, um erro de domínio pode ocorrer
  * Se `n` for maior ou igual a 128, o comportamento é definido pela implementação

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da standard library.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/sf_poly/legendre.html>) como `boost::math::legendre_p`, exceto que a definição de boost.math inclui o termo de fase de Condon-Shortley.

Os primeiros polinômios de Legendre associados são:

Função | Polinômio
---|---
assoc_legendre(0, 0, x) | 1
assoc_legendre(1, 0, x) | x
assoc_legendre(1, 1, x) | (1 - x2
)1/2

assoc_legendre(2, 0, x) | | 1
---
2
(3x2
\- 1)
assoc_legendre(2, 1, x) | 3x(1 - x2
)1/2

assoc_legendre(2, 2, x) | 3(1 - x2
)

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::assoc_legendre(int_num1, int_num2, num) tenha o mesmo efeito que std::assoc_legendre(int_num1, int_num2, static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    
    double P20(double x)
    {
        return 0.5 * (3 * x * x - 1);
    }
    
    double P21(double x)
    {
        return 3.0 * x * std::sqrt(1 - x * x);
    }
    
    double P22(double x)
    {
        return 3 * (1 - x * x);
    }
    
    int main()
    {
        // spot-checks
        std::cout << std::assoc_legendre(2, 0, 0.5) << '=' << P20(0.5) << '\n'
                  << std::assoc_legendre(2, 1, 0.5) << '=' << P21(0.5) << '\n'
                  << std::assoc_legendre(2, 2, 0.5) << '=' << P22(0.5) << '\n';
    }
```

Saída:
```
    -0.125=-0.125
    1.29904=1.29904
    2.25=2.25
```

### Veja também

[ legendrelegendreflegendrel](<#/doc/numeric/special_functions/legendre>)(C++17)(C++17)(C++17) | Polinômios de Legendre
(função)

### Links externos

[Weisstein, Eric W. "Associated Legendre Polynomial."](<https://mathworld.wolfram.com/AssociatedLegendrePolynomial.html>) De MathWorld — A Wolfram Web Resource.
---