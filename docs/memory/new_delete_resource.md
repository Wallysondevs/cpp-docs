# std::pmr::new_delete_resource

Definido no cabeçalho `[<memory_resource>](<#/doc/header/memory_resource>)`

```c
std::pmr::memory_resource* new_delete_resource() noexcept;
```

Retorna um ponteiro para um `memory_resource` que usa os [operator new](<#/doc/memory/new/operator_new>) e [operator delete](<#/doc/memory/new/operator_delete>) globais para alocar memória.

### Valor de retorno

Retorna um ponteiro `p` para um objeto com duração de armazenamento estática de um tipo derivado de [std::pmr::memory_resource](<#/doc/memory/memory_resource>), com as seguintes propriedades:

  * sua função `allocate()` usa ::[operator new](<#/doc/memory/new/operator_new>) para alocar memória;
  * sua função `deallocate()` usa ::[operator delete](<#/doc/memory/new/operator_delete>) para desalocar memória;
  * para qualquer `memory_resource` `r`, p->is_equal(r) retorna &r == p.

O mesmo valor é retornado toda vez que esta função é chamada.