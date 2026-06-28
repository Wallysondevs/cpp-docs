# Cabeçalho da biblioteca padrão &lt;csignal&gt;

Este cabeçalho estava originalmente na biblioteca padrão C como [`<signal.h>`](<#/>).

Este cabeçalho faz parte da biblioteca de [suporte a programa](<#/doc/utility/program>).

### Tipos
  
---  
[ sig_atomic_t](<#/doc/utility/program/sig_atomic_t>) | o tipo inteiro que pode ser acessado como uma entidade atômica a partir de um manipulador de sinal assíncrono
(typedef)
  
### Macros
  
[ SIGABRTSIGFPESIGILLSIGINTSIGSEGVSIGTERM](<#/doc/utility/program/SIG_types>) | define tipos de sinal
(macro constant)
[ SIG_DFLSIG_IGN](<#/doc/utility/program/SIG_strategies>) | define estratégias de manipulação de sinal
(macro constant)
[ SIG_ERR](<#/doc/utility/program/SIG_ERR>) | valor de retorno de [`signal`](<#/doc/utility/program/signal>) especificando que um erro foi encontrado
(macro constant)
  
### Funções
  
[ signal](<#/doc/utility/program/signal>) | define um manipulador de sinal para um sinal específico
(function)
[ raise](<#/doc/utility/program/raise>) | executa o manipulador de sinal para um sinal específico
(function)
  
### Sinopse
```cpp
    namespace std {
      using sig_atomic_t = /*see description*/ ;
      extern "C" using /*signal-handler*/ = void(int); // exposition only
      /*signal-handler*/ * signal(int sig, /*signal-handler*/ * func);
    }
    #define SIG_DFL  /* see description */
    #define SIG_ERR  /* see description */
    #define SIG_IGN  /* see description */
    #define SIGABRT  /* see description */
    #define SIGFPE   /* see description */
    #define SIGILL   /* see description */
    #define SIGINT   /* see description */
    #define SIGSEGV  /* see description */
    #define SIGTERM  /* see description */
```