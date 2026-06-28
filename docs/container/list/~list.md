# std::list&lt;T,Allocator&gt;::~list

~list();

  
Um [destrutor](<#/doc/language/destructor>). Destrói a `list`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho da `list`. 