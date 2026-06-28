# std::gamma_distribution&lt;RealType&gt;::alpha, beta

RealType alpha() const; | (1) | (desde C++11)
---|---|---
RealType beta() const; | (2) | (desde C++11)

Retorna os parâmetros de distribuição com os quais a distribuição foi construída.

1) Retorna o parâmetro de distribuição α. Também é conhecido como o parâmetro de forma. O valor padrão é 1.0.

2) Retorna o parâmetro de distribuição β. Também é conhecido como o parâmetro de escala. O valor padrão é 1.0.

### Parameters

(nenhum)

### Return value

1) Valor de ponto flutuante que identifica o parâmetro α.

2) Valor de ponto flutuante que identifica o parâmetro β.

### See also

[ param](<#/doc/numeric/random/gamma_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(public member function)