# Requisitos nomeados C++: Mutex (desde C++11)

Os requisitos de **Mutex** estendem os requisitos de [Lockable](<#/doc/named_req/Lockable>) para incluir sincronização entre threads.

### Requisitos

  * [Lockable](<#/doc/named_req/Lockable>)
  * [DefaultConstructible](<#/doc/named_req/DefaultConstructible>)
  * [Destructible](<#/doc/named_req/Destructible>)
  * não copiável
  * não movível

Para um objeto `m` do tipo Mutex:

  * A expressão m.lock() possui as seguintes propriedades

    

  * Comporta-se como uma operação atômica.
  * Bloqueia a thread chamadora até que a posse exclusiva do mutex possa ser obtida.
  * Operações m.unlock() anteriores no mesmo mutex _sincronizam-com_ esta operação de lock (equivalente a release-acquire [std::memory_order](<#/doc/atomic/memory_order>)).
  * O comportamento é indefinido se a thread chamadora já possui o mutex (exceto se m for [std::recursive_mutex](<#/doc/thread/recursive_mutex>) ou [std::recursive_timed_mutex](<#/doc/thread/recursive_timed_mutex>)).
  * Exceção do tipo [std::system_error](<#/doc/error/system_error>) pode ser lançada em caso de erros, com os seguintes códigos de erro:

    

  * [std::errc::operation_not_permitted](<#/doc/error/errc>) se a thread chamadora não tiver os privilégios necessários.
  * [std::errc::resource_deadlock_would_occur](<#/doc/error/errc>) se a implementação detectar que esta operação levaria a um deadlock.

  * A expressão m.try_lock() possui as seguintes propriedades

    

  * Comporta-se como uma operação atômica.
  * Tenta obter a posse exclusiva do mutex para a thread chamadora sem bloquear. Se a posse não for obtida, retorna imediatamente. A função pode falhar e retornar espuriamente mesmo que o mutex não esteja atualmente possuído por outra thread.
  * Se `try_lock()` for bem-sucedido, operações `unlock()` anteriores no mesmo objeto _sincronizam-com_ esta operação (equivalente a release-acquire [std::memory_order](<#/doc/atomic/memory_order>)). `lock()` não sincroniza com um `try_lock()` falho.
  * Não lança exceções.

  * A expressão m.unlock() possui as seguintes propriedades

    

  * Comporta-se como uma operação atômica.
  * Libera a posse do mutex pela thread chamadora e _sincroniza-com_ as operações de lock bem-sucedidas subsequentes no mesmo objeto.
  * O comportamento é indefinido se a thread chamadora não possui o mutex.
  * Não lança exceções.

  * Todas as operações de lock e unlock em um único mutex ocorrem em uma única ordem total que pode ser vista como a [ordem de modificação](<#/doc/atomic/memory_order>) de uma variável atômica: a ordem é específica para este mutex individual.

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão satisfazem os requisitos de Mutex:

[ mutex](<#/doc/thread/mutex>)(C++11) | fornece facilidade básica de exclusão mútua
(classe)
[ recursive_mutex](<#/doc/thread/recursive_mutex>)(C++11) | fornece facilidade de exclusão mútua que pode ser bloqueada recursivamente pela mesma thread
(classe)
[ recursive_timed_mutex](<#/doc/thread/recursive_timed_mutex>)(C++11) | fornece facilidade de exclusão mútua que pode ser bloqueada recursivamente pela mesma thread e implementa bloqueio com um timeout
(classe)
[ shared_mutex](<#/doc/thread/shared_mutex>)(C++17) | fornece facilidade de exclusão mútua compartilhada
(classe)
[ shared_timed_mutex](<#/doc/thread/shared_timed_mutex>)(C++14) | fornece facilidade de exclusão mútua compartilhada e implementa bloqueio com um timeout
(classe)
[ timed_mutex](<#/doc/thread/timed_mutex>)(C++11) | fornece facilidade de exclusão mútua que implementa bloqueio com um timeout
(classe)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2309](<https://cplusplus.github.io/LWG/issue2309>) | C++11 | `lock` poderia lançar [std::system_error](<#/doc/error/system_error>) com código de erro [std::errc::device_or_resource_busy](<#/doc/error/errc>) | não permitido

### Ver também

  * [Biblioteca de suporte a threads](<#/doc/atomic>)
  * [Lockable](<#/doc/named_req/Lockable>)
  * [TimedMutex](<#/doc/named_req/TimedMutex>)

  *[_(como está)_]: A::pointer