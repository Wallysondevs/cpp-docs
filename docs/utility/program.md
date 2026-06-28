# Utilitários de suporte ao programa

### Terminação do programa
As seguintes funções gerenciam a terminação do programa e a limpeza de recursos.

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`
---
[ abort](<#/doc/utility/program/abort>) | causa a terminação anormal do programa (sem limpeza)
(função)
[ exit](<#/doc/utility/program/exit>) | causa a terminação normal do programa com limpeza
(função)
[ quick_exit](<#/doc/utility/program/quick_exit>)(desde C++11) | causa a terminação rápida do programa sem limpeza completa
(função)
[ _Exit](<#/doc/utility/program/_Exit>)(desde C++11) | causa a terminação normal do programa sem limpeza
(função)
[ atexit](<#/doc/utility/program/atexit>) | registra uma função a ser chamada na invocação de [std::exit()](<#/doc/utility/program/exit>)
(função)
[ at_quick_exit](<#/doc/utility/program/at_quick_exit>)(desde C++11) | registra uma função a ser chamada na invocação de [std::quick_exit](<#/doc/utility/program/quick_exit>)
(função)
[ EXIT_SUCCESSEXIT_FAILURE](<#/doc/utility/program/EXIT_status>) | indica o status de execução do programa
(macro constante)

### Fluxo de controle inatingível

| Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`
---
[ unreachable](<#/doc/utility/unreachable>)(desde C++23) | marca um ponto de execução inatingível
(função)
(desde C++23)

### Comunicando com o ambiente

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`
---
[ system](<#/doc/utility/program/system>) | chama o processador de comandos do ambiente hospedeiro
(função)
[ getenv](<#/doc/utility/program/getenv>) | acesso à lista de variáveis de ambiente
(função)

### Sinais

Várias funções e macros constantes para gerenciamento de sinais são fornecidas.

Definido no cabeçalho `[<csignal>](<#/doc/header/csignal>)`
---
[ signal](<#/doc/utility/program/signal>) | define um manipulador de sinal para um sinal específico
(função)
[ raise](<#/doc/utility/program/raise>) | executa o manipulador de sinal para um sinal específico
(função)
[ sig_atomic_t](<#/doc/utility/program/sig_atomic_t>) | o tipo inteiro que pode ser acessado como uma entidade atômica a partir de um manipulador de sinal assíncrono
(typedef)
[ SIG_DFLSIG_IGN](<#/doc/utility/program/SIG_strategies>) | define estratégias de manipulação de sinal
(macro constante)
[ SIG_ERR](<#/doc/utility/program/SIG_ERR>) | valor de retorno de [`signal`](<#/doc/utility/program/signal>) especificando que um erro foi encontrado
(macro constante)

##### Tipos de sinal

[ SIGABRTSIGFPESIGILLSIGINTSIGSEGVSIGTERM](<#/doc/utility/program/SIG_types>) | define tipos de sinal
(macro constante)

### Saltos não locais

Definido no cabeçalho `[<csetjmp>](<#/doc/header/csetjmp>)`
---
[ setjmp](<#/doc/utility/program/setjmp>) | salva o contexto
(macro de função)
[ longjmp](<#/doc/utility/program/longjmp>) | salta para o local especificado
(função)

##### Tipos

[ jmp_buf](<#/doc/utility/program/jmp_buf>) | tipo de contexto de execução
(typedef)

### Ver também

[Documentação C](<#/>) para Utilitários de suporte ao programa
---