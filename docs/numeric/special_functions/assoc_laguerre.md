# std::assoc_laguerre, std::assoc_laguerref, std::assoc_laguerrel

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float assoc_laguerre ( unsigned int n, unsigned int m, float x );
double assoc_laguerre ( unsigned int n, unsigned int m, double x );
long double assoc_laguerre ( unsigned int n, unsigned int m, long double x );
(até C++23)
/* floating-point-type */ assoc_laguerre( unsigned int n, unsigned int m,
/* floating-point-type */ x );
float assoc_laguerref( unsigned int n, unsigned int m, float x );
long double assoc_laguerrel( unsigned int n, unsigned int m, long double x );
Sobrecargas adicionais
```

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```cpp
template< class Integer >
double assoc_laguerre ( unsigned int n, unsigned int m, Integer x );  // (desde C++17)
```

1-3) Calcula os [polinômios de Laguerre associados](<https://en.wikipedia.org/wiki/Laguerre_polynomials#Generalized_Laguerre_polynomials> "enwiki:Laguerre polynomials") de grau n, ordem m e argumento x. A biblioteca fornece sobrecargas de `std::assoc_laguerre` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro x. (desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **n** — o grau do polinômio, um valor inteiro sem sinal
- **m** — a ordem do polinômio, um valor inteiro sem sinal
- **x** — o argumento, um valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o valor do polinômio de Laguerre associado de x, isto é \\((-1)^m \: \frac{ \mathsf{d} ^ m}{ \mathsf{d}x ^ m} \, \mathsf{L}_{n+m}(x)\\)(-1)m
dm

---
dxm

Ln+m(x), é retornado (onde \\(\mathsf{L}_{n+m}(x)\\)Ln+m(x) é o polinômio de Laguerre não associado, [std::laguerre](<#/doc/numeric/special_functions/laguerre>)(n + m, x)).

### Tratamento de erros

Erros podem ser reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>)

*   Se o argumento for NaN, NaN é retornado e o erro de domínio não é reportado
*   Se x for negativo, um erro de domínio pode ocorrer
*   Se n ou m for maior ou igual a 128, o comportamento é definido pela implementação

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da biblioteca padrão.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/sf_poly/laguerre.html>).

Os polinômios de Laguerre associados são as soluções polinomiais da equação \\(x\ddot{y} + (m+1-x)\dot{y} + ny = 0\\)xy,,
+(m+1-x)y,
+ny = 0.

Os primeiros são:

Função | Polinômio
---|---
assoc_laguerre(0, m, x) | 1
assoc_laguerre(1, m, x) | -x + m + 1
assoc_laguerre(2, m, x) | | 1
---
2
[x2
\- 2(m + 2)x + (m + 1)(m + 2)]
assoc_laguerre(3, m, x) | | 1
---
6
[-x3
\- 3(m + 3)x2
\- 3(m + 2)(m + 3)x + (m + 1)(m + 2)(m + 3)]

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::assoc_laguerre(int_num1, int_num2, num) tenha o mesmo efeito que std::assoc_laguerre(int_num1, int_num2, static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
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
        // spot-checks
        std::cout << std::assoc_laguerre(1, 10, 0.5) << '=' << L1(10, 0.5) << '\n'
                  << std::assoc_laguerre(2, 10, 0.5) << '=' << L2(10, 0.5) << '\n';
    }
```

Saída:
```
    10.5=10.5
    60.125=60.125
```

### Ver também

[ laguerrelaguerreflaguerrel](<#/doc/numeric/special_functions/laguerre>)(C++17)(C++17)(C++17) | Polinômios de Laguerre
(função)

### Links externos

[Weisstein, Eric W. "Associated Laguerre Polynomial."](<https://mathworld.wolfram.com/AssociatedLaguerrePolynomial.html>) De MathWorld — Um Recurso Web da Wolfram.
---