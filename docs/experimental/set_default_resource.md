# std::experimental::pmr::set_default_resource

Definido no cabeçalho `[<experimental/memory_resource>](<#/doc/header/experimental/memory_resource>)`

```c
memory_resource* set_default_resource( memory_resource* r ) noexcept;
```

Se r não for nulo, define o ponteiro de recurso de memória padrão para r; caso contrário, define o ponteiro de recurso de memória padrão para `new_delete_resource()`.

O _ponteiro de recurso de memória padrão_ é usado por certas facilidades quando um recurso de memória explícito não é fornecido. O ponteiro de recurso de memória padrão inicial é o valor de retorno de `new_delete_resource()`.

Esta função é thread-safe. Cada chamada para `set_default_resource` _sincroniza com_ (veja [std::memory_order](<#/doc/atomic/memory_order>)) as chamadas subsequentes de `set_default_resource` e get_default_resource.

### Valor de retorno

Retorna o valor anterior do ponteiro de recurso de memória padrão.

### Veja também

[ get_default_resource](<#/doc/experimental/get_default_resource>) | obtém o `memory_resource` padrão
(função)
[ new_delete_resource](<#/doc/experimental/new_delete_resource>) | retorna um `memory_resource` estático de escopo de programa que usa os [operator new](<#/doc/memory/new/operator_new>) e [operator delete](<#/doc/memory/new/operator_delete>) globais para alocar e desalocar memória
(função)