# std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::end(size_type), std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::cend(size_type)

```cpp
local_iterator end( size_type n );  // (desde C++11)
const_local_iterator end( size_type n ) const;  // (desde C++11)
const_local_iterator cend( size_type n ) const;  // (desde C++11)
```

  
Retorna um iterator para o elemento que segue o último elemento do bucket com índice n. Este elemento atua como um marcador de posição (placeholder), e tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

n  |  \-  |  o índice do bucket a ser acessado   
  
### Valor de retorno

Iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Veja também

[ begin(size_type)cbegin(size_type)](<#/doc/container/unordered_multimap/begin2>) |  retorna um iterator para o início do bucket especificado   
(função membro pública)  