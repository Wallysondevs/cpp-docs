# std::scoped_allocator_adaptor&lt;OuterAlloc,InnerAlloc...&gt;::destroy

Definido no cabeçalho `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`

```c
template< class T >
void destroy( T* p );
```

Usa o alocador externo para chamar o destrutor do objeto apontado por p, chamando

[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;OUTERMOST&gt;::destroy(OUTERMOST(*this), p)

onde OUTERMOST é o tipo que seria retornado ao chamar this->outer_allocator(), e então chamando a função membro `outer_allocator()` recursivamente no resultado desta chamada até atingir o tipo que não possui tal função membro.

### Parâmetros

- **p** — ponteiro para o objeto que será destruído

### Valor de retorno

(nenhum)

### Ver também

[ destroy](<#/doc/memory/allocator_traits/destroy>)[static] | destrói um objeto armazenado no armazenamento alocado
(modelo de função)
[ destroy](<#/doc/memory/allocator/destroy>)(até C++20) | destrói um objeto em armazenamento alocado
(função membro pública de `std::allocator<T>`)