# std::pmr::get_default_resource

Definido no cabeçalho `[<memory_resource>](<#/doc/header/memory_resource>)`

```c
std::pmr::memory_resource* get_default_resource() noexcept;
```

Obtém o ponteiro para o recurso de memória padrão.

O _ponteiro para o recurso de memória padrão_ é usado por certas facilidades quando um recurso de memória explícito não é fornecido. O ponteiro inicial para o recurso de memória padrão é o valor de retorno de [std::pmr::new_delete_resource](<#/doc/memory/new_delete_resource>).

Esta função é thread-safe. Chamadas anteriores a [std::pmr::set_default_resource](<#/doc/memory/set_default_resource>) _sincronizam com_ (veja [std::memory_order](<#/doc/atomic/memory_order>)) as chamadas subsequentes de `std::pmr::get_default_resource`.

### Valor de retorno

Retorna o valor do ponteiro para o recurso de memória padrão.

### Veja também

```cpp
 set_default_resource(C++17) | define o std::pmr::memory_resource padrão
(função)
 new_delete_resource(C++17) | retorna um std::pmr::memory_resource estático de escopo de programa que usa os operator new e operator delete globais para alocar e desalocar memória
(função)
```