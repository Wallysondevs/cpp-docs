# std::priority_queue&lt;T,Container,Compare&gt;::~priority_queue

~priority_queue();

  
Um [destrutor](<#/doc/language/destructor>). Destrói a `priority_queue`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho da `priority_queue`. 