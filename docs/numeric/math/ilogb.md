# std::ilogb, std::ilogbf, std::ilogbl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
int ilogb ( float num );
int ilogb ( double num );
int ilogb ( long double num );
(até C++23)
constexpr int ilogb( /* floating-point-type */ num );
int ilogbf( float num );
(constexpr desde C++23)
int ilogbl( long double num );
(constexpr desde C++23)
#define FP_ILOGB0 /* implementation-defined */
#define FP_ILOGBNAN /* implementation-defined */
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
int ilogb ( Integer num );
(constexpr desde C++23)
```

  
1-3) Extrai o valor do expoente não viciado do argumento de ponto flutuante num, e o retorna como um valor inteiro assinado. A biblioteca fornece sobrecargas de `std::ilogb` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro num.(desde C++23)

4) Expande para uma expressão constante inteira cujo valor é [INT_MIN](<#/doc/types/climits>) ou -[INT_MAX](<#/doc/types/climits>).

5) Expande para uma expressão constante inteira cujo valor é [INT_MIN](<#/doc/types/climits>) ou +[INT_MAX](<#/doc/types/climits>).

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

Formalmente, o expoente não viciado é a parte integral de logr|num| como um valor integral assinado, para num não-zero, onde r é [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::radix e `T` é o tipo de ponto flutuante de num. 

### Parâmetros

num  |  \-  |  valor de ponto flutuante ou inteiro   
  
### Valor de retorno

Se nenhum erro ocorrer, o expoente não viciado de num é retornado como um valor int assinado. 

Se num for zero, FP_ILOGB0 é retornado. 

Se num for infinito, [INT_MAX](<#/doc/types/climits>) é retornado. 

Se num for um NaN, FP_ILOGBNAN é retornado. 

Se o resultado correto for maior que [INT_MAX](<#/doc/types/climits>) ou menor que [INT_MIN](<#/doc/types/climits>), o valor de retorno é não especificado. 

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Um erro de domínio ou erro de range pode ocorrer se num for zero, infinito ou NaN. 

Se o resultado correto for maior que [INT_MAX](<#/doc/types/climits>) ou menor que [INT_MIN](<#/doc/types/climits>), um erro de domínio ou um erro de range pode ocorrer. 

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559), 

  * Se o resultado correto for maior que [INT_MAX](<#/doc/types/climits>) ou menor que [INT_MIN](<#/doc/types/climits>), [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado. 
  * Se num for ±0, ±∞, ou NaN, [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado. 
  * Em todos os outros casos, o resultado é exato ([FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) nunca é levantado) e [o modo de arredondamento atual](<#/doc/numeric/fenv/FE_round>) é ignorado. 

### Notas

Se num não for zero, infinito ou NaN, o valor retornado é exatamente equivalente a static_cast&lt;int&gt;([std::logb](<#/doc/numeric/math/logb>)(num)). 

[POSIX exige](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/ilogb.html>) que um erro de domínio ocorra se num for zero, infinito, NaN, ou se o resultado correto estiver fora do range de int. 

POSIX também exige que, em sistemas conformes com XSI, o valor retornado quando o resultado correto é maior que [INT_MAX](<#/doc/types/climits>) seja [INT_MAX](<#/doc/types/climits>) e o valor retornado quando o resultado correto é menor que [INT_MIN](<#/doc/types/climits>) seja [INT_MIN](<#/doc/types/climits>). 

O resultado correto pode ser representado como int em todas as implementações conhecidas. Para que ocorra overflow, [INT_MAX](<#/doc/types/climits>) deve ser menor que [LDBL_MAX_EXP](<#/doc/types/climits>) * [std::log2](<#/doc/numeric/math/log2>)([FLT_RADIX](<#/doc/types/climits>)) ou [INT_MIN](<#/doc/types/climits>) deve ser maior que [LDBL_MIN_EXP](<#/doc/types/climits>) - [LDBL_MANT_DIG](<#/doc/types/climits>)) * [std::log2](<#/doc/numeric/math/log2>)([FLT_RADIX](<#/doc/types/climits>)). 

O valor do expoente retornado por `std::ilogb` é sempre 1 a menos que o expoente retornado por [std::frexp](<#/doc/numeric/math/frexp>) devido aos diferentes requisitos de normalização: para o expoente e retornado por `std::ilogb`, |num*r-e | está entre 1 e r (tipicamente entre 1 e 2), mas para o expoente e retornado por [std::frexp](<#/doc/numeric/math/frexp>), |num*2-e | está entre 0.5 e 1. 

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::ilogb(num) tenha o mesmo efeito que std::ilogb(static_cast&lt;double&gt;(num)). 

### Exemplo

Compara diferentes funções de decomposição de ponto flutuante:

Run this code
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
    
        std::cout << "ilogb(0) = " << std::ilogb(0) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID raised\n";
    }
```

Saída possível: 
```
    Given the number 123.45 or 0x1.edccccccccccdp+6 in hex,
    modf() makes 123 + 0.45
    frexp() makes 0.964453 * 2^7
    logb()/ilogb() make 1.92891 * 2^6
    ilogb(0) = -2147483648
        FE_INVALID raised
```

### Veja também

[ frexpfrexpffrexpl](<#/doc/numeric/math/frexp>)(C++11)(C++11) |  decompõe um número em significando e expoente base-2   
(função)  
[ logblogbflogbl](<#/doc/numeric/math/logb>)(C++11)(C++11)(C++11) |  extrai o expoente do número   
(função)  
[ scalbnscalbnfscalbnlscalblnscalblnfscalblnl](<#/doc/numeric/math/scalbn>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) |  multiplica um número por [FLT_RADIX](<#/doc/types/climits>) elevado a uma potência   
(função)  
[Documentação C](<#/>) para ilogb