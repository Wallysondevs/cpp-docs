# std::map&lt;Key,T,Compare,Allocator&gt;::~map

~map();

  
Um [destrutor](<#/doc/language/destructor>). Destrói o `map`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos.

### Complexidade

Linear no tamanho do `map`.