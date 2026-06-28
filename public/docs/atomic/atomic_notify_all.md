# std::atomic_notify_all

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
void atomic_notify_all( std::atomic<T>* object );
template< class T >
void atomic_notify_all( volatile std::atomic<T>* object );
```

  
Executa operações de notificação atômica.

Desbloqueia todas as threads bloqueadas em operações de espera atômica (ou seja, [std::atomic_wait()](<#/doc/atomic/atomic_wait>), [std::atomic_wait_explicit()](<#/doc/atomic/atomic_wait>), ou [`std::atomic::wait()`](<#/doc/atomic/atomic/wait>)) no *object, se houver alguma; caso contrário, não faz nada.

Equivalente a object->notify_all().

### Parâmetros

object  |  \-  |  ponteiro para o objeto atômico a ser notificado   
  
### Valor de retorno

(nenhum)

### Notas

Esta forma de detecção de mudança é frequentemente mais eficiente do que polling simples ou spinlocks puros.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ notify_one](<#/doc/atomic/atomic/notify_one>)(C++20) | notifica pelo menos uma thread esperando no objeto atômico   
(função membro pública de `std::atomic<T>`)  
[ notify_all](<#/doc/atomic/atomic/notify_all>)(C++20) | notifica todas as threads bloqueadas esperando no objeto atômico   
(função membro pública de `std::atomic<T>`)  
[ atomic_waitatomic_wait_explicit](<#/doc/atomic/atomic_wait>)(C++20)(C++20) | bloqueia a thread até ser notificada e o valor atômico mudar   
(modelo de função)  
[ atomic_notify_one](<#/doc/atomic/atomic_notify_one>)(C++20) | notifica uma thread bloqueada em atomic_wait   
(modelo de função)