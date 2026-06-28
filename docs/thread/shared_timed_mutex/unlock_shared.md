# std::shared_timed_mutex::unlock_shared

```cpp
void unlock_shared();  // (desde C++14)
```

  
Libera o mutex da posse compartilhada pelo thread chamador. 

O mutex deve estar bloqueado pelo thread de execução atual em modo compartilhado; caso contrário, o comportamento é indefinido. 

Esta operação _sincroniza-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) qualquer operação [lock()](<#/doc/thread/shared_timed_mutex/lock>) subsequente que obtenha a posse do mesmo mutex. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Exceções

Não lança exceções. 

### Observações

`unlock_shared()` geralmente não é chamado diretamente: [std::shared_lock](<#/doc/thread/shared_lock>) é usado para gerenciar o bloqueio compartilhado. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ lock_shared](<#/doc/thread/shared_timed_mutex/lock_shared>) | bloqueia o mutex para posse compartilhada, bloqueia se o mutex não estiver disponível   
(função membro pública)  
[ unlock](<#/doc/thread/shared_timed_mutex/unlock>) | desbloqueia o mutex   
(função membro pública)