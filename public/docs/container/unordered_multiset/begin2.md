# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::begin(size_type), std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::cbegin(size_type)

```cpp
local_iterator begin( size_type n );  // (desde C++11)
const_local_iterator begin( size_type n ) const;  // (desde C++11)
const_local_iterator cbegin( size_type n ) const;  // (desde C++11)
```

  
Retorna um iterator para o primeiro elemento do bucket com índice n. 

### Parâmetros

n  |  \-  |  o índice do bucket a ser acessado   
  
### Valor de retorno

Iterator para o primeiro elemento. 

### Complexidade

Constante. 

### Veja também

[ end(size_type)cend(size_type)](<#/doc/container/unordered_multiset/end2>) |  retorna um iterator para o final do bucket especificado   
(função membro pública)  