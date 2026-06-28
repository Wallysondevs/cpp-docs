# std::atomic_ref&lt;T&gt;::exchange

value_type exchange( value_type desired,  
[std::memory_order](<#/doc/atomic/memory_order>) order =  
[std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) const noexcept; |  | (constexpr desde C++26)  

  
Substitui atomicamente o valor do objeto referenciado por desired. A operação é uma operação de leitura-modificação-escrita. A memória é afetada de acordo com o valor de order. 

Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_const_v](<#/doc/types/is_const>)&lt;T&gt; for false. 

### Parâmetros

desired  |  \-  |  valor a atribuir   
---|---|---
order  |  \-  |  restrições de ordem de memória a impor   
  
### Valor de retorno

O valor do objeto referenciado antes da chamada. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3508](<https://cplusplus.github.io/LWG/issue3508>)  
([P3323R1](<https://wg21.link/P3323R1>))  | C++20  | `exchange` era sem sentido para const T | restrito a aceitar apenas `T` não-const