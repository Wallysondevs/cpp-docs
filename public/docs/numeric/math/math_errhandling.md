# MATH_ERRNO, MATH_ERREXCEPT, math_errhandling

Definido no header `[<cmath>](<#/doc/header/cmath>)`
#define MATH_ERRNO 1 |  |  (desde C++11)  
---|---|---
#define MATH_ERREXCEPT 2 |  |  (desde C++11)  
#define math_errhandling /*implementation defined*/ |  |  (desde C++11)  

  
A macro constante `math_errhandling` expande para uma expressão do tipo int que é igual a `MATH_ERRNO`, ou igual a `MATH_ERREXCEPT`, ou igual ao seu OR bit a bit (MATH_ERRNO | MATH_ERREXCEPT).

O valor de `math_errhandling` indica o tipo de tratamento de erro que é realizado pelos operadores de ponto flutuante e [funções](<#/doc/numeric/math>): 

Constante  |  Explicação   
---|---
`MATH_ERREXCEPT` |  Indica que exceções de ponto flutuante são usadas: pelo menos [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>), [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>), e [FE_OVERFLOW](<#/doc/numeric/fenv/FE_exceptions>) são definidas em [`<cfenv>`](<#/doc/header/cfenv>).   
`MATH_ERRNO` |  Indica que operações de ponto flutuante usam a variável [errno](<#/doc/error/errno>) para reportar erros.   
  
Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559), `math_errhandling & MATH_ERREXCEPT` é requerido como não-zero.

As seguintes condições de erro de ponto flutuante são reconhecidas: 

Condição | Explicação | errno | Exceção de ponto flutuante | Exemplo   
---|---|---|---|---
Erro de domínio  | O argumento está fora do intervalo no qual a operação é matematicamente definida (a descrição de [cada função](<#/doc/numeric/math>) lista os erros de domínio requeridos)  | [EDOM](<#/doc/error/errno_macros>) | [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) | [std::acos](<#/doc/numeric/math/acos>)(2)  
Erro de polo  | O resultado matemático da função é exatamente infinito ou indefinido  | [ERANGE](<#/doc/error/errno_macros>) | [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) | [std::log](<#/doc/numeric/math/log>)(0.0), 1.0 / 0.0  
Erro de intervalo devido a overflow  | O resultado matemático é finito, mas torna-se infinito após arredondamento, ou torna-se o maior valor finito representável após arredondamento para baixo  | [ERANGE](<#/doc/error/errno_macros>) | [FE_OVERFLOW](<#/doc/numeric/fenv/FE_exceptions>) | [std::pow](<#/doc/numeric/math/pow>)([DBL_MAX](<#/doc/types/climits>), 2)  
Erro de intervalo devido a underflow  | O resultado é não-zero, mas torna-se zero após arredondamento, ou torna-se subnormal com perda de precisão  | [ERANGE](<#/doc/error/errno_macros>) ou inalterado (definido pela implementação)  | [FE_UNDERFLOW](<#/doc/numeric/fenv/FE_exceptions>) ou nada (definido pela implementação)  | [DBL_TRUE_MIN](<#/doc/types/climits>) / 2  
Resultado inexato  | O resultado precisa ser arredondado para caber no tipo de destino  | Inalterado  | [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) ou nada (não especificado)  | [std::sqrt](<#/doc/numeric/math/sqrt>)(2), 1.0 / 10.0  
  
### Notas

Se [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) é levantada pelas funções da biblioteca matemática é não especificado em geral, mas pode ser explicitamente especificado na descrição da função (por exemplo, [std::rint](<#/doc/numeric/math/rint>) vs [std::nearbyint](<#/doc/numeric/math/nearbyint>)).

Antes do C++11, exceções de ponto flutuante não eram especificadas, [EDOM](<#/doc/error/errno_macros>) era requerido para qualquer erro de domínio, [ERANGE](<#/doc/error/errno_macros>) era requerido para overflows e definido pela implementação para underflows.

### Exemplo

Execute este código
```
    #include <cerrno>
    #include <cfenv>
    #include <cmath>
    #include <cstring>
    #include <iostream>
    // #pragma STDC FENV_ACCESS ON
     
    int main()
    {
        std::cout << "MATH_ERRNO is "
                  << (math_errhandling & MATH_ERRNO ? "set" : "not set") << '\n'
                  << "MATH_ERREXCEPT is "
                  << (math_errhandling & MATH_ERREXCEPT ? "set" : "not set") << '\n';
        std::feclearexcept(FE_ALL_EXCEPT);
        errno = 0;
        std::cout <<  "log(0) = " << std::log(0) << '\n';
        if (errno == ERANGE)
            std::cout << "errno = ERANGE (" << std::strerror(errno) << ")\n";
        if (std::fetestexcept(FE_DIVBYZERO))
            std::cout << "FE_DIVBYZERO (pole error) reported\n";
    }
```

Saída possível: 
```
    MATH_ERRNO is set
    MATH_ERREXCEPT is set
    log(0) = -inf
    errno = ERANGE (Numerical result out of range)
    FE_DIVBYZERO (pole error) reported
```

### Veja também

[ FE_ALL_EXCEPTFE_DIVBYZEROFE_INEXACTFE_INVALIDFE_OVERFLOWFE_UNDERFLOW](<#/doc/numeric/fenv/FE_exceptions>)(C++11) |  exceções de ponto flutuante   
(macro constante)  
[ errno](<#/doc/error/errno>) |  macro que expande para uma variável de número de erro thread-local compatível com POSIX  
(macro variável)  
[documentação C](<#/>) para math_errhandling