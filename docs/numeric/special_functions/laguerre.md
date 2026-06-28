# std::laguerre, std::laguerref, std::laguerrel

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float laguerre ( unsigned int n, float x );
double laguerre ( unsigned int n, double x );
long double laguerre ( unsigned int n, long double x );
(até C++23)
/* floating-point-type */ laguerre( unsigned int n,
/* floating-point-type */ x );
float laguerref( unsigned int n, float x );
long double laguerrel( unsigned int n, long double x );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
double laguerre ( unsigned int n, Integer x );
```

1-3) Calcula os [polinômios de Laguerre](<https://en.wikipedia.org/wiki/Laguerre_polynomials> "enwiki:Laguerre polynomials") não associados de grau n e argumento x. A biblioteca fornece sobrecargas de `std::laguerre` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro x. (desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **n** — o grau do polinômio, um valor inteiro sem sinal
- **x** — o argumento, um valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o valor do polinômio de Laguerre não associado de x, que é _e_ x
---
n!
dn

---
dxn

(xn
_e_ -x), é retornado.

### Tratamento de erros

Erros podem ser reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>)

*   Se o argumento for NaN, NaN é retornado e erro de domínio não é reportado
*   Se x for negativo, um erro de domínio pode ocorrer
*   Se n for maior ou igual a 128, o comportamento é definido pela implementação

### Observações

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da biblioteca padrão.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/sf_poly/laguerre.html>).

Os polinômios de Laguerre são as soluções polinomiais da equação.

Os primeiros são:

Função | Polinômio
---|---
laguerre(0, x) | 1
laguerre(1, x) | -x + 1
laguerre(2, x) | | 1
---
2
(x2
\- 4x + 2)
laguerre(3, x) | | 1
---
6
(-x3
\- 9x2
\- 18x + 6)

As sobrecargas adicionais não são obrigadas a serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::laguerre(int_num, num)` tenha o mesmo efeito que `std::laguerre(int_num, static_cast<double>(num))`.

### Exemplo

Execute este código
```cpp
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
                  << std::laguerre(2, 0.5) << '=' << L2(0.5) << '\n'
                  << std::laguerre(3, 0.0) << '=' << 1.0 << '\n';
    }
```

Saída:
```
    0.5=0.5
    0.125=0.125
    1=1
```

### Veja também

[ assoc_laguerreassoc_laguerrefassoc_laguerrel](<#/doc/numeric/special_functions/assoc_laguerre>)(C++17)(C++17)(C++17) | polinômios de Laguerre associados
(função)

### Links externos

[Weisstein, Eric W. "Laguerre Polynomial."](<https://mathworld.wolfram.com/LaguerrePolynomial.html>) From MathWorld — A Wolfram Web Resource.
---