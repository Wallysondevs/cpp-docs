# Ambiente de ponto flutuante (desde C++11)

O ambiente de ponto flutuante é o conjunto de flags de status de ponto flutuante e modos de controle suportados pela implementação. Ele é thread-local. Cada thread herda o estado inicial de seu ambiente de ponto flutuante da thread pai. Operações de ponto flutuante modificam as flags de status de ponto flutuante para indicar resultados anormais ou informações auxiliares. O estado dos modos de controle de ponto flutuante afeta os resultados de algumas operações de ponto flutuante.

O acesso e a modificação do ambiente de ponto flutuante são significativos apenas quando [` #pragma STDC FENV_ACCESS`](<#/doc/preprocessor/impl>) é suportado e está definido como `ON`. Caso contrário, a implementação é livre para assumir que os modos de controle de ponto flutuante são sempre os padrões e que as flags de status de ponto flutuante nunca são testadas ou modificadas. Na prática, poucos compiladores atuais, como HP aCC, Oracle Studio ou IBM XL, suportam o `#pragma` explicitamente, mas a maioria dos compiladores permite acesso significativo ao ambiente de ponto flutuante de qualquer forma.

### Tipos

Definido no header `[<cfenv>](<#/doc/header/cfenv>)`
---
fenv_t(C++11) | o tipo que representa todo o ambiente de ponto flutuante
(typedef)
fexcept_t(C++11) | o tipo que representa todas as flags de status de ponto flutuante coletivamente
(typedef)

### Funções

[ feclearexcept](<#/doc/numeric/fenv/feclearexcept>)(C++11) | limpa as flags de status de ponto flutuante especificadas
(function)
[ fetestexcept](<#/doc/numeric/fenv/fetestexcept>)(C++11) | determina quais das flags de status de ponto flutuante especificadas estão definidas
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

### Notas

As exceções de ponto flutuante não estão relacionadas às exceções C++. Quando uma operação de ponto flutuante levanta uma exceção de ponto flutuante, o status do ambiente de ponto flutuante muda, o que pode ser testado com [std::fetestexcept](<#/doc/numeric/fenv/fetestexcept>), mas a execução de um programa C++ na maioria das implementações continua ininterrupta.

Existem extensões de compilador que podem ser usadas para gerar exceções C++ automaticamente sempre que uma exceção de ponto flutuante é levantada:

* A função GNU libc [`feenableexcept()`](<https://www.gnu.org/savannah-checkouts/gnu/libc/manual/html_node/Control-Functions.html>) permite a captura de exceções de ponto flutuante, o que gera o sinal `SIGFPE`. Se a opção de compilador `-fnon-call-exceptions` foi usada, o handler para esse sinal pode lançar uma exceção C++ definida pelo usuário.
* A função MSVC [`_control87()`](<https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/control87-controlfp-control87-2>) permite a captura de exceções de ponto flutuante, o que gera uma exceção de hardware, que pode ser convertida em exceções C++ com [`_set_se_translator`](<https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/set-se-translator>).

### Veja também

[Documentação C](<#/>) para Ambiente de ponto flutuante
---