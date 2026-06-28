# Requisitos nomeados C++: SharedTimedMutex (desde C++14)

Os requisitos de **SharedTimedMutex** estendem os requisitos de [TimedMutex](<#/doc/named_req/TimedMutex>) para incluir o modo de posse de bloqueio compartilhado.

### Requisitos

  * [TimedMutex](<#/doc/named_req/TimedMutex>)
  * [SharedMutex](<#/doc/named_req/SharedMutex>)

Além disso, um objeto `m` do tipo SharedTimedMutex suporta operações compartilhadas com tempo limite:

  * A expressão m.try_lock_shared_for(duration) possui as seguintes propriedades

    

  * Comporta-se como uma operação atômica.
  * Tenta obter a posse compartilhada do mutex dentro da duração especificada por `duration`. Se `duration` for menor ou igual a `duration.zero()`, tenta obter a posse sem esperar (como se fosse por `try_lock()`). Caso contrário, esta função bloqueia até que o mutex seja adquirido ou até que o tempo especificado por `duration` passe. Ela retorna dentro de `duration` apenas se for bem-sucedida, mas é permitido que falhe ao adquirir o mutex mesmo que em algum momento durante `duration` ele não estivesse sendo possuído por outra thread. Em qualquer caso, ela retorna true se o mutex foi adquirido e false caso contrário.
  * Se `try_lock_shared_for(duration)` for bem-sucedida, operações `unlock()` anteriores no mesmo objeto _sincronizam-se com_ esta operação (equivalente a release-acquire [std::memory_order](<#/doc/atomic/memory_order>)).
  * O comportamento é indefinido se a thread chamadora já possui o mutex em qualquer modo.
  * Uma exceção pode ser lançada por clock, time point ou duration durante a execução (clocks, time points e durations fornecidos pela standard library nunca lançam exceções).
  * Se uma exceção for lançada, o bloqueio compartilhado não é adquirido.

  * A expressão m.try_lock_shared_until(time_point) possui as seguintes propriedades

    

  * Comporta-se como uma operação atômica.
  * Tenta obter a posse compartilhada do mutex dentro do tempo restante até `time_point`. Se `time_point` já tiver passado, tenta obter a posse sem bloquear (como se fosse por `try_lock()`). Caso contrário, esta função bloqueia até que o mutex seja adquirido ou até que o tempo especificado por `time_point` passe. Ela retorna antes de `time_point` apenas se for bem-sucedida, mas é permitido que falhe ao adquirir o mutex mesmo que em algum momento antes de `time_point` ele não estivesse sendo possuído por outra thread. Em qualquer caso, ela retorna true se o mutex foi adquirido e false caso contrário.
  * Se `try_lock_shared_until(time_point)` for bem-sucedida, operações `unlock()` anteriores no mesmo objeto _sincronizam-se com_ esta operação (equivalente a release-acquire [std::memory_order](<#/doc/atomic/memory_order>)).
  * O comportamento é indefinido se a thread chamadora já possui o mutex em qualquer modo.
  * Uma exceção pode ser lançada por clock, time point ou duration durante a execução (clocks, time points e durations fornecidos pela standard library nunca lançam exceções).
  * Se uma exceção for lançada, o bloqueio compartilhado não é adquirido.

### Standard library

Os seguintes tipos da standard library satisfazem os requisitos de SharedTimedMutex:

[ shared_timed_mutex](<#/doc/thread/shared_timed_mutex>)(C++14) | fornece facilidade de exclusão mútua compartilhada e implementa bloqueio com um tempo limite
(classe)

### Veja também

  * [Thread support library](<#/doc/atomic>)
  * [Mutex](<#/doc/named_req/Mutex>)
  * [TimedMutex](<#/doc/named_req/TimedMutex>)
  * [SharedMutex](<#/doc/named_req/SharedMutex>)

  *[_(as is)_]: A::pointer