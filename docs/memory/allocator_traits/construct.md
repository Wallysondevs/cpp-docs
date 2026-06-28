# std::allocator_traits&lt;Alloc&gt;::construct

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T, class... Args >
static void construct( Alloc& a, T* p, Args&&... args );
(constexpr desde C++20)
```

Se possível, constrói um objeto do tipo `T` em armazenamento alocado não inicializado apontado por `p`, chamando `a.construct(p, [std::forward](<#/doc/utility/forward>)<Args>(args)...)`.

Se o acima não for possível (por exemplo, `Alloc` não possui a função membro `construct()`), então chama

::new (static_cast<void*>(p)) T([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...) | (até C++20)
---|---
[std::construct_at](<#/doc/memory/construct_at>)(p, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...) | (desde C++20)

### Parâmetros

a | \- | allocator a ser usado para construção
---|---|---
p | \- | ponteiro para o armazenamento não inicializado onde um objeto `T` será construído
args... | \- | os argumentos do construtor a serem passados para `a.construct()` ou para placement-new (até C++20) `[std::construct_at()](<#/doc/memory/construct_at>)` (desde C++20)

### Valor de retorno

(nenhum)

### Notas

Esta função é usada pelos containers da standard library ao inserir, copiar ou mover elementos.

Como esta função fornece o fallback automático para placement new, a função membro `construct()` é um requisito opcional de [Allocator](<#/doc/named_req/Allocator>) desde C++11.

### Veja também

[ operator newoperator new[]](<#/doc/memory/new/operator_new>) | funções de alocação
(função)
[ construct](<#/doc/memory/allocator/construct>)(até C++20) | constrói um objeto em armazenamento alocado
(função membro pública de `std::allocator<T>`)
[ construct_at](<#/doc/memory/construct_at>)(C++20) | cria um objeto em um endereço dado
(modelo de função)