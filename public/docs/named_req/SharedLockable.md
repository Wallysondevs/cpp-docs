# Requisitos nomeados C++: SharedLockable (desde C++14)

Os requisitos **SharedLockable** descrevem as características mínimas de tipos que fornecem semânticas de bloqueio compartilhado para agentes de execução (ou seja, threads).

### Requisitos

Para que o tipo `L` seja SharedLockable, as seguintes condições devem ser satisfeitas para um objeto `m` do tipo `L`:

Expressão | Pré-condições | Efeitos | Valor de retorno
---|---|---|---
m.lock_shared() | | Bloqueia até que um lock possa ser obtido para o agente de execução atual (thread, processo, tarefa). Se uma exceção for lançada, nenhum lock é obtido. |
m.try_lock_shared() | | Tenta obter um lock para o agente de execução atual (thread, processo, tarefa) sem bloquear. Se uma exceção for lançada, nenhum lock é obtido. | true se o lock foi obtido, false caso contrário
m.unlock_shared() | O agente de execução atual possui um lock compartilhado em `m`. | Libera o lock compartilhado mantido pelo agente de execução. Não lança exceções. |

#### Locks compartilhados

Um lock em um objeto é considerado um _lock compartilhado_ se for adquirido por uma chamada às funções membro `lock_shared`, `try_lock_shared`, `try_lock_shared_for` ou `try_lock_shared_until`.

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão satisfazem os requisitos SharedLockable:

[ shared_mutex](<#/doc/thread/shared_mutex>)(desde C++17) | fornece facilidade de exclusão mútua compartilhada
(class)
[ shared_timed_mutex](<#/doc/thread/shared_timed_mutex>)(desde C++14) | fornece facilidade de exclusão mútua compartilhada e implementa bloqueio com um timeout
(class)

### Veja também

  * [Biblioteca de suporte a threads](<#/doc/atomic>)
  * [SharedTimedLockable](<#/doc/named_req/SharedTimedLockable>)
  * [SharedMutex](<#/doc/named_req/SharedMutex>)

*[_(as is)_]: A::pointer