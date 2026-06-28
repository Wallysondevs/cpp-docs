# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::reserve

```cpp
void reserve( size_type count );  // (desde C++11)
```

  
Define o número de buckets para o número necessário para acomodar pelo menos `count` elementos sem exceder o fator de carga máximo e re-hash o container, ou seja, coloca os elementos nos buckets apropriados considerando que o número total de buckets mudou. Efetivamente chama rehash([std::ceil](<#/doc/numeric/math/ceil>)(count / max_load_factor())). 

### Parâmetros

count  |  \-  |  nova capacidade do container   
  
### Valor de retorno

(nenhum) 

### Complexidade

Caso médio linear no tamanho do container, pior caso quadrático. 

### Veja também

[ rehash](<#/doc/container/unordered_multiset/rehash>) |  reserva pelo menos o número especificado de buckets e regenera a tabela hash   
(função membro pública)  