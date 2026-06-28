# std::experimental::barrier::arrive_and_drop

void arrive_and_drop(); | | (concurrency TS)

Chega ao ponto de sincronização da barrier e remove a thread atual do conjunto de threads participantes. Não é especificado se esta função bloqueia até que a fase de conclusão tenha terminado.

O comportamento é indefinido se a thread chamadora não estiver no conjunto de threads participantes desta barrier.

Chamadas para `arrive_and_drop` se sincronizam com o início da fase de conclusão da barrier. Se a chamada bloquear, então a conclusão da fase de conclusão se sincroniza com o retorno da chamada.

Chamadas para `arrive_and_drop` e `arrive_and_wait` nunca introduzem condições de corrida (data races) entre si ou umas com as outras.

### Exceções

Não lança exceções.

### Observações

Se todas as threads participantes chamarem `arrive_and_drop()`, a barrier só poderá ser destruída.

Depois que uma thread chama `arrive_and_drop()` em uma barrier, ela não é mais um membro de seu conjunto de threads participantes e, portanto, não pode mais chamar `arrive_and_drop()` ou `arrive_and_wait()` na mesma barrier.

### Veja também

[ arrive_and_wait](<#/doc/experimental/barrier/arrive_and_wait>) | chega ao ponto de sincronização e bloqueia
(função membro pública)