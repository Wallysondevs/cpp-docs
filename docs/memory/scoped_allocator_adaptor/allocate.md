# std::scoped_allocator_adaptor&lt;OuterAlloc,InnerAlloc...&gt;::allocate

Definido no cabeçalho `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`

```c
pointer allocate( size_type n );
pointer allocate( size_type n, const_void_pointer hint );
```

Usa o alocador externo para alocar armazenamento não inicializado.

1) Chama [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;OuterAlloc&gt;::allocate(outer_allocator(), n).

2) Adicionalmente fornece uma dica de localidade de memória, chamando [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;OuterAlloc&gt;::allocate(outer_allocator(), n, hint).

### Parâmetros

- **n** — o número de objetos para os quais alocar armazenamento
- **hint** — ponteiro para uma localização de memória próxima

### Valor de retorno

O ponteiro para o armazenamento alocado.

### Veja também

[ allocate](<#/doc/memory/allocator/allocate>) | aloca armazenamento não inicializado
(função membro pública de `std::allocator<T>`)
[ allocate](<#/doc/memory/allocator_traits/allocate>)[static] | aloca armazenamento não inicializado usando o alocador
(função membro estática pública de `std::allocator_traits<Alloc>`)