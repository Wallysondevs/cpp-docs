# std::stop_token::stop_token

```cpp
`stop_token() noexcept;`  // (1) (desde C++20)
`stop_token( const stop_token& other ) noexcept;`  // (2) (desde C++20)
`stop_token( stop_token&& other ) noexcept;`  // (3) (desde C++20)
```

Constrói um novo objeto `stop_token`.

1) Constrói um `stop_token` vazio sem estado de parada associado.

2) Construtor de cópia. Constrói um `stop_token` cujo estado de parada associado é o mesmo de `other`.

3) Construtor de movimento. Constrói um `stop_token` cujo estado de parada associado é o mesmo de `other`; `other` é deixado vazio.

### Parâmetros

- **other** — outro objeto `stop_token` para construir este objeto `stop_token` com

### Pós-condições

1) `stop_possible()` e `stop_requested()` são ambos `false`.

2) `*this` e `other` compartilham o mesmo estado de parada associado e se comparam como iguais.

3) `*this` possui o estado de parada previamente associado de `other`, e `other.stop_possible()` é `false`.