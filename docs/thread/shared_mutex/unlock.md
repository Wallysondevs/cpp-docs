# std::shared_mutex::unlock

```cpp
void unlock();  // (desde C++17)
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

`unlock()` geralmente não é chamado diretamente: [std::unique_lock](<#/doc/thread/unique_lock>) e [std::lock_guard](<#/doc/thread/lock_guard>) são usados para gerenciar bloqueio exclusivo.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ lock](<#/doc/thread/shared_mutex/lock>) | bloqueia o mutex, bloqueia se o mutex não estiver disponível   
(função membro pública)  
[ try_lock](<#/doc/thread/shared_mutex/try_lock>) | tenta bloquear o mutex, retorna se o mutex não estiver disponível   
(função membro pública)  
[Documentação C](<#/>) para mtx_unlock