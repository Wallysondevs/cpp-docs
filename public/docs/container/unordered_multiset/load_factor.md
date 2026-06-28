# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::load_factor

float load_factor() const; |  |  (desde C++11)  

  
Retorna o número médio de elementos por bucket, ou seja, [size()](<#/doc/container/unordered_multiset/size>) dividido por [bucket_count()](<#/doc/container/unordered_multiset/bucket_count>). 

### Parâmetros

(nenhum) 

### Valor de retorno

Número médio de elementos por bucket. 

### Complexidade

Constante. 

### Veja também

[ max_load_factor](<#/doc/container/unordered_multiset/max_load_factor>) |  gerencia o número médio máximo de elementos por bucket   
(função membro pública)  