# std::stop_source::stop_source

```cpp
stop_source();  // (1) (desde C++20)
explicit stop_source( std::nostopstate_t nss ) noexcept;  // (2) (desde C++20)
stop_source( const stop_source& other ) noexcept;  // (3) (desde C++20)
stop_source( stop_source&& other ) noexcept;  // (4) (desde C++20)
```

Constrói um novo objeto `stop_source`.

1) Constrói um `stop_source` com um novo stop-state.

2) Constrói um `stop_source` vazio sem stop-state associado.

3) Construtor de cópia. Constrói um `stop_source` cujo stop-state associado é o mesmo que o de other.

4) Construtor de movimento. Constrói um `stop_source` cujo stop-state associado é o mesmo que o de other; other é deixado vazio.

### Parâmetros

- **nss** — um objeto placeholder `std::nostopstate_t` para construir um `stop_source` vazio
- **other** — outro objeto `stop_source` para construir este objeto `stop_source` com

### Pós-condições

1) stop_possible() é true e stop_requested() é false.

2) stop_possible() e stop_requested() são ambos false.

3) *this e other compartilham o mesmo stop-state associado e se comparam como iguais.

4) *this possui o stop-state previamente associado de other, e other.stop_possible() é false.

### Exceções

1) [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória não pôde ser alocada para o stop-state.