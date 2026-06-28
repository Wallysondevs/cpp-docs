# std::logb, std::logbf, std::logbl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float logb ( float num );
double logb ( double num );
long double logb ( long double num );
constexpr /*floating-point-type*/
logb ( /*floating-point-type*/ num );
float logbf( float num );
(constexpr desde C++23)
long double logbl( long double num );
(constexpr desde C++23)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
logb ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double logb ( Integer num );
```

1-3) Extrai o valor do expoente imparcial e independente da base do argumento de ponto flutuante num, e o retorna como um valor de ponto flutuante. A biblioteca fornece sobrecargas de `std::logb` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro.(desde C++23)

S) A sobrecarga SIMD executa um `std::logb` elemento a elemento em v_num.

    

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

Formalmente, o expoente imparcial é a parte integral com sinal de logr|num| (retornado por esta função como um valor de ponto flutuante), para num diferente de zero, onde r é [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::radix e `T` é o tipo de ponto flutuante de num. Se num for subnormal, ele é tratado como se fosse normalizado.

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o expoente imparcial de num é retornado como um valor de ponto flutuante com sinal.

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado.

Se ocorrer um erro de polo, [-HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `-HUGE_VALF`, ou `-HUGE_VALL` é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Erro de domínio ou de faixa pode ocorrer se num for zero.

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

  * Se num for ±0, -∞ é retornado e [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se num for ±∞, +∞ é retornado.
  * Se num for NaN, NaN é retornado.
  * Em todos os outros casos, o resultado é exato ([FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) nunca é levantado) e [o modo de arredondamento atual](<#/doc/numeric/fenv/FE_round>) é ignorado.

### Notas

[POSIX exige](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/logb.html>) que um erro de polo ocorra se num for ±0.

O valor do expoente retornado por `std::logb` é sempre 1 a menos que o expoente retornado por [std::frexp](<#/doc/numeric/math/frexp>) devido aos diferentes requisitos de normalização: para o expoente e retornado por `std::logb`, |num*r-e
---|---
| está entre 1 e r (tipicamente entre 1 e 2), mas para o expoente e retornado por [std::frexp](<#/doc/numeric/math/frexp>), |num*2-e
| está entre 0.5 e 1.

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::logb(num) tenha o mesmo efeito que std::logb(static_cast&lt;double&gt;(num)).

### Exemplo

Compara diferentes funções de decomposição de ponto flutuante:

Execute este código
```cpp
    #include <cfenv>
    #include <cmath>
    #include <iostream>
    #include <limits>
    // #pragma STDC FENV_ACCESS ON
    
    int main()
    {
        double f = 123.45;
        std::cout << "Given the number " << f << " or " << std::hexfloat
                  << f << std::defaultfloat << " in hex,\n";
    
        double f3;
        double f2 = std::modf(f, &f3);
        std::cout << "modf() makes " << f3 << " + " << f2 << '\n';
    
        int i;
        f2 = std::frexp(f, &i);
        std::cout << "frexp() makes " << f2 << " * 2^" << i << '\n';
    
        i = std::ilogb(f);
        std::cout << "logb()/ilogb() make " << f / std::scalbn(1.0, i) << " * "
                  << std::numeric_limits<double>::radix
                  << "^" << std::ilogb(f) << '\n';
    
        // error handling
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "logb(0) = " << std::logb(0) << '\n';
        if (std::fetestexcept(FE_DIVBYZERO))
            std::cout << "    FE_DIVBYZERO raised\n";
    }
```

Saída possível:
```
    Given the number 123.45 or 0x1.edccccccccccdp+6 in hex,
    modf() makes 123 + 0.45
    frexp() makes 0.964453 * 2^7
    logb()/ilogb() make 1.92891 * 2^6
    logb(0) = -Inf
        FE_DIVBYZERO raised
```

### Veja também

[ frexpfrexpffrexpl](<#/doc/numeric/math/frexp>)(C++11)(C++11) | decompõe um número em significando e expoente de base 2
(função)
[ ilogbilogbfilogbl](<#/doc/numeric/math/ilogb>)(C++11)(C++11)(C++11) | extrai o expoente do número
(função)
[ scalbnscalbnfscalbnlscalblnscalblnfscalblnl](<#/doc/numeric/math/scalbn>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | multiplica um número por [FLT_RADIX](<#/doc/types/climits>) elevado a uma potência
(função)
[Documentação C](<#/>) para logb
  * [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
  * [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão