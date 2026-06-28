# Requisitos nomeados C++: TimedLockable (desde C++11)

Os requisitos **TimedLockable** descrevem as características de tipos que fornecem semânticas de bloqueio exclusivo temporizado para agentes de execução (threads, processos, tarefas).

### Requisitos

  * [Lockable](<#/doc/named_req/Lockable>)

Para que o tipo `L` seja TimedLockable, dado

  * `rel_time`, um valor de uma especialização de [std::chrono::duration](<#/doc/chrono/duration>), e
  * `abs_time`, um valor de uma especialização de [std::chrono::time_point](<#/doc/chrono/time_point>),

as seguintes condições devem ser satisfeitas para um objeto `m` do tipo `L`:

Expressão | Efeitos | Valor de retorno
---|---|---
m.try_lock_for(rel_time) | Bloqueia pela duração fornecida `rel_time` ou até que um lock em `m` seja adquirido. | true se o lock foi adquirido, false caso contrário.
m.try_lock_until(abs_time) | Bloqueia até que o ponto no tempo fornecido `abs_time` seja atingido ou um lock em `m` seja adquirido. | true se o lock foi adquirido, false caso contrário.

### Notas

As funções membro `try_lock_for` e `try_lock_until` obtêm um lock não compartilhado em m em caso de sucesso.

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão satisfazem TimedLockable:

[ timed_mutex](<#/doc/thread/timed_mutex>)(C++11) | fornece facilidade de exclusão mútua que implementa bloqueio com um timeout
(classe)
[ recursive_timed_mutex](<#/doc/thread/recursive_timed_mutex>)(C++11) | fornece facilidade de exclusão mútua que pode ser bloqueada recursivamente
pela mesma thread e implementa bloqueio com um timeout
(classe)
[ shared_timed_mutex](<#/doc/thread/shared_timed_mutex>)(C++14) | fornece facilidade de exclusão mútua compartilhada e implementa bloqueio com um timeout
(classe)

### Veja também

  * [Thread support library](<#/doc/atomic>)
  * [TimedMutex](<#/doc/named_req/TimedMutex>)
  * [Lockable](<#/doc/named_req/Lockable>)
  * [BasicLockable](<#/doc/named_req/BasicLockable>)