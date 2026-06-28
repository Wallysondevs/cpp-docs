# std::experimental::atomic_weak_ptr&lt;T&gt;::compare_exchange_strong, std::experimental::atomic_weak_ptr&lt;T&gt;::compare_exchange_weak

```cpp
bool compare_exchange_weak( std::weak_ptr<T>& expected, const std::weak_ptr<T>& desired,
std::memory_order success, std::memory_order failure ) noexcept;  // (1)
bool compare_exchange_weak( std::weak_ptr<T>& expected, std::weak_ptr<T>&& desired,
std::memory_order success, std::memory_order failure ) noexcept;  // (2)
bool compare_exchange_weak( std::weak_ptr<T>& expected, const std::weak_ptr<T>& desired,
std::memory_order order = std::memory_order_seq_cst ) noexcept;  // (3)
bool compare_exchange_weak( std::weak_ptr<T>& expected, std::weak_ptr<T>&& desired,
std::memory_order order = std::memory_order_seq_cst ) noexcept;  // (4)
bool compare_exchange_strong( std::weak_ptr<T>& expected, const std::weak_ptr<T>& desired,
std::memory_order success, std::memory_order failure ) noexcept;  // (5)
bool compare_exchange_strong( std::weak_ptr<T>& expected, std::weak_ptr<T>&& desired,
std::memory_order success, std::memory_order failure ) noexcept;  // (6)
bool compare_exchange_strong( std::weak_ptr<T>& expected, const std::weak_ptr<T>& desired,
std::memory_order order = std::memory_order_seq_cst ) noexcept;  // (7)
bool compare_exchange_strong( std::weak_ptr<T>& expected, std::weak_ptr<T>&& desired,
std::memory_order order = std::memory_order_seq_cst ) noexcept;  // (8)
```

  
Compara atomicamente o `weak_ptr` subjacente em *this com expected, e, se forem equivalentes, substitui o primeiro por desired (realiza uma operação de leitura-modificação-escrita). Caso contrário, carrega o valor real armazenado em *this para expected (realiza uma operação de carregamento). A substituição é realizada como se fosse pelo operador de atribuição de cópia ou de movimento de `weak_ptr`, conforme apropriado.

Dois `weak_ptr`s são equivalentes se e somente se armazenarem o mesmo valor de ponteiro e compartilharem a propriedade.

Os modelos de memória para as operações de leitura-modificação-escrita e carregamento são success e failure, respectivamente. Para as sobrecargas (3,4,7,8), order é usado para ambas as operações de leitura-modificação-escrita e carregamento, exceto que [std::memory_order_acquire](<#/doc/atomic/memory_order>) e [std::memory_order_relaxed](<#/doc/atomic/memory_order>) são usados para a operação de carregamento se order == [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), ou order == [std::memory_order_release](<#/doc/atomic/memory_order>), respectivamente.

As versões fracas (1-4) podem falhar espuriamente.

### Parâmetros

expected  |  \-  |  referência para o valor esperado a ser encontrado no objeto atômico   
---|---|---
desired  |  \-  |  o valor a ser armazenado no objeto atômico se ele for conforme o esperado   
success  |  \-  |  a ordenação de sincronização de memória para a operação de leitura-modificação-escrita se a comparação for bem-sucedida. Todos os valores são permitidos   
failure  |  \-  |  a ordenação de sincronização de memória para a operação de carregamento se a comparação falhar. Não pode ser [std::memory_order_release](<#/doc/atomic/memory_order>) ou [std::memory_order_acq_rel](<#/doc/atomic/memory_order>) e não pode especificar uma ordenação mais forte que success  
order  |  \-  |  a ordenação de sincronização de memória para ambas as operações   
  
### Valor de retorno

true se o valor atômico subjacente foi alterado, false caso contrário.

### Observações

Todas as alterações no próprio objeto `atomic_weak_ptr`, e todos os incrementos associados de [`use_count`](<#/doc/memory/weak_ptr/use_count>), são garantidos como sendo realizados atomicamente. Os decrementos associados de `use_count` ocorrem após a operação atômica, mas não são exigidos como parte dela. Quaisquer operações de destruição ou desalocação associadas ocorrem após a operação atômica e não fazem parte dela.

Se a operação compare-exchange retornar true, expected não é acessado após a etapa de atualização atômica. Se retornar false, expected é atualizado com o valor existente lido do objeto `atomic_weak_ptr` na tentativa de atualização atômica. A atualização de `use_count` correspondente à escrita em expected faz parte da operação atômica, mas a escrita em expected em si não é exigida como parte da operação atômica.

Para as sobrecargas (1,3,5,7), desired não é acessado após a etapa de atualização atômica.

Para as sobrecargas (2,4,6,8), desired é movido somente se a operação compare-exchange retornar true; o movimento ocorre após a etapa de atualização atômica.

### Notas

As formas fracas (1-4) das funções podem falhar espuriamente, ou seja, agir como se *this e expected não fossem equivalentes mesmo quando são. Quando um compare-and-exchange está em um loop, a versão fraca proporcionará melhor desempenho em algumas plataformas.

### Veja também

[ std::atomic_is_lock_free(std::shared_ptr)std::atomic_load(std::shared_ptr)std::atomic_load_explicit(std::shared_ptr)std::atomic_store(std::shared_ptr)std::atomic_store_explicit(std::shared_ptr)std::atomic_exchange(std::shared_ptr)std::atomic_exchange_explicit(std::shared_ptr)std::atomic_compare_exchange_weak(std::shared_ptr)std::atomic_compare_exchange_strong(std::shared_ptr)std::atomic_compare_exchange_weak_explicit(std::shared_ptr)std::atomic_compare_exchange_strong_explicit(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto desde C++20)(removido em C++26) | especializa operações atômicas para `std::shared_ptr`   
(modelo de função)  