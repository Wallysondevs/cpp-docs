# std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::rehash

```cpp
void rehash( size_type count );  // (desde C++11)
```

  
Altera o número de buckets para um valor `n` que não é menor que `count` e satisfaz n >= size() / max_load_factor(), então re-hash o container, ou seja, coloca os elementos em buckets apropriados considerando que o número total de buckets foi alterado. 

### Parâmetros

count  |  \-  |  limite inferior para o novo número de buckets   
  
### Valor de retorno

(nenhum) 

### Complexidade

Caso médio linear no tamanho do container, pior caso quadrático. 

### Notas

`rehash(0)` pode ser usado para forçar um re-hash incondicional, como após a suspensão do re-hashing automático ao aumentar temporariamente max_load_factor(). 

### Veja também

[ reserve](<#/doc/container/unordered_set/reserve>) |  reserva espaço para pelo menos o número especificado de elementos e regenera a tabela hash   
(função membro pública)  