# std::get_new_handler

Definido no cabeçalho `[<new>](<#/doc/header/new>)`

```c
std::new_handler get_new_handler() noexcept;
```

Retorna o new-handler atualmente instalado, que pode ser um ponteiro nulo.

Esta função é thread-safe. Uma chamada anterior a [std::set_new_handler](<#/doc/memory/new/set_new_handler>) _sincroniza-se com_ (veja [std::memory_order](<#/doc/atomic/memory_order>)) as chamadas subsequentes a `std::get_new_handler`.

### Parâmetros

(nenhum)

### Valor de retorno

O _new-handler_ atualmente instalado, que pode ser um valor de ponteiro nulo.

### Veja também

[ operator newoperator new[]](<#/doc/memory/new/operator_new>) | funções de alocação
(função)
[ set_new_handler](<#/doc/memory/new/set_new_handler>) | registra um new handler
(função)
[ new_handler](<#/doc/memory/new/new_handler>) | tipo de ponteiro de função do new handler
(typedef)