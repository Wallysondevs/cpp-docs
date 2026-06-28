# std::unique_lock&lt;Mutex&gt;::try_lock_until

```cpp
template< class Clock, class Duration >
bool try_lock_until( const std::chrono::time_point<Clock, Duration>& timeout_time );  // (desde C++11)
```

  
Tenta bloquear (isto é, assume a posse de) o mutex associado. Bloqueia até que o `timeout_time` especificado seja atingido ou o bloqueio seja adquirido, o que ocorrer primeiro. Em caso de aquisição bem-sucedida do bloqueio, retorna `true`; caso contrário, retorna `false`. Pode bloquear por mais tempo do que o `timeout_time` até que seja atingido.

Efetivamente chama `mutex()->try_lock_until(timeout_time)`.

Uma [std::system_error](<#/doc/error/system_error>) é lançada se não houver mutex associado ou se o mutex já estiver bloqueado pela mesma thread.

`Clock` deve satisfazer os requisitos de [Clock](<#/doc/named_req/Clock>). O programa é malformado se [std::chrono::is_clock_v](<#/doc/chrono/is_clock>)&lt;Clock&gt; for `false`. (desde C++20)

### Parameters

timeout_time  |  \-  |  ponto no tempo máximo para bloquear até   
  
### Return value

`true` se a posse do mutex foi adquirida com sucesso, `false` caso contrário.

### Exceptions

  * Quaisquer exceções lançadas por `mutex()->try_lock_until(timeout_time)`.

  * Se não houver mutex associado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::operation_not_permitted](<#/doc/error/errc>).

  * Se o mutex já estiver bloqueado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::resource_deadlock_would_occur](<#/doc/error/errc>).

### Example

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### See also

[ lock](<#/doc/thread/unique_lock/lock>) |  bloqueia (isto é, assume a posse de) o mutex associado   
(função membro pública)  
[ try_lock](<#/doc/thread/unique_lock/try_lock>) |  tenta bloquear (isto é, assume a posse de) o mutex associado sem bloquear   
(função membro pública)  
[ try_lock_for](<#/doc/thread/unique_lock/try_lock_for>) |  tenta bloquear (isto é, assume a posse de) o mutex [TimedLockable](<#/doc/named_req/TimedLockable>) associado, retorna se o mutex esteve indisponível pela duração de tempo especificada   
(função membro pública)  
[ unlock](<#/doc/thread/unique_lock/unlock>) |  desbloqueia (isto é, libera a posse de) o mutex associado   
(função membro pública)