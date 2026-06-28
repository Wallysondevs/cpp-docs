# std::experimental::atomic_shared_ptr&lt;T&gt;::operator=

```cpp
void operator=( shared_ptr<T> desired ) noexcept;  // (1)
void operator=( const atomic_shared_ptr& ) = delete;  // (2)
```

  
1) Atribui atomicamente um valor `desired` à variável atômica. Equivalente a store(desired).

2) Variáveis atômicas não são [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Parâmetros

desired  |  \-  |  valor a atribuir   
  
### Notas

Ao contrário da maioria dos operadores de atribuição, os operadores de atribuição para `atomic_shared_ptr` retornam void. 

### Observações

Todas as alterações no próprio objeto `atomic_shared_ptr`, e todos os incrementos associados de [`use_count`](<#/doc/memory/shared_ptr/use_count>), são garantidos como sendo executados atomicamente. Decrementos associados de `use_count` ocorrem após a operação atômica, mas não são exigidos como parte dela. Quaisquer operações de destruição ou desalocação associadas ocorrem após a operação atômica e não fazem parte dela. 

### Veja também

[ (construtor)](<#/doc/experimental/atomic_shared_ptr/atomic_shared_ptr>) | constrói um objeto `atomic_shared_ptr`   
(função membro pública)  
[ store](<#/doc/experimental/atomic_shared_ptr/store>) | substitui atomicamente o valor do objeto atômico por um argumento não atômico   
(função membro pública)  
[ std::atomic_is_lock_free(std::shared_ptr)std::atomic_load(std::shared_ptr)std::atomic_load_explicit(std::shared_ptr)std::atomic_store(std::shared_ptr)std::atomic_store_explicit(std::shared_ptr)std::atomic_exchange(std::shared_ptr)std::atomic_exchange_explicit(std::shared_ptr)std::atomic_compare_exchange_weak(std::shared_ptr)std::atomic_compare_exchange_strong(std::shared_ptr)std::atomic_compare_exchange_weak_explicit(std::shared_ptr)std::atomic_compare_exchange_strong_explicit(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto em C++20)(removido em C++26) | especializa operações atômicas para `std::shared_ptr`   
(modelo de função)