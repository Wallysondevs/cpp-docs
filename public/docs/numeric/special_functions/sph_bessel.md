# std::sph_bessel, std::sph_besself, std::sph_bessell

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float sph_bessel ( unsigned int n, float x );
double sph_bessel ( unsigned int n, double x );
long double sph_bessel ( unsigned int n, long double x );
(até C++23)
/*floating-point-type*/ sph_bessel( unsigned int n,
/*floating-point-type*/ x );
float sph_besself( unsigned int n, float x );
long double sph_bessell( unsigned int n, long double x );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
double sph_bessel ( unsigned int n, Integer x );
```

1-3) Calcula a [função de Bessel esférica de primeira espécie](<https://en.wikipedia.org/wiki/Bessel_function#Spherical_Bessel_functions:_jn.2C_yn> "enwiki:Bessel function") de n e x. A biblioteca fornece sobrecargas de `std::sph_bessel` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro x.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **n** — a ordem da função
- **x** — o argumento da função

### Valor de retorno

Se nenhum erro ocorrer, retorna o valor da função de Bessel esférica de primeira espécie de n e x, ou seja, jn(x) = (π/2x)1/2
Jn+1/2(x) onde Jn(x) é [std::cyl_bessel_j](<#/doc/numeric/special_functions/cyl_bessel_j>)(n, x) e x≥0.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

*   Se o argumento for NaN, NaN é retornado e erro de domínio não é relatado.
*   Se n≥128, o comportamento é definido pela implementação.

### Observações

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da standard library.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está disponível em [boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/bessel/sph_bessel.html>).

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::sph_bessel(int_num, num) tenha o mesmo efeito que std::sph_bessel(int_num, static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    
    int main()
    {
        // spot check for n == 1
        double x = 1.2345;
        std::cout << "j_1(" << x << ") = " << std::sph_bessel(1, x) << '\n';
    
        // exact solution for j_1
        std::cout << "sin(x)/x² - cos(x)/x = "
                  << std::sin(x) / (x * x) - std::cos(x) / x << '\n';
    }
```

Saída:
```
    j_1(1.2345) = 0.352106
    sin(x)/x² - cos(x)/x = 0.352106
```

### Ver também

[ cyl_bessel_jcyl_bessel_jfcyl_bessel_jl](<#/doc/numeric/special_functions/cyl_bessel_j>)(C++17)(C++17)(C++17) | funções de Bessel cilíndricas (de primeira espécie)
(função)
[ sph_neumannsph_neumannfsph_neumannl](<#/doc/numeric/special_functions/sph_neumann>)(C++17)(C++17)(C++17) | funções de Neumann esféricas
(função)

### Links externos

[Weisstein, Eric W. "Spherical Bessel Function of the First Kind."](<https://mathworld.wolfram.com/SphericalBesselFunctionoftheFirstKind.html>) De MathWorld — Um Recurso Web da Wolfram.
---