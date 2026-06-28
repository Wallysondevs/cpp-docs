# std::experimental::pmr::null_memory_resource

Definido no cabeçalho `[<experimental/memory_resource>](<#/doc/header/experimental/memory_resource>)`

```c
memory_resource* null_memory_resource() noexcept;
```

Retorna um ponteiro para um `memory_resource` que não realiza nenhuma alocação.

### Valor de retorno

Retorna um ponteiro `p` para um objeto com duração de armazenamento estática de um tipo derivado de [std::experimental::pmr::memory_resource](<#/doc/experimental/memory_resource>), com as seguintes propriedades:

*   sua função `allocate()` sempre lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>);
*   sua função `deallocate()` não tem efeito;
*   para qualquer `memory_resource` `r`, `p->is_equal(r)` retorna `&r == p`.

O mesmo valor é retornado toda vez que esta função é chamada.