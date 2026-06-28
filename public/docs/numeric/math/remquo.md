# std::remquo, std::remquof, std::remquol

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float remquo ( float x, float y, int* quo );
double remquo ( double x, double y, int* quo );
long double remquo ( long double x, long double y, int* quo );
(até C++23)
constexpr /* floating-point-type */
remquo ( /* floating-point-type */ x,
/* floating-point-type */ y, int* quo );
float remquof( float x, float y, int* quo );
(constexpr desde C++23)
long double remquol( long double x, long double y, int* quo );
(constexpr desde C++23)
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Arithmetic1, class Arithmetic2 >
/* common-floating-point-type */
remquo( Arithmetic1 x, Arithmetic2 y, int* quo );
(constexpr desde C++23)
```

  
1-3) Calcula o resto de ponto flutuante da operação de divisão x / y, assim como a função [std::remainder()](<#/doc/numeric/math/remainder>). Adicionalmente, o sinal e pelo menos os três últimos bits de x / y serão armazenados em quo, o suficiente para determinar o octante do resultado dentro de um período. A biblioteca fornece sobrecargas de `std::remquo` para todos os tipos de ponto flutuante cv-unqualified como o tipo dos parâmetros x e y.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

x, y  |  \-  |  valores de ponto flutuante ou inteiros   
---|---|---
quo  |  \-  |  ponteiro para int para armazenar o sinal e alguns bits de x / y  
  
### Valor de retorno

Se bem-sucedido, retorna o resto de ponto flutuante da divisão x / y conforme definido em [std::remainder](<#/doc/numeric/math/remainder>), e armazena, em *quo, o sinal e pelo menos três dos bits menos significativos de x / y (formalmente, armazena um valor cujo sinal é o sinal de x / y e cuja magnitude é congruente módulo 2n  
à magnitude do quociente integral de x / y, onde n é um inteiro definido pela implementação maior ou igual a 3). 

Se y for zero, o valor armazenado em *quo é não especificado. 

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado). 

Se ocorrer um erro de range devido a underflow, o resultado correto é retornado se subnormais forem suportados. 

Se y for zero, mas o erro de domínio não ocorrer, zero é retornado. 

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Um erro de domínio pode ocorrer se y for zero. 

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559), 

  * O [modo de arredondamento](<#/doc/numeric/fenv/FE_round>) atual não tem efeito. 
  * [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) nunca é levantado. 
  * Se x for ±∞ e y não for NaN, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado. 
  * Se y for ±0 e x não for NaN, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado. 
  * Se x ou y for NaN, NaN é retornado. 

### Notas

[POSIX exige](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/remquo.html>) que um erro de domínio ocorra se x for infinito ou y for zero. 

Esta função é útil ao implementar funções periódicas com o período exatamente representável como um valor de ponto flutuante: ao calcular sin(πx) para um x muito grande, chamar [std::sin](<#/doc/numeric/math/sin>) diretamente pode resultar em um grande erro, mas se o argumento da função for primeiro reduzido com `std::remquo`, os bits de baixa ordem do quociente podem ser usados para determinar o sinal e o octante do resultado dentro do período, enquanto o resto pode ser usado para calcular o valor com alta precisão. 

Em algumas plataformas, esta operação é suportada por hardware (e, por exemplo, em CPUs Intel, `FPREM1` deixa exatamente 3 bits de precisão no quociente quando concluído). 

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu primeiro argumento num1 e segundo argumento num2: 

  * Se num1 ou num2 tiver o tipo long double, então std::remquo(num1, num2, quo) tem o mesmo efeito que std::remquo(static_cast&lt;long double&gt;(num1),  
static_cast&lt;long double&gt;(num2), quo). 
  * Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::remquo(num1, num2, quo) tem o mesmo efeito que std::remquo(static_cast&lt;double&gt;(num1),  
static_cast&lt;double&gt;(num2), quo). 
  * Caso contrário, se num1 ou num2 tiver o tipo float, então std::remquo(num1, num2, quo) tem o mesmo efeito que std::remquo(static_cast&lt;float&gt;(num1),  
static_cast&lt;float&gt;(num2), quo). 

| (até C++23)  
Se num1 e num2 tiverem tipos aritméticos, então std::remquo(num1, num2, quo) tem o mesmo efeito que std::remquo(static_cast</*common-floating-point-type*/>(num1),  
static_cast</*common-floating-point-type*/>(num2), quo), onde /*common-floating-point-type*/ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas.  | (desde C++23)  
  
### Exemplo

Execute este código
```cpp
    #include <cfenv>
    #include <cmath>
    #include <iostream>
    
    #ifndef __GNUC__
    #pragma STDC FENV_ACCESS ON
    #endif
    
    const double pi = std::acos(-1); // or std::numbers::pi since C++20
    
    double cos_pi_x_naive(double x)
    {
        return std::cos(pi * x);
    }
    
    // the period is 2, values are (0;0.5) positive, (0.5;1.5) negative, (1.5,2) positive
    double cos_pi_x_smart(double x)
    {
        int quadrant;
        double rem = std::remquo(x, 1, &quadrant);
        quadrant = static_cast<unsigned>(quadrant) % 2; // The period is 2.
        return quadrant == 0 ?  std::cos(pi * rem)
                             : -std::cos(pi * rem);
    }
    
    int main()
    {
        std::cout << std::showpos
                  << "naive:\n"
                  << "  cos(pi * 0.25) = " << cos_pi_x_naive(0.25) << '\n'
                  << "  cos(pi * 1.25) = " << cos_pi_x_naive(1.25) << '\n'
                  << "  cos(pi * 2.25) = " << cos_pi_x_naive(2.25) << '\n'
                  << "smart:\n"
                  << "  cos(pi * 0.25) = " << cos_pi_x_smart(0.25) << '\n'
                  << "  cos(pi * 1.25) = " << cos_pi_x_smart(1.25) << '\n'
                  << "  cos(pi * 2.25) = " << cos_pi_x_smart(2.25) << '\n'
                  << "naive:\n"
                  << "  cos(pi * 1000000000000.25) = "
                  << cos_pi_x_naive(1000000000000.25) << '\n'
                  << "  cos(pi * 1000000000001.25) = "
                  << cos_pi_x_naive(1000000000001.25) << '\n'
                  << "smart:\n"
                  << "  cos(pi * 1000000000000.25) = "
                  << cos_pi_x_smart(1000000000000.25) << '\n'
                  << "  cos(pi * 1000000000001.25) = "
                  << cos_pi_x_smart(1000000000001.25) << '\n';
    
        // error handling
        std::feclearexcept(FE_ALL_EXCEPT);
    
        int quo;
        std::cout << "remquo(+Inf, 1) = " << std::remquo(INFINITY, 1, &quo) << '\n';
        if (fetestexcept(FE_INVALID))
            std::cout << "  FE_INVALID raised\n";
    }
```

Saída possível: 
```
    naive:
      cos(pi * 0.25) = +0.707107
      cos(pi * 1.25) = -0.707107
      cos(pi * 2.25) = +0.707107
    smart:
      cos(pi * 0.25) = +0.707107
      cos(pi * 1.25) = -0.707107
      cos(pi * 2.25) = +0.707107
    naive:
      cos(pi * 1000000000000.25) = +0.707123
      cos(pi * 1000000000001.25) = -0.707117
    smart:
      cos(pi * 1000000000000.25) = +0.707107
      cos(pi * 1000000000001.25) = -0.707107
    remquo(+Inf, 1) = -nan
      FE_INVALID raised
```

### Veja também

[ div(int)ldivlldiv](<#/doc/numeric/math/div>)(C++11) |  calcula quociente e resto de divisão inteira   
(função)  
[ fmodfmodffmodl](<#/doc/numeric/math/fmod>)(C++11)(C++11) |  resto da operação de divisão de ponto flutuante   
(função)  
[ remainderremainderfremainderl](<#/doc/numeric/math/remainder>)(C++11)(C++11)(C++11) |  resto com sinal da operação de divisão   
(função)  
[Documentação C](<#/>) para remquo