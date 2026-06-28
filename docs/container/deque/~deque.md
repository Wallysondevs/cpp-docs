# std::deque&lt;T,Allocator&gt;::~deque

~deque();

  
Um [destrutor](<#/doc/language/destructor>). Destrói o `deque`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho do `deque`. 