# FE_DOWNWARD, FE_TONEAREST, FE_TOWARDZERO, FE_UPWARD

Definido no cabeçalho `[<cfenv>](<#/doc/header/cfenv>)`

```c
#define FE_DOWNWARD /*implementation defined*/
#define FE_TONEAREST /*implementation defined*/
#define FE_TOWARDZERO /*implementation defined*/
#define FE_UPWARD /*implementation defined*/
```

Cada uma dessas constantes de macro se expande para uma expressão constante inteira não negativa, que pode ser usada com [std::fesetround](<#/doc/numeric/fenv/feround>) e [std::fegetround](<#/doc/numeric/fenv/feround>) para indicar um dos modos de arredondamento de ponto flutuante suportados. A implementação pode definir constantes de modo de arredondamento adicionais em [`<cfenv>`](<#/doc/header/cfenv>), as quais devem todas começar com `FE_` seguido por pelo menos uma letra maiúscula. Cada macro é definida apenas se for suportada.

Constante | Explicação
---|---
`FE_DOWNWARD` | arredondamento em direção ao infinito negativo
`FE_TONEAREST` | arredondamento em direção ao valor representável mais próximo
`FE_TOWARDZERO` | arredondamento em direção a zero
`FE_UPWARD` | arredondamento em direção ao infinito positivo

Modos de arredondamento adicionais podem ser suportados por uma implementação.

O modo de arredondamento atual afeta o seguinte:

  * resultados de [operadores aritméticos](<#/doc/language/operator_arithmetic>) de ponto flutuante fora de expressões constantes

```cpp
    double x = 1;
    x / 10; // 0.09999999999999999167332731531132594682276248931884765625
         // ou 0.1000000000000000055511151231257827021181583404541015625
```

  * resultados de [funções matemáticas](<#/doc/numeric/math>) da standard library

```cpp
    std::sqrt(2); // 1.41421356237309492343001693370752036571502685546875
               // ou 1.4142135623730951454746218587388284504413604736328125
```

  * conversão implícita e casts de ponto flutuante para ponto flutuante

```cpp
    double d = 1 + std::numeric_limits<double>::epsilon();
    float f = d; // 1.00000000000000000000000
              // ou 1.00000011920928955078125
```

  * conversões de string como [std::strtod](<#/doc/string/byte/strtof>) ou [std::printf](<#/doc/io/c/printf>)

```cpp
    std::stof("0.1"); // 0.0999999940395355224609375
                   // ou 0.100000001490116119384765625
```

  * as funções de arredondamento da biblioteca [std::nearbyint](<#/doc/numeric/math/nearbyint>), [std::rint](<#/doc/numeric/math/rint>), [std::lrint](<#/doc/numeric/math/rint>)

```cpp
    std::lrint(2.1); // 2 ou 3
```

O modo de arredondamento atual NÃO afeta o seguinte:

  * conversão implícita e casts de ponto flutuante para inteiro (sempre em direção a zero),
  * resultados de operadores aritméticos de ponto flutuante em expressões executadas em tempo de compilação (sempre para o mais próximo),
  * as funções da biblioteca [std::round](<#/doc/numeric/math/round>), [std::lround](<#/doc/numeric/math/round>), [std::llround](<#/doc/numeric/math/round>), [std::ceil](<#/doc/numeric/math/ceil>), [std::floor](<#/doc/numeric/math/floor>), [std::trunc](<#/doc/numeric/math/trunc>).

Assim como com qualquer funcionalidade do [ambiente de ponto flutuante](<#/doc/numeric/fenv>), o arredondamento é garantido apenas se #pragma STDC FENV_ACCESS ON estiver definido.

Compiladores que não suportam o pragma podem oferecer suas próprias maneiras de suportar o modo de arredondamento atual. Por exemplo, Clang e GCC têm a opção `-frounding-math` destinada a desabilitar otimizações que alterariam o significado do código sensível ao arredondamento.

### Exemplo

Execute este código
```cpp
    #include <cfenv>
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    #include <string>
    // #pragma STDC FENV_ACCESS ON
     
    int main()
    {
        std::fesetround(FE_DOWNWARD);
        std::cout << "rounding down: \n" << std::setprecision(50)
                  << "         pi = " << std::acos(-1.f) << '\n'
                  << "stof(\"1.1\") = " << std::stof("1.1") << '\n'
                  << "  rint(2.1) = " << std::rint(2.1) << "\n\n";
        std::fesetround(FE_UPWARD);
        std::cout << "rounding up: \n"
                  << "         pi = " << std::acos(-1.f) << '\n'
                  << "stof(\"1.1\") = " << std::stof("1.1") << '\n'
                  << "  rint(2.1) = " << std::rint(2.1) << '\n';
    }
```

Saída:
```
    rounding down:
             pi = 3.141592502593994140625
    stof("1.1") = 1.099999904632568359375
      rint(2.1) = 2
     
    rounding up:
             pi = 3.1415927410125732421875
    stof("1.1") = 1.10000002384185791015625
      rint(2.1) = 3
```

### Veja também

[ float_round_style](<#/doc/types/numeric_limits/float_round_style>) | indica modos de arredondamento de ponto flutuante
(enum)
[ fegetroundfesetround](<#/doc/numeric/fenv/feround>)(C++11)(C++11) | obtém ou define a direção de arredondamento
(função)
[documentação C](<#/>) para macros de arredondamento de ponto flutuante