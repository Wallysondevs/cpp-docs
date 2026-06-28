# std::shared_timed_mutex::try_lock_shared_for

```cpp
template< class Rep, class Period >
bool try_lock_shared_for( const std::chrono::duration<Rep,Period>& timeout_duration );  // (desde C++14)
```

  
Tenta bloquear o mutex em modo compartilhado. Bloqueia até que a `timeout_duration` especificada tenha decorrido ou o bloqueio compartilhado seja adquirido, o que ocorrer primeiro. Em caso de aquisição bem-sucedida do bloqueio, retorna `true`; caso contrário, retorna `false`.

Se `timeout_duration` for menor ou igual a `timeout_duration.zero()`, a função se comporta como [try_lock_shared()](<#/doc/thread/shared_timed_mutex/try_lock_shared>).

Esta função pode bloquear por um tempo maior do que `timeout_duration` devido a atrasos de agendamento ou contenção de recursos.

O padrão recomenda que um `steady clock` seja usado para medir a duração. Se uma implementação usar um `system clock` em vez disso, o tempo de espera também pode ser sensível a ajustes de relógio.

Assim como em [try_lock_shared()](<#/doc/thread/shared_timed_mutex/try_lock_shared>), esta função pode falhar espuriamente e retornar `false` mesmo que o mutex não estivesse bloqueado por nenhuma outra thread em algum momento durante `timeout_duration`.

Uma operação [unlock()](<#/doc/thread/shared_timed_mutex/unlock>) anterior no mesmo mutex _sincroniza-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação se ela retornar `true`.

Se `try_lock_shared_for` for chamada por uma thread que já possui o `mutex` em qualquer modo (compartilhado ou exclusivo), o comportamento é indefinido.

### Parameters

timeout_duration  |  \-  |  duração máxima para bloquear   
  
### Return value

`true` se o bloqueio foi adquirido com sucesso, caso contrário `false`.

### Exceptions

Qualquer exceção lançada por `clock`, `time_point` ou `duration` durante a execução (`clocks`, `time points` e `durations` fornecidos pela `standard library` nunca lançam exceções).

### Example

| Esta seção está incompleta  
Reason: nenhum exemplo   
  
### See also

[ try_lock_shared](<#/doc/thread/shared_timed_mutex/try_lock_shared>) |  tenta bloquear o mutex para posse compartilhada, retorna se o mutex não estiver disponível   
(função membro pública)  
[ try_lock_shared_until](<#/doc/thread/shared_timed_mutex/try_lock_shared_until>) |  tenta bloquear o mutex para posse compartilhada, retorna se o mutex esteve  
indisponível até que o `time point` especificado tenha sido atingido   
(função membro pública)  
[ try_lock_for](<#/doc/thread/shared_timed_mutex/try_lock_for>) |  tenta bloquear o mutex, retorna se o mutex esteve  
indisponível pela duração de `timeout` especificada   
(função membro pública)