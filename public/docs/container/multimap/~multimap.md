# std::multimap&lt;Key,T,Compare,Allocator&gt;::~multimap

~multimap();

  
Um [destrutor](<#/doc/language/destructor>). Destrói o `multimap`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho do `multimap`. 