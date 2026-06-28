# std::atomic_ref&lt;T&gt;::store

void store( value_type desired,  
[std::memory_order](<#/doc/atomic/memory_order>) order =  
[std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) const noexcept; |  | (constexpr desde C++26)  

  
Substitui atomicamente o valor atual do objeto referenciado por desired. A memória é afetada de acordo com o valor de order.

Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_const_v](<#/doc/types/is_const>)&lt;T&gt; for false.

Se order não for [std::memory_order_relaxed](<#/doc/atomic/memory_order>), [std::memory_order_release](<#/doc/atomic/memory_order>) ou [std::memory_order_seq_cst](<#/doc/atomic/memory_order>), o comportamento é indefinido.

### Parâmetros

desired  |  \-  |  o valor a ser armazenado no objeto referenciado   
---|---|---
order  |  \-  |  restrições de ordem de memória a serem impostas   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3508](<https://cplusplus.github.io/LWG/issue3508>)  
([P3323R1](<https://wg21.link/P3323R1>))  | C++20  | `store` era sem sentido para const T | restrito a aceitar apenas T não-const  
  
### Ver também

[ operator=](<#/>) |  armazena um valor no objeto referenciado por um objeto `atomic_ref`   
(função membro pública)  