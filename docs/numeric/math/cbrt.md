# std::cbrt, std::cbrtf, std::cbrtl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float cbrt ( float num );
double cbrt ( double num );
long double cbrt ( long double num );
/*floating-point-type*/
cbrt ( /*floating-point-type*/ num );
(constexpr desde C++26)
float cbrtf( float num );
(constexpr desde C++26)
long double cbrtl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
cbrt ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double cbrt ( Integer num );
```

1-3) Calcula a raiz cúbica de num. A biblioteca fornece sobrecargas de `std::cbrt` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro.(desde C++23)

S) A sobrecarga SIMD executa um `std::cbrt` elemento a elemento em v_num.

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, a raiz cúbica de num (\\(\small{\sqrt[3]{num} }\\)3√num) é retornada.

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

  * se o argumento for ±0 ou ±∞, ele é retornado, inalterado.
  * se o argumento for NaN, NaN é retornado.

### Observações

std::cbrt(num) não é equivalente a [std::pow](<#/doc/numeric/math/pow>)(num, 1.0 / 3) porque o número racional \\(\small{\frac1{3} }\\)1
---
3
tipicamente não é igual a 1.0 / 3 e [std::pow](<#/doc/numeric/math/pow>) não pode elevar uma base negativa a um expoente fracionário. Além disso, std::cbrt(num) geralmente fornece resultados mais precisos do que [std::pow](<#/doc/numeric/math/pow>)(num, 1.0 / 3) (veja o exemplo).

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::cbrt(num) tenha o mesmo efeito que std::cbrt(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    #include <limits>
    
    int main()
    {
        std::cout
            << "Normal use:\n"
            << "cbrt(729)       = " << std::cbrt(729) << '\n'
            << "cbrt(-0.125)    = " << std::cbrt(-0.125) << '\n'
            << "Special values:\n"
            << "cbrt(-0)        = " << std::cbrt(-0.0) << '\n'
            << "cbrt(+inf)      = " << std::cbrt(INFINITY) << '\n'
            << "Accuracy and comparison with `pow`:\n"
            << std::setprecision(std::numeric_limits<double>::max_digits10)
            << "cbrt(343)       = " << std::cbrt(343) << '\n'
            << "pow(343,1.0/3)  = " << std::pow(343, 1.0 / 3) << '\n'
            << "cbrt(-343)      = " << std::cbrt(-343) << '\n'
            << "pow(-343,1.0/3) = " << std::pow(-343, 1.0 / 3) << '\n';
    }
```

Saída possível:
```
    Normal use:
    cbrt(729)       = 9
    cbrt(-0.125)    = -0.5
    Special values:
    cbrt(-0)        = -0
    cbrt(+inf)      = inf
    Accuracy and comparison with `pow`:
    cbrt(343)       = 7
    pow(343,1.0/3)  = 6.9999999999999991
    cbrt(-343)      = -7
    pow(-343,1.0/3) = -nan
```

### Veja também

[ powpowfpowl](<#/doc/numeric/math/pow>)(C++11)(C++11) | eleva um número à potência dada (\\(\small{x^y}\\)xy)
---
(função)
[ sqrtsqrtfsqrtl](<#/doc/numeric/math/sqrt>)(C++11)(C++11) | calcula a raiz quadrada (\\(\small{\sqrt{x}}\\)√x)
---
(função)
[ hypothypotfhypotl](<#/doc/numeric/math/hypot>)(C++11)(C++11)(C++11) | calcula a hipotenusa \\(\scriptsize{\sqrt{x^2+y^2}}\\)√x2
+y2
e \\(\scriptsize{\sqrt{x^2+y^2+z^2}}\\)√x2
+y2
+z2
(desde C++17)
---
(função)
[Documentação C](<#/>) para cbrt