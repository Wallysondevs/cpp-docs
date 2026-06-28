# guias de dedução para std::scoped_allocator_adaptor

Definido no cabeçalho `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`

```c
template< class OuterAlloc, class... InnerAllocs >
scoped_allocator_adaptor( OuterAlloc, InnerAllocs... )
-> scoped_allocator_adaptor<OuterAlloc, InnerAllocs...>;
```

  
Um [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::scoped_allocator_adaptor](<#/doc/memory/scoped_allocator_adaptor>) para tornar possível deduzir seu alocador externo. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   