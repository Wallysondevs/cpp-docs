# std::set&lt;Key,Compare,Allocator&gt;::~set

~set();

  
Um [destrutor](<#/doc/language/destructor>). Destrói o `set`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Observe que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho do `set`. 