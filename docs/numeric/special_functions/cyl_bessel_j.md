# std::cyl_bessel_j, std::cyl_bessel_jf, std::cyl_bessel_jl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float cyl_bessel_j ( float nu, float x );
double cyl_bessel_j ( double nu, double x );
long double cyl_bessel_j ( long double nu, long double x );
(até C++23)
/* floating-point-type */ cy_bessel_j( /* floating-point-type */ nu,
/* floating-point-type */ x );
float cyl_bessel_jf( float nu, float x );
long double cyl_bessel_jl( long double nu, long double x );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Arithmetic1, class Arithmetic2 >
/* common-floating-point-type */
cyl_bessel_j( Arithmetic1 nu, Arithmetic2 x );
```

  
1) Calcula a [função de Bessel cilíndrica de primeira espécie](<https://en.wikipedia.org/wiki/Bessel_function#Bessel_functions_of_the_first_kind:_J.CE.B1> "enwiki:Bessel function") de nu e x. A biblioteca fornece sobrecargas de `std::cyl_bessel_j` para todos os tipos de ponto flutuante cv-unqualified como o tipo dos parâmetros nu e x.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

nu  |  \-  |  a ordem da função   
---|---|---
x  |  \-  |  o argumento da função   
  
### Valor de retorno

Se nenhum erro ocorrer, o valor da função de Bessel cilíndrica de primeira espécie de nu e x, ou seja Jnu(x) = Σ∞  
k=0(-1)k  
(x/2)nu+2k  
  
---  
k!Γ(nu+k+1)  
(para x≥0), é retornado. 

### Tratamento de erros

Erros podem ser reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>): 

  * Se o argumento for NaN, NaN é retornado e erro de domínio não é reportado. 
  * Se nu≥128, o comportamento é definido pela implementação. 

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da standard library. 

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`. 

Uma implementação desta função também está disponível em [boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/bessel/bessel_first.html>). 

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que para seu primeiro argumento num1 e segundo argumento num2: 

  * Se num1 ou num2 tiver o tipo long double, então std::cyl_bessel_j(num1, num2) tem o mesmo efeito que std::cyl_bessel_j(static_cast&lt;long double&gt;(num1),  
static_cast&lt;long double&gt;(num2)). 
  * Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::cyl_bessel_j(num1, num2) tem o mesmo efeito que std::cyl_bessel_j(static_cast&lt;double&gt;(num1),  
static_cast&lt;double&gt;(num2)). 
  * Caso contrário, se num1 ou num2 tiver o tipo float, então std::cyl_bessel_j(num1, num2) tem o mesmo efeito que std::cyl_bessel_j(static_cast&lt;float&gt;(num1),  
static_cast&lt;float&gt;(num2)). 

| (até C++23)  
Se num1 e num2 tiverem tipos aritméticos, então std::cyl_bessel_j(num1, num2) tem o mesmo efeito que std::cyl_bessel_j(static_cast</* common-floating-point-type */>(num1),  
static_cast</* common-floating-point-type */>(num2)), onde /* common-floating-point-type */ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas.  | (desde C++23)  
  
### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    
    int main()
    {
        // spot check for nu == 0
        const double x = 1.2345;
        std::cout << "J_0(" << x << ") = " << std::cyl_bessel_j(0, x) << '\n';
    
        // series expansion for J_0
        double fct = 1;
        double sum = 0;
        for (int k = 0; k < 6; fct *= ++k)
        {
            sum += std::pow(-1, k) * std::pow(x / 2, 2 * k) / std::pow(fct, 2);
            std::cout << "sum = " << sum << '\n';
        }
    }
```

Saída: 
```
    J_0(1.2345) = 0.653792
    sum = 1
    sum = 0.619002
    sum = 0.655292
    sum = 0.653756
    sum = 0.653793
    sum = 0.653792
```

### Veja também

[ cyl_bessel_icyl_bessel_ifcyl_bessel_il](<#/doc/numeric/special_functions/cyl_bessel_i>)(C++17)(C++17)(C++17) |  funções de Bessel cilíndricas modificadas regulares   
(função)  
  
### Links externos

[Weisstein, Eric W. "Bessel Function of the First Kind."](<https://mathworld.wolfram.com/BesselFunctionoftheFirstKind.html>) De MathWorld — Um Recurso Web da Wolfram.   
---