# std::weibull_distribution&lt;RealType&gt;::weibull_distribution

```cpp
weibull_distribution() : weibull_distribution(1.0) {}  // (1) (desde C++11)
explicit weibull_distribution( RealType a, RealType b = 1.0 );  // (2) (desde C++11)
explicit weibull_distribution( const param_type& params );  // (3) (desde C++11)
```

Constrói um novo objeto de distribuição.

2) Usa `a` e `b` como os parâmetros da distribuição.

3) Usa `params` como o conjunto de parâmetros da distribuição.

### Parâmetros

- **a** — o parâmetro _a_ da distribuição (forma)
- **b** — o parâmetro _b_ da distribuição (escala)
- **params** — o conjunto de parâmetros da distribuição

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | construtor padrão era explícito | tornado implícito