# std::experimental::swap(std::experimental::promise)

template< class R >  
void swap( [std::experimental::promise](<#/doc/experimental/promise>)&lt;R&gt; &lhs,  
[std::experimental::promise](<#/doc/experimental/promise>)&lt;R&gt; &rhs ) noexcept;

  
Sobrecarga o algoritmo `swap` para `std::experimental::promise`. Troca o estado de `lhs` com o de `rhs`. Efetivamente chama `lhs.swap(rhs)`. 

### Parâmetros

lhs, rhs  |  \-  |  promises cujos estados devem ser trocados   
  
### Valor de retorno

(nenhum) 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ swap](<#/doc/thread/promise/swap>) |  troca dois objetos `promise`   
(função membro pública de `std::promise<R>`)  