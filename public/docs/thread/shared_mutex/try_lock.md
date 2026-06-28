# std::shared_mutex::try_lock

```cpp
bool try_lock();  // (desde C++17)
```

  
Tenta bloquear o mutex. Retorna imediatamente. Em caso de aquisição bem-sucedida do bloqueio, retorna true; caso contrário, retorna false. 

Esta função pode falhar espuriamente e retornar false mesmo que o mutex não esteja atualmente bloqueado por nenhuma outra thread. 

Se `try_lock` for chamada por uma thread que já possui o `mutex` em qualquer modo (compartilhado ou exclusivo), o comportamento é indefinido. 

Uma operação [unlock()](<#/doc/thread/shared_mutex/unlock>) anterior no mesmo mutex _sincroniza-se com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação se ela retornar true. Note que uma [lock()](<#/doc/thread/shared_mutex/lock>) anterior não sincroniza com esta operação se ela retornar false. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se o bloqueio foi adquirido com sucesso, caso contrário false. 

### Exceções

Não lança exceções. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ lock](<#/doc/thread/shared_mutex/lock>) | bloqueia o mutex, bloqueia se o mutex não estiver disponível   
(função membro pública)  
[ unlock](<#/doc/thread/shared_mutex/unlock>) | desbloqueia o mutex   
(função membro pública)  
[Documentação C](<#/>) para mtx_trylock