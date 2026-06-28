# std::geometric_distribution&lt;IntType&gt;::geometric_distribution

```cpp
geometric_distribution() : geometric_distribution(0.5) {}  // (1) (desde C++11)
explicit geometric_distribution( double p );  // (2) (desde C++11)
explicit geometric_distribution( const param_type& params );  // (3) (desde C++11)
```

  
Constrói um novo objeto de distribuição.

2) Usa p como o parâmetro da distribuição.

3) Usa params como o parâmetro da distribuição.

### Parâmetros

p  |  \-  |  o parâmetro de distribuição _p_ (probabilidade de uma tentativa gerar verdadeiro)   
---|---|---
params  |  \-  |  o conjunto de parâmetros da distribuição   
  
### Observações

Requer que 0 < p < 1.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11  | construtor padrão era explícito  | tornado implícito 