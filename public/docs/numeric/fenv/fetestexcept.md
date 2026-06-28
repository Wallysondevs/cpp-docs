# std::fetestexcept

Definido no cabeçalho `[<cfenv>](<#/doc/header/cfenv>)`

```c
int fetestexcept( int excepts );
```

Determina quais do subconjunto especificado de exceções de ponto flutuante estão atualmente ativadas. O argumento `excepts` é um OR bit a bit das [macros de exceção de ponto flutuante](<#/doc/numeric/fenv/FE_exceptions>).

### Parâmetros

- **excepts** — bitmask listando os flags de exceção a serem testados

### Valor de retorno

OR bit a bit das macros de exceção de ponto flutuante que estão incluídas em `excepts` e correspondem às exceções de ponto flutuante atualmente ativadas.

### Exemplo

Execute este código
```cpp
    #include <cfenv>
    #include <cmath>
    #include <iostream>
    
    // #pragma STDC FENV_ACCESS ON
    
    volatile double zero = 0.0; // volatile não é necessário onde FENV_ACCESS é suportado
    volatile double one = 1.0;  // volatile não é necessário onde FENV_ACCESS é suportado
    
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

[feclearexcept](<#/doc/numeric/fenv/feclearexcept>)(C++11) | limpa os flags de status de ponto flutuante especificados
(função)
[Documentação C](<#/>) para fetestexcept