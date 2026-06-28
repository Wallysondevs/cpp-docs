# std::stack&lt;T,Container&gt;::~stack

~stack();

  
Um [destrutor](<#/doc/language/destructor>). Destrói a `stack`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos.

### Complexidade

Linear no tamanho da `stack`.