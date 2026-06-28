# std::destroying_delete_t, std::destroying_delete

Definido no cabeçalho `[<new>](<#/doc/header/new>)`

```c
struct destroying_delete_t { explicit destroying_delete_t() = default; };
inline constexpr destroying_delete_t destroying_delete{};
```

  
Tipo de tag usado para identificar a forma destroying delete de [operator delete](<#/doc/memory/new/operator_delete>). 

### Veja também

[ operator deleteoperator delete[]](<#/doc/memory/new/operator_delete>) |  funções de desalocação   
(função)  