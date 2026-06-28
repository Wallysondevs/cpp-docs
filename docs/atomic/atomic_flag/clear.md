# std::atomic_flag::clear

Definido no header `[<atomic>](<#/doc/header/atomic>)`

```cpp
void clear( std::memory_order order =
std::memory_order_seq_cst ) volatile noexcept;  // (1) (desde C++11)
void clear( std::memory_order order =
std::memory_order_seq_cst ) noexcept;  // (2) (desde C++11)
```

  
Altera atomicamente o estado de um [std::atomic_flag](<#/doc/atomic/atomic_flag>) para limpo (false). 

Se order for um de [std::memory_order_consume](<#/doc/atomic/memory_order>), [std::memory_order_acquire](<#/doc/atomic/memory_order>) e [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), o comportamento é indefinido. 

### Parâmetros

order  |  \-  |  a ordenação de sincronização de memória   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2138](<https://cplusplus.github.io/LWG/issue2138>) | C++11  | order poderia ser [std::memory_order_consume](<#/doc/atomic/memory_order>) | o comportamento é indefinido neste caso   
  
### Veja também

[ test_and_set](<#/doc/atomic/atomic_flag/test_and_set>) |  define atomicamente a flag como true e obtém seu valor anterior   
(função membro pública)  
[ atomic_flag_clearatomic_flag_clear_explicit](<#/doc/atomic/atomic_flag_clear>)(C++11)(C++11) |  define atomicamente o valor da flag como false   
(função)  
[ memory_order](<#/doc/atomic/memory_order>)(C++11) |  define restrições de ordenação de memória para a operação atômica fornecida   
(enum)