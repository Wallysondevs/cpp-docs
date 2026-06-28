# Requisitos nomeados C++: Lockable (desde C++11)

Os requisitos **Lockable** estendem os requisitos [BasicLockable](<#/doc/named_req/BasicLockable>) para incluir tentativas de bloqueio.

### Requisitos

  * [BasicLockable](<#/doc/named_req/BasicLockable>)

Para que o tipo `L` seja Lockable, ele deve atender à condição acima, bem como ao seguinte:

Expressão | Efeitos | Valor de retorno
---|---|---
m.try_lock() | Tenta adquirir o bloqueio para o agente de execução atual (thread, processo, tarefa) sem bloquear. Se uma exceção for lançada, nenhum bloqueio é obtido. | true se o bloqueio foi adquirido, false caso contrário

### Notas

A função membro `try_lock` obtém um bloqueio não compartilhado em m em caso de sucesso.

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão satisfazem os requisitos Lockable:

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
  * [BasicLockable](<#/doc/named_req/BasicLockable>)
  * [TimedLockable](<#/doc/named_req/TimedLockable>)

  *[_(as is)_]: A::pointer