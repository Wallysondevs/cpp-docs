# std::experimental::atomic_shared_ptr&lt;T&gt;::load

shared_ptr&lt;T&gt; load( [std::memory_order](<#/doc/atomic/memory_order>) order = [std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) const noexcept;

  
Carrega atomicamente e retorna o valor atual do `atomic_shared_ptr`. A memória é afetada de acordo com o valor de `order`.

`order` deve ser um de [std::memory_order_relaxed](<#/doc/atomic/memory_order>), [std::memory_order_consume](<#/doc/atomic/memory_order>), [std::memory_order_acquire](<#/doc/atomic/memory_order>) ou [std::memory_order_seq_cst](<#/doc/atomic/memory_order>). Caso contrário, o comportamento é indefinido.

### Parâmetros

order  |  \-  |  restrições de ordem de memória a serem impostas   
  
### Observações

Todos os incrementos associados de [`use_count`](<#/doc/memory/shared_ptr/use_count>) têm garantia de serem realizados como parte da operação atômica.

### Valor de retorno

O valor atual do `atomic_shared_ptr`.

### Ver também

[ operator shared_ptr&lt;T&gt;](<#/doc/experimental/atomic_shared_ptr/operator_shared_ptr>) |  carrega um valor de um objeto atômico   
(função membro pública)  
[ std::atomic_is_lock_free(std::shared_ptr)std::atomic_load(std::shared_ptr)std::atomic_load_explicit(std::shared_ptr)std::atomic_store(std::shared_ptr)std::atomic_store_explicit(std::shared_ptr)std::atomic_exchange(std::shared_ptr)std::atomic_exchange_explicit(std::shared_ptr)std::atomic_compare_exchange_weak(std::shared_ptr)std::atomic_compare_exchange_strong(std::shared_ptr)std::atomic_compare_exchange_weak_explicit(std::shared_ptr)std::atomic_compare_exchange_strong_explicit(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto desde C++20)(removido em C++26) |  especializa operações atômicas para `std::shared_ptr`   
(modelo de função)