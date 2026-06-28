# std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::~unordered_set

```cpp
~unordered_set();  // (desde C++11)
```

  
Um [destrutor](<#/doc/language/destructor>). Destrói o `unordered_set`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho do `unordered_set`.