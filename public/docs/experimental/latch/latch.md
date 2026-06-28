# std::experimental::latch::latch

explicit latch( ptrdiff_t value ); | (1) | (concurrency TS)
---|---|---
latch( const latch & ) = delete; | (2) | (concurrency TS)

1) Constrói um `latch` e inicializa seu contador interno.

2) O construtor de cópia é deletado. `latch` não é copiável.

### Parâmetros

- **value** — o valor inicial do contador interno; deve ser não negativo