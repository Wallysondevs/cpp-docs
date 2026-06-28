# std::experimental::atomic_shared_ptr&lt;T&gt;::store

void store( shared_ptr&lt;T&gt; desired, [std::memory_order](<#/doc/atomic/memory_order>) order = [std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) noexcept;

  
Substitui atomicamente o valor atual por `desired`. A memória é afetada de acordo com o valor de `order`. 

`order` deve ser um de [std::memory_order_relaxed](<#/doc/atomic/memory_order>), [std::memory_order_release](<#/doc/atomic/memory_order>) ou [std::memory_order_seq_cst](<#/doc/atomic/memory_order>). Caso contrário, o comportamento é indefinido. 

### Parameters

desired  |  \-  |  o `shared_ptr` a ser armazenado na variável atômica   
---|---|---
order  |  \-  |  restrições de ordem de memória a serem impostas   
  
### Return value

(nenhum) 

### Remarks

Todas as alterações no próprio objeto `atomic_shared_ptr`, e todos os incrementos associados de [`use_count`](<#/doc/memory/shared_ptr/use_count>), são garantidos como sendo realizados atomicamente. Os decrementos associados de `use_count` ocorrem após a operação atômica, mas não são exigidos como parte dela. Quaisquer operações de destruição ou desalocação associadas ocorrem após a operação atômica e não fazem parte dela. 

### See also

[ operator=](<#/>) |  armazena um valor em um objeto `atomic_shared_ptr`   
(função membro pública)  
[ std::atomic_is_lock_free(std::shared_ptr)std::atomic_load(std::shared_ptr)std::atomic_load_explicit(std::shared_ptr)std::atomic_store(std::shared_ptr)std::atomic_store_explicit(std::shared_ptr)std::atomic_exchange(std::shared_ptr)std::atomic_exchange_explicit(std::shared_ptr)std::atomic_compare_exchange_weak(std::shared_ptr)std::atomic_compare_exchange_strong(std::shared_ptr)std::atomic_compare_exchange_weak_explicit(std::shared_ptr)std::atomic_compare_exchange_strong_explicit(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto em C++20)(removido em C++26) |  especializa operações atômicas para `std::shared_ptr`   
(modelo de função)