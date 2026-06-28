# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::rehash

```cpp
void rehash( size_type count );  // (desde C++11)
```

  
Altera o número de buckets para um valor `n` que não seja menor que `count` e satisfaz `n >= size() / max_load_factor()`, então faz o rehash do container, isto é, coloca os elementos em buckets apropriados considerando que o número total de buckets foi alterado.

### Parâmetros

count  |  \-  |  limite inferior para o novo número de buckets   
  
### Valor de retorno

(nenhum) 

### Complexidade

Caso médio linear no tamanho do container, pior caso quadrático. 

### Observações

`rehash(0)` pode ser usado para forçar um rehash incondicional, como após a suspensão do rehash automático ao aumentar temporariamente `max_load_factor()`. 

### Veja também

[ reserve](<#/doc/container/unordered_multiset/reserve>) |  reserva espaço para pelo menos o número especificado de elementos e regenera a tabela hash   
(função membro pública)  