# std::multiset&lt;Key,Compare,Allocator&gt;::~multiset

~multiset();

  
Um [destrutor](<#/doc/language/destructor>). Destrói o `multiset`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho do `multiset`.