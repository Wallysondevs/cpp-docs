# std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::~unordered_multimap

```cpp
~unordered_multimap();  // (desde C++11)
```

  
Um [destrutor](<#/doc/language/destructor>). Destrói o `unordered_multimap`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho do `unordered_multimap`. 