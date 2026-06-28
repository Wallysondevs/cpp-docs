# std::scoped_allocator_adaptor&lt;OuterAlloc,InnerAlloc...&gt;::inner_allocator

Definido no cabeçalho `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`

```c
inner_allocator_type& inner_allocator() noexcept;
const inner_allocator_type& inner_allocator() const noexcept;
```

Obtém uma referência para o allocator interno usado para declarar este `scoped_allocator_adaptor`.

Se `sizeof...(InnerAllocs) == 0`, ou seja, nenhum allocator interno foi declarado, retorna `*this`. Caso contrário, retorna uma referência para [std::scoped_allocator_adaptor](<#/doc/memory/scoped_allocator_adaptor>)<InnerAllocs...>, isto é, um scoped allocator composto por todos os allocators internos de `*this`, com o primeiro allocator interno tornando-se o allocator externo.

### Parâmetros

(nenhum)

### Valor de retorno

Uma referência para o allocator interno, que é ele próprio um `std::scoped_allocator_adaptor`.

### Veja também

[ outer_allocator](<#/doc/memory/scoped_allocator_adaptor/outer_allocator>) | obtém uma referência para `outer_allocator`
(função membro pública)