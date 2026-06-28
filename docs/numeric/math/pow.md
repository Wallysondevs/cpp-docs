# std::pow, std::powf, std::powl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float pow ( float base, float exp );
double pow ( double base, double exp );
long double pow ( long double base, long double exp );
/* floating-point-type */
pow ( /* floating-point-type */ base,
/* floating-point-type */ exp )
(constexpr desde C++26)
float pow ( float base, int exp );
double pow ( double base, int exp );
long double pow ( long double base, int exp );
float powf( float base, float exp );
(constexpr desde C++26)
long double powl( long double base, long double exp );
(constexpr desde C++26)
Sobrecargas adicionais (desde C++11)
```

1-4) Calcula o valor de base elevado à potência exp. A biblioteca fornece sobrecargas de `std::pow` para todos os tipos de ponto flutuante não qualificados por cv como o tipo dos parâmetros base e exp. (desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos. | (desde C++11)

### Parâmetros

- **base** — base como um valor de ponto flutuante ou inteiro
- **exp** — expoente como um valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, base elevado à potência de exp (baseexp), é retornado.

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de polo ou um erro de range devido a overflow, [±HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `±HUGE_VALF`, ou `±HUGE_VALL` é retornado.

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se base for finito e negativo e exp for finito e não inteiro, ocorre um erro de domínio e pode ocorrer um erro de range.

Se base for zero e exp for zero, pode ocorrer um erro de domínio.

Se base for zero e exp for negativo, pode ocorrer um erro de domínio ou um erro de polo.

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559),

  * pow(+0, exp), onde exp é um inteiro ímpar negativo, retorna +∞ e levanta [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>).
  * pow(-0, exp), onde exp é um inteiro ímpar negativo, retorna -∞ e levanta [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>).
  * pow(±0, exp), onde exp é negativo, finito, e é um inteiro par ou não inteiro, retorna +∞ e levanta [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>).
  * pow(±0, -∞) retorna +∞ e pode levantar [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>).
  * pow(+0, exp), onde exp é um inteiro ímpar positivo, retorna +0.
  * pow(-0, exp), onde exp é um inteiro ímpar positivo, retorna -0.
  * pow(±0, exp), onde exp é não inteiro positivo ou um inteiro par positivo, retorna +0.
  * pow(-1, ±∞) retorna 1.
  * pow(+1, exp) retorna 1 para qualquer exp, mesmo quando exp é NaN.
  * pow(base, ±0) retorna 1 para qualquer base, mesmo quando base é NaN.
  * pow(base, exp) retorna NaN e levanta [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) se base for finito e negativo e exp for finito e não inteiro.
  * pow(base, -∞) retorna +∞ para qualquer `|base| < 1`.
---|---|---
  * pow(base, -∞) retorna +0 para qualquer `|base| > 1`.
  * pow(base, +∞) retorna +0 para qualquer `|base| < 1`.
  * pow(base, +∞) retorna +∞ para qualquer `|base| > 1`.
  * pow(-∞, exp) retorna -0 se exp é um inteiro ímpar negativo.
  * pow(-∞, exp) retorna +0 se exp é um não inteiro negativo ou inteiro par negativo.
  * pow(-∞, exp) retorna -∞ se exp é um inteiro ímpar positivo.
  * pow(-∞, exp) retorna +∞ se exp é um não inteiro positivo ou inteiro par positivo.
  * pow(+∞, exp) retorna +0 para qualquer exp negativo.
  * pow(+∞, exp) retorna +∞ para qualquer exp positivo.
  * exceto onde especificado acima, se qualquer argumento for NaN, NaN é retornado.

### Notas

C++98 adicionou sobrecargas onde exp tem o tipo int além de C [`pow()`](<#/>), e o tipo de retorno de std::pow(float, int) era float. No entanto, as sobrecargas adicionais introduzidas em C++11 especificam que std::pow(float, int) deve retornar double. O [LWG issue 550](<https://cplusplus.github.io/LWG/issue550>) foi levantado para abordar este conflito, e a resolução é remover as sobrecargas extras de int exp.

Embora `std::pow` não possa ser usado para obter uma raiz de um número negativo, [std::cbrt](<#/doc/numeric/math/cbrt>) é fornecido para o caso comum onde exp é 1/3.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que para seu primeiro argumento num1 e segundo argumento num2:

  * Se num1 ou num2 tiver o tipo long double, então std::pow(num1, num2) tem o mesmo efeito que std::pow(static_cast&lt;long double&gt;(num1),
static_cast&lt;long double&gt;(num2)).
  * Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::pow(num1, num2) tem o mesmo efeito que std::pow(static_cast&lt;double&gt;(num1),
static_cast&lt;double&gt;(num2)).
  * Caso contrário, se num1 ou num2 tiver o tipo float, então std::pow(num1, num2) tem o mesmo efeito que std::pow(static_cast&lt;float&gt;(num1),
static_cast&lt;float&gt;(num2)).

| (até C++23)
Se num1 e num2 tiverem tipos aritméticos, então std::pow(num1, num2) tem o mesmo efeito que std::pow(static_cast</*common-floating-point-type*/>(num1),
static_cast</*common-floating-point-type*/>(num2)), onde /*common-floating-point-type*/ é o tipo de ponto flutuante com o maior [floating-point conversion rank](<#/doc/language/usual_arithmetic_conversions>) e maior [floating-point conversion subrank](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo o mesmo floating-point conversion rank que double. Se tal tipo de ponto flutuante com o maior rank e subrank não existir, então a [overload resolution](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <cfenv>
    #include <cmath>
    #include <cstring>
    #include <iostream>
    // #pragma STDC FENV_ACCESS ON
    
    int main()
    {
        // typical usage
        std::cout << "pow(2, 10) = " << std::pow(2, 10) << '\n'
                  << "pow(2, 0.5) = " << std::pow(2, 0.5) << '\n'
                  << "pow(-2, -3) = " << std::pow(-2, -3) << '\n';
    
        // special values
        std::cout << "pow(-1, NAN) = " << std::pow(-1, NAN) << '\n'
                  << "pow(+1, NAN) = " << std::pow(+1, NAN) << '\n'
                  << "pow(INFINITY, 2) = " << std::pow(INFINITY, 2) << '\n'
                  << "pow(INFINITY, -1) = " << std::pow(INFINITY, -1) << '\n';
    
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "pow(-1, 1/3) = " << std::pow(-1, 1.0 / 3) << '\n';
        if (errno == EDOM)
            std::cout << "    errno == EDOM " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID raised\n";
    
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "pow(-0, -3) = " << std::pow(-0.0, -3) << '\n';
        if (std::fetestexcept(FE_DIVBYZERO))
            std::cout << "    FE_DIVBYZERO raised\n";
    }
```

Saída possível:
```
    pow(2, 10) = 1024
    pow(2, 0.5) = 1.41421
    pow(-2, -3) = -0.125
    pow(-1, NAN) = nan
    pow(+1, NAN) = 1
    pow(INFINITY, 2) = inf
    pow(INFINITY, -1) = 0
    pow(-1, 1/3) = -nan
        errno == EDOM Numerical argument out of domain
        FE_INVALID raised
    pow(-0, -3) = -inf
        FE_DIVBYZERO raised
```

### Veja também

[ sqrtsqrtfsqrtl](<#/doc/numeric/math/sqrt>)(C++11)(C++11) | calcula a raiz quadrada (\\(\small{\sqrt{x}}\\)√x)
(função)
[ cbrtcbrtfcbrtl](<#/doc/numeric/math/cbrt>)(C++11)(C++11)(C++11) | calcula a raiz cúbica (\\(\small{\sqrt[3]{x}}\\)3√x)
(função)
[ hypothypotfhypotl](<#/doc/numeric/math/hypot>)(C++11)(C++11)(C++11) | calcula a hipotenusa \\(\scriptsize{\sqrt{x^2+y^2}}\\)√x2
+y2
e \\(\scriptsize{\sqrt{x^2+y^2+z^2}}\\)√x2
+y2
+z2
(desde C++17)
(função)
[ pow(std::complex)](<#/doc/numeric/complex/pow>) | potência complexa, um ou ambos os argumentos podem ser um número complexo
(function template)
[ pow(std::valarray)](<#/doc/numeric/valarray/pow>) | aplica a função **std::pow** a dois valarrays ou a um valarray e um valor
(function template)
[Documentação C](<#/>) para pow