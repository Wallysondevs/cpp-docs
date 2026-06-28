# std::cyl_bessel_k, std::cyl_bessel_kf, std::cyl_bessel_kl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float cyl_bessel_k ( float nu, float x );
double cyl_bessel_k ( double nu, double x );
long double cyl_bessel_k ( long double nu, long double x );
(até C++23)
/* floating-point-type */ cyl_bessel_k( /* floating-point-type */ nu,
/* floating-point-type */ x );
float cyl_bessel_kf( float nu, float x );
long double cyl_bessel_kl( long double nu, long double x );
Sobrecargas adicionais
```

```cpp
template< class Arithmetic1, class Arithmetic2 >
/* common-floating-point-type */
cyl_bessel_k( Arithmetic1 nu, Arithmetic2 x ); | (A)  // (desde C++17)
```

1-3) Calcula a [função de Bessel cilíndrica modificada irregular](<https://en.wikipedia.org/wiki/Bessel_function#Modified_Bessel_functions:_I.CE.B1_.2C_K.CE.B1> "enwiki:Bessel function") (também conhecida como função de Bessel modificada de segunda espécie) de nu e x. A biblioteca fornece sobrecargas de `std::cyl_bessel_k` para todos os tipos de ponto flutuante não qualificados por cv como o tipo dos parâmetros nu e x.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

- **nu** — a ordem da função
- **x** — o argumento da função

### Valor de retorno

Se nenhum erro ocorrer, o valor da função de Bessel cilíndrica modificada irregular (função de Bessel modificada de segunda espécie) de nu e x é retornado, isto é Knu(x) = π
---
2
I-nu(x)-Inu(x)
---
sin(nuπ)
(onde Inu(x) é [std::cyl_bessel_i](<#/doc/numeric/special_functions/cyl_bessel_i>)(nu, x)) para x≥0 e nu não inteiro; para nu inteiro, um limite é usado.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>):

  * Se o argumento for NaN, NaN é retornado e erro de domínio não é relatado.
  * Se nu≥128, o comportamento é definido pela implementação.

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da standard library.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/bessel/mbessel.html>).

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que para seu primeiro argumento num1 e segundo argumento num2:

  * Se num1 ou num2 tiver o tipo long double, então std::cyl_bessel_k(num1, num2) tem o mesmo efeito que std::cyl_bessel_k(static_cast&lt;long double&gt;(num1),
static_cast&lt;long double&gt;(num2)).
  * Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::cyl_bessel_k(num1, num2) tem o mesmo efeito que std::cyl_bessel_k(static_cast&lt;double&gt;(num1),
static_cast&lt;double&gt;(num2)).
  * Caso contrário, se num1 ou num2 tiver o tipo float, então std::cyl_bessel_k(num1, num2) tem o mesmo efeito que std::cyl_bessel_k(static_cast&lt;float&gt;(num1),
static_cast&lt;float&gt;(num2)).

| (até C++23)
Se num1 e num2 tiverem tipos aritméticos, então std::cyl_bessel_k(num1, num2) tem o mesmo efeito que std::cyl_bessel_k(static_cast</* common-floating-point-type */>(num1),
static_cast</* common-floating-point-type */>(num2)), onde /* common-floating-point-type */ é o tipo de ponto flutuante com a maior [classificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subclassificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo a mesma classificação de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com a maior classificação e subclassificação existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    #include <numbers>
    
    int main()
    {
        double pi = std::numbers::pi;
        const double x = 1.2345;
    
        // spot check for nu == 0.5
        std::cout << "K_.5(" << x << ") = " << std::cyl_bessel_k(.5, x) << '\n'
                  << "calculated via I = "
                  << (pi / 2) * (std::cyl_bessel_i(-.5, x)
                     - std::cyl_bessel_i(.5, x)) / std::sin(.5 * pi) << '\n';
    }
```

Saída:
```
    K_.5(1.2345) = 0.32823
    calculated via I = 0.32823
```

### Veja também

[ cyl_bessel_icyl_bessel_ifcyl_bessel_il](<#/doc/numeric/special_functions/cyl_bessel_i>)(C++17)(C++17)(C++17) | funções de Bessel cilíndricas modificadas regulares
(função)
[ cyl_bessel_jcyl_bessel_jfcyl_bessel_jl](<#/doc/numeric/special_functions/cyl_bessel_j>)(C++17)(C++17)(C++17) | funções de Bessel cilíndricas (de primeira espécie)
(função)

### Links externos

[Weisstein, Eric W. "Função de Bessel Modificada de Segunda Espécie."](<https://mathworld.wolfram.com/ModifiedBesselFunctionoftheSecondKind.html>) De MathWorld — Um Recurso Web da Wolfram.
---