# std::experimental::latch::count_down_and_wait

void count_down_and_wait(); | (1) | (concurrency TS)

Decrementa atomicamente o contador interno em `1` e (se necessário) bloqueia a thread chamadora até que o contador atinja zero.

O comportamento é indefinido se o contador interno já for zero.

Esta operação [sincroniza com](<#/doc/atomic/memory_order>) todas as chamadas que bloqueiam neste latch e todas as chamadas [`is_ready`](<#/doc/experimental/latch/is_ready>) neste latch que retornam `true`.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exceções

Não lança exceções.