# std::cauchy_distribution&lt;RealType&gt;::cauchy_distribution

```cpp
cauchy_distribution() : cauchy_distribution(0.0) {}  // (1) (desde C++11)
explicit cauchy_distribution( RealType a, RealType b = 1.0 );  // (2) (desde C++11)
explicit cauchy_distribution( const param_type& params );  // (3) (desde C++11)
```

  
Constrói um novo objeto de distribuição.

2) Usa `a` e `b` como os parâmetros da distribuição.

3) Usa `params` como o conjunto de parâmetros da distribuição.

### Parâmetros

a  |  \-  |  o parâmetro de distribuição _a_ (localização)   
---|---|---
b  |  \-  |  o parâmetro de distribuição _b_ (escala)   
params  |  \-  |  o conjunto de parâmetros da distribuição   
  
### Relatórios de defeito 

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11  | o construtor padrão era explícito  | tornado implícito 