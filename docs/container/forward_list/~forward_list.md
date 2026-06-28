# std::forward_list&lt;T,Allocator&gt;::~forward_list

```cpp
~forward_list();  // (desde C++11)
```

  
Um [destrutor](<#/doc/language/destructor>). Destrói a `forward_list`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho da `forward_list`. 