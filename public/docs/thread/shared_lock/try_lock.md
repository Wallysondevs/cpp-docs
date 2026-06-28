# std::shared_lock&lt;Mutex&gt;::try_lock

```cpp
bool try_lock();  // (desde C++14)
```

  
Tenta bloquear o mutex associado em modo compartilhado sem bloquear. Efetivamente chama mutex()->try_lock_shared(). 

[std::system_error](<#/doc/error/system_error>) é lançada se não houver mutex associado ou se o mutex já estiver bloqueado. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se a posse do mutex foi adquirida com sucesso, false caso contrário. 

### Exceções

  * Quaisquer exceções lançadas por mutex()->try_lock_shared(). 

  * Se não houver mutex associado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::operation_not_permitted](<#/doc/error/errc>). 

  * Se o mutex já estiver bloqueado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::resource_deadlock_would_occur](<#/doc/error/errc>). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ lock](<#/doc/thread/shared_lock/lock>) | bloqueia o mutex associado   
(função membro pública)  
[ try_lock](<#/doc/thread/unique_lock/try_lock>) | tenta bloquear (isto é, assume a posse de) o mutex associado sem bloquear   
(função membro pública de `std::unique_lock<Mutex>`)  
[ try_lock_for](<#/doc/thread/shared_lock/try_lock_for>) | tenta bloquear o mutex associado, pela duração especificada   
(função membro pública)  
[ try_lock_until](<#/doc/thread/shared_lock/try_lock_until>) | tenta bloquear o mutex associado, até um ponto no tempo especificado   
(função membro pública)  
[ unlock](<#/doc/thread/shared_lock/unlock>) | desbloqueia o mutex associado   
(função membro pública)