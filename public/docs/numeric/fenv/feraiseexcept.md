# std::feraiseexcept

Definido no cabeçalho `[<cfenv>](<#/doc/header/cfenv>)`

```c
int feraiseexcept( int excepts );
```

Tenta levantar todas as exceções de ponto flutuante listadas em `excepts` (um OR bit a bit das [macros de exceção de ponto flutuante](<#/doc/numeric/fenv/FE_exceptions>)). Se uma das exceções for [FE_OVERFLOW](<#/doc/numeric/fenv/FE_exceptions>) ou [FE_UNDERFLOW](<#/doc/numeric/fenv/FE_exceptions>), esta função pode adicionalmente levantar [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>). A ordem em que as exceções são levantadas é não especificada, exceto que [FE_OVERFLOW](<#/doc/numeric/fenv/FE_exceptions>) e [FE_UNDERFLOW](<#/doc/numeric/fenv/FE_exceptions>) são sempre levantadas antes de [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>).

### Parâmetros

- **excepts** — bitmask listando os flags de exceção a serem levantados

### Valor de retorno

​0​ se todas as exceções listadas foram levantadas, valor diferente de zero caso contrário.

### Exemplo

Execute este código
```
    #include <cfenv>
    #include <iostream>
     
    // #pragma STDC FENV_ACCESS ON
     
    int main()
    {
        std::feclearexcept(FE_ALL_EXCEPT);
        const int r = std::feraiseexcept(FE_UNDERFLOW | FE_DIVBYZERO);
        std::cout << "Raising divbyzero and underflow simultaneously "
                  << (r ? "fails" : "succeeds") << " and results in\n";
     
        const int e = std::fetestexcept(FE_ALL_EXCEPT);
        if (e & FE_DIVBYZERO)
            std::cout << "division by zero\n";
        if (e & FE_INEXACT)
            std::cout << "inexact\n";
        if (e & FE_INVALID)
            std::cout << "invalid\n";
        if (e & FE_UNDERFLOW)
            std::cout << "underflow\n";
        if (e & FE_OVERFLOW)
            std::cout << "overflow\n";
    }
```

Saída:
```
    Raising divbyzero and underflow simultaneously succeeds and results in
    division by zero
    underflow
```

### Veja também

[ feclearexcept](<#/doc/numeric/fenv/feclearexcept>)(C++11) | limpa os flags de status de ponto flutuante especificados
(função)
[ fetestexcept](<#/doc/numeric/fenv/fetestexcept>)(C++11) | determina quais dos flags de status de ponto flutuante especificados estão definidos
(função)
[Documentação C](<#/>) para feraiseexcept