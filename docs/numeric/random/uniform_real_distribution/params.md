# std::uniform_real_distribution&lt;RealType&gt;::a, b

result_type a() const; |  (1)  |  (desde C++11)  
---|---|---
result_type b() const; |  (2)  |  (desde C++11)  

  
Retorna os parâmetros com os quais a distribuição foi construída.

1) Retorna o parâmetro _a_ da distribuição. Ele define o valor mínimo possivelmente gerado. O valor padrão é 0.0.

2) Retorna o parâmetro _b_ da distribuição. Ele define o valor máximo possivelmente gerado. O valor padrão é 1.0.

### Parâmetros

(nenhum)

### Valor de retorno

1) O parâmetro _a_ da distribuição.

2) O parâmetro _b_ da distribuição.

### Veja também

[ param](<#/doc/numeric/random/uniform_real_distribution/param>)(C++11) |  obtém ou define o objeto de parâmetro da distribuição   
(função membro pública)  