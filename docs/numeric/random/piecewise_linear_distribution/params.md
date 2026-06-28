# std::piecewise_linear_distribution&lt;RealType&gt;::intervals, densities

[std::vector](<#/doc/container/vector>)&lt;RealType&gt; intervals() const; | (1) | (desde C++11)
---|---|---
[std::vector](<#/doc/container/vector>)&lt;RealType&gt; densities() const; | (2) | (desde C++11)

Retorna os parâmetros da distribuição.

1) Retorna a lista de limites dos intervalos.

2) Retorna a lista de densidades de probabilidade nos limites dos intervalos.

### Parâmetros

(nenhum)

### Valor de retorno

Os parâmetros da distribuição:

1) A lista de limites dos intervalos.

2) A lista de densidades de probabilidade nos limites dos intervalos.

### Complexidade

Linear no número de intervalos neste objeto.