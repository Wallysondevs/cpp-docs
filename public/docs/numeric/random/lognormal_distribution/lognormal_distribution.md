# std::lognormal_distribution&lt;RealType&gt;::lognormal_distribution

```cpp
lognormal_distribution() : lognormal_distribution(0.0) {}  // (1) (desde C++11)
explicit lognormal_distribution( RealType m, RealType s = 1.0 );  // (2) (desde C++11)
explicit lognormal_distribution( const param_type& params );  // (3) (desde C++11)
```

Constrói um novo objeto de distribuição.

2) Usa m e s como os parâmetros de distribuição.

3) Usa params como os parâmetros de distribuição.

### Parâmetros

- **m** — o parâmetro de distribuição _m_ (escala logarítmica)
- **s** — o parâmetro de distribuição _s_ (forma)
- **params** — o conjunto de parâmetros de distribuição

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | construtor padrão era explícito | tornou-se implícito