# operator==,!=(std::scoped_allocator_adaptor)

Definido no cabeçalho `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`

```c
template< class OuterAlloc1, class OuterAlloc2, class... InnerAllocs >
bool operator==( const scoped_allocator_adaptor<OuterAlloc1, InnerAllocs...>& lhs,
const scoped_allocator_adaptor<OuterAlloc2, InnerAllocs...>& rhs ) noexcept;
template< class OuterAlloc1, class OuterAlloc2, class... InnerAllocs >
bool operator!=( const scoped_allocator_adaptor<OuterAlloc1, InnerAllocs...>& lhs,
const scoped_allocator_adaptor<OuterAlloc2, InnerAllocs...>& rhs ) noexcept;
(até C++20)
```

Compara dois adaptadores de alocador com escopo. Dois alocadores assim são iguais se:

  * lhs.outer_allocator() == rhs.outer_allocator(), e
  * se sizeof...(InnerAllocs) > 0, lhs.inner_allocator() == rhs.inner_allocator().

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs** — adaptadores de alocador com escopo para comparar

### Valor de retorno

1) Retorna true se lhs e rhs forem iguais, false caso contrário.

2) Retorna true se lhs e rhs não forem iguais, false caso contrário.