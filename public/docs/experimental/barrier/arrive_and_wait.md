# std::experimental::barrier::arrive_and_wait

void arrive_and_wait(); |  |  (concurrency TS)  

  
Bloqueia e chega no ponto de sincronização da barrier.

O comportamento é indefinido se a thread chamadora não estiver no conjunto de threads participantes desta barrier.

Chamadas para `arrive_and_wait` sincronizam com o início da fase de conclusão da barrier. A conclusão da fase de conclusão sincroniza com o retorno da chamada.

Chamadas para `arrive_and_drop` e `arrive_and_wait` nunca introduzem data races entre si ou umas com as outras.

### Notas 

É seguro para uma thread chamar `arrive_and_wait()` ou `arrive_and_drop()` imediatamente após o retorno desta chamada. Não é necessário garantir que todas as threads bloqueadas tenham saído de `arrive_and_wait()` antes que uma thread a chame novamente.

O conjunto de threads participantes para uma `barrier` construída para `num_threads` threads são as primeiras `num_threads` a chegar ao seu ponto de sincronização. Este conjunto não muda de ciclo para ciclo, exceto por threads removidas do conjunto devido a chamadas de `arrive_and_drop()`.

### Exceções 

Não lança exceções.

### Ver também 

[ arrive_and_drop](<#/doc/experimental/barrier/arrive_and_drop>) | chega ao ponto de sincronização e remove a thread atual do conjunto de threads participantes   
(public member function)  