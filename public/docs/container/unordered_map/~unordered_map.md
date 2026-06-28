# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::~unordered_map

```cpp
~unordered_map();  // (desde C++11)
```

  
Um [destrutor](<#/doc/language/destructor>). Destrói o `unordered_map`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho do `unordered_map`. 