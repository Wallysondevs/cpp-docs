# std::scoped_allocator_adaptor&lt;OuterAlloc,InnerAlloc...&gt;::operator=

Definido no cabeçalho `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`

```c
scoped_allocator_adaptor& operator=( const scoped_allocator_adaptor& other ) = default;
scoped_allocator_adaptor& operator=( scoped_allocator_adaptor&& other ) = default;
```

1) Operador de atribuição de cópia explicitamente padronizado que atribui por cópia a classe base (`OuterAlloc`, o alocador externo) e todos os alocadores internos.

2) Operador de atribuição de movimento explicitamente padronizado que atribui por movimento a classe base (`OuterAlloc`, o alocador externo) e todos os alocadores internos.

### Parâmetros

- **other** — outro `std::scoped_allocator_adaptor`