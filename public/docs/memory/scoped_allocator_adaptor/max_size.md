# std::scoped_allocator_adaptor&lt;OuterAlloc,InnerAlloc...&gt;::max_size

Definido no cabeçalho `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`

```c
size_type max_size() const;
```

Reporta o tamanho máximo de alocação suportado pelo alocador externo, chamando [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;OuterAlloc&gt;::max_size(outer_allocator()).

### Parâmetros

(nenhum)

### Valor de retorno

O tamanho máximo de alocação para OuterAlloc.

### Ver também

[ max_size](<#/doc/memory/allocator/max_size>)(até C++20) | retorna o maior tamanho de alocação suportado
(função membro pública de `std::allocator<T>`)
[ max_size](<#/doc/memory/allocator_traits/max_size>)[static] | retorna o tamanho máximo de objeto suportado pelo alocador
(função membro estática pública de `std::allocator_traits<Alloc>`)