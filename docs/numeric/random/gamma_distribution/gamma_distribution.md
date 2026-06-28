# std::gamma_distribution&lt;RealType&gt;::gamma_distribution

```cpp
gamma_distribution() : gamma_distribution(1.0) {}  // (1) (desde C++11)
explicit gamma_distribution( RealType alpha, RealType beta = 1.0 );  // (2) (desde C++11)
explicit gamma_distribution( const param_type& params );  // (3) (desde C++11)
```

Constrói um novo objeto de distribuição.

2) Usa alpha e beta como os parâmetros da distribuição.

3) Usa params como os parâmetros da distribuição.

### Parâmetros

- **alpha** — o parâmetro _α_ da distribuição (forma)
- **beta** — o parâmetro _β_ da distribuição (escala)
- **params** — o conjunto de parâmetros da distribuição

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | construtor padrão era explícito | tornado implícito