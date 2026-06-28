# Requisitos nomeados C++: SharedTimedLockable (desde C++14)

Os requisitos **SharedTimedLockable** descrevem as características de tipos que fornecem semânticas de bloqueio compartilhado com tempo limite para agentes de execução (threads, processos, tarefas).

### Requisitos

  * [SharedLockable](<#/doc/named_req/SharedLockable>)

Para que o tipo `L` seja SharedTimedLockable, dado

  * `rel_time`, um valor de uma especialização de [std::chrono::duration](<#/doc/chrono/duration>), e
  * `abs_time`, um valor de uma especialização de [std::chrono::time_point](<#/doc/chrono/time_point>),

as seguintes condições devem ser satisfeitas para um objeto `m` do tipo `L`:

Expressão | Requer | Valor de retorno
---|---|---
m.try_lock_shared_for(rel_time) | Bloqueia pela duração fornecida `rel_time` ou até que um lock em `m` seja adquirido. | true se o lock foi adquirido, false caso contrário.
m.try_lock_shared_until(abs_time) | Bloqueia até que o ponto no tempo fornecido `abs_time` seja atingido ou um lock em `m` seja adquirido. | true se o lock foi adquirido, false caso contrário.

### Notas

As funções membro `try_lock_shared_for` e `try_lock_shared_until` obtêm um lock compartilhado em m em caso de sucesso.

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão satisfazem os requisitos SharedTimedLockable:

[ shared_timed_mutex](<#/doc/thread/shared_timed_mutex>)(C++14) | fornece facilidade de exclusão mútua compartilhada e implementa bloqueio com um tempo limite
(classe)

### Veja também

  * [Thread support library](<#/doc/atomic>)
  * [SharedTimedMutex](<#/doc/named_req/SharedTimedMutex>)
  * [SharedLockable](<#/doc/named_req/SharedLockable>)

*[_(as is)_]: A::pointer