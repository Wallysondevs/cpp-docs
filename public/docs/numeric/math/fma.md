# std::fma, std::fmaf, std::fmal

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float fma ( float x, float y, float z );
double fma ( double x, double y, double z );
long double fma ( long double x, long double y, long double z );
(até C++23)
constexpr /* floating-point-type */
fma ( /* floating-point-type */ x,
/* floating-point-type */ y,
/* floating-point-type */ z );
float fmaf( float x, float y, float z );
(constexpr desde C++23)
long double fmal( long double x, long double y, long double z );
(constexpr desde C++23)
#define FP_FAST_FMA /* implementation-defined */
#define FP_FAST_FMAF /* implementation-defined */
#define FP_FAST_FMAL /* implementation-defined */
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Arithmetic1, class Arithmetic2, class Arithmetic3 >
/* common-floating-point-type */
fma( Arithmetic1 x, Arithmetic2 y, Arithmetic3 z );
(constexpr desde C++23)
```

  
1-3) Calcula x * y + z como se fosse com precisão infinita e arredondado apenas uma vez para se ajustar ao tipo de resultado. A biblioteca fornece sobrecargas de `std::fma` para todos os tipos de ponto flutuante cv-unqualified como o tipo dos parâmetros x, y e z.(desde C++23)

4-6) Se as constantes de macro FP_FAST_FMA, FP_FAST_FMAF ou FP_FAST_FMAL forem definidas, a função `std::fma` avalia mais rapidamente (além de ser mais precisa) do que a expressão x * y + z para argumentos double, float e long double, respectivamente. Se definidas, essas macros avaliam para o inteiro 1.

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

x, y, z  |  \-  |  valores de ponto flutuante ou inteiros   
  
### Valor de retorno

Se bem-sucedido, retorna o valor de x * y + z como se calculado com precisão infinita e arredondado uma vez para se ajustar ao tipo de resultado (ou, alternativamente, calculado como uma única operação ternária de ponto flutuante). 

Se ocorrer um erro de range devido a overflow, [±HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `±HUGE_VALF`, ou `±HUGE_VALL` é retornado. 

Se ocorrer um erro de range devido a underflow, o valor correto (após arredondamento) é retornado. 

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559), 

  * Se x é zero e y é infinito ou se x é infinito e y é zero, e 
    * se z não é um NaN, então NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado, 
    * se z é um NaN, então NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado. 
  * Se x * y é um infinito exato e z é um infinito com o sinal oposto, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado. 
  * Se x ou y são NaN, NaN é retornado. 
  * Se z é NaN, e x * y não é 0 * Inf ou Inf * 0, então NaN é retornado (sem [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>)). 

### Observações

Esta operação é comumente implementada em hardware como uma instrução de CPU [fused multiply-add](<https://en.wikipedia.org/wiki/Multiply%E2%80%93accumulate_operation> "enwiki:Multiply–accumulate operation"). Se suportado por hardware, espera-se que as macros FP_FAST_FMA? apropriadas sejam definidas, mas muitas implementações fazem uso da instrução da CPU mesmo quando as macros não estão definidas. 

POSIX [(`fma`, `fmaf`, `fmal`)](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/fma.html>) especifica adicionalmente que as situações especificadas para retornar [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) são erros de domínio. 

Devido à sua precisão intermediária infinita, `std::fma` é um bloco de construção comum para outras operações matemáticas corretamente arredondadas, como [std::sqrt](<#/doc/numeric/math/sqrt>) ou mesmo a divisão (onde não fornecida pela CPU, por exemplo, [Itanium](<https://en.wikipedia.org/wiki/Itanium> "enwiki:Itanium")). 

Assim como em todas as expressões de ponto flutuante, a expressão x * y + z pode ser compilada como um fused multiply-add, a menos que o [` #pragma`](<#/doc/preprocessor/impl>) STDC FP_CONTRACT esteja desativado. 

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que para seu primeiro argumento num1, segundo argumento num2 e terceiro argumento num3: 

  * Se num1, num2 ou num3 tiver o tipo long double, então std::fma(num1, num2, num3) tem o mesmo efeito que std::fma(static_cast&lt;long double&gt;(num1),  
static_cast&lt;long double&gt;(num2),  
static_cast&lt;long double&gt;(num3)). 
  * Caso contrário, se num1, num2 e/ou num3 tiver o tipo double ou um tipo inteiro, então std::fma(num1, num2, num3) tem o mesmo efeito que std::fma(static_cast&lt;double&gt;(num1),  
static_cast&lt;double&gt;(num2),  
static_cast&lt;double&gt;(num3)). 
  * Caso contrário, se num1, num2 ou num3 tiver o tipo float, então std::fma(num1, num2, num3) tem o mesmo efeito que std::fma(static_cast&lt;float&gt;(num1),  
static_cast&lt;float&gt;(num2),  
static_cast&lt;float&gt;(num3)). 

| (até C++23)  
Se num1, num2 e num3 tiverem tipos aritméticos, então std::fma(num1, num2, num3) tem o mesmo efeito que std::fma(static_cast</*common-floating-point-type*/>(num1),  
static_cast</*common-floating-point-type*/>(num2),  
static_cast</*common-floating-point-type*/>(num3)), onde /*common-floating-point-type*/ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1, num2 e num3; argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas.  | (desde C++23)  
  
### Exemplo

Execute este código
```cpp
    #include <cfenv>
    #include <cmath>
    #include <iomanip>
    #include <iostream>
     
    #ifndef __GNUC__
    #pragma STDC FENV_ACCESS ON
    #endif
     
    int main()
    {
        // demo the difference between fma and built-in operators
        const double in = 0.1;
        std::cout << "0.1 double is " << std::setprecision(23) << in
                  << " (" << std::hexfloat << in << std::defaultfloat << ")\n"
                  << "0.1*10 is 1.0000000000000000555112 (0x8.0000000000002p-3), "
                  << "or 1.0 if rounded to double\n";
     
        const double expr_result = 0.1 * 10 - 1;
        const double fma_result = std::fma(0.1, 10, -1);
        std::cout << "0.1 * 10 - 1 = " << expr_result
                  << " : 1 subtracted after intermediate rounding\n"
                  << "fma(0.1, 10, -1) = " << std::setprecision(6) << fma_result << " ("
                  << std::hexfloat << fma_result << std::defaultfloat << ")\n\n";
     
        // fma is used in double-double arithmetic
        const double high = 0.1 * 10;
        const double low = std::fma(0.1, 10, -high);
        std::cout << "in double-double arithmetic, 0.1 * 10 is representable as "
                  << high << " + " << low << "\n\n";
     
        // error handling 
        std::feclearexcept(FE_ALL_EXCEPT);
        std::cout << "fma(+Inf, 10, -Inf) = " << std::fma(INFINITY, 10, -INFINITY) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID raised\n";
    }
```

Saída possível: 
```
    0.1 double is 0.10000000000000000555112 (0x1.999999999999ap-4)
    0.1*10 is 1.0000000000000000555112 (0x8.0000000000002p-3), or 1.0 if rounded to double
    0.1 * 10 - 1 = 0 : 1 subtracted after intermediate rounding
    fma(0.1, 10, -1) = 5.55112e-17 (0x1p-54)
     
    in double-double arithmetic, 0.1 * 10 is representable as 1 + 5.55112e-17
     
    fma(+Inf, 10, -Inf) = -nan
        FE_INVALID raised
```

### Veja também

[ remainderremainderfremainderl](<#/doc/numeric/math/remainder>)(C++11)(C++11)(C++11) |  resto assinado da operação de divisão   
(função)  
[ remquoremquofremquol](<#/doc/numeric/math/remquo>)(C++11)(C++11)(C++11) |  resto assinado, bem como os três últimos bits da operação de divisão   
(função)  
[Documentação C](<#/>) para fma