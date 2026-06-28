# std::atomic_fetch_max, std::atomic_fetch_max_explicit

Definido no header `[<atomic>](<#/doc/header/atomic>)`

```cpp
template< class T >
T atomic_fetch_max( std::atomic<T>* obj,
typename std::atomic<T>::value_type arg ) noexcept;  // (1) (desde C++26)
template< class T >
T atomic_fetch_max( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type arg ) noexcept;  // (2) (desde C++26)
template< class T >
T atomic_fetch_max_explicit( std::atomic<T>* obj,
typename std::atomic<T>::value_type arg,
std::memory_order order ) noexcept;  // (3) (desde C++26)
template< class T >
T atomic_fetch_max_explicit( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type arg,
std::memory_order order ) noexcept;  // (4) (desde C++26)
```

Substitui atomicamente o valor apontado por obj pelo resultado de [std::max](<#/doc/algorithm/max>) entre o valor antigo de obj e arg. Retorna o valor que obj possuía anteriormente. A operação é realizada como se o seguinte fosse executado:

1,2) obj->fetch_max(arg)

3,4) obj->fetch_max(arg, order)

Se `std::atomic<T>` não possuir um membro `fetch_max` (este membro é fornecido apenas para tipos [integrais](<#/doc/atomic/atomic>) e de [ponteiro](<#/doc/atomic/atomic>), exceto bool), o programa é malformado.

### Parâmetros

- **obj** — ponteiro para o objeto atômico a ser modificado
- **arg** — o valor para [std::max](<#/doc/algorithm/max>) com o valor armazenado no objeto atômico
- **order** — a ordem de sincronização de memória

### Valor de retorno

O valor imediatamente anterior aos efeitos desta função na [ordem de modificação](<#/doc/atomic/memory_order>) de *obj.

### Observações

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_atomic_min_max`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | Mínimo/máximo atômico

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ fetch_max](<#/doc/atomic/atomic/fetch_max>)(C++26) | realiza atomicamente [std::max](<#/doc/algorithm/max>) entre o argumento e o valor do objeto atômico e obtém o valor possuído anteriormente
(função membro pública de `std::atomic<T>`)
[ atomic_fetch_minatomic_fetch_min_explicit](<#/doc/atomic/atomic_fetch_min>)(C++26)(C++26) | substitui o objeto atômico pelo resultado de [std::min](<#/doc/algorithm/min>) com um argumento não atômico e obtém o valor anterior do atômico
(modelo de função)