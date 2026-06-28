# std::pmr::operator==, std::pmr::operator!=

Definido no cabeçalho `[<memory_resource>](<#/doc/header/memory_resource>)`

```c
bool operator==( const std::pmr::memory_resource& a,
const std::pmr::memory_resource& b ) noexcept;
bool operator!=( const std::pmr::memory_resource& a,
const std::pmr::memory_resource& b ) noexcept;
(até C++20)
```

Compara os `memory_resource`s a e b por igualdade. Dois `memory_resource`s são considerados iguais se e somente se a memória alocada de um `memory_resource` puder ser desalocada do outro e vice-versa.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```

### Valor de retorno

1) &a == &b || a.is_equal(b)

2) !(a == b)

### Ver também

[ is_equal](<#/doc/memory/memory_resource/is_equal>) | compara por igualdade com outro `memory_resource`
(função membro pública)