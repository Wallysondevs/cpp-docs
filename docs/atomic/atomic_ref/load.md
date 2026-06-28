# std::atomic_ref&lt;T&gt;::load

value_type load( [std::memory_order](<#/doc/atomic/memory_order>) order =  
[std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) const noexcept; |  | (constexpr desde C++26)  

  
Carrega atomicamente e retorna o valor atual do objeto referenciado. A memória é afetada de acordo com o valor de `order`.

Se `order` não for [std::memory_order_relaxed](<#/doc/atomic/memory_order>), [std::memory_order_consume](<#/doc/atomic/memory_order>), [std::memory_order_acquire](<#/doc/atomic/memory_order>) ou [std::memory_order_seq_cst](<#/doc/atomic/memory_order>), o comportamento é indefinido.

### Parâmetros

order  |  \-  |  restrições de ordem de memória a serem impostas   
  
### Valor de retorno

O valor atual do objeto referenciado.

### Veja também

[ operator value_type](<#/doc/atomic/atomic_ref/operator_T>) |  carrega um valor do objeto referenciado   
(função membro pública)  