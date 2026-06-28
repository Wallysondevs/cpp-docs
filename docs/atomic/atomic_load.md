# std::atomic_load, std::atomic_load_explicit

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
T atomic_load( const std::atomic<T>* obj ) noexcept;
template< class T >
T atomic_load( const volatile std::atomic<T>* obj ) noexcept;
template< class T >
T atomic_load_explicit( const std::atomic<T>* obj,
std::memory_order order ) noexcept;
template< class T >
T atomic_load_explicit( const volatile std::atomic<T>* obj,
std::memory_order order ) noexcept;
```

1,2) Obtém atomicamente o valor apontado por obj como se fosse por obj->load().

3,4) Obtém atomicamente o valor apontado por obj como se fosse por obj->load(order).

Se order for um de [std::memory_order_release](<#/doc/atomic/memory_order>) e [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), o comportamento é indefinido.

### Parâmetros

- **obj** — ponteiro para o objeto atômico a ser modificado
- **order** — a ordenação de sincronização de memória para esta operação

### Valor de retorno

O valor contido pelo objeto atômico apontado por obj.

### Ver também

[ load](<#/doc/atomic/atomic/load>) | obtém atomicamente o valor do objeto atômico
(função membro pública de `std::atomic<T>`)
[ atomic_storeatomic_store_explicit](<#/doc/atomic/atomic_store>)(C++11)(C++11) | substitui atomicamente o valor do objeto atômico por um argumento não atômico
(modelo de função)
[ memory_order](<#/doc/atomic/memory_order>)(C++11) | define restrições de ordenação de memória para a operação atômica fornecida
(enum)
[ std::atomic_load(std::shared_ptr) std::atomic_load_explicit(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto desde C++20)(removido em C++26) | especializa operações atômicas para [std::shared_ptr](<#/doc/memory/shared_ptr>)
(modelo de função)
[Documentação C](<#/>) para atomic_load, atomic_load_explicit