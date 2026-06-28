# std::atomic_store, std::atomic_store_explicit

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
void atomic_store( std::atomic<T>* obj,
typename std::atomic<T>::value_type desired ) noexcept;
template< class T >
void atomic_store( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type desired ) noexcept;
template< class T >
void atomic_store_explicit( std::atomic<T>* obj,
typename std::atomic<T>::value_type desired,
std::memory_order order) noexcept;
template< class T >
void atomic_store_explicit( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type desired,
std::memory_order order) noexcept;
```

1,2) Substitui atomicamente o valor apontado por obj pelo valor de desired como se fosse por obj->store(desired).

3,4) Substitui atomicamente o valor apontado por obj pelo valor de desired como se fosse por obj->store(desired, order).

Se order for um de [std::memory_order_consume](<#/doc/atomic/memory_order>), [std::memory_order_acquire](<#/doc/atomic/memory_order>) e [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), o comportamento é indefinido.

### Parâmetros

- **obj** — ponteiro para o objeto atômico a ser modificado
- **desired** — o valor a ser armazenado no objeto atômico
- **order** — a ordenação de sincronização de memória

### Valor de retorno

(nenhum)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0558R1](<https://wg21.link/P0558R1>) | C++11 | correspondência exata de tipo era exigida porque `T` era deduzido de múltiplos argumentos | `T` é deduzido apenas de obj

### Veja também

[ store](<#/doc/atomic/atomic/store>) | substitui atomicamente o valor do objeto atômico por um argumento não atômico
(função membro pública de `std::atomic<T>`)
[ atomic_loadatomic_load_explicit](<#/doc/atomic/atomic_load>)(C++11)(C++11) | obtém atomicamente o valor armazenado em um objeto atômico
(modelo de função)
[ memory_order](<#/doc/atomic/memory_order>)(C++11) | define restrições de ordenação de memória para a operação atômica fornecida
(enum)
[ std::atomic_store(std::shared_ptr) std::atomic_store_explicit(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto em C++20)(removido em C++26) | especializa operações atômicas para [std::shared_ptr](<#/doc/memory/shared_ptr>)
(modelo de função)
[Documentação C](<#/>) para atomic_store, atomic_store_explicit