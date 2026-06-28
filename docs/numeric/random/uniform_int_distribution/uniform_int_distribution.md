# std::uniform_int_distribution&lt;IntType&gt;::uniform_int_distribution

```cpp
uniform_int_distribution() : uniform_int_distribution(0) { }  // (1) (desde C++11)
explicit uniform_int_distribution( IntType a,
IntType b = std::numeric_limits<IntType>::max() );  // (2) (desde C++11)
explicit uniform_int_distribution( const param_type& params );  // (3) (desde C++11)
```

  
Constrói um novo objeto de distribuição.

2) Usa `a` e `b` como os parâmetros de distribuição.

3) Usa `params` como os parâmetros de distribuição.

O comportamento é indefinido se `a > b`.

### Parâmetros

a  |  \-  |  o parâmetro de distribuição _a_ (valor mínimo)   
---|---|---
b  |  \-  |  o parâmetro de distribuição _b_ (valor máximo)   
params  |  \-  |  o conjunto de parâmetros de distribuição   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente aos padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11  | construtor padrão era explícito  | tornado implícito 