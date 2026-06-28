# std::shared_timed_mutex::lock_shared

```cpp
void lock_shared();  // (desde C++14)
```

  
Adquire a posse compartilhada do mutex. Se outra thread estiver segurando o mutex em posse exclusiva, uma chamada para `lock_shared` bloqueará a execução até que a posse compartilhada possa ser adquirida. 

Se `lock_shared` for chamado por uma thread que já possui o `mutex` em qualquer modo (exclusivo ou compartilhado), o comportamento é indefinido. 

Se mais do que o número máximo de proprietários compartilhados definido pela implementação já tiverem bloqueado o mutex no modo compartilhado, `lock_shared` bloqueará a execução até que o número de proprietários compartilhados seja reduzido. O número máximo de proprietários é garantido ser de pelo menos 10000. 

Uma operação [unlock()](<#/doc/thread/shared_timed_mutex/unlock>) anterior no mesmo mutex _sincroniza-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Exceções

Lança [std::system_error](<#/doc/error/system_error>) quando ocorrem erros, incluindo erros do sistema operacional subjacente que impediriam `lock` de cumprir suas especificações. O mutex não é bloqueado no caso de qualquer exceção ser lançada. 

### Notas

`lock_shared()` geralmente não é chamado diretamente: [std::shared_lock](<#/doc/thread/shared_lock>) é usado para gerenciar o bloqueio compartilhado. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ lock](<#/doc/thread/shared_timed_mutex/lock>) | bloqueia o mutex, bloqueia se o mutex não estiver disponível   
(função membro pública)  
[ try_lock_shared](<#/doc/thread/shared_timed_mutex/try_lock_shared>) | tenta bloquear o mutex para posse compartilhada, retorna se o mutex não estiver disponível   
(função membro pública)  
[ unlock_shared](<#/doc/thread/shared_timed_mutex/unlock_shared>) | desbloqueia o mutex (posse compartilhada)   
(função membro pública)