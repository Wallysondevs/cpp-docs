# std::experimental::swap(std::experimental::function)

template< class R, class... Args >  
void swap( [std::experimental::function](<#/doc/experimental/function>)<R(Args...)> &lhs,  
[std::experimental::function](<#/doc/experimental/function>)<R(Args...)> &rhs );

  
Sobrecarga o algoritmo `swap` para std::experimental::function. Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs). 

### Parâmetros

lhs, rhs  |  \-  |  wrappers de função polimórficos cujos estados devem ser trocados   
  
### Valor de retorno

(nenhum) 

### Exceções

Pode lançar exceções definidas pela implementação. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ swap](<#/doc/experimental/function/swap>) |  troca o conteúdo   
(função membro pública)  