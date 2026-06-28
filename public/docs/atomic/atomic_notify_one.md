# std::atomic_notify_one

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
void atomic_notify_one( std::atomic<T>* object );
template< class T >
void atomic_notify_one( volatile std::atomic<T>* object );
```

Realiza operações atômicas de notificação.

Se houver uma thread bloqueada em uma operação de espera atômica (ou seja, [std::atomic_wait()](<#/doc/atomic/atomic_wait>), [std::atomic_wait_explicit()](<#/doc/atomic/atomic_wait>), ou [`std::atomic::wait()`](<#/doc/atomic/atomic/wait>)) no *object, então desbloqueia _pelo menos_ uma dessas threads; caso contrário, não faz nada.

Equivalente a object->notify_one().

### Parâmetros

- **object** — ponteiro para o objeto atômico a ser notificado

### Valor de retorno

(nenhum)

### Notas

Esta forma de detecção de mudança é frequentemente mais eficiente do que polling simples ou spinlocks puros.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Ver também

[ notify_one](<#/doc/atomic/atomic/notify_one>)(C++20) | notifica pelo menos uma thread esperando no objeto atômico
(função membro pública de `std::atomic<T>`)
[ notify_all](<#/doc/atomic/atomic/notify_all>)(C++20) | notifica todas as threads bloqueadas esperando no objeto atômico
(função membro pública de `std::atomic<T>`)
[ atomic_notify_all](<#/doc/atomic/atomic_notify_all>)(C++20) | notifica todas as threads bloqueadas em atomic_wait
(modelo de função)
[ atomic_waitatomic_wait_explicit](<#/doc/atomic/atomic_wait>)(C++20)(C++20) | bloqueia a thread até ser notificada e o valor atômico mudar
(modelo de função)