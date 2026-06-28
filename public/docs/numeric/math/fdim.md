# std::fdim, std::fdimf, std::fdiml

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float fdim ( float x, float y );
double fdim ( double x, double y );
long double fdim ( long double x, long double y );
constexpr /*floating-point-type*/
fdim ( /*floating-point-type*/ x,
/*floating-point-type*/ y );
float fdimf( float x, float y );
(constexpr desde C++23)
long double fdiml( long double x, long double y );
(constexpr desde C++23)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< class V0, class V1 >
constexpr /*math-common-simd-t*/<V0, V1>
fdim ( const V0& v_x, const V1& v_y );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double fdim ( Integer x, Integer y );
```

1-3) Retorna a diferença positiva entre x e y, ou seja, se x > y, retorna x - y, caso contrário (isto é, se x <= y) retorna +0. A biblioteca fornece sobrecargas de `std::fdim` para todos os tipos de ponto flutuante cv-não qualificados como o tipo dos parâmetros. (desde C++23)

S) A sobrecarga SIMD executa um `std::fdim` elemento a elemento em v_x e v_y.

    (Veja [`_math-common-simd-t_`](<#/doc/numeric/simd>) para sua definição.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **x, y** — valores de ponto flutuante ou inteiros

### Valor de retorno

Se bem-sucedido, retorna a diferença positiva entre x e y.

Se ocorrer um erro de range devido a overflow, [+HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `+HUGE_VALF`, ou `+HUGE_VALL` é retornado.

Se ocorrer um erro de range devido a underflow, o valor correto (após arredondamento) é retornado.

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

  * Se qualquer um dos argumentos for NaN, NaN é retornado.

### Notas

Equivalente a [std::fmax](<#/doc/numeric/math/fmax>)(x - y, 0), exceto pelos requisitos de tratamento de NaN.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que para seu primeiro argumento num1 e segundo argumento num2:

  * Se num1 ou num2 tiver o tipo long double, então std::fdim(num1, num2) tem o mesmo efeito que std::fdim(static_cast&lt;long double&gt;(num1),
static_cast&lt;long double&gt;(num2)).
  * Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::fdim(num1, num2) tem o mesmo efeito que std::fdim(static_cast&lt;double&gt;(num1),
static_cast&lt;double&gt;(num2)).
  * Caso contrário, se num1 ou num2 tiver o tipo float, então std::fdim(num1, num2) tem o mesmo efeito que std::fdim(static_cast&lt;float&gt;(num1),
static_cast&lt;float&gt;(num2)).

| (até C++23)
Se num1 e num2 tiverem tipos aritméticos, então std::fdim(num1, num2) tem o mesmo efeito que std::fdim(static_cast</*common-floating-point-type*/>(num1),
static_cast</*common-floating-point-type*/>(num2)), onde /*common-floating-point-type*/ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <cfenv>
    #include <cmath>
    #include <cstring>
    #include <iostream>
    
    #ifndef __GNUC__
    #pragma STDC FENV_ACCESS ON
    #endif
    
    int main()
    {
        std::cout << "fdim(4, 1) = " << std::fdim(4, 1) << '\n'
                  << "fdim(1, 4) = " << std::fdim(1, 4) << '\n'
                  << "fdim(4,-1) = " << std::fdim(4, -1) << '\n'
                  << "fdim(1,-4) = " << std::fdim(1, -4) << '\n';
    
        // error handling 
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "fdim(1e308, -1e308) = " << std::fdim(1e308, -1e308) << '\n';
    
        if (errno == ERANGE)
            std::cout << "    errno == ERANGE: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_OVERFLOW))
            std::cout << "    FE_OVERFLOW raised\n";
    }
```

Saída:
```
    fdim(4, 1) = 3
    fdim(1, 4) = 0
    fdim(4,-1) = 5
    fdim(1,-4) = 5
    fdim(1e308, -1e308) = inf
        errno == ERANGE: Numerical result out of range
        FE_OVERFLOW raised
```

### Veja também

[ abs(int)labsllabs](<#/doc/numeric/math/abs>)(C++11) | calcula o valor absoluto de um valor inteiro (\\(\small{|x|}\\)|x|)
(função)
[ fmaxfmaxffmaxl](<#/doc/numeric/math/fmax>)(C++11)(C++11)(C++11) | o maior de dois valores de ponto flutuante
(função)
[Documentação C](<#/>) para fdim