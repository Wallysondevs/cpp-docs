# std::fmod, std::fmodf, std::fmodl

```cpp
Definido no header `<cmath>`
  // (1)
float fmod ( float x, float y );
double fmod ( double x, double y );
long double fmod ( long double x, long double y );  // (até C++23)
constexpr /*floating-point-type*/
fmod ( /*floating-point-type*/ x,
/*floating-point-type*/ y );  // (desde C++23)
float fmodf( float x, float y );  // (2) (desde C++11)
(constexpr desde C++23)
long double fmodl( long double x, long double y );  // (3) (desde C++11)
(constexpr desde C++23)
Sobrecarga SIMD (desde C++26)
Definido no header `<simd>`
```

```cpp
template< class V0, class V1 >
constexpr /*math-common-simd-t*/<V0, V1>
fmod ( const V0& v_x, const V1& v_y );  // (desde C++26)
Sobrecargas adicionais (desde C++11)
Definido no header `<cmath>`
template< class Integer >
double fmod ( Integer x, Integer y );
```

1-3) Calcula o resto de ponto flutuante da operação de divisão x / y. A biblioteca fornece sobrecargas de `std::fmod` para todos os tipos de ponto flutuante cv-unqualified como o tipo dos parâmetros. (desde C++23)

S) A sobrecarga SIMD executa um `std::fmod` elemento a elemento em v_x e v_y.

    (Veja [`_math-common-simd-t_`](<#/doc/numeric/simd>) para sua definição.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

O resto de ponto flutuante da operação de divisão x / y calculado por esta função é exatamente o valor x - iquot * y, onde iquot é x / y com sua parte fracionária truncada.

O valor retornado tem o mesmo sinal que x e é menor que y em magnitude.

### Parâmetros

- **x, y** — valores de ponto flutuante ou inteiros

### Valor de retorno

Se bem-sucedido, retorna o resto de ponto flutuante da divisão x / y conforme definido acima.

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Um erro de domínio pode ocorrer se y for zero.

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

  * Se x for ±0 e y não for zero, ±0 é retornado.
  * Se x for ±∞ e y não for NaN, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se y for ±0 e x não for NaN, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se y for ±∞ e x for finito, x é retornado.
  * Se qualquer um dos argumentos for NaN, NaN é retornado.

### Observações

[POSIX exige](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/fmod.html>) que um erro de domínio ocorra se x for infinito ou y for zero.

`std::fmod`, mas não [std::remainder](<#/doc/numeric/math/remainder>), é útil para fazer o wrapping silencioso de tipos de ponto flutuante para tipos inteiros sem sinal: (0.0 <= (y = std::fmod([std::rint](<#/doc/numeric/math/rint>)(x), 65536.0)) ? y : 65536.0 + y) está no range `[`-0.0`, `65535.0`]`, o que corresponde a unsigned short, mas [std::remainder](<#/doc/numeric/math/remainder>)([std::rint](<#/doc/numeric/math/rint>)(x), 65536.0 está no range `[`-32767.0`, `+32768.0`]`, que está fora do range de signed short.

A versão double de `std::fmod` se comporta como se fosse implementada da seguinte forma:
```cpp
    double fmod(double x, double y)
    {
    #pragma STDC FENV_ACCESS ON
        double result = std::remainder(std::fabs(x), y = std::fabs(y));
        if (std::signbit(result))
            result += y;
        return std::copysign(result, x);
    }
```

A expressão x - [std::trunc](<#/doc/numeric/math/trunc>)(x / y) * y pode não ser igual a std::fmod(x, y), quando o arredondamento de x / y para inicializar o argumento de [std::trunc](<#/doc/numeric/math/trunc>) perde muita precisão (exemplo: x = 30.508474576271183309, y = 6.1016949152542370172).

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que para seu primeiro argumento num1 e segundo argumento num2:

  * Se num1 ou num2 tiver o tipo long double, então std::fmod(num1, num2) tem o mesmo efeito que std::fmod(static_cast&lt;long double&gt;(num1),
static_cast&lt;long double&gt;(num2)).
  * Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::fmod(num1, num2) tem o mesmo efeito que std::fmod(static_cast&lt;double&gt;(num1),
static_cast&lt;double&gt;(num2)).
  * Caso contrário, se num1 ou num2 tiver o tipo float, então std::fmod(num1, num2) tem o mesmo efeito que std::fmod(static_cast&lt;float&gt;(num1),
static_cast&lt;float&gt;(num2)).

| (até C++23)
Se num1 e num2 tiverem tipos aritméticos, então std::fmod(num1, num2) tem o mesmo efeito que std::fmod(static_cast</*common-floating-point-type*/>(num1),
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
        std::cout << "fmod(+5.1, +3.0) = " << std::fmod(5.1, 3) << '\n'
                  << "fmod(-5.1, +3.0) = " << std::fmod(-5.1, 3) << '\n'
                  << "fmod(+5.1, -3.0) = " << std::fmod(5.1, -3) << '\n'
                  << "fmod(-5.1, -3.0) = " << std::fmod(-5.1, -3) << '\n';
    
        // special values
        std::cout << "fmod(+0.0, 1.0) = " << std::fmod(0, 1) << '\n'
                  << "fmod(-0.0, 1.0) = " << std::fmod(-0.0, 1) << '\n'
                  << "fmod(5.1, Inf) = " << std::fmod(5.1, INFINITY) << '\n';
    
        // error handling
        std::feclearexcept(FE_ALL_EXCEPT);
        std::cout << "fmod(+5.1, 0) = " << std::fmod(5.1, 0) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID raised\n";
    }
```

Saída possível:
```
    fmod(+5.1, +3.0) = 2.1
    fmod(-5.1, +3.0) = -2.1
    fmod(+5.1, -3.0) = 2.1
    fmod(-5.1, -3.0) = -2.1
    fmod(+0.0, 1.0) = 0
    fmod(-0.0, 1.0) = -0
    fmod(5.1, Inf) = 5.1
    fmod(+5.1, 0) = -nan
        FE_INVALID raised
```

### Veja também

[ div(int)ldivlldiv](<#/doc/numeric/math/div>)(C++11) | calcula quociente e resto de divisão inteira
(função)
[ remainderremainderfremainderl](<#/doc/numeric/math/remainder>)(C++11)(C++11)(C++11) | resto com sinal da operação de divisão
(função)
[ remquoremquofremquol](<#/doc/numeric/math/remquo>)(C++11)(C++11)(C++11) | resto com sinal, bem como os três últimos bits da operação de divisão
(função)
[Documentação C](<#/>) para fmod