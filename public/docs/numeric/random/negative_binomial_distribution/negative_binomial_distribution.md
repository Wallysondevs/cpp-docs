# std::negative_binomial_distribution&lt;IntType&gt;::negative_binomial_distribution

```cpp
negative_binomial_distribution() : negative_binomial_distribution(1) {}  // (1) (desde C++11)
explicit negative_binomial_distribution( IntType k, double p = 0.5 );  // (2) (desde C++11)
explicit negative_binomial_distribution( const param_type& params );  // (3) (desde C++11)
```

  
Constrói um novo objeto de distribuição.

2) Usa k e p como os parâmetros da distribuição.

3) Usa params como os parâmetros da distribuição.

### Parâmetros

k  |  \-  |  o parâmetro _k_ da distribuição (número de sucessos de tentativa)   
---|---|---
p  |  \-  |  o parâmetro _p_ da distribuição (probabilidade de uma tentativa gerar verdadeiro)   
params  |  \-  |  o conjunto de parâmetros da distribuição   
  
### Observações

Requer que 0 < p ≤ 1 e 0 < k.

Se `p == 1`, chamadas subsequentes à sobrecarga do [`operator()`](<#/>) que não aceita um objeto `param_type` causarão comportamento indefinido.

A `std::negative_binomial_distribution` construída por padrão é equivalente à [std::geometric_distribution](<#/doc/numeric/random/geometric_distribution>) construída por padrão.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11  | construtor padrão era explícito  | tornado implícito 