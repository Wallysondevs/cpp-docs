# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::~unordered_multiset

```cpp
~unordered_multiset();  // (desde C++11)
```

  
Um [destrutor](<#/doc/language/destructor>). Destrói o `unordered_multiset`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho do `unordered_multiset`. 