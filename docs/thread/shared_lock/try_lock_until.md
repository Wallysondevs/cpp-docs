# std::shared_lock&lt;Mutex&gt;::try_lock_until

```cpp
template< class Clock, class Duration >
bool try_lock_until( const std::chrono::time_point<Clock,Duration>& timeout_time );  // (desde C++14)
```

  
Tenta bloquear o mutex associado em modo compartilhado. Bloqueia até que o `timeout_time` especificado seja atingido ou o lock seja adquirido, o que ocorrer primeiro. Em caso de aquisição bem-sucedida do lock, retorna `true`, caso contrário, retorna `false`. Pode bloquear por mais tempo do que até o `timeout_time` ser atingido.

Efetivamente chama `mutex()->try_lock_shared_until(timeout_time)`.

[std::system_error](<#/doc/error/system_error>) é lançada se não houver mutex associado ou se o mutex já estiver bloqueado.

`Clock` deve satisfazer os requisitos de [Clock](<#/doc/named_req/Clock>). O comportamento é indefinido se `Mutex` não satisfizer os requisitos de [SharedTimedLockable](<#/doc/named_req/SharedTimedLockable>). O programa é malformado se [std::chrono::is_clock_v](<#/doc/chrono/is_clock>)&lt;Clock&gt; for `false`. (desde C++20)

### Parâmetros

timeout_time  |  \-  |  ponto no tempo máximo para bloquear até   
  
### Valor de retorno

`true` se a posse do mutex foi adquirida com sucesso, `false` caso contrário.

### Exceções

  * Quaisquer exceções lançadas por `mutex()->try_lock_shared_for(timeout_time)`.

  * Se não houver mutex associado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::operation_not_permitted](<#/doc/error/errc>).

  * Se o mutex já estiver bloqueado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::resource_deadlock_would_occur](<#/doc/error/errc>).

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ lock](<#/doc/thread/shared_lock/lock>) |  bloqueia o mutex associado   
(função membro pública)  
[ try_lock](<#/doc/thread/shared_lock/try_lock>) |  tenta bloquear o mutex associado   
(função membro pública)  
[ try_lock_for](<#/doc/thread/shared_lock/try_lock_for>) |  tenta bloquear o mutex associado, pela duração especificada   
(função membro pública)  
[ unlock](<#/doc/thread/shared_lock/unlock>) |  desbloqueia o mutex associado   
(função membro pública)  
[ try_lock_until](<#/doc/thread/unique_lock/try_lock_until>) |  tenta bloquear (isto é, assume a posse de) o mutex [TimedLockable](<#/doc/named_req/TimedLockable>) associado, retorna se o mutex esteve indisponível até que o ponto no tempo especificado tenha sido atingido   
(função membro pública de `std::unique_lock<Mutex>`)