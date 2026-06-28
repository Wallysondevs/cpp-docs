# std::recursive_timed_mutex::try_lock

```cpp
bool try_lock() noexcept;  // (desde C++11)
```

Tenta bloquear o mutex. Retorna imediatamente. Em caso de aquisição bem-sucedida do bloqueio, retorna true, caso contrário, retorna false.

Esta função pode falhar espuriamente e retornar false mesmo que o mutex não esteja atualmente bloqueado por nenhuma outra thread.

Uma thread pode chamar `try_lock` em um mutex recursivo repetidamente. Chamadas bem-sucedidas a `try_lock` incrementam a contagem de posse: o mutex só será liberado depois que a thread fizer um número correspondente de chamadas para [unlock](<#/doc/thread/recursive_timed_mutex/unlock>).

O número máximo de níveis de posse não é especificado. Uma chamada a `try_lock` retornará false se este número for excedido.

Uma operação [unlock()](<#/doc/thread/recursive_timed_mutex/unlock>) anterior no mesmo mutex _sincroniza-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação se ela retornar true. Note que um [lock()](<#/doc/thread/recursive_timed_mutex/lock>) anterior não sincroniza com esta operação se ela retornar false.

### Parâmetros

(nenhum)

### Valor de retorno

true se o bloqueio foi adquirido com sucesso, caso contrário false.

### Exceções

Não lança exceções.

### Exemplo

| Esta seção está incompleta
Motivo: sem exemplo

### Veja também

[ lock](<#/doc/thread/recursive_timed_mutex/lock>) | bloqueia o mutex, bloqueia se o mutex não estiver disponível
(função membro pública)
[ try_lock_for](<#/doc/thread/recursive_timed_mutex/try_lock_for>) | tenta bloquear o mutex, retorna se o mutex esteve
indisponível pela duração de timeout especificada
(função membro pública)
[ try_lock_until](<#/doc/thread/recursive_timed_mutex/try_lock_until>) | tenta bloquear o mutex, retorna se o mutex esteve
indisponível até que o ponto no tempo especificado tenha sido atingido
(função membro pública)
[ unlock](<#/doc/thread/recursive_timed_mutex/unlock>) | desbloqueia o mutex
(função membro pública)
[C documentation](<#/>) para mtx_trylock