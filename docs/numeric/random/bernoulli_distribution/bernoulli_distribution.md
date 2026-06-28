# std::bernoulli_distribution::bernoulli_distribution

```cpp
bernoulli_distribution() : bernoulli_distribution(0.5) { }  // (1) (desde C++11)
explicit bernoulli_distribution( double p );  // (2) (desde C++11)
explicit bernoulli_distribution( const param_type& params );  // (3) (desde C++11)
```

Constrói um novo objeto de distribuição.

2) Usa `p` como o parâmetro de distribuição.

3) Usa `params` como o parâmetro de distribuição.

### Parâmetros

- **p** — o parâmetro de distribuição `p` (probabilidade de gerar `true`)
- **params** — o conjunto de parâmetros de distribuição

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | o construtor padrão era explícito | tornado implícito