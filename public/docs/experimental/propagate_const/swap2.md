# std::experimental::swap(std::experimental::propagate_const)

template< class T >  
constexpr void swap( [std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt;& lhs,  
[std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt;& rhs ) noexcept(/* see below */); |  |  (library fundamentals TS v2)  

  
Especializa o algoritmo `swap` para [std::experimental::propagate_const](<#/doc/experimental/propagate_const>). Troca os ponteiros de `lhs` e `rhs`. Equivalente a `lhs.swap(rhs)`. 

Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;T&gt; for `true`.  | (library fundamentals TS v3)  
  
### Parâmetros

lhs, rhs  |  \-  |  `propagate_const`s cujos conteúdos devem ser trocados   
  
### Valor de retorno

(nenhum) 

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(noexcept(lhs.swap(rhs)))

### Complexidade

Constante. 

### Veja também

[ swap](<#/doc/utility/swap>) |  troca os valores de dois objetos   
(modelo de função)  
[ swap](<#/doc/experimental/propagate_const/swap>) |  troca o ponteiro encapsulado   
(função membro pública)