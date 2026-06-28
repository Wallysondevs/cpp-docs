# std::atomic&lt;T&gt;::store

```cpp
void store( T desired, std::memory_order order =
std::memory_order_seq_cst ) noexcept;  // (1) (desde C++11)
void store( T desired, std::memory_order order =
std::memory_order_seq_cst ) volatile noexcept;  // (2) (desde C++11)
```

  
Substitui atomicamente o valor atual por desired. A memória é afetada de acordo com o valor de order. 

Se order for um de [std::memory_order_consume](<#/doc/atomic/memory_order>), [std::memory_order_acquire](<#/doc/atomic/memory_order>) e [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), o comportamento é indefinido. 

É descontinuado se [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt;::is_always_lock_free for false e a sobrecarga (2) participar da resolução de sobrecarga. | (desde C++20)  
  
### Parameters

desired  |  \-  |  o valor a ser armazenado na variável atômica   
---|---|---
order  |  \-  |  restrições de ordem de memória a serem impostas   
  
### Return value

(nenhum) 

### See also

[ operator=](<#/>) |  armazena um valor em um objeto atômico   
(função membro pública)  
[ atomic_storeatomic_store_explicit](<#/doc/atomic/atomic_store>)(C++11)(C++11) |  substitui atomicamente o valor do objeto atômico por um argumento não atômico   
(modelo de função)