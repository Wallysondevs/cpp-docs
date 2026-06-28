# std::cyl_neumann, std::cyl_neumannf, std::cyl_neumannl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float cyl_neumann ( float nu, float x );
double cyl_neumann ( double nu, double x );
long double cyl_neumann ( long double nu, long double x );
(até C++23)
/* floating-point-type */ cyl_neumann( /* floating-point-type */ nu,
/* floating-point-type */ x );
float cyl_neumannf( float nu, float x );
long double cyl_neumannl( long double nu, long double x );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Arithmetic1, class Arithmetic2 >
/* common-floating-point-type */
cyl_neumann( Arithmetic1 nu, Arithmetic2 x );
```

1-3) Calcula a [função de Neumann cilíndrica](<https://en.wikipedia.org/wiki/Bessel_function#Bessel_functions_of_the_second_kind:_Y.CE.B1> "enwiki:Bessel function") (também conhecida como função de Bessel de segunda espécie ou função de Weber) de nu e x. A biblioteca fornece sobrecargas de `std::cyl_neumann` para todos os tipos de ponto flutuante cv-não qualificados como o tipo dos parâmetros nu e x.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

- **nu** — a ordem da função
- **x** — o argumento da função

### Valor de retorno

Se nenhum erro ocorrer, o valor da função de Neumann cilíndrica (função de Bessel de segunda espécie) de `nu` e `x` é retornado, ou seja, Nnu(x) = Jnu(x)cos(nuπ)-J-nu(x)
---
sin(nuπ)
(onde Jnu(x) é [std::cyl_bessel_j](<#/doc/numeric/special_functions/cyl_bessel_j>)(nu, x)) para x≥0 e nu não inteiro; para nu inteiro, um limite é usado.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>):

  * Se o argumento for NaN, NaN é retornado e o erro de domínio não é relatado.
  * Se nu≥128, o comportamento é definido pela implementação.

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da biblioteca padrão.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está disponível em [boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/bessel/bessel_first.html>).

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu primeiro argumento num1 e segundo argumento num2:

  * Se num1 ou num2 tiver o tipo long double, então std::cyl_neumann(num1, num2) tem o mesmo efeito que std::cyl_neumann(static_cast&lt;long double&gt;(num1),
static_cast&lt;long double&gt;(num2)).
  * Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::cyl_neumann(num1, num2) tem o mesmo efeito que std::cyl_neumann(static_cast&lt;double&gt;(num1),
static_cast&lt;double&gt;(num2)).
  * Caso contrário, se num1 ou num2 tiver o tipo float, então std::cyl_neumann(num1, num2) tem o mesmo efeito que std::cyl_neumann(static_cast&lt;float&gt;(num1),
static_cast&lt;float&gt;(num2)).

| (até C++23)
Se num1 e num2 tiverem tipos aritméticos, então std::cyl_neumann(num1, num2) tem o mesmo efeito que std::cyl_neumann(static_cast</* common-floating-point-type */>(num1),
static_cast</* common-floating-point-type */>(num2)), onde /* common-floating-point-type */ é o tipo de ponto flutuante com a maior [classificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subclassificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo a mesma classificação de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com a maior classificação e subclassificação existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável a partir das sobrecargas fornecidas. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cmath>
    #include <iostream>
    #include <numbers>
    
    const double π = std::numbers::pi; // or std::acos(-1) in pre C++20
    
    // Para calcular a função de Neumann cilíndrica via função de Bessel cilíndrica de
    // primeira espécie, temos que implementar J, porque a invocação direta de
    // std::cyl_bessel_j(nu, x), conforme a fórmula acima,
    // para nu negativo levanta 'std::domain_error': Argumento inválido em __cyl_bessel_j.
    
    double J_neg(double nu, double x)
    {
        return std::cos(-nu * π) * std::cyl_bessel_j(-nu, x)
              -std::sin(-nu * π) * std::cyl_neumann(-nu, x);
    }
    
    double J_pos(double nu, double x)
    {
        return std::cyl_bessel_j(nu, x);
    }
    
    double J(double nu, double x)
    {
        return nu < 0.0 ? J_neg(nu, x) : J_pos(nu, x);
    }
    
    int main()
    {
        std::cout << "spot checks for nu == 0.5\n" << std::fixed << std::showpos;
        const double nu = 0.5;
        for (double x = 0.0; x <= 2.0; x += 0.333)
        {
            const double n = std::cyl_neumann(nu, x);
            const double j = (J(nu, x) * std::cos(nu * π) - J(-nu, x)) / std::sin(nu * π);
            std::cout << "N_.5(" << x << ") = " << n << ", calculated via J = " << j << '\n';
            assert(n == j);
        }
    }
```

Saída:
```
    spot checks for nu == 0.5
    N_.5(+0.000000) = -inf, calculated via J = -inf
    N_.5(+0.333000) = -1.306713, calculated via J = -1.306713
    N_.5(+0.666000) = -0.768760, calculated via J = -0.768760
    N_.5(+0.999000) = -0.431986, calculated via J = -0.431986
    N_.5(+1.332000) = -0.163524, calculated via J = -0.163524
    N_.5(+1.665000) = +0.058165, calculated via J = +0.058165
    N_.5(+1.998000) = +0.233876, calculated via J = +0.233876
```

### Veja também

[ cyl_bessel_icyl_bessel_ifcyl_bessel_il](<#/doc/numeric/special_functions/cyl_bessel_i>)(C++17)(C++17)(C++17) | funções de Bessel cilíndricas modificadas regulares
(função)
[ cyl_bessel_jcyl_bessel_jfcyl_bessel_jl](<#/doc/numeric/special_functions/cyl_bessel_j>)(C++17)(C++17)(C++17) | funções de Bessel cilíndricas (de primeira espécie)
(função)
[ cyl_bessel_kcyl_bessel_kfcyl_bessel_kl](<#/doc/numeric/special_functions/cyl_bessel_k>)(C++17)(C++17)(C++17) | funções de Bessel cilíndricas modificadas irregulares
(função)

### Links externos

[Weisstein, Eric W. "Bessel Function of the Second Kind."](<https://mathworld.wolfram.com/BesselFunctionoftheSecondKind.html>) De MathWorld — Um Recurso Web da Wolfram.
---