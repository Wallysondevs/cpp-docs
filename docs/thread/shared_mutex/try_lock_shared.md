# std::shared_mutex::try_lock_shared

```cpp
bool try_lock_shared();  // (desde C++17)
```

  
Tenta bloquear o mutex em modo compartilhado. Retorna imediatamente. Em caso de aquisição bem-sucedida do bloqueio, retorna true; caso contrário, retorna false.

Esta função pode falhar espuriamente e retornar false mesmo que o mutex não esteja atualmente bloqueado exclusivamente por nenhuma outra thread.

Uma operação [unlock()](<#/doc/thread/shared_mutex/unlock>) anterior no mesmo mutex _sincroniza-se-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação se ela retornar true.

O comportamento é indefinido se a thread chamadora já possui o mutex em qualquer modo.

### Parâmetros

(nenhum)

### Valor de retorno

true se o bloqueio foi adquirido com sucesso, caso contrário false.

### Exceções

Não lança exceções.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ lock](<#/doc/thread/shared_mutex/lock>) |  bloqueia o mutex, bloqueia se o mutex não estiver disponível   
(função membro pública)  
[ try_lock](<#/doc/thread/shared_mutex/try_lock>) |  tenta bloquear o mutex, retorna se o mutex não estiver disponível   
(função membro pública)  
[ unlock_shared](<#/doc/thread/shared_mutex/unlock_shared>) |  desbloqueia o mutex (posse compartilhada)   
(função membro pública)