# std::copysign, std::copysignf, std::copysignl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float copysign ( float mag, float sgn );
double copysign ( double mag, double sgn );
long double copysign ( long double mag, long double sgn );
constexpr /*floating-point-type*/
copysign ( /*floating-point-type*/ mag,
/*floating-point-type*/ sgn );
float copysignf( float mag, float sgn );
(constexpr desde C++23)
long double copysignl( long double mag, long double sgn );
(constexpr desde C++23)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< class V0, class V1 >
constexpr /*math-common-simd-t*/<V0, V1>
copysign ( const V0& v_mag, const V1& v_sgn );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double copysign ( Integer mag, Integer sgn );
```

1-3) Compõe um valor de ponto flutuante com a magnitude de mag e o sinal de sgn. A biblioteca fornece sobrecargas de `std::copysign` para todos os tipos de ponto flutuante cv-não qualificados como o tipo dos parâmetros. (desde C++23)

S) A sobrecarga SIMD executa um `std::copysign` elemento a elemento em v_mag e v_sgn.

    (Veja [`_math-common-simd-t_`](<#/doc/numeric/simd>) para sua definição.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **mag, sgn** — valores de ponto flutuante ou inteiros

### Valor de retorno

Se nenhum erro ocorrer, o valor de ponto flutuante com a magnitude de mag e o sinal de sgn é retornado.

Se mag for NaN, então NaN com o sinal de sgn é retornado.

Se sgn for -0, o resultado é negativo apenas se a implementação suportar o zero com sinal consistentemente em operações aritméticas.

### Tratamento de erros

Esta função não está sujeita a nenhum erro especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559),

*   O valor retornado é exato ([FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) nunca é levantado) e independente do [modo de arredondamento](<#/doc/numeric/fenv/FE_round>) atual.

### Observações

`std::copysign` é a única maneira portátil de manipular o sinal de um valor NaN (para examinar o sinal de um NaN, [std::signbit](<#/doc/numeric/math/signbit>) também pode ser usado).

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu primeiro argumento num1 e segundo argumento num2:

*   Se num1 ou num2 tiver o tipo long double, então std::copysign(num1, num2) tem o mesmo efeito que std::copysign(static_cast&lt;long double&gt;(num1),
    static_cast<long double>(num2)).
*   Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::copysign(num1, num2) tem o mesmo efeito que std::copysign(static_cast&lt;double&gt;(num1),
    static_cast<double>(num2)).
*   Caso contrário, se num1 ou num2 tiver o tipo float, então std::copysign(num1, num2) tem o mesmo efeito que std::copysign(static_cast&lt;float&gt;(num1),
    static_cast<float>(num2)).

| (até C++23)
Se num1 e num2 tiverem tipos aritméticos, então std::copysign(num1, num2) tem o mesmo efeito que std::copysign(static_cast</*common-floating-point-type*/>(num1),
static_cast</*common-floating-point-type*/>(num2)), onde /*common-floating-point-type*/ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    
    int main()
    {
        std::cout << std::showpos
                  << "copysign(1.0,+2.0) = " << std::copysign(1.0, +2.0) << '\n'
                  << "copysign(1.0,-2.0) = " << std::copysign(1.0, -2.0) << '\n'
                  << "copysign(inf,-2.0) = " << std::copysign(INFINITY, -2.0) << '\n'
                  << "copysign(NaN,-2.0) = " << std::copysign(NAN, -2.0) << '\n';
    }
```

Saída:
```
    copysign(1.0,+2.0) = +1
    copysign(1.0,-2.0) = -1
    copysign(inf,-2.0) = -inf
    copysign(NaN,-2.0) = -nan
```

### Veja também

[ abs(float)fabsfabsffabsl](<#/doc/numeric/math/fabs>)(C++11)(C++11) | valor absoluto de um valor de ponto flutuante (\\(\small{|x|}\\)|x|)
(função)
[ signbit](<#/doc/numeric/math/signbit>)(C++11) | verifica se o número dado é negativo
(função)
[Documentação C](<#/>) para copysign