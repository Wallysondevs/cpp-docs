# std::feclearexcept

Definido no cabeçalho `[<cfenv>](<#/doc/header/cfenv>)`

```c
int feclearexcept( int excepts );
```

  
Tenta limpar as exceções de ponto flutuante que estão listadas no argumento bitmask `excepts`, que é um OR bit a bit das [macros de exceção de ponto flutuante](<#/doc/numeric/fenv/FE_exceptions>). 

### Parâmetros

excepts  |  \-  |  bitmask listando os flags de exceção a serem limpos   
  
### Valor de retorno

​0​ se todas as exceções indicadas foram limpas com sucesso ou se `excepts` for zero. Retorna um valor diferente de zero em caso de erro. 

### Exemplo

Execute este código
```
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

[ fetestexcept](<#/doc/numeric/fenv/fetestexcept>)(C++11) |  determina quais dos flags de status de ponto flutuante especificados estão definidos   
(função)  
[Documentação C](<#/>) para feclearexcept