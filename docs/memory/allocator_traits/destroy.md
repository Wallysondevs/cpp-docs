# std::allocator_traits&lt;Alloc&gt;::destroy

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T >
static void destroy( Alloc& a, T* p );
(constexpr desde C++20)
```

Chama o destrutor do objeto apontado por p. Se possível, faz isso chamando a.destroy(p). Se não for possível (por exemplo, `Alloc` não possui a função membro `destroy()`), então chama o destrutor de `*p` diretamente, como `p->~T()`(até C++20)[`std::destroy_at`](<#/doc/memory/destroy_at>)(p)(desde C++20).

### Parâmetros

- **a** — alocador a ser usado para destruição
- **p** — ponteiro para o objeto sendo destruído

### Valor de retorno

(nenhum)

### Observações

Como esta função fornece o retorno automático para a chamada direta ao destrutor, a função membro `destroy()` é um requisito opcional de [`Allocator`](<#/doc/named_req/Allocator>) desde C++11.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ destroy](<#/doc/memory/allocator/destroy>)(até C++20) | destrói um objeto em armazenamento alocado
(função membro pública de `std::allocator<T>`)