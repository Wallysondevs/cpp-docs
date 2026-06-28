# Requisitos nomeados C++: BasicLockable (desde C++11)

Os requisitos **BasicLockable** descrevem as características mínimas de tipos que fornecem semânticas de bloqueio exclusivo para agentes de execução (ou seja, threads).

### Requisitos

Para que o tipo `L` seja BasicLockable, as seguintes condições devem ser satisfeitas para um objeto `m` do tipo `L`:

Expressão | Pré-condições | Efeitos
---|---|---
m.lock() | | Bloqueia até que um lock possa ser adquirido para o agente de execução atual (thread, processo, tarefa). Se uma exceção for lançada, nenhum lock é adquirido.
m.unlock() | O agente de execução atual possui um lock não compartilhado em `m`. | Libera o lock não compartilhado mantido pelo agente de execução. Não lança exceções.

#### Locks não compartilhados

Um lock em um objeto é considerado um _lock não compartilhado_ se for adquirido por uma chamada às funções membro `lock`, `try_lock`, `try_lock_for` ou `try_lock_until`.

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão satisfazem os requisitos BasicLockable:

[ mutex](<#/doc/thread/mutex>)(C++11) | fornece facilidade básica de exclusão mútua
(class)
[ recursive_mutex](<#/doc/thread/recursive_mutex>)(C++11) | fornece facilidade de exclusão mútua que pode ser bloqueada recursivamente pela mesma thread
(class)
[ recursive_timed_mutex](<#/doc/thread/recursive_timed_mutex>)(C++11) | fornece facilidade de exclusão mútua que pode ser bloqueada recursivamente
pela mesma thread e implementa bloqueio com um timeout
(class)
[ shared_mutex](<#/doc/thread/shared_mutex>)(C++17) | fornece facilidade de exclusão mútua compartilhada
(class)
[ shared_timed_mutex](<#/doc/thread/shared_timed_mutex>)(C++14) | fornece facilidade de exclusão mútua compartilhada e implementa bloqueio com um timeout
(class)
[ timed_mutex](<#/doc/thread/timed_mutex>)(C++11) | fornece facilidade de exclusão mútua que implementa bloqueio com um timeout
(class)

### Veja também

  * [Biblioteca de suporte a threads](<#/doc/atomic>)
  * [Mutex](<#/doc/named_req/Mutex>)
  * [Lockable](<#/doc/named_req/Lockable>)
  * [TimedLockable](<#/doc/named_req/TimedLockable>)

  *[_(as is)_]: A::pointer