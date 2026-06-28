# std::experimental::swap(std::experimental::packaged_task)

template< class R, class... Args >  
void swap( [std::experimental::packaged_task](<#/doc/experimental/packaged_task>)<R(Args...)> &lhs,  
[std::experimental::packaged_task](<#/doc/experimental/packaged_task>)<R(Args...)> &rhs ) noexcept;

  
Sobrecarga o algoritmo `swap` para `std::experimental::packaged_task`. Troca o estado de `lhs` com o de `rhs`. Efetivamente chama `lhs.swap(rhs)`. 

### Parâmetros

lhs, rhs  |  \-  |  objetos `packaged_task` cujos estados devem ser trocados   
  
### Valor de retorno

(nenhum) 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ swap](<#/doc/thread/packaged_task/swap>) |  troca dois objetos `task`   
(função membro pública de `std::packaged_task<R(Args...)>`)  