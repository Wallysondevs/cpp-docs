# std::sqrt, std::sqrtf, std::sqrtl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float sqrt ( float num );
double sqrt ( double num );
long double sqrt ( long double num );
/*floating-point-type*/
sqrt ( /*floating-point-type*/ num );
(constexpr desde C++26)
float sqrtf( float num );
(constexpr desde C++26)
long double sqrtl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
sqrt ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double sqrt ( Integer num );
```

1-3) Calcula a raiz quadrada de num. A biblioteca fornece sobrecargas de `std::sqrt` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::sqrt` elemento a elemento em v_num.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, a raiz quadrada de num (\\({\small \sqrt{num} }\\)√num) é retornada.

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Ocorre um erro de domínio se num for menor que zero.

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

*   Se o argumento for menor que -0, [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado e NaN é retornado.
*   Se o argumento for +∞ ou ±0, ele é retornado, sem modificação.
*   Se o argumento for NaN, NaN é retornado.

### Observações

`std::sqrt` é exigido pelo padrão IEEE para ser corretamente arredondado a partir do resultado de precisão infinita. Em particular, o resultado exato é produzido se puder ser representado no tipo de ponto flutuante. As únicas outras operações que exigem isso são os [operadores aritméticos](<#/doc/language/operator_arithmetic>) e a função [std::fma](<#/doc/numeric/math/fma>). Outras funções, incluindo [std::pow](<#/doc/numeric/math/pow>), não são tão restritas.

As sobrecargas adicionais não são obrigadas a serem fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::sqrt(num) tenha o mesmo efeito que std::sqrt(static_cast&lt;double&gt;(num)).

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
        // normal use
        std::cout << "sqrt(100) = " << std::sqrt(100) << '\n'
                  << "sqrt(2) = " << std::sqrt(2) << '\n'
                  << "golden ratio = " << (1 + std::sqrt(5)) / 2 << '\n';
    
        // special values
        std::cout << "sqrt(-0) = " << std::sqrt(-0.0) << '\n';
    
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "sqrt(-1.0) = " << std::sqrt(-1) << '\n';
        if (errno == EDOM)
            std::cout << "    errno = EDOM " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID raised\n";
    }
```

Saída possível:
```
    sqrt(100) = 10
    sqrt(2) = 1.41421
    golden ratio = 1.61803
    sqrt(-0) = -0
    sqrt(-1.0) = -nan
        errno = EDOM Numerical argument out of domain
        FE_INVALID raised
```

### Veja também

[ powpowfpowl](<#/doc/numeric/math/pow>)(C++11)(C++11) | eleva um número à potência dada (\\(\small{x^y}\\)xy)
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
[ sqrt(std::complex)](<#/doc/numeric/complex/sqrt>) | raiz quadrada complexa no range do semiplano direito
(function template)
[ sqrt(std::valarray)](<#/doc/numeric/valarray/sqrt>) | aplica a função **std::sqrt** a cada elemento de valarray
(function template)
[Documentação C](<#/>) para sqrt