# std::scoped_allocator_adaptor&lt;OuterAlloc,InnerAlloc...&gt;::outer_allocator

Definido no cabeçalho `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`

```c
outer_allocator_type& outer_allocator() noexcept;
const outer_allocator_type& outer_allocator() const noexcept;
```

Obtém uma referência para o alocador externo usado para declarar esta classe.

1) Retorna `static_cast<OuterAlloc&>(*this)`.

2) Retorna `static_cast<const OuterAlloc&>(*this)`.

### Parâmetros

(nenhum)

### Valor de retorno

Uma referência para `OuterAlloc`.

### Veja também

[ inner_allocator](<#/doc/memory/scoped_allocator_adaptor/inner_allocator>) | obtém uma referência para `inner_allocator`
(função membro pública)