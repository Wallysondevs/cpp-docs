# std::recursive_mutex::unlock

```cpp
void unlock();  // (desde C++11)
```

Desbloqueia o mutex se seu nível de posse for 1 (houve exatamente uma chamada a mais para [lock()](<#/doc/thread/recursive_mutex/lock>) do que chamadas a `unlock()` feitas por esta thread), reduz o nível de posse em 1 caso contrário.

O mutex deve estar bloqueado pela thread de execução atual, caso contrário, o comportamento é indefinido.

Esta operação _sincroniza-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) qualquer operação de bloqueio subsequente que obtenha a posse do mesmo mutex.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exceções

Não lança exceções.

### Notas

`unlock()` geralmente não é chamado diretamente: [std::unique_lock](<#/doc/thread/unique_lock>) e [std::lock_guard](<#/doc/thread/lock_guard>) são usados para gerenciar o bloqueio exclusivo.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ lock](<#/doc/thread/recursive_mutex/lock>) | bloqueia o mutex, bloqueia se o mutex não estiver disponível
(função membro pública)
[ try_lock](<#/doc/thread/recursive_mutex/try_lock>) | tenta bloquear o mutex, retorna se o mutex não estiver disponível
(função membro pública)
[documentação C](<#/>) para mtx_unlock