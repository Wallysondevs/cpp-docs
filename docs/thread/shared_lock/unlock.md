# std::shared_lock&lt;Mutex&gt;::unlock

```cpp
void unlock();  // (desde C++14)
```

  
Desbloqueia o mutex associado do modo compartilhado. Efetivamente chama mutex()->unlock_shared(). 

[std::system_error](<#/doc/error/system_error>) é lançada se não houver mutex associado ou se o mutex não estiver bloqueado. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Exceções

  * Quaisquer exceções lançadas por mutex()->unlock_shared(). 

  * Se não houver mutex associado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::operation_not_permitted](<#/doc/error/errc>). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ lock](<#/doc/thread/shared_lock/lock>) |  bloqueia o mutex associado   
(função membro pública)  
[ release](<#/doc/thread/shared_lock/release>) |  desassocia o mutex sem desbloquear   
(função membro pública)