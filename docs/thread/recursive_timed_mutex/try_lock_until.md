# std::recursive_timed_mutex::try_lock_until

```cpp
template< class Clock, class Duration >
bool try_lock_until( const std::chrono::time_point<Clock, Duration>& timeout_time );  // (desde C++11)
```

  
Tenta bloquear o mutex. Bloqueia até que o `timeout_time` especificado seja atingido (timeout) ou o bloqueio seja adquirido (possui o mutex), o que ocorrer primeiro. Em caso de aquisição bem-sucedida do bloqueio, retorna `true`, caso contrário, retorna `false`.

Se `timeout_time` já tiver passado, esta função se comporta como [try_lock()](<#/doc/thread/recursive_timed_mutex/try_lock>).

`Clock` deve atender aos requisitos de [Clock](<#/doc/named_req/Clock>). O programa é malformado se [std::chrono::is_clock_v](<#/doc/chrono/is_clock>)&lt;Clock&gt; for `false`. (desde C++20)

O padrão recomenda que o clock associado a `timeout_time` seja usado, caso em que ajustes do clock podem ser levados em consideração. Assim, a duração do bloqueio pode ser maior ou menor do que `timeout_time - Clock::now()` no momento da chamada, dependendo da direção do ajuste e se ele é respeitado pela implementação. A função também pode bloquear até depois que `timeout_time` tenha sido atingido devido a atrasos de agendamento de processo ou contenção de recursos.

Assim como em [try_lock()](<#/doc/thread/recursive_timed_mutex/try_lock>), esta função pode falhar espuriamente e retornar `false` mesmo que o mutex não estivesse bloqueado por nenhuma outra thread em algum momento antes de `timeout_time`.

Uma operação [unlock()](<#/doc/thread/recursive_timed_mutex/unlock>) anterior no mesmo mutex _sincroniza-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação se ela retornar `true`.

Uma thread pode chamar `try_lock_until` em um mutex recursivo repetidamente. Chamadas bem-sucedidas a `try_lock_until` incrementam a contagem de posse: o mutex só será liberado depois que a thread fizer um número correspondente de chamadas a [unlock](<#/doc/thread/recursive_timed_mutex/unlock>).

O número máximo de níveis de posse é não especificado. Uma chamada a `try_lock_until` retornará `false` se este número for excedido.

### Parâmetros

timeout_time  |  \-  |  ponto no tempo máximo para bloquear até   
  
### Valor de retorno

`true` se o bloqueio foi adquirido com sucesso, caso contrário `false`.

### Exceções

Qualquer exceção lançada por `timeout_time` (clocks, time points e durations fornecidos pela standard library nunca lançam exceções).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2093](<https://cplusplus.github.io/LWG/issue2093>) | C++11  | `try_lock_until` não lançava nada  | lança exceções relacionadas a timeout   
  
### Veja também

[ lock](<#/doc/thread/recursive_timed_mutex/lock>) |  bloqueia o mutex, bloqueia se o mutex não estiver disponível   
(função membro pública)  
[ try_lock](<#/doc/thread/recursive_timed_mutex/try_lock>) |  tenta bloquear o mutex, retorna se o mutex não estiver disponível   
(função membro pública)  
[ try_lock_for](<#/doc/thread/recursive_timed_mutex/try_lock_for>) |  tenta bloquear o mutex, retorna se o mutex esteve indisponível pela duração de timeout especificada   
(função membro pública)  
[ unlock](<#/doc/thread/recursive_timed_mutex/unlock>) |  desbloqueia o mutex   
(função membro pública)  
[documentação C](<#/>) para mtx_timedlock