# Requisitos nomeados C++: SharedMutex (desde C++17)

Os requisitos de **SharedMutex** estendem os requisitos de [Mutex](<#/doc/named_req/Mutex>) para incluir o modo de posse de bloqueio compartilhado.

### Requisitos

  * [Mutex](<#/doc/named_req/Mutex>)

Além disso, um objeto `m` do tipo SharedMutex suporta outro modo de posse: compartilhado. Múltiplas threads (ou, mais geralmente, agentes de execução) podem possuir este mutex simultaneamente no modo compartilhado, mas nenhuma thread pode obter posse compartilhada se houver uma thread que o possua no modo exclusivo, e nenhuma thread pode obter posse exclusiva se houver uma thread que o possua no modo compartilhado. Se mais do que um número de threads definido pela implementação (não menos que 10000) mantiver um bloqueio compartilhado, outra tentativa de adquirir o mutex no modo compartilhado bloqueia até que o número de possuidores compartilhados caia abaixo desse limite.

  * A expressão m.lock_shared() possui as seguintes propriedades:

    

  * Comporta-se como uma operação atômica.
  * Bloqueia a thread chamadora até que a posse compartilhada do mutex possa ser obtida.
  * Operações m.unlock() anteriores no mesmo mutex _sincronizam-se com_ esta operação de bloqueio (equivalente a release-acquire [std::memory_order](<#/doc/atomic/memory_order>)).
  * O comportamento é indefinido se a thread chamadora já possui o mutex em qualquer modo.
  * Se uma exceção for lançada, o bloqueio compartilhado não é adquirido.

  * A expressão m.try_lock_shared() possui as seguintes propriedades:

    

  * Comporta-se como uma operação atômica.
  * Tenta obter posse compartilhada do mutex para a thread chamadora sem bloquear. Se a posse não for obtida, retorna imediatamente. A função pode falhar espuriamente e retornar mesmo que o mutex não esteja atualmente possuído por nenhuma thread em qualquer modo.
  * Se `try_lock_shared()` for bem-sucedido, operações `unlock()` anteriores no mesmo objeto _sincronizam-se com_ esta operação (equivalente a release-acquire [std::memory_order](<#/doc/atomic/memory_order>)).
  * O comportamento é indefinido se a thread chamadora já possui o mutex em qualquer modo.

  * A expressão m.unlock_shared() possui as seguintes propriedades:

    

  * Comporta-se como uma operação atômica.
  * Libera a posse do mutex pela thread chamadora e _sincroniza-se com_ as operações de bloqueio bem-sucedidas subsequentes no mesmo objeto.
  * O comportamento é indefinido se a thread chamadora não possui o mutex.

  * Todas as operações de bloqueio e desbloqueio em um único mutex ocorrem em uma única ordem total.

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão satisfazem os requisitos de SharedMutex:

[ shared_mutex](<#/doc/thread/shared_mutex>)(C++17) | fornece facilidade de exclusão mútua compartilhada
(class)
[ shared_timed_mutex](<#/doc/thread/shared_timed_mutex>)(C++14) | fornece facilidade de exclusão mútua compartilhada e implementa bloqueio com um timeout
(class)

### Veja também

  * [Biblioteca de suporte a threads](<#/doc/atomic>)
  * [Mutex](<#/doc/named_req/Mutex>)
  * [TimedMutex](<#/doc/named_req/TimedMutex>)
  * [SharedTimedMutex](<#/doc/named_req/SharedTimedMutex>)

*[_(as is)_]: A::pointer