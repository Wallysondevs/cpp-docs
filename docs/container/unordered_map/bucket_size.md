# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::bucket_size

size_type bucket_size( size_type n ) const; |  |  (desde C++11)  

  
Retorna o número de elementos no bucket com índice n. 

### Parâmetros

n  |  \-  |  o índice do bucket a ser examinado   
  
### Valor de retorno

O número de elementos no bucket n. 

### Complexidade

Linear no tamanho do bucket n. 

### Veja também

[ bucket_count](<#/doc/container/unordered_map/bucket_count>) |  retorna o número de buckets   
(função membro pública)  