# std::unique_lock&lt;Mutex&gt;::try_lock_for

```cpp
template< class Rep, class Period >
bool try_lock_for( const std::chrono::duration<Rep, Period>& timeout_duration );  // (desde C++11)
```

  
Tenta bloquear (ou seja, assume a propriedade de) o mutex associado. Bloqueia até que o timeout_duration especificado tenha decorrido ou o bloqueio seja adquirido, o que ocorrer primeiro. Em caso de aquisição bem-sucedida do bloqueio, retorna true; caso contrário, retorna false. Efetivamente chama mutex()->try_lock_for(timeout_duration). 

Esta função pode bloquear por mais tempo do que timeout_duration devido a atrasos de agendamento ou contenção de recursos. 

O padrão recomenda que um steady clock seja usado para medir a duração. Se uma implementação usar um system clock em vez disso, o tempo de espera também pode ser sensível a ajustes de clock. 

[std::system_error](<#/doc/error/system_error>) é lançada se não houver mutex associado ou se o mutex já estiver bloqueado por este std::unique_lock. 

### Parâmetros

timeout_duration  |  \-  |  duração máxima para bloquear   
  
### Valor de retorno

true se a propriedade do mutex foi adquirida com sucesso, false caso contrário. 

### Exceções

  * Quaisquer exceções lançadas por mutex()->try_lock_for(timeout_duration). 

  * Se não houver mutex associado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::operation_not_permitted](<#/doc/error/errc>). 

  * Se o mutex já estiver bloqueado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::resource_deadlock_would_occur](<#/doc/error/errc>). 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ lock](<#/doc/thread/unique_lock/lock>) |  bloqueia (ou seja, assume a propriedade de) o mutex associado   
(função membro pública)  
[ try_lock](<#/doc/thread/unique_lock/try_lock>) |  tenta bloquear (ou seja, assume a propriedade de) o mutex associado sem bloquear   
(função membro pública)  
[ try_lock_for](<#/doc/thread/shared_lock/try_lock_for>) |  tenta bloquear o mutex associado, pela duração especificada   
(função membro pública de `std::shared_lock<Mutex>`)  
[ try_lock_until](<#/doc/thread/unique_lock/try_lock_until>) |  tenta bloquear (ou seja, assume a propriedade de) o mutex [TimedLockable](<#/doc/named_req/TimedLockable>) associado, retorna se o mutex esteve indisponível até que o ponto no tempo especificado tenha sido atingido   
(função membro pública)  
[ unlock](<#/doc/thread/unique_lock/unlock>) |  desbloqueia (ou seja, libera a propriedade de) o mutex associado   
(função membro pública)