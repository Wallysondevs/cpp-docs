# std::atomic&lt;T&gt;::load

```cpp
T load( std::memory_order order
= std::memory_order_seq_cst ) const noexcept;  // (1) (desde C++11)
T load( std::memory_order order
= std::memory_order_seq_cst ) const volatile noexcept;  // (2) (desde C++11)
```

  
Carrega atomicamente e retorna o valor atual da variável atômica. A memória é afetada de acordo com o valor de order. 

Se order for um de [std::memory_order_release](<#/doc/atomic/memory_order>) e [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), o comportamento é indefinido. 

É descontinuado se [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt;::is_always_lock_free for false e a sobrecarga (2) participar da resolução de sobrecarga.  | (desde C++20)  
  
### Parâmetros

order  |  \-  |  restrições de ordem de memória a serem impostas   
  
### Valor de retorno

O valor atual da variável atômica. 

### Veja também

[ operator T](<#/doc/atomic/atomic/operator_T>) |  carrega um valor de um objeto atômico   
(função membro pública)  
[ atomic_loadatomic_load_explicit](<#/doc/atomic/atomic_load>)(C++11)(C++11) |  obtém atomicamente o valor armazenado em um objeto atômico   
(modelo de função)