# std::normal_distribution&lt;RealType&gt;::normal_distribution

```cpp
normal_distribution() : normal_distribution(0.0) {}  // (1) (desde C++11)
explicit normal_distribution( RealType mean, RealType stddev = 1.0 );  // (2) (desde C++11)
explicit normal_distribution( const param_type& params );  // (3) (desde C++11)
```

Constrói um novo objeto de distribuição.

2) Usa mean e stddev como os parâmetros da distribuição.

3) Usa params como os parâmetros da distribuição.

O comportamento é indefinido se stddev não for maior que zero.

### Parâmetros

- **mean** — o parâmetro de distribuição _μ_ (média)
- **stddev** — o parâmetro de distribuição _σ_ (desvio padrão)
- **params** — o conjunto de parâmetros da distribuição

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | construtor padrão era explícito | tornou-se implícito