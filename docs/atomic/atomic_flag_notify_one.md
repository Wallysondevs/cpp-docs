# std::atomic_flag_notify_one

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
void atomic_flag_notify_one( std::atomic_flag* object ) noexcept;
void atomic_flag_notify_one( volatile std::atomic_flag* object ) noexcept;
```

Realiza operações atômicas de notificação.

Se houver uma thread bloqueada em uma operação atômica de espera (ou seja, [std::atomic_flag_wait()](<#/doc/atomic/atomic_flag_wait>), [std::atomic_flag_wait_explicit()](<#/doc/atomic/atomic_flag_wait>), ou [`std::atomic_flag::wait()`](<#/doc/atomic/atomic_flag/wait>)) no *object, então desbloqueia _pelo menos_ uma dessas threads; caso contrário, não faz nada.

Equivalente a object->notify_one().

### Parâmetros

object | \- | ponteiro para o objeto `atomic_flag` a ser notificado

### Valor de retorno

(nenhum)

### Notas

Esta forma de detecção de mudança é frequentemente mais eficiente do que polling simples ou spinlocks puros.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ notify_one](<#/doc/atomic/atomic_flag/notify_one>)(C++20) | notifica pelo menos uma thread esperando no objeto atômico
(função membro pública de `std::atomic_flag`)
[ notify_all](<#/doc/atomic/atomic_flag/notify_all>)(C++20) | notifica todas as threads bloqueadas esperando no objeto atômico
(função membro pública de `std::atomic_flag`)
[ atomic_flag_notify_all](<#/doc/atomic/atomic_flag_notify_all>)(C++20) | notifica todas as threads bloqueadas em atomic_flag_wait
(função)