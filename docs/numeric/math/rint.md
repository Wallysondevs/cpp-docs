# std::rint, std::rintf, std::rintl, std::lrint, std::lrintf, std::lrintl, std::llrint, std::llrintf

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
Arredondamento para tipos de ponto flutuante
float rint ( float num );
double rint ( double num );
long double rint ( long double num );
(até C++23)
/* floating-point-type */ rint( /* floating-point-type */ num );
float rintf( float num );
long double rintl( long double num );
Arredondamento para long
long lrint ( float num );
long lrint ( double num );
long lrint ( long double num );
(até C++23)
long lrint ( /* floating-point-type */ num );
long lrintf( float num );
long lrintl( long double num );
Arredondamento para long long
long long llrint ( float num );
long long llrint ( double num );
long long llrint ( long double num );
(até C++23)
long long llrint ( /* floating-point-type */ num );
long long llrintf( float num );
long long llrintl( long double num );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
double rint( Integer num );
template< class Integer >
long lrint( Integer num );
template< class Integer >
long long llrint( Integer num );
```

  
1-3) Arredonda o argumento de ponto flutuante num para um valor inteiro (em formato de ponto flutuante), usando o [modo de arredondamento atual](<#/doc/numeric/fenv/FE_round>). A biblioteca fornece sobrecargas de `std::rint` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro num.(desde C++23)

4-9) Arredonda o argumento de ponto flutuante num para um valor inteiro, usando o [modo de arredondamento atual](<#/doc/numeric/fenv/FE_round>). A biblioteca fornece sobrecargas de `std::lrint` e `std::llrint` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro num.(desde C++23)

A-C) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

num  |  \-  |  valor de ponto flutuante ou inteiro   
  
### Valor de retorno

Se nenhum erro ocorrer, o valor inteiro mais próximo de num, de acordo com o [modo de arredondamento atual](<#/doc/numeric/fenv/FE_round>), é retornado. 

### Tratamento de erros

Os erros são relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se o resultado de `std::lrint` ou `std::llrint` estiver fora do intervalo representável pelo tipo de retorno, um erro de domínio ou um erro de intervalo pode ocorrer. 

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559), 

     Para a função `std::rint`: 

  * Se num for ±∞, ele é retornado, inalterado. 
  * Se num for ±0, ele é retornado, inalterado. 
  * Se num for NaN, NaN é retornado. 

     Para as funções `std::lrint` e `std::llrint`: 

  * Se num for ±∞, [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado e um valor definido pela implementação é retornado. 
  * Se o resultado do arredondamento estiver fora do intervalo do tipo de retorno, [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado e um valor definido pela implementação é retornado. 
  * Se num for NaN, [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado e um valor definido pela implementação é retornado. 

### Observações

O POSIX especifica que todos os casos em que `std::lrint` ou `std::llrint` levantam [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) são erros de domínio. 

Conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>), [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) pode ser (mas não é obrigatório em plataformas de ponto flutuante não-IEEE) levantado por `std::rint` ao arredondar um valor finito não inteiro. 

A única diferença entre `std::rint` e [std::nearbyint](<#/doc/numeric/math/nearbyint>) é que [std::nearbyint](<#/doc/numeric/math/nearbyint>) nunca levanta [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>). 

Os maiores valores de ponto flutuante representáveis são inteiros exatos em todos os formatos de ponto flutuante padrão, então `std::rint` nunca causa overflow por si só; no entanto, o resultado pode causar overflow em qualquer tipo inteiro (incluindo [std::intmax_t](<#/doc/types/integer>)), quando armazenado em uma variável inteira. 

Se o modo de arredondamento atual for: 

  * [FE_DOWNWARD](<#/doc/numeric/fenv/FE_round>), então `std::rint` é equivalente a [std::floor](<#/doc/numeric/math/floor>). 
  * [FE_UPWARD](<#/doc/numeric/fenv/FE_round>), então `std::rint` é equivalente a [std::ceil](<#/doc/numeric/math/ceil>). 
  * [FE_TOWARDZERO](<#/doc/numeric/fenv/FE_round>), então `std::rint` é equivalente a [std::trunc](<#/doc/numeric/math/trunc>). 
  * [FE_TONEAREST](<#/doc/numeric/fenv/FE_round>), então `std::rint` difere de [std::round](<#/doc/numeric/math/round>) no sentido de que casos intermediários são arredondados para o número par mais próximo em vez de para longe de zero. 

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A-C). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro: 

  * std::rint(num) tem o mesmo efeito que std::rint(static_cast&lt;double&gt;(num)). 
  * std::lrint(num) tem o mesmo efeito que std::lrint(static_cast&lt;double&gt;(num)). 
  * std::llrint(num) tem o mesmo efeito que std::llrint(static_cast&lt;double&gt;(num)). 

### Exemplo

Run this code
```cpp
    #include <cfenv>
    #include <climits>
    #include <cmath>
    #include <iostream>
    // #pragma STDC FENV_ACCESS ON
     
    int main()
    {
        std::fesetround(FE_TONEAREST);
        std::cout << "Rounding to nearest (halfway cases to even):\n"
                  << "  rint(+2.3) = " << std::rint(2.3) << '\n'
                  << "  rint(+2.5) = " << std::rint(2.5) << '\n'
                  << "  rint(+3.5) = " << std::rint(3.5) << '\n'
                  << "  rint(-2.3) = " << std::rint(-2.3) << '\n'
                  << "  rint(-2.5) = " << std::rint(-2.5) << '\n'
                  << "  rint(-3.5) = " << std::rint(-3.5) << '\n';
     
        std::fesetround(FE_DOWNWARD);
        std::cout << "Rounding down:\n"
                  << "  rint(+2.3) = " << std::rint(2.3) << '\n'
                  << "  rint(+2.5) = " << std::rint(2.5) << '\n'
                  << "  rint(+3.5) = " << std::rint(3.5) << '\n'
                  << "  rint(-2.3) = " << std::rint(-2.3) << '\n'
                  << "  rint(-2.5) = " << std::rint(-2.5) << '\n'
                  << "  rint(-3.5) = " << std::rint(-3.5) << '\n'
                  << "Rounding down with lrint:\n"
                  << "  lrint(+2.3) = " << std::lrint(2.3) << '\n'
                  << "  lrint(+2.5) = " << std::lrint(2.5) << '\n'
                  << "  lrint(+3.5) = " << std::lrint(3.5) << '\n'
                  << "  lrint(-2.3) = " << std::lrint(-2.3) << '\n'
                  << "  lrint(-2.5) = " << std::lrint(-2.5) << '\n'
                  << "  lrint(-3.5) = " << std::lrint(-3.5) << '\n'
                  << "Special values:\n"
                  << "  lrint(-0.0) = " << std::lrint(-0.0) << '\n'
                  << std::hex << std::showbase
                  << "  lrint(-Inf) = " << std::lrint(-INFINITY) << '\n';
     
        // error handling
        std::feclearexcept(FE_ALL_EXCEPT);
     
        std::cout << "std::rint(0.1) = " << std::rint(.1) << '\n';
        if (std::fetestexcept(FE_INEXACT))
            std::cout << "  FE_INEXACT was raised\n";
     
        std::feclearexcept(FE_ALL_EXCEPT);
     
        std::cout << "std::lrint(LONG_MIN-2048.0) = "
                  << std::lrint(LONG_MIN - 2048.0) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "  FE_INVALID was raised\n";
    }
```

Saída possível: 
```
    Rounding to nearest (halfway cases to even):
      rint(+2.3) = 2
      rint(+2.5) = 2
      rint(+3.5) = 4
      rint(-2.3) = -2
      rint(-2.5) = -2
      rint(-3.5) = -4
    Rounding down:
      rint(+2.3) = 2
      rint(+2.5) = 2
      rint(+3.5) = 4
      rint(-2.3) = -2
      rint(-2.5) = -2
      rint(-3.5) = -4
    Rounding down with lrint:
      lrint(+2.3) = 2
      lrint(+2.5) = 2
      lrint(+3.5) = 3
      lrint(-2.3) = -3
      lrint(-2.5) = -3
      lrint(-3.5) = -4
    Special values:
      lrint(-0.0) = 0
      lrint(-Inf) = 0x8000000000000000
    std::rint(0.1) = 0
    std::lrint(LONG_MIN-2048.0) = 0x8000000000000000
      FE_INVALID was raised
```

### Ver também

[ trunctruncftruncl](<#/doc/numeric/math/trunc>)(C++11)(C++11)(C++11) |  inteiro mais próximo não maior em magnitude que o valor dado   
(função)  
[ nearbyintnearbyintfnearbyintl](<#/doc/numeric/math/nearbyint>)(C++11)(C++11)(C++11) |  inteiro mais próximo usando o modo de arredondamento atual   
(função)  
[ fegetroundfesetround](<#/doc/numeric/fenv/feround>)(C++11)(C++11) |  obtém ou define a direção de arredondamento   
(função)  
[Documentação C](<#/>) para rint