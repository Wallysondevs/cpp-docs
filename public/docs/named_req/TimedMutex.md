# Requisitos nomeados C++: TimedMutex (desde C++11)

Os requisitos de **TimedMutex** estendem os requisitos de [TimedLockable](<#/doc/named_req/TimedLockable>) para incluir sincronização entre threads.

### Requisitos

  * [TimedLockable](<#/doc/named_req/TimedLockable>)
  * [Mutex](<#/doc/named_req/Mutex>)

Além disso, para um objeto `m` do tipo TimedMutex:

  * A expressão m.try_lock_for(duration) possui as seguintes propriedades

    

  * Comporta-se como uma operação atômica.
  * Tenta obter a propriedade exclusiva do mutex dentro da duração especificada por `duration`. Se `duration` for menor ou igual a `duration.zero()`, tenta obter a propriedade sem bloquear (como se fosse por `try_lock()`). Caso contrário, esta função bloqueia até que o mutex seja adquirido ou até que o tempo especificado por `duration` passe. Ela retorna dentro de `duration` apenas se for bem-sucedida, mas é permitido que ela falhe em adquirir o mutex mesmo que em algum momento durante `duration` ele não estivesse sendo possuído por outra thread. Em qualquer caso, ela retorna true se o mutex foi adquirido e false caso contrário.
  * Se `try_lock_for(duration)` for bem-sucedida, operações `unlock()` anteriores no mesmo objeto _sincronizam-se com_ esta operação (equivalente a release-acquire [std::memory_order](<#/doc/atomic/memory_order>)).
  * O comportamento é indefinido se a thread chamadora já possui o mutex (exceto se m for [std::recursive_timed_mutex](<#/doc/thread/recursive_timed_mutex>)).
  * Uma exceção pode ser lançada por clock, time point ou duration durante a execução (clocks, time points e durations fornecidos pela standard library nunca lançam exceções).

  * A expressão m.try_lock_until(time_point) possui as seguintes propriedades

    

  * Comporta-se como uma operação atômica.
  * Tenta obter a propriedade exclusiva do mutex dentro do tempo restante até `time_point`. Se `time_point` já tiver passado, tenta obter a propriedade sem bloquear (como se fosse por `try_lock()`). Caso contrário, esta função bloqueia até que o mutex seja adquirido ou até que o tempo especificado por `time_point` passe. Ela retorna antes de `time_point` apenas se for bem-sucedida, mas é permitido que ela falhe em adquirir o mutex mesmo que em algum momento antes de `time_point` ele não estivesse sendo possuído por outra thread. Em qualquer caso, ela retorna true se o mutex foi adquirido e false caso contrário.
  * Se `try_lock_until(time_point)` for bem-sucedida, operações `unlock()` anteriores no mesmo objeto _sincronizam-se com_ esta operação (equivalente a release-acquire [std::memory_order](<#/doc/atomic/memory_order>)).
  * O comportamento é indefinido se a thread chamadora já possui o mutex (exceto se m for [std::recursive_timed_mutex](<#/doc/thread/recursive_timed_mutex>)).
  * Uma exceção pode ser lançada por clock, time point ou duration durante a execução (clocks, time points e durations fornecidos pela standard library nunca lançam exceções).

### Standard library

Os seguintes tipos da standard library satisfazem os requisitos de TimedMutex:

[ recursive_timed_mutex](<#/doc/thread/recursive_timed_mutex>)(C++11) | fornece facilidade de exclusão mútua que pode ser bloqueada recursivamente pela mesma thread e implementa bloqueio com um timeout (classe)
---|---
[ shared_timed_mutex](<#/doc/thread/shared_timed_mutex>)(C++14) | fornece facilidade de exclusão mútua compartilhada e implementa bloqueio com um timeout (classe)
[ timed_mutex](<#/doc/thread/timed_mutex>)(C++11) | fornece facilidade de exclusão mútua que implementa bloqueio com um timeout (classe)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2093](<https://cplusplus.github.io/LWG/issue2093>) | C++11 | exceções relacionadas a timeout estavam ausentes na especificação | mencionadas

### Veja também

  * [Thread support library](<#/doc/atomic>)
  * [TimedLockable](<#/doc/named_req/TimedLockable>)
  * [Mutex](<#/doc/named_req/Mutex>)

  *[_(as is)_]: A::pointer