# FE_DIVBYZERO, FE_INEXACT, FE_INVALID, FE_OVERFLOW, FE_UNDERFLOW, FE_ALL_EXCEPT

Definido no cabeçalho `[<cfenv>](<#/doc/header/cfenv>)`

```c
#define FE_DIVBYZERO /*implementation defined power of 2*/
#define FE_INEXACT /*implementation defined power of 2*/
#define FE_INVALID /*implementation defined power of 2*/
#define FE_OVERFLOW /*implementation defined power of 2*/
#define FE_UNDERFLOW /*implementation defined power of 2*/
#define FE_ALL_EXCEPT FE_DIVBYZERO
FE_INVALID
FE_UNDERFLOW
```

Todas essas constantes de macro (exceto `FE_ALL_EXCEPT`) expandem para expressões constantes inteiras que são potências distintas de 2, as quais identificam unicamente todas as exceções de ponto flutuante suportadas. Cada macro é definida apenas se for suportada.

A constante de macro `FE_ALL_EXCEPT`, que expande para o OR bit a bit de todas as outras `FE_*`, é sempre definida e é zero se as exceções de ponto flutuante não forem suportadas pela implementação.

Constante | Explicação
---|---
`FE_DIVBYZERO` | erro de polo ocorreu em uma operação de ponto flutuante anterior
`FE_INEXACT` | resultado inexato: arredondamento foi necessário para armazenar o resultado de uma operação de ponto flutuante anterior
`FE_INVALID` | erro de domínio ocorreu em uma operação de ponto flutuante anterior
`FE_OVERFLOW` | o resultado da operação de ponto flutuante anterior era muito grande para ser representável
`FE_UNDERFLOW` | o resultado da operação de ponto flutuante anterior era subnormal com perda de precisão
`FE_ALL_EXCEPT` | OR bit a bit de todas as exceções de ponto flutuante suportadas

A implementação pode definir constantes de macro adicionais em [`<cfenv>`](<#/doc/header/cfenv>) para identificar exceções de ponto flutuante adicionais. Todas essas constantes começam com `FE_` seguidas por pelo menos uma letra maiúscula.

Veja [math_errhandling](<#/doc/numeric/math/math_errhandling>) para mais detalhes.

### Exemplo

Execute este código
```cpp
    #include <cfenv>
    #include <cmath>
    #include <iostream>
    
    // #pragma STDC FENV_ACCESS ON
    
    volatile double zero = 0.0; // volatile not needed where FENV_ACCESS is supported
    volatile double one = 1.0;  // volatile not needed where FENV_ACCESS is supported
    
    int main()
    {
        std::feclearexcept(FE_ALL_EXCEPT);
        std::cout <<  "1.0/0.0 = " << 1.0 / zero << '\n';
        if (std::fetestexcept(FE_DIVBYZERO))
            std::cout << "division by zero reported\n";
        else
            std::cout << "division by zero not reported\n";
    
        std::feclearexcept(FE_ALL_EXCEPT);
        std::cout << "1.0/10 = " << one / 10 << '\n';
        if (std::fetestexcept(FE_INEXACT))
            std::cout << "inexact result reported\n";
        else
            std::cout << "inexact result not reported\n";
    
        std::feclearexcept(FE_ALL_EXCEPT);
        std::cout << "sqrt(-1) = " << std::sqrt(-1) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "invalid result reported\n";
        else
            std::cout << "invalid result not reported\n";
    }
```

Saída possível:
```
    1.0/0.0 = inf
    division by zero reported
    1.0/10 = 0.1
    inexact result reported
    sqrt(-1) = -nan
    invalid result reported
```

### Veja também

[ math_errhandlingMATH_ERRNOMATH_ERREXCEPT](<#/doc/numeric/math/math_errhandling>)(C++11)(C++11)(C++11) | define o mecanismo de tratamento de erros usado pelas funções matemáticas comuns
(constante de macro)
[Documentação C](<#/>) para macros de exceção de ponto flutuante