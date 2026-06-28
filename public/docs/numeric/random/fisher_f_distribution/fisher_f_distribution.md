# std::fisher_f_distribution&lt;RealType&gt;::fisher_f_distribution

```cpp
fisher_f_distribution() : fisher_f_distribution(1.0) {}  // (1) (desde C++11)
explicit fisher_f_distribution( RealType m, RealType n = 1.0 );  // (2) (desde C++11)
explicit fisher_f_distribution( const param_type& params );  // (3) (desde C++11)
```

  
Constrói um novo objeto de distribuição.

2) Usa m e n como os parâmetros da distribuição.

3) Usa params como o conjunto de parâmetros da distribuição.

### Parâmetros

m  |  \-  |  o parâmetro _m_ da distribuição (graus de liberdade)   
---|---|---
n  |  \-  |  o parâmetro _n_ da distribuição (graus de liberdade)   
params  |  \-  |  o conjunto de parâmetros da distribuição   
  
### Relatórios de defeito 

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11  | construtor padrão era explícito  | tornou-se implícito 