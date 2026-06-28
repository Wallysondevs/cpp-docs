# std::sph_legendre, std::sph_legendref, std::sph_legendrel

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float sph_legendre ( unsigned l, unsigned m, float theta );
double sph_legendre ( unsigned l, unsigned m, double theta );
long double sph_legendre ( unsigned l, unsigned m, long double theta );
(até C++23)
/* floating-point-type */ sph_legendre( unsigned l, unsigned m,
/* floating-point-type */ theta );
float sph_legendref( unsigned l, unsigned m, float theta );
long double sph_legendrel( unsigned l, unsigned m, long double theta );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
double sph_legendre ( unsigned l, unsigned m, Integer theta );
```

  
1-3) Calcula a [função de Legendre associada esférica](<https://en.wikipedia.org/wiki/Spherical_harmonics#Orthogonality_and_normalization> "enwiki:Spherical harmonics") de grau l, ordem m, e ângulo polar theta. A biblioteca fornece sobrecargas de `std::sph_legendre` para todos os tipos de ponto flutuante cv-não qualificados como o tipo do parâmetro theta.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

l  |  \-  |  grau   
---|---|---
m  |  \-  |  ordem   
theta  |  \-  |  ângulo polar, medido em radianos   
  
### Valor de retorno

Se nenhum erro ocorrer, retorna o valor da função de Legendre associada esférica (isto é, harmônico esférico com ϕ = 0) de l, m, e theta, onde a função harmônica esférica é definida como Ym  
l(theta,ϕ) = (-1)m  
[(2l+1)(l-m)!  
---  
4π(l+m)!  
]1/2  
Pm  
l(cos(theta))eimϕ  
onde Pm  
l(x) é [std::assoc_legendre](<#/doc/numeric/special_functions/assoc_legendre>)(l, m, x)) e |m|≤l.

Note que o [termo de fase de Condon-Shortley ](<https://mathworld.wolfram.com/Condon-ShortleyPhase.html>) (-1)m  
está incluído nesta definição porque é omitido da definição de Pm  
l em [std::assoc_legendre](<#/doc/numeric/special_functions/assoc_legendre>).

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

  * Se o argumento for NaN, NaN é retornado e o erro de domínio não é relatado.
  * Se l≥128, o comportamento é definido pela implementação.

### Observações

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da biblioteca padrão.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação da função harmônica esférica está disponível em [boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/sf_poly/sph_harm.html>), e ela se reduz a esta função quando chamada com o parâmetro phi definido como zero.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::sph_legendre(int_num1, int_num2, num) tenha o mesmo efeito que std::sph_legendre(int_num1, int_num2, static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    #include <numbers>
    
    int main()
    {
        // spot check for l=3, m=0
        double x = 1.2345;
        std::cout << "Y_3^0(" << x << ") = " << std::sph_legendre(3, 0, x) << '\n';
    
        // exact solution
        std::cout << "exact solution = "
                  << 0.25 * std::sqrt(7 / std::numbers::pi)
                      * (5 * std::pow(std::cos(x), 3) - 3 * std::cos(x))
                  << '\n';
    }
```

Saída:
```
    Y_3^0(1.2345) = -0.302387
    exact solution = -0.302387
```

### Veja também

[ assoc_legendreassoc_legendrefassoc_legendrel](<#/doc/numeric/special_functions/assoc_legendre>)(C++17)(C++17)(C++17) |  polinômios de Legendre associados   
(função)  
  
### Links externos

[Weisstein, Eric W. "Spherical Harmonic."](<https://mathworld.wolfram.com/SphericalHarmonic.html>) Do MathWorld — Um Recurso Web da Wolfram.   
---