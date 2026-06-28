# std::uniform_int_distribution&lt;IntType&gt;::a, b

result_type a() const; | (1) | (desde C++11)
---|---|---
result_type b() const; | (2) | (desde C++11)

Retorna os parâmetros com os quais a distribuição foi construída.

1) Retorna o parâmetro de distribuição _a_. Ele define o valor mínimo possivelmente gerado. O valor padrão é ​0​.

2) Retorna o parâmetro de distribuição _b_. Ele define o valor máximo possivelmente gerado. O valor padrão é [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;IntType&gt;::max().

### Parâmetros

(nenhum)

### Valor de retorno

1) O parâmetro de distribuição _a_.

2) O parâmetro de distribuição _b_.

### Ver também

[ param](<#/doc/numeric/random/uniform_int_distribution/param>)(desde C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)