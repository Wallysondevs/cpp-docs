# std::experimental::atomic_shared_ptr&lt;T&gt;::exchange

shared_ptr&lt;T&gt; exchange( shared_ptr&lt;T&gt; desired, [std::memory_order](<#/doc/atomic/memory_order>) order = [std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) noexcept;

  
Substitui atomicamente o `shared_ptr` subjacente com `desired`. A operação é uma operação de leitura-modificação-escrita. A memória é afetada de acordo com o valor de `order`. 

### Parâmetros

desired  |  \-  |  valor a atribuir   
---|---|---
order  |  \-  |  restrições de ordem de memória a impor   
  
### Valor de retorno

O valor da variável atômica antes da chamada. 

### Observações

Todas as alterações no próprio objeto `atomic_shared_ptr`, e todos os incrementos de [`use_count`](<#/doc/memory/shared_ptr/use_count>) associados, são garantidos de serem executados atomicamente. Os decrementos de `use_count` associados ocorrem após a operação atômica, mas não são exigidos como parte dela. Quaisquer operações de destruição ou desalocação associadas ocorrem após a operação atômica e não fazem parte dela. 

### Ver também

[ std::atomic_is_lock_free(std::shared_ptr)std::atomic_load(std::shared_ptr)std::atomic_load_explicit(std::shared_ptr)std::atomic_store(std::shared_ptr)std::atomic_store_explicit(std::shared_ptr)std::atomic_exchange(std::shared_ptr)std::atomic_exchange_explicit(std::shared_ptr)std::atomic_compare_exchange_weak(std::shared_ptr)std::atomic_compare_exchange_strong(std::shared_ptr)std::atomic_compare_exchange_weak_explicit(std::shared_ptr)std::atomic_compare_exchange_strong_explicit(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto desde C++20)(removido em C++26) | especializa operações atômicas para `std::shared_ptr`   
(modelo de função)  