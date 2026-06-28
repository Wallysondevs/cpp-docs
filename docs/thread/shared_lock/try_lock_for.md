# std::shared_lock&lt;Mutex&gt;::try_lock_for

```cpp
template< class Rep, class Period >
bool try_lock_for( const std::chrono::duration<Rep,Period>& timeout_duration );  // (desde C++14)
```

  
Tenta bloquear o mutex associado em modo compartilhado. Bloqueia até que a `timeout_duration` especificada tenha decorrido ou o bloqueio seja adquirido, o que ocorrer primeiro. Em caso de aquisição bem-sucedida do bloqueio, retorna true; caso contrário, retorna false. Efetivamente chama mutex()->try_lock_shared_for(timeout_duration). 

Esta função pode bloquear por mais tempo do que `timeout_duration` devido a atrasos de agendamento ou contenção de recursos. 

O padrão recomenda que um steady clock seja usado para medir a duração. Se uma implementação usar um system clock em vez disso, o tempo de espera também pode ser sensível a ajustes de relógio. 

[std::system_error](<#/doc/error/system_error>) é lançada se não houver mutex associado ou se o mutex já estiver bloqueado. 

O comportamento é indefinido se `Mutex` não atender aos requisitos de [SharedTimedLockable](<#/doc/named_req/SharedTimedLockable>). 

### Parâmetros

timeout_duration  |  \-  |  duração máxima para bloquear   
  
### Valor de retorno

true se a posse do mutex foi adquirida com sucesso, false caso contrário. 

### Exceções

  * Quaisquer exceções lançadas por mutex()->try_lock_shared_for(timeout_duration). 

  * Se não houver mutex associado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::operation_not_permitted](<#/doc/error/errc>). 

  * Se o mutex já estiver bloqueado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::resource_deadlock_would_occur](<#/doc/error/errc>). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ try_lock_for](<#/doc/thread/unique_lock/try_lock_for>) |  tenta bloquear (ou seja, assume a posse de) o mutex [TimedLockable](<#/doc/named_req/TimedLockable>) associado, retorna se o mutex esteve indisponível pela duração de tempo especificada   
(função membro pública de `std::unique_lock<Mutex>`)  
[ lock](<#/doc/thread/shared_lock/lock>) |  bloqueia o mutex associado   
(função membro pública)  
[ try_lock](<#/doc/thread/shared_lock/try_lock>) |  tenta bloquear o mutex associado   
(função membro pública)  
[ try_lock_until](<#/doc/thread/shared_lock/try_lock_until>) |  tenta bloquear o mutex associado, até um ponto no tempo especificado   
(função membro pública)  
[ unlock](<#/doc/thread/shared_lock/unlock>) |  desbloqueia o mutex associado   
(função membro pública)