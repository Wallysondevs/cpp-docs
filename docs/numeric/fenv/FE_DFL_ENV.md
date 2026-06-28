# FE_DFL_ENV

Definido no cabeçalho `[<cfenv>](<#/doc/header/cfenv>)`

```c
#define FE_DFL_ENV /*implementation defined*/
```

A macro constante `FE_DFL_ENV` expande para uma expressão do tipo const [std::fenv_t](<#/doc/numeric/fenv>)*, que aponta para uma cópia completa do ambiente de ponto flutuante padrão, ou seja, o ambiente como carregado na inicialização do programa.

Macros adicionais que começam com `FE_` seguidas por letras maiúsculas, e que possuem o tipo const [std::fenv_t](<#/doc/numeric/fenv>)*, podem ser suportadas por uma implementação.

### Exemplo

Execute este código
```cpp
    #include <cfenv>
    #include <iostream>
    // #pragma STDC FENV_ACCESS ON
    
    void show_env()
    {
        const int e = std::fetestexcept(FE_ALL_EXCEPT);
        if (e & FE_DIVBYZERO)
            std::cout << "division by zero is raised\n";
        if (e & FE_INEXACT)
            std::cout << "inexact is raised\n";
        if (e & FE_INVALID)
            std::cout << "invalid is raised\n";
        if (e & FE_UNDERFLOW)
            std::cout << "underflow is raised\n";
        if (e & FE_OVERFLOW)
            std::cout << "overflow is raised\n";
    
        switch (std::fegetround())
        {  
            case FE_DOWNWARD:
                std::cout << "rounding down\n";
                break;
            case FE_TONEAREST:
                std::cout << "rounding to nearest\n";
                break;
            case FE_TOWARDZERO:
                std::cout << "rounding to zero\n";
                break;
            case FE_UPWARD:
                std::cout << "rounding up\n";
                break;
        }
    }
    
    int main()
    {
        std::cout << "On startup:\n";
        show_env();
    
        std::feraiseexcept(FE_UNDERFLOW | FE_OVERFLOW);
        std::fesetround(FE_UPWARD);
    
        std::cout << "\nBefore restoration:\n";
        show_env();
    
        std::fesetenv(FE_DFL_ENV);
    
        std::cout << "\nAfter reset to default:\n";
        show_env();
    }
```

Saída:
```
    On startup: 
    rounding to nearest
    
    Before restoration: 
    underflow is raised
    overflow is raised
    rounding up
    
    After reset to default: 
    rounding to nearest
```

### Veja também

[ fegetenvfesetenv](<#/doc/numeric/fenv/feenv>)(C++11) | salva ou restaura o ambiente de ponto flutuante atual
(função)
[ feupdateenv](<#/doc/numeric/fenv/feupdateenv>)(C++11) | restaura o ambiente de ponto flutuante e levanta as exceções previamente levantadas
(função)
[Documentação C](<#/>) para FE_DFL_ENV