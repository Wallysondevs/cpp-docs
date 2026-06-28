# std::negative_binomial_distribution&lt;IntType&gt;::p, k

double p() const; | (1) | (desde C++11)
---|---|---
IntType k() const; | (2) | (desde C++11)

Retorna os parâmetros com os quais a distribuição foi construída.

1) Retorna o parâmetro de distribuição p. Ele define a probabilidade de uma tentativa gerar verdadeiro. O valor padrão é 0.5.

2) Retorna o parâmetro de distribuição k. Ele define o número de resultados desejados. O valor padrão é 1.

### Parâmetros

(nenhum)

### Valor de retorno

1) O parâmetro de distribuição p.

2) O parâmetro de distribuição k.

### Veja também

[ param](<#/doc/numeric/random/negative_binomial_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)