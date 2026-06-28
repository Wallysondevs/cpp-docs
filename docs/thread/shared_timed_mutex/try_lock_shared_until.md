# std::shared_timed_mutex::try_lock_shared_until

```cpp
template< class Clock, class Duration >
bool try_lock_shared_until( const std::chrono::time_point<Clock,Duration>& timeout_time );  // (desde C++14)
```

  
Tenta bloquear o mutex em modo compartilhado. Bloqueia até que o `timeout_time` especificado seja atingido ou o bloqueio seja adquirido, o que ocorrer primeiro. Em caso de aquisição bem-sucedida do bloqueio, retorna `true`, caso contrário, retorna `false`.

Se o `timeout_time` já tiver passado, esta função se comporta como [try_lock_shared()](<#/doc/thread/shared_timed_mutex/try_lock_shared>).

`Clock` deve atender aos requisitos de [Clock](<#/doc/named_req/Clock>). O programa é malformado se [std::chrono::is_clock_v](<#/doc/chrono/is_clock>)&lt;Clock&gt; for `false`.(desde C++20)

O padrão recomenda que o clock associado a `timeout_time` seja usado, caso em que ajustes do clock podem ser levados em consideração. Assim, a duração do bloqueio pode ser maior ou menor do que `timeout_time - Clock::now()` no momento da chamada, dependendo da direção do ajuste e se ele é respeitado pela implementação. A função também pode bloquear até depois que `timeout_time` tenha sido atingido devido a atrasos de agendamento de processo ou contenção de recursos.

Assim como em [try_lock_shared()](<#/doc/thread/shared_timed_mutex/try_lock_shared>), esta função pode falhar espuriamente e retornar `false` mesmo que o mutex não tenha sido bloqueado por nenhuma outra thread em algum momento antes de `timeout_time`.

Uma operação [unlock()](<#/doc/thread/shared_timed_mutex/unlock>) anterior no mesmo mutex _sincroniza-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação se ela retornar `true`.

Se `try_lock_shared_until` for chamada por uma thread que já possui o `mutex` em qualquer modo (compartilhado ou exclusivo), o comportamento é indefinido.

### Parâmetros

timeout_time  |  \-  |  ponto no tempo máximo para bloquear até   
  
### Valor de retorno

`true` se a posse do bloqueio compartilhado foi adquirida com sucesso, caso contrário `false`.

### Exceções

Qualquer exceção lançada por `clock`, `time_point` ou `duration` durante a execução (clocks, time points e durations fornecidos pela standard library nunca lançam exceções).

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ try_lock_until](<#/doc/thread/shared_timed_mutex/try_lock_until>) |  tenta bloquear o mutex, retorna se o mutex esteve  
indisponível até que o ponto no tempo especificado tenha sido atingido   
(função membro pública)  
[ try_lock_shared](<#/doc/thread/shared_timed_mutex/try_lock_shared>) |  tenta bloquear o mutex para posse compartilhada, retorna se o mutex não está disponível   
(função membro pública)  
[ try_lock_shared_for](<#/doc/thread/shared_timed_mutex/try_lock_shared_for>) |  tenta bloquear o mutex para posse compartilhada, retorna se o mutex esteve  
indisponível pela duração de timeout especificada   
(função membro pública)