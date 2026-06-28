# std::riemann_zeta, std::riemann_zetaf, std::riemann_zetal

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float riemann_zeta ( float num );
double riemann_zeta ( double num );
long double riemann_zeta ( long double num );
(até C++23)
/* floating-point-type */ riemann_zeta( /* floating-point-type */ num );
float riemann_zetaf( float num );
long double riemann_zetal( long double num );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
double riemann_zeta ( Integer num );
```

1-3) Calcula a [função zeta de Riemann](<https://en.wikipedia.org/wiki/Riemann_zeta_function> "enwiki:Riemann zeta function") de num. A biblioteca fornece sobrecargas de `std::riemann_zeta` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro num.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **num** — ponto flutuante ou valor

### Valor de retorno

Se nenhum erro ocorrer, o valor da função zeta de Riemann de num, ζ(num), definido para todo o eixo real:

  * Para num>1, Σ∞
n=1n-num

  * Para 0≤num≤1, 1
---
21-num
-1
Σ∞
n=1 (-1)n
n-num

  * Para num<0, 2num
πnum-1
sin(πnum
---
2
)Γ(1−num)ζ(1−num)

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

  * Se o argumento for NaN, NaN é retornado e o erro de domínio não é relatado.

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da biblioteca padrão.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/zetas/zeta.html>).

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, `std::riemann_zeta(num)` tenha o mesmo efeito que `std::riemann_zeta(static_cast<double>(num))`.

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <format>
    #include <iostream>
    #include <numbers>
    
    int main()
    {
        constexpr auto π = std::numbers::pi;
    
        // spot checks for well-known values
        for (const double x : {-1.0, 0.0, 1.0, 0.5, 2.0})
            std::cout << std::format("ζ({})\t= {:+.5f}\n", x, std::riemann_zeta(x));
        std::cout << std::format("π²/6\t= {:+.5f}\n", π * π / 6);
    }
```

Saída:
```
    ζ(-1)   = -0.08333
    ζ(0)    = -0.50000
    ζ(1)    = +inf
    ζ(0.5)  = -1.46035
    ζ(2)    = +1.64493
    π²/6    = +1.64493
```

### Links externos

[Weisstein, Eric W. "Função Zeta de Riemann."](<https://mathworld.wolfram.com/RiemannZetaFunction.html>) De MathWorld — Um Recurso Web da Wolfram.
---