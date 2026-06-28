# std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::load_factor

float load_factor() const; |  |  (desde C++11)  

  
Retorna o número médio de elementos por bucket, isto é, [size()](<#/doc/container/unordered_set/size>) dividido por [bucket_count()](<#/doc/container/unordered_set/bucket_count>). 

### Parâmetros

(nenhum) 

### Valor de retorno

Número médio de elementos por bucket. 

### Complexidade

Constante. 

### Veja também

[ max_load_factor](<#/doc/container/unordered_set/max_load_factor>) |  gerencia o número médio máximo de elementos por bucket   
(public member function)  