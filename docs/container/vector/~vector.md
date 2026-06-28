# std::vector&lt;T,Allocator&gt;::~vector

~vector(); |  |  (constexpr desde C++20)  

  
Um [destrutor](<#/doc/language/destructor>). Destrói o `vector`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Note que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho do `vector`. 