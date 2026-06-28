# std::experimental::swap(std::experimental::observer_ptr)

template< class W >  
void swap( observer_ptr&lt;W&gt;& lhs, observer_ptr&lt;W&gt;& rhs ) noexcept; |  |  (library fundamentals TS v2)  

  
Especializa o algoritmo `swap` para [std::experimental::observer_ptr](<#/doc/experimental/observer_ptr>). Troca os ponteiros de `lhs` e `rhs`. Chama `lhs.swap(rhs)`. 

### Parâmetros

lhs, rhs  |  \-  |  `observer_ptr`s cujo conteúdo será trocado   
  
### Valor de retorno

(nenhum) 

### Complexidade

Constante. 

### Veja também

[ swap](<#/doc/utility/swap>) |  troca os valores de dois objetos   
(modelo de função)  
[ swap](<#/doc/experimental/observer_ptr/swap>) |  troca os objetos observados   
(função membro pública)