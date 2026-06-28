# std::scalbn, std::scalbnf, std::scalbnl, std::scalbln, std::scalblnf, std::scalblnl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
int exponent
float scalbn ( float num, int exp );
double scalbn ( double num, int exp );
long double scalbn ( long double num, int exp );
(até C++23)
constexpr /* floating-point-type */
scalbn ( /* floating-point-type */ num, int exp );
float scalbnf( float num, int exp );
(constexpr desde C++23)
long double scalbnl( long double num, int exp );
(constexpr desde C++23)
long exponent
float scalbln ( float num, long exp );
double scalbln ( double num, long exp );
long double scalbln ( long double num, long exp );
(até C++23)
constexpr /* floating-point-type */
scalbln ( /* floating-point-type */ num, long exp );
float scalblnf( float num, long exp );
(constexpr desde C++23)
long double scalblnl( long double num, long exp );
(constexpr desde C++23)
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
double scalbn( Integer num, int exp );
(constexpr desde C++23)
template< class Integer >
double scalbln( Integer num, long exp );
(constexpr desde C++23)
```

  
1-6) Multiplica um valor de ponto flutuante num por [FLT_RADIX](<#/doc/types/climits>) elevado à potência exp. A biblioteca fornece sobrecargas de `std::scalbn` e `std::scalbln` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro num. (desde C++23)

A,B) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

num  |  \-  |  valor de ponto flutuante ou inteiro   
---|---|---
exp  |  \-  |  valor inteiro   
  
### Valor de retorno

Se nenhum erro ocorrer, num multiplicado por [FLT_RADIX](<#/doc/types/climits>) elevado à potência exp (num×FLT_RADIXexp  
) é retornado. 

Se ocorrer um erro de range devido a overflow, [±HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `±HUGE_VALF`, ou `±HUGE_VALL` é retornado. 

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado. 

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559), 

  * A menos que ocorra um erro de range, [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) nunca é levantado (o resultado é exato). 
  * A menos que ocorra um erro de range, [o modo de arredondamento atual](<#/doc/numeric/fenv/FE_round>) é ignorado. 
  * Se num for ±0, ele é retornado, sem modificação. 
  * Se num for ±∞, ele é retornado, sem modificação. 
  * Se exp for 0, então num é retornado, sem modificação. 
  * Se num for NaN, NaN é retornado. 

### Notas

Em sistemas binários (onde [FLT_RADIX](<#/doc/types/climits>) é 2), `std::scalbn` é equivalente a [std::ldexp](<#/doc/numeric/math/ldexp>). 

Embora `std::scalbn` e `std::scalbln` sejam especificadas para realizar a operação eficientemente, em muitas implementações elas são menos eficientes do que a multiplicação ou divisão por uma potência de dois usando operadores aritméticos. 

O nome da função significa "new scalb", onde `scalb` era uma função não-padrão mais antiga cujo segundo argumento tinha tipo de ponto flutuante. 

A função `std::scalbln` é fornecida porque o fator necessário para escalar do menor valor de ponto flutuante positivo para o maior valor finito pode ser maior que 32767, o [INT_MAX](<#/doc/types/climits>) garantido pelo padrão. Em particular, para o long double de 80 bits, o fator é 32828. 

A implementação GNU não define `errno` independentemente de `math_errhandling`. 

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A,B). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro: 

  * std::scalbn(num, exp) tenha o mesmo efeito que std::scalbn(static_cast&lt;double&gt;(num), exp). 
  * std::scalbln(num, exp) tenha o mesmo efeito que std::scalbln(static_cast&lt;double&gt;(num), exp). 

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
        std::cout << "scalbn(7, -4) = " << std::scalbn(7, -4) << '\n'
                  << "scalbn(1, -1074) = " << std::scalbn(1, -1074)
                  << " (minimum positive subnormal double)\n"
                  << "scalbn(nextafter(1,0), 1024) = "
                  << std::scalbn(std::nextafter(1,0), 1024)
                  << " (largest finite double)\n";
     
        // special values
        std::cout << "scalbn(-0, 10) = " << std::scalbn(-0.0, 10) << '\n'
                  << "scalbn(-Inf, -1) = " << std::scalbn(-INFINITY, -1) << '\n';
     
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
     
        std::cout << "scalbn(1, 1024) = " << std::scalbn(1, 1024) << '\n';
     
        if (errno == ERANGE)
            std::cout << "    errno == ERANGE: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_OVERFLOW))
            std::cout << "    FE_OVERFLOW raised\n";
    }
```

Saída possível: 
```
    scalbn(7, -4) = 0.4375
    scalbn(1, -1074) = 4.94066e-324 (mínimo double subnormal positivo)
    scalbn(nextafter(1,0), 1024) = 1.79769e+308 (maior double finito)
    scalbn(-0, 10) = -0
    scalbn(-Inf, -1) = -inf
    scalbn(1, 1024) = inf
        errno == ERANGE: Resultado numérico fora do range
        FE_OVERFLOW levantado
```

### Veja também

[ frexpfrexpffrexpl](<#/doc/numeric/math/frexp>)(C++11)(C++11) |  decompõe um número em significando e expoente base-2   
(função)  
[ ldexpldexpfldexpl](<#/doc/numeric/math/ldexp>)(C++11)(C++11) |  multiplica um número por 2 elevado a uma potência inteira   
(função)  
[Documentação C](<#/>) para scalbn