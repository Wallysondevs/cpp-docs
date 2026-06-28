# std::queue&lt;T,Container&gt;::~queue

~queue();

  
Um [destrutor](<#/doc/language/destructor>). Destrói a `queue`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho da `queue`. 