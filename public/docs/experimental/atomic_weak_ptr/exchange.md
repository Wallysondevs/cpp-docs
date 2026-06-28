# std::experimental::atomic_weak_ptr&lt;T&gt;::exchange

weak_ptr&lt;T&gt; exchange( weak_ptr&lt;T&gt; desired, [std::memory_order](<#/doc/atomic/memory_order>) order = [std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) noexcept;

  
Substitui atomicamente o `weak_ptr` subjacente por `desired`. A operação é uma operação de leitura-modificação-escrita. A memória é afetada de acordo com o valor de `order`. 

### Parâmetros

desired  |  \-  |  valor a atribuir   
---|---|---
order  |  \-  |  restrições de ordem de memória a serem impostas   
  
### Valor de retorno

O valor da variável atômica antes da chamada. 

### Observações

Todas as alterações no próprio objeto `atomic_weak_ptr`, e todos os incrementos associados de [`use_count`](<#/doc/memory/weak_ptr/use_count>), são garantidos de serem executados atomicamente. Os decrementos associados de `use_count` ocorrem após a operação atômica, mas não são exigidos como parte dela. Quaisquer operações de destruição ou desalocação associadas ocorrem após a operação atômica e não fazem parte dela. 

### Veja também

[ std::atomic_is_lock_free(std::shared_ptr)std::atomic_load(std::shared_ptr)std::atomic_load_explicit(std::shared_ptr)std::atomic_store(std::shared_ptr)std::atomic_store_explicit(std::shared_ptr)std::atomic_exchange(std::shared_ptr)std::atomic_exchange_explicit(std::shared_ptr)std::atomic_compare_exchange_weak(std::shared_ptr)std::atomic_compare_exchange_strong(std::shared_ptr)std::atomic_compare_exchange_weak_explicit(std::shared_ptr)std::atomic_compare_exchange_strong_explicit(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto desde C++20)(removido em C++26) |  especializa operações atômicas para `std::shared_ptr`   
(modelo de função)  