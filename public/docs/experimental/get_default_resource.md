# std::experimental::pmr::get_default_resource

Definido no cabeçalho `[<experimental/memory_resource>](<#/doc/header/experimental/memory_resource>)`

```c
memory_resource* get_default_resource() noexcept;
```

Obtém o ponteiro para o recurso de memória padrão.

O _ponteiro para o recurso de memória padrão_ é usado por certas funcionalidades quando um recurso de memória explícito não é fornecido. O ponteiro inicial para o recurso de memória padrão é o valor de retorno de `new_delete_resource()`.

Esta função é thread-safe. Chamadas anteriores a `set_default_resource` _sincronizam com_ (veja [std::memory_order](<#/doc/atomic/memory_order>)) as chamadas subsequentes a get_default_resource.

### Valor de retorno

Retorna o valor do ponteiro para o recurso de memória padrão.

### Veja também

[ set_default_resource](<#/doc/experimental/set_default_resource>) | define o `memory_resource` padrão
(função)
[ new_delete_resource](<#/doc/experimental/new_delete_resource>) | retorna um `memory_resource` estático de escopo de programa que usa os [operator new](<#/doc/memory/new/operator_new>) e [operator delete](<#/doc/memory/new/operator_delete>) globais para alocar e desalocar memória
(função)