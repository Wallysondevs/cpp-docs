# std::scoped_allocator_adaptor&lt;OuterAlloc,InnerAlloc...&gt;::deallocate

Definido no cabeçalho `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`

```c
void deallocate( pointer p, size_type n ) noexcept;
```

Usa o alocador externo para desalocar o armazenamento referenciado por `p`, chamando [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;OuterAlloc&gt;::deallocate(outer_allocator(), p, n).

### Parâmetros

- **p** — ponteiro para a memória previamente alocada
- **n** — o número de objetos para os quais a memória foi alocada

### Valor de retorno

(nenhum)

### Veja também

[ deallocate](<#/doc/memory/allocator/deallocate>) | desaloca armazenamento
(função membro pública de `std::allocator<T>`)
[ deallocate](<#/doc/memory/allocator_traits/deallocate>)[static] | desaloca armazenamento usando o alocador
(função membro estática pública de `std::allocator_traits<Alloc>`)