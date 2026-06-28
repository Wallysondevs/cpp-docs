# std::experimental::latch::~latch

~latch(); | | (concurrency TS)

Destrói o latch.

O comportamento é indefinido se uma thread estiver bloqueada no ponto de sincronização.

O destrutor pode ser chamado mesmo que nem todas as threads tenham retornado de `wait()` ou `count_down_and_wait()`, desde que o contador interno seja igual a zero.

O destrutor pode bloquear até que todas as threads tenham retornado das funções de bloqueio.

Nenhuma thread tem permissão para bloquear neste latch depois que uma thread invocou o destrutor.