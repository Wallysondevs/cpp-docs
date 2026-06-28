# Header da standard library &lt;cfenv&gt; (C++11)

Este header estava originalmente na standard library C como [`<fenv.h>`](<#/>).

Este header faz parte da biblioteca de [ambiente de ponto flutuante](<#/doc/numeric/fenv>).

### Tipos

fenv_t(C++11) | o tipo que representa todo o ambiente de ponto flutuante
(typedef)
fexcept_t(C++11) | o tipo que representa todas as flags de status de ponto flutuante coletivamente
(typedef)

### Funções

[ feclearexcept](<#/doc/numeric/fenv/feclearexcept>)(C++11) | limpa as flags de status de ponto flutuante especificadas
(function)
[ fetestexcept](<#/doc/numeric/fenv/fetestexcept>)(C++11) | determina quais das flags de status de ponto flutuante especificadas estão ativadas
(function)
[ feraiseexcept](<#/doc/numeric/fenv/feraiseexcept>)(C++11) | levanta as exceções de ponto flutuante especificadas
(function)
[ fegetexceptflagfesetexceptflag](<#/doc/numeric/fenv/feexceptflag>)(C++11)(C++11) | copia o estado das flags de status de ponto flutuante especificadas de ou para o ambiente de ponto flutuante
(function)
[ fegetroundfesetround](<#/doc/numeric/fenv/feround>)(C++11)(C++11) | obtém ou define a direção de arredondamento
(function)
[ fegetenvfesetenv](<#/doc/numeric/fenv/feenv>)(C++11) | salva ou restaura o ambiente de ponto flutuante atual
(function)
[ feholdexcept](<#/doc/numeric/fenv/feholdexcept>)(C++11) | salva o ambiente, limpa todas as flags de status e ignora todos os erros futuros
(function)
[ feupdateenv](<#/doc/numeric/fenv/feupdateenv>)(C++11) | restaura o ambiente de ponto flutuante e levanta as exceções previamente levantadas
(function)

### Macros

[ FE_ALL_EXCEPTFE_DIVBYZEROFE_INEXACTFE_INVALIDFE_OVERFLOWFE_UNDERFLOW](<#/doc/numeric/fenv/FE_exceptions>)(C++11) | exceções de ponto flutuante
(macro constant)
[ FE_DOWNWARDFE_TONEARESTFE_TOWARDZEROFE_UPWARD](<#/doc/numeric/fenv/FE_round>)(C++11) | direção de arredondamento de ponto flutuante
(macro constant)
[ FE_DFL_ENV](<#/doc/numeric/fenv/FE_DFL_ENV>)(C++11) | ambiente de ponto flutuante padrão
(macro constant)

### Sinopse
```cpp
    #define FE_ALL_EXCEPT /* see description */
    #define FE_DIVBYZERO /* see description */    // optional
    #define FE_INEXACT /* see description */      // optional
    #define FE_INVALID /* see description */      // optional
    #define FE_OVERFLOW /* see description */     // optional
    #define FE_UNDERFLOW /* see description */    // optional
    
    #define FE_DOWNWARD /* see description */     // optional
    #define FE_TONEAREST /* see description */    // optional
    #define FE_TOWARDZERO /* see description */   // optional
    #define FE_UPWARD /* see description */       // optional
    
    #define FE_DFL_ENV /* see description */
    
    namespace std {
        // types
        using fenv_t    = /* object type */;
        using fexcept_t = /* object type */;
    
        // functions
        int feclearexcept(int except);
        int fegetexceptflag(fexcept_t* pflag, int except);
        int feraiseexcept(int except);
        int fesetexceptflag(const fexcept_t* pflag, int except);
        int fetestexcept(int except);
        int fegetround(void);
        int fesetround(int mode);
        int fegetenv(fenv_t* penv);
        int feholdexcept(fenv_t* penv);
        int fesetenv(const fenv_t* penv);
        int feupdateenv(const fenv_t* penv);
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3905](<https://cplusplus.github.io/LWG/issue3905>) | C++11 | `std::fexcept_t` deve ser um tipo inteiro | é um object type