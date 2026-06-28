# std::latch::latch

```cpp
constexpr explicit latch( std::ptrdiff_t expected );  // (1) (desde C++20)
latch( const latch& ) = delete;  // (2) (desde C++20)
```

  
1) Constrói um `latch` e inicializa seu contador interno. O comportamento é indefinido se expected for negativo ou maior que max().

2) O construtor de cópia é deletado. `latch` não é copiável nem movível.

### Parâmetros

expected  |  \-  |  o valor inicial do contador interno   
  
### Exceções

Não lança exceções. 