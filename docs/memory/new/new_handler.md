# std::new_handler

Definido no header `[<new>](<#/doc/header/new>)`

```cpp
typedef void (*new_handler)();
```

`std::new_handler` é o tipo de ponteiro para função (ponteiro para uma função que não recebe argumentos e retorna void), que é usado pelas funções [std::set_new_handler](<#/doc/memory/new/set_new_handler>) e [std::get_new_handler](<#/doc/memory/new/get_new_handler>).

### Veja também

[ operator newoperator new[]](<#/doc/memory/new/operator_new>) | funções de alocação
(função)
[ set_new_handler](<#/doc/memory/new/set_new_handler>) | registra um novo handler
(função)
[ get_new_handler](<#/doc/memory/new/get_new_handler>)(desde C++11) | obtém o handler new atual
(função)