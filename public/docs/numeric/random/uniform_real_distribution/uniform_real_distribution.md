# std::uniform_real_distribution&lt;RealType&gt;::uniform_real_distribution

```cpp
uniform_real_distribution() : uniform_real_distribution(0.0) { }  // (1) (desde C++11)
explicit uniform_real_distribution( RealType a, RealType b = 1.0 );  // (2) (desde C++11)
explicit uniform_real_distribution( const param_type& params );  // (3) (desde C++11)
```

Constrói um novo objeto de distribuição.

2) Usa `a` e `b` como os parâmetros da distribuição.

3) Usa `params` como os parâmetros da distribuição.

### Parâmetros

- **a** — o parâmetro de distribuição _a_ (valor mínimo)
- **b** — o parâmetro de distribuição _b_ (valor máximo)
- **params** — o conjunto de parâmetros da distribuição

### Notas

Requer que `a ≤ b` e `b - a ≤ [std::numeric_limits](<#/doc/types/numeric_limits>)<RealType>::max()`.

Se `a == b`, chamadas subsequentes à sobrecarga de [`operator()`](<#/>) que não aceita um objeto `param_type` causarão comportamento indefinido.

Para criar uma distribuição sobre o intervalo fechado `[a,b]`, [`std::nextafter`](<#/doc/numeric/math/nextafter>)(`b`, [`std::numeric_limits`](<#/doc/types/numeric_limits>)&lt;RealType&gt;::max()) pode ser usado como o segundo parâmetro.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | construtor padrão era explícito | tornado implícito