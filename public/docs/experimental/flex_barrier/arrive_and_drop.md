# std::experimental::flex_barrier::arrive_and_drop

void arrive_and_drop(); |  |  (concurrency TS)  

  
Chega ao ponto de sincronização da `flex_barrier` e remove a thread atual do conjunto de threads participantes. Não é especificado se esta função bloqueia até que a fase de conclusão tenha terminado. Se a função bloquear, a thread chamadora pode ser escolhida para executar a fase de conclusão.

O comportamento é indefinido se a thread chamadora não estiver no conjunto de threads participantes desta `flex_barrier`.

Chamadas para `arrive_and_drop` sincronizam com o início da fase de conclusão da `flex_barrier`. Se a chamada bloquear, então a conclusão da fase de conclusão sincroniza com o retorno da chamada.

Chamadas para `arrive_and_drop` e `arrive_and_wait` nunca introduzem condições de corrida entre si ou umas com as outras.

### Exceções

Não lança exceções.

### Notas

A fase de conclusão será executada mesmo que todas as threads participantes chamem `arrive_and_drop`.

Depois que uma thread chama `arrive_and_drop` em uma `flex_barrier`, ela não pode chamar nenhuma função membro nessa barreira, exceto o destrutor, mesmo que o objeto de função invocado pela fase de conclusão retorne um valor positivo.

### Veja também

[ arrive_and_wait](<#/doc/experimental/flex_barrier/arrive_and_wait>) | chega ao ponto de sincronização e bloqueia   
(função membro pública)  