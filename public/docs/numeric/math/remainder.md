# std::remainder, std::remainderf, std::remainderl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float remainder ( float x, float y );
double remainder ( double x, double y );
long double remainder ( long double x, long double y );
constexpr /*floating-point-type*/
remainder ( /*floating-point-type*/ x,
/*floating-point-type*/ y );
float remainderf( float x, float y );
(constexpr desde C++23)
long double remainderl( long double x, long double y );
(constexpr desde C++23)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< class V0, class V1 >
constexpr /*math-common-simd-t*/<V0, V1>
remainder ( const V0& v_x, const V1& v_y );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double remainder ( Integer x, Integer y );
```

1-3) Calcula o resto IEEE da operação de divisão de ponto flutuante x / y. A biblioteca fornece sobrecargas de `std::remainder` para todos os tipos de ponto flutuante cv-não qualificados como o tipo dos parâmetros. (desde C++23)

S) A sobrecarga SIMD executa um `std::remainder` elemento a elemento em v_x e v_y.

    (Veja [`_math-common-simd-t_`](<#/doc/numeric/simd>) para sua definição.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

O resto de ponto flutuante IEEE da operação de divisão x / y calculado por esta função é exatamente o valor x - quo * y, onde o valor quo é o valor inteiro mais próximo do valor exato x / y. Quando |quo - x / y| = ½, o valor quo é escolhido para ser par.

Em contraste com [std::fmod](<#/doc/numeric/math/fmod>), o valor retornado não é garantido ter o mesmo sinal que x.

Se o valor retornado for zero, ele terá o mesmo sinal que x.

### Parâmetros

- **x, y** — valores de ponto flutuante ou inteiros

### Valor de retorno

Em caso de sucesso, retorna o resto de ponto flutuante IEEE da divisão x / y conforme definido acima.

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de range devido a underflow, o resultado correto é retornado.

Se y for zero, mas o erro de domínio não ocorrer, zero é retornado.

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Um erro de domínio pode ocorrer se y for zero.

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

  * O [modo de arredondamento](<#/doc/numeric/fenv/FE_round>) atual não tem efeito.
  * [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) nunca é levantado, o resultado é sempre exato.
  * Se x for ±∞ e y não for NaN, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se y for ±0 e x não for NaN, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se qualquer um dos argumentos for NaN, NaN é retornado.

### Notas

[POSIX exige](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/remainder.html>) que um erro de domínio ocorra se x for infinito ou y for zero.

[std::fmod](<#/doc/numeric/math/fmod>), mas não `std::remainder`, é útil para fazer o "wrapping" silencioso de tipos de ponto flutuante para tipos inteiros sem sinal: (0.0 <= (y = [std::fmod](<#/doc/numeric/math/fmod>)([std::rint](<#/doc/numeric/math/rint>)(x), 65536.0)) ? y : 65536.0 + y) está no range `[`-0.0`, `65535.0`]`, que corresponde a unsigned short, mas std::remainder([std::rint](<#/doc/numeric/math/rint>)(x), 65536.0) está no range `[`-32767.0`, `+32768.0`]`, que está fora do range de signed short.

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu primeiro argumento num1 e segundo argumento num2:

  * Se num1 ou num2 tiver o tipo long double, então std::remainder(num1, num2) tem o mesmo efeito que std::remainder(static_cast&lt;long double&gt;(num1),
static_cast&lt;long double&gt;(num2)).
  * Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::remainder(num1, num2) tem o mesmo efeito que std::remainder(static_cast&lt;double&gt;(num1),
static_cast&lt;double&gt;(num2)).
  * Caso contrário, se num1 ou num2 tiver o tipo float, então std::remainder(num1, num2) tem o mesmo efeito que std::remainder(static_cast&lt;float&gt;(num1),
static_cast&lt;float&gt;(num2)).

| (até C++23)
Se num1 e num2 tiverem tipos aritméticos, então std::remainder(num1, num2) tem o mesmo efeito que std::remainder(static_cast</*common-floating-point-type*/>(num1),
static_cast</*common-floating-point-type*/>(num2)), onde /*common-floating-point-type*/ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cfenv>
    #include <cmath>
    #include <iostream>
    // #pragma STDC FENV_ACCESS ON
     
    int main()
    {
        std::cout << "remainder(+5.1, +3.0) = " << std::remainder(5.1, 3) << '\n'
                  << "remainder(-5.1, +3.0) = " << std::remainder(-5.1, 3) << '\n'
                  << "remainder(+5.1, -3.0) = " << std::remainder(5.1, -3) << '\n'
                  << "remainder(-5.1, -3.0) = " << std::remainder(-5.1, -3) << '\n';
     
        // special values
        std::cout << "remainder(-0.0, 1.0) = " << std::remainder(-0.0, 1) << '\n'
                  << "remainder(5.1, Inf) = " << std::remainder(5.1, INFINITY) << '\n';
     
        // error handling
        std::feclearexcept(FE_ALL_EXCEPT);
        std::cout << "remainder(+5.1, 0) = " << std::remainder(5.1, 0) << '\n';
        if (fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID raised\n";
    }
```

Saída possível:
```
    remainder(+5.1, +3.0) = -0.9
    remainder(-5.1, +3.0) = 0.9
    remainder(+5.1, -3.0) = -0.9
    remainder(-5.1, -3.0) = 0.9
    remainder(-0.0, 1.0) = -0
    remainder(5.1, Inf) = 5.1
    remainder(+5.1, 0) = -nan
        FE_INVALID raised
```

### Veja também

[ div(int)ldivlldiv](<#/doc/numeric/math/div>)(C++11) | calcula quociente e resto da divisão inteira
(função)
[ fmodfmodffmodl](<#/doc/numeric/math/fmod>)(C++11)(C++11) | resto da operação de divisão de ponto flutuante
(função)
[ remquoremquofremquol](<#/doc/numeric/math/remquo>)(C++11)(C++11)(C++11) | resto com sinal, bem como os três últimos bits da operação de divisão
(função)
[Documentação C](<#/>) para remainder