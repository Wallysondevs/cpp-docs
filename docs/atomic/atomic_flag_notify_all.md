# std::atomic_flag_notify_all

Definido no header `[<atomic>](<#/doc/header/atomic>)`

```cpp
void atomic_flag_notify_all( std::atomic_flag* object ) noexcept;  // (1) (desde C++20)
void atomic_flag_notify_all( volatile std::atomic_flag* object ) noexcept;  // (2) (desde C++20)
```

Executa operações atômicas de notificação.

Desbloqueia todas as threads bloqueadas em operações atômicas de espera (ou seja, [std::atomic_flag_wait()](<#/doc/atomic/atomic_flag_wait>), [std::atomic_flag_wait_explicit()](<#/doc/atomic/atomic_flag_wait>), ou [`std::atomic_flag::wait()`](<#/doc/atomic/atomic_flag/wait>)) no *object, se houver alguma; caso contrário, não faz nada.

Equivalente a object->notify_all().

### Parâmetros

- **object** — ponteiro para o objeto `atomic_flag` a ser notificado

### Valor de retorno

(nenhum)

### Notas

Esta forma de detecção de mudança é frequentemente mais eficiente do que polling simples ou spinlocks puros.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ notify_one](<#/doc/atomic/atomic_flag/notify_one>)(C++20) | notifica pelo menos uma thread esperando no objeto atômico
(função membro pública de `std::atomic_flag`)
[ notify_all](<#/doc/atomic/atomic_flag/notify_all>)(C++20) | notifica todas as threads bloqueadas esperando no objeto atômico
(função membro pública de `std::atomic_flag`)
[ atomic_flag_waitatomic_flag_wait_explicit](<#/doc/atomic/atomic_flag_wait>)(C++20)(C++20) | bloqueia a thread até ser notificada e a flag mudar
(função)
[ atomic_flag_notify_one](<#/doc/atomic/atomic_flag_notify_one>)(C++20) | notifica uma thread bloqueada em atomic_flag_wait
(função)