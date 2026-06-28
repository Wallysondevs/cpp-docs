# std::atomic_wait, std::atomic_wait_explicit

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
void atomic_wait( const std::atomic<T>* object,
typename std::atomic<T>::value_type old );
template< class T >
void atomic_wait( const volatile std::atomic<T>* object,
typename std::atomic<T>::value_type old );
template< class T >
void atomic_wait_explicit( const std::atomic<T>* object,
typename std::atomic<T>::value_type old,
std::memory_order order );
template< class T >
void atomic_wait_explicit( const volatile std::atomic<T>* object,
typename std::atomic<T>::value_type old,
std::memory_order order );
```

Realiza operações de espera atômica. Comporta-se como se realizasse repetidamente os seguintes passos:

  * Compara a [representação de valor](<#/doc/language/objects>) de object->load() (para as sobrecargas (1,2)) ou object->load(order) (para as sobrecargas (3,4)) com a de old.
    * Se forem bit a bit iguais, então bloqueia até que *object seja notificado por std::atomic::notify_one() ou std::atomic::notify_all(), ou o thread seja desbloqueado espuriamente.
    * Caso contrário, retorna.

Estas funções têm garantia de retornar apenas se o valor tiver mudado, mesmo que a implementação subjacente desbloqueie espuriamente.

1,2) Equivalente a object->wait(old).

3,4) Equivalente a object->wait(old, order).

Se order for um de std::memory_order::release e std::memory_order::acq_rel, o comportamento é indefinido.

### Parâmetros

- **object** — ponteiro para o objeto atômico a ser verificado e aguardado
- **old** — o valor que o objeto atômico não deve mais conter
- **order** — a ordenação de sincronização de memória

### Valor de retorno

(nenhum)

### Notas

Esta forma de detecção de mudança é frequentemente mais eficiente do que polling simples ou spinlocks puros.

Devido ao [problema ABA](<https://en.wikipedia.org/wiki/ABA_problem> "enwiki:ABA problem"), mudanças transitórias de old para outro valor e de volta para old podem ser perdidas, e não desbloquear.

A comparação é bit a bit (semelhante a [std::memcmp](<#/doc/string/byte/memcmp>)); nenhum operador de comparação é usado. Bits de preenchimento que nunca participam da representação de valor de um objeto são ignorados.

### Exemplo

| Esta seção está incompleta
Reason: no example

### Veja também

[ wait](<#/doc/atomic/atomic/wait>)(C++20) | bloqueia o thread até ser notificado e o valor atômico mudar
(função membro pública de `std::atomic<T>`)
[ notify_one](<#/doc/atomic/atomic/notify_one>)(C++20) | notifica pelo menos um thread esperando no objeto atômico
(função membro pública de `std::atomic<T>`)
[ notify_all](<#/doc/atomic/atomic/notify_all>)(C++20) | notifica todos os threads bloqueados esperando no objeto atômico
(função membro pública de `std::atomic<T>`)
[ atomic_notify_one](<#/doc/atomic/atomic_notify_one>)(C++20) | notifica um thread bloqueado em atomic_wait
(modelo de função)
[ atomic_notify_all](<#/doc/atomic/atomic_notify_all>)(C++20) | notifica todos os threads bloqueados em atomic_wait
(modelo de função)