# std::weibull_distribution&lt;RealType&gt;::a, b

RealType a() const; | (1) | (desde C++11)
---|---|---
RealType b() const; | (2) | (desde C++11)

Retorna os parâmetros com os quais a distribuição foi construída.

1) Retorna o parâmetro `a`. Ele define a forma da distribuição. O valor padrão é 1.0.

2) Retorna o parâmetro `b`. Ele define a escala da distribuição. O valor padrão é 1.0.

### Parâmetros

(nenhum)

### Valor de retorno

1) O valor do parâmetro `a`.

2) O valor do parâmetro `b`.

### Complexidade

Constante.

### Veja também

[ param](<#/doc/numeric/random/weibull_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)