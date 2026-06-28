# std::experimental::atomic_shared_ptr&lt;T&gt;::is_lock_free

bool is_lock_free() const noexcept;

  
Verifica se as operações atômicas em todos os objetos deste tipo são lock-free. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se as operações atômicas nos objetos deste tipo são lock-free, false caso contrário. 

### Ver também

[ std::atomic_is_lock_free(std::shared_ptr)std::atomic_load(std::shared_ptr)std::atomic_load_explicit(std::shared_ptr)std::atomic_store(std::shared_ptr)std::atomic_store_explicit(std::shared_ptr)std::atomic_exchange(std::shared_ptr)std::atomic_exchange_explicit(std::shared_ptr)std::atomic_compare_exchange_weak(std::shared_ptr)std::atomic_compare_exchange_strong(std::shared_ptr)std::atomic_compare_exchange_weak_explicit(std::shared_ptr)std::atomic_compare_exchange_strong_explicit(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto em C++20)(removido em C++26) | especializa operações atômicas para `std::shared_ptr`   
(modelo de função)  