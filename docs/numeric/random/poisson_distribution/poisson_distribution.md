# std::poisson_distribution&lt;IntType&gt;::poisson_distribution

```cpp
poisson_distribution() : poisson_distribution(1.0) {}  // (1) (desde C++11)
explicit poisson_distribution( double mean );  // (2) (desde C++11)
explicit poisson_distribution( const param_type& params );  // (3) (desde C++11)
```

Constrói um novo objeto de distribuição.

1) Usa 1.0 como o parâmetro de distribuição.

2) Usa mean como o parâmetro de distribuição.

3) Usa params como o parâmetro de distribuição.

### Parâmetros

- **mean** — o parâmetro de distribuição _μ_ (a média da distribuição)
- **params** — o conjunto de parâmetros de distribuição

### Observações

Requer que 0 < mean.

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | o construtor padrão era explícito | tornou-se implícito