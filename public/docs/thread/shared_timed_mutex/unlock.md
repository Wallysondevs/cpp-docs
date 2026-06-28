# std::shared_timed_mutex::unlock

```cpp
void unlock();  // (desde C++14)
```

  
Desbloqueia o mutex. 

O mutex deve estar bloqueado pela thread de execução atual; caso contrário, o comportamento é indefinido. 

Esta operação _sincroniza-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) qualquer operação de bloqueio subsequente que obtenha a propriedade do mesmo mutex. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Exceções

Não lança exceções. 

### Observações

`unlock()` geralmente não é chamado diretamente: [std::unique_lock](<#/doc/thread/unique_lock>) e [std::lock_guard](<#/doc/thread/lock_guard>) são usados para gerenciar o bloqueio exclusivo. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ lock](<#/doc/thread/shared_timed_mutex/lock>) |  bloqueia o mutex, bloqueia se o mutex não estiver disponível   
(função membro pública)  
[ try_lock](<#/doc/thread/shared_timed_mutex/try_lock>) |  tenta bloquear o mutex, retorna se o mutex não estiver disponível   
(função membro pública)  
[ try_lock_for](<#/doc/thread/shared_timed_mutex/try_lock_for>) |  tenta bloquear o mutex, retorna se o mutex esteve indisponível pela duração de timeout especificada   
(função membro pública)  
[ try_lock_until](<#/doc/thread/shared_timed_mutex/try_lock_until>) |  tenta bloquear o mutex, retorna se o mutex esteve indisponível até que o ponto no tempo especificado tenha sido atingido   
(função membro pública)  
[Documentação C](<#/>) para mtx_unlock