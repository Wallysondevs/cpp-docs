# std::cauchy_distribution&lt;RealType&gt;::a, b

RealType a() const; |  (1)  |  (desde C++11)  
---|---|---
RealType b() const; |  (2)  |  (desde C++11)  

  
Retorna os parâmetros de distribuição com os quais a distribuição foi construída.

1) Retorna o parâmetro _a_. Ele especifica a localização do pico e também é chamado de parâmetro de localização. O valor padrão é 0.0.

2) Retorna o parâmetro _b_. Ele representa a meia-largura na meia-altura (HWHM) e também é chamado de parâmetro de escala. O valor padrão é 1.0.

### Parâmetros

(nenhum) 

### Valor de retorno

1) O valor do parâmetro _a_.

2) O valor do parâmetro _b_.

### Veja também

[ param](<#/doc/numeric/random/cauchy_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro de distribuição   
(função membro pública)  
  
### Links externos

1\.  | [Scale parameter](<https://en.wikipedia.org/wiki/Scale_parameter> "enwiki:Scale parameter"). Da Wikipedia.   
---|---
2\.  | [Location parameter](<https://en.wikipedia.org/wiki/Location_parameter> "enwiki:Location parameter"). Da Wikipedia. 