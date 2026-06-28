# std::experimental::flex_barrier::arrive_and_wait

void arrive_and_wait(); |  |  (concurrency TS)  

  
Bloqueia e chega ao ponto de sincronização da `flex_barrier`.

O comportamento é indefinido se a thread chamadora não estiver no conjunto de threads participantes desta `flex_barrier`.

Chamadas para `arrive_and_wait` sincronizam com o início da fase de conclusão da `flex_barrier`. A conclusão da fase de conclusão sincroniza com o retorno da chamada.

Chamadas para `arrive_and_drop` e `arrive_and_wait` nunca introduzem condições de corrida (data races) entre si.

### Notas 

É seguro para uma thread chamar `arrive_and_wait()` ou `arrive_and_drop()` imediatamente após o retorno desta chamada (desde que o objeto de função para a fase de conclusão não tenha retornado zero). Não é necessário garantir que todas as threads bloqueadas tenham saído de `arrive_and_wait()` antes que uma thread a chame novamente.

A fase de conclusão executa o objeto de função especificado quando a `flex_barrier` foi construída. Se ele retornar -1, o conjunto de threads participantes permanece inalterado; caso contrário, o conjunto de threads participantes é um novo conjunto com o tamanho igual ao valor de retorno `N`, e consiste nas próximas `N` threads a chegarem ao ponto de sincronização. Se `N == 0`, a `flex_barrier` só pode ser destruída.

O conjunto inicial de threads participantes para uma `flex_barrier` construída para `num_threads` threads são as primeiras `num_threads` a chegarem ao seu ponto de sincronização.

### Exceções 

Não lança exceções.

### Veja também 

[ arrive_and_drop](<#/doc/experimental/flex_barrier/arrive_and_drop>) | chega ao ponto de sincronização e remove a thread atual do conjunto de threads participantes   
(função membro pública)  