# std::binomial_distribution&lt;IntType&gt;::binomial_distribution

```cpp
binomial_distribution() : binomial_distribution(1) {}  // (1) (desde C++11)
explicit binomial_distribution( IntType t, double p = 0.5 );  // (2) (desde C++11)
explicit binomial_distribution( const param_type& params );  // (3) (desde C++11)
```

  
Constrói um novo objeto de distribuição.

2) Usa t e p como os parâmetros da distribuição.

3) Usa params como o parâmetro da distribuição.

### Parâmetros

t  |  \-  |  o parâmetro _t_ da distribuição (número de tentativas)   
---|---|---
p  |  \-  |  o parâmetro _p_ da distribuição (probabilidade de uma tentativa gerar verdadeiro)   
params  |  \-  |  o conjunto de parâmetros da distribuição   
  
### Notas

Requer que 0 ≤ p ≤ 1 e 0 ≤ t.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11  | construtor padrão era explícito  | tornou-se implícito 