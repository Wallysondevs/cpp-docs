# std::cyl_bessel_i, std::cyl_bessel_if, std::cyl_bessel_il

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float cyl_bessel_i ( float nu, float x );
double cyl_bessel_i ( double nu, double x );
long double cyl_bessel_i ( long double nu, long double x );
(até C++23)
/* floating-point-type */ cyl_bessel_i( /* floating-point-type */ nu,
/* floating-point-type */ x );
float cyl_bessel_if( float nu, float x );
long double cyl_bessel_il( long double nu, long double x );
Sobrecargas adicionais
```

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
template< class Arithmetic1, class Arithmetic2 >
/* common-floating-point-type */
cyl_bessel_i( Arithmetic1 nu, Arithmetic2 x );
```

1-3) Calcula a [função de Bessel cilíndrica modificada regular](<https://en.wikipedia.org/wiki/Bessel_function#Modified_Bessel_functions:_I.CE.B1_.2C_K.CE.B1> "enwiki:Bessel function") de nu e x. A biblioteca fornece sobrecargas de `std::cyl_bessel_i` para todos os tipos de ponto flutuante cv-não qualificados como o tipo dos parâmetros nu e x. (desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

- **nu** — a ordem da função
- **x** — o argumento da função

### Valor de retorno

Se nenhum erro ocorrer, o valor da função de Bessel cilíndrica modificada regular de nu e x, ou seja Inu(x) = Σ∞
k=0(x/2)nu+2k

---
k!Γ(nu+k+1)
(para x≥0), é retornado.

### Tratamento de erros

Erros podem ser relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

*   Se o argumento for NaN, NaN é retornado e o erro de domínio não é relatado.
*   Se nu≥128, o comportamento é definido pela implementação.

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer headers da standard library.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no header `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/bessel/mbessel.html>).

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que para seu primeiro argumento num1 e segundo argumento num2:

*   Se num1 ou num2 tiver o tipo long double, então std::cyl_bessel_i(num1, num2) tem o mesmo efeito que std::cyl_bessel_i(static_cast&lt;long double&gt;(num1),
    static_cast<long double>(num2)).
*   Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::cyl_bessel_i(num1, num2) tem o mesmo efeito que std::cyl_bessel_i(static_cast&lt;double&gt;(num1),
    static_cast<double>(num2)).
*   Caso contrário, se num1 ou num2 tiver o tipo float, então std::cyl_bessel_i(num1, num2) tem o mesmo efeito que std::cyl_bessel_i(static_cast&lt;float&gt;(num1),
    static_cast<float>(num2)).

| (até C++23)
Se num1 e num2 tiverem tipos aritméticos, então std::cyl_bessel_i(num1, num2) tem o mesmo efeito que std::cyl_bessel_i(static_cast</* common-floating-point-type */>(num1),
static_cast</* common-floating-point-type */>(num2)), onde /* common-floating-point-type */ é o tipo de ponto flutuante com o maior [floating-point conversion rank](<#/doc/language/usual_arithmetic_conversions>) e maior [floating-point conversion subrank](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2; argumentos de tipo inteiro são considerados como tendo o mesmo floating-point conversion rank que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [overload resolution](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    
    int main()
    {
        // spot check for nu == 0
        const double x = 1.2345;
        std::cout << "I_0(" << x << ") = " << std::cyl_bessel_i(0, x) << '\n';
    
        // series expansion for I_0
        double fct = 1;
        double sum = 0;
        for (int k = 0; k < 5; fct *= ++k)
        {
            sum += std::pow(x / 2, 2 * k) / std::pow(fct, 2);
            std::cout << "sum = " << sum << '\n';
        }
    }
```

Saída:
```
    I_0(1.2345) = 1.41886
    sum = 1
    sum = 1.381
    sum = 1.41729
    sum = 1.41882
    sum = 1.41886
```

### Veja também

[ cyl_bessel_jcyl_bessel_jfcyl_bessel_jl](<#/doc/numeric/special_functions/cyl_bessel_j>)(C++17)(C++17)(C++17) | funções de Bessel cilíndricas (do primeiro tipo)
(função)

### Links externos

[Weisstein, Eric W. "Modified Bessel Function of the First Kind."](<https://mathworld.wolfram.com/ModifiedBesselFunctionoftheFirstKind.html>) De MathWorld — Um Recurso Web da Wolfram.
---
*   [Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão