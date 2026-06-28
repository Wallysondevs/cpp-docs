# std::exponential_distribution&lt;RealType&gt;::exponential_distribution

```cpp
exponential_distribution() : exponential_distribution(1.0) {}  // (1) (desde C++11)
explicit exponential_distribution( RealType lambda );  // (2) (desde C++11)
explicit exponential_distribution( const param_type& params );  // (3) (desde C++11)
```

Constrói um novo objeto de distribuição.

2) Usa lambda como o parâmetro de distribuição.

3) Usa params como o parâmetro de distribuição.

### Parâmetros

- **lambda** — o parâmetro de distribuição _λ_ (o parâmetro de taxa)
- **params** — o conjunto de parâmetros de distribuição

### Notas

Requer que 0 < lambda.

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | construtor padrão era explícito | tornado implícito