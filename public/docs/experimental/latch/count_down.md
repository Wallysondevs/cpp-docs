# std::experimental::latch::count_down

void count_down( ptrdiff_t n = 1 ); |  (1)  |  (concurrency TS)  

  
Decrementa atomicamente o contador interno por n sem bloquear o chamador.

Se n for maior que o valor do contador interno ou for negativo, o comportamento é indefinido.

Esta operação [sincroniza com](<#/doc/atomic/memory_order>) todas as chamadas que bloqueiam neste latch e todas as chamadas [`is_ready`](<#/doc/experimental/latch/is_ready>) neste latch que retornam true.

### Parâmetros

n  |  \-  |  o valor pelo qual o contador interno é diminuído   
  
### Valor de retorno

(nenhum) 

### Exceções

Não lança exceções.