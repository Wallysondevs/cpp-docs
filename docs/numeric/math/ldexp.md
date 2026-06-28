# std::ldexp, std::ldexpf, std::ldexpl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float ldexp ( float num, int exp );
double ldexp ( double num, int exp );
long double ldexp ( long double num, int exp );
constexpr /* floating-point-type */
ldexp ( /* floating-point-type */ num, int exp );
float ldexpf( float num, int exp );
(constexpr desde C++23)
long double ldexpl( long double num, int exp );
(constexpr desde C++23)
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double ldexp ( Integer num, int exp );
(constexpr desde C++23)
```

  
1-3) Multiplica um valor de ponto flutuante num pelo número 2 elevado à potência exp. A biblioteca fornece sobrecargas de `std::ldexp` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro num.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)  
  
### Parâmetros

num  |  \-  |  valor de ponto flutuante ou inteiro   
---|---|---
exp  |  \-  |  valor inteiro   
  
### Valor de retorno

Se nenhum erro ocorrer, num multiplicado por 2 elevado à potência exp (num×2exp  
) é retornado. 

Se ocorrer um erro de range devido a overflow, [±HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `±HUGE_VALF`, ou `±HUGE_VALL` é retornado. 

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado. 

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559), 

  * A menos que ocorra um erro de range, [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) nunca é levantado (o resultado é exato). 
  * A menos que ocorra um erro de range, [o modo de arredondamento atual](<#/doc/numeric/fenv/FE_round>) é ignorado. 
  * Se num for ±0, ele é retornado, inalterado. 
  * Se num for ±∞, ele é retornado, inalterado. 
  * Se exp for 0, então num é retornado, inalterado. 
  * Se num for NaN, NaN é retornado. 

### Observações

Em sistemas binários (onde [FLT_RADIX](<#/doc/types/climits>) é 2), `std::ldexp` é equivalente a [std::scalbn](<#/doc/numeric/math/scalbn>). 

A função `std::ldexp` ("carregar expoente"), juntamente com sua dual, [std::frexp](<#/doc/numeric/math/frexp>), pode ser usada para manipular a representação de um número de ponto flutuante sem manipulações diretas de bits. 

Em muitas implementações, `std::ldexp` é menos eficiente do que a multiplicação ou divisão por uma potência de dois usando operadores aritméticos. 

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::ldexp(num, exp) tenha o mesmo efeito que std::ldexp(static_cast&lt;double&gt;(num), exp). 

Para exponenciação de 2 por um expoente de ponto flutuante, [std::exp2](<#/doc/numeric/math/exp2>) pode ser usado. 

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
        std::cout
            << "ldexp(5, 3) = 5 * 8 = " << std::ldexp(5, 3) << '\n'
            << "ldexp(7, -4) = 7 / 16 = " << std::ldexp(7, -4) << '\n'
            << "ldexp(1, -1074) = " << std::ldexp(1, -1074)
            << " (mínimo positivo subnormal float64_t)\n"
            << "ldexp(nextafter(1,0), 1024) = "
            << std::ldexp(std::nextafter(1,0), 1024)
            << " (maior float64_t finito)\n";
     
        // valores especiais
        std::cout << "ldexp(-0, 10) = " << std::ldexp(-0.0, 10) << '\n'
                  << "ldexp(-Inf, -1) = " << std::ldexp(-INFINITY, -1) << '\n';
     
        // tratamento de erros
        std::feclearexcept(FE_ALL_EXCEPT);
        errno = 0;
        const double inf = std::ldexp(1, 1024);
        const bool is_range_error = errno == ERANGE;
     
        std::cout << "ldexp(1, 1024) = " << inf << '\n';
        if (is_range_error)
            std::cout << "    errno == ERANGE: " << std::strerror(ERANGE) << '\n';
        if (std::fetestexcept(FE_OVERFLOW))
            std::cout << "    FE_OVERFLOW levantado\n";
    }
```

Saída possível: 
```
    ldexp(5, 3) = 5 * 8 = 40
    ldexp(7, -4) = 7 / 16 = 0.4375
    ldexp(1, -1074) = 4.94066e-324 (minimum positive subnormal float64_t)
    ldexp(nextafter(1,0), 1024) = 1.79769e+308 (largest finite float64_t)
    ldexp(-0, 10) = -0
    ldexp(-Inf, -1) = -inf
    ldexp(1, 1024) = inf
        errno == ERANGE: Resultado numérico fora do range
        FE_OVERFLOW levantado
```

### Veja também

[ frexpfrexpffrexpl](<#/doc/numeric/math/frexp>)(C++11)(C++11) |  decompõe um número em significando e expoente base-2   
(função)  
[ scalbnscalbnfscalbnlscalblnscalblnfscalblnl](<#/doc/numeric/math/scalbn>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) |  multiplica um número por [FLT_RADIX](<#/doc/types/climits>) elevado a uma potência   
(função)  
[ exp2exp2fexp2l](<#/doc/numeric/math/exp2>)(C++11)(C++11)(C++11) |  retorna 2 elevado à potência dada (\\({\small 2^x}\\)2x)   
(função)  
[Documentação C](<#/>) para ldexp