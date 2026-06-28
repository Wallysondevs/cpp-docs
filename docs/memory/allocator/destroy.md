# std::allocator&lt;T&gt;::destroy

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
void destroy( pointer p );
template< class U >
void destroy( U* p );
(obsoleto em C++17)
(removido em C++20)
```

Chama o destrutor do objeto apontado por p.

1) Chama p->~T().

2) Chama p->~U().

### Parâmetros

- **p** — ponteiro para o objeto que será destruído

### Valor de retorno

(nenhum)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 400](<https://cplusplus.github.io/LWG/issue400>) | C++98 | p foi convertido para `T*`, que é o tipo de p | removeu a conversão redundante

### Veja também

[ destroy](<#/doc/memory/allocator_traits/destroy>)[static] | destrói um objeto armazenado no armazenamento alocado
(function template)