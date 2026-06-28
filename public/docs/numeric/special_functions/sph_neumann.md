# std::sph_neumann, std::sph_neumannf, std::sph_neumannl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float sph_neumann ( unsigned n, float x );
double sph_neumann ( unsigned n, double x );
long double sph_neumann ( unsigned n, long double x );
(até C++23)
/* floating-point-type */ sph_neumann( unsigned n,
/* floating-point-type */ x );
float sph_neumannf( unsigned n, float x );
long double sph_neumannl( unsigned n, long double x );
Sobrecargas adicionais
```

```cpp
template< class Integer >
double sph_neumann ( unsigned n, Integer x ); | (A)  // (desde C++17)
```

1-3) Calcula a [função de Bessel esférica de segunda espécie](<https://en.wikipedia.org/wiki/Bessel_function#Spherical_Bessel_functions:_jn.2C_yn> "enwiki:Bessel function"), também conhecida como função de Neumann esférica, de n e x. A biblioteca fornece sobrecargas de `std::sph_neumann` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro x.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **n** — a ordem da função
- **x** — o argumento da função

### Valor de retorno

Se nenhum erro ocorrer, retorna o valor da função de Bessel esférica de segunda espécie (função de Neumann esférica) de n e x, ou seja nn(x) = (π/2x)1/2
Nn+1/2(x) onde Nn(x) é [std::cyl_neumann](<#/doc/numeric/special_functions/cyl_neumann>)(n, x) e x≥0.

### Tratamento de erros

Erros podem ser reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>)

*   Se o argumento for NaN, NaN é retornado e o erro de domínio não é reportado
*   Se n≥128, o comportamento é definido pela implementação

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da standard library.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está disponível em [boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/bessel/sph_bessel.html>).

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::sph_neumann(int_num, num)` tenha o mesmo efeito que `std::sph_neumann(int_num, static_cast<double>(num))`.

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    
    int main()
    {
        // verificação pontual para n == 1
        double x = 1.2345;
        std::cout << "n_1(" << x << ") = " << std::sph_neumann(1, x) << '\n';
    
        // solução exata para n_1
        std::cout << "-cos(x)/x² - sin(x)/x = "
                  << -std::cos(x) / (x * x) - std::sin(x) / x << '\n';
    }
```

Saída:
```
    n_1(1.2345) = -0.981201
    -cos(x)/x² - sin(x)/x = -0.981201
```

### Veja também

[ cyl_neumanncyl_neumannfcyl_neumannl](<#/doc/numeric/special_functions/cyl_neumann>)(C++17)(C++17)(C++17) | funções de Neumann cilíndricas
(função)
[ sph_besselsph_besselfsph_bessell](<#/doc/numeric/special_functions/sph_bessel>)(C++17)(C++17)(C++17) | funções de Bessel esféricas (de primeira espécie)
(função)

### Links externos

[Weisstein, Eric W. "Spherical Bessel Function of the Second Kind."](<https://mathworld.wolfram.com/SphericalBesselFunctionoftheSecondKind.html>) From MathWorld — A Wolfram Web Resource.
---