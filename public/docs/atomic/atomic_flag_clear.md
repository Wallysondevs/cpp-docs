Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
void atomic_flag_clear( volatile std::atomic_flag* obj ) noexcept;
void atomic_flag_clear( std::atomic_flag* obj ) noexcept;
void atomic_flag_clear_explicit( volatile std::atomic_flag* obj,
std::memory_order order ) noexcept;
void atomic_flag_clear_explicit( std::atomic_flag* obj,
std::memory_order order ) noexcept;
```

Altera atomicamente o estado do [std::atomic_flag](<#/doc/atomic/atomic_flag>) apontado por obj para limpo (false).

1,2) A ordenação de sincronização de memória é [std::memory_order_seq_cst](<#/doc/atomic/memory_order>).

3,4) A ordenação de sincronização de memória é order.

Se order for um de [std::memory_order_consume](<#/doc/atomic/memory_order>), [std::memory_order_acquire](<#/doc/atomic/memory_order>) e [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), o comportamento é indefinido.

### Parâmetros

- **obj** — ponteiro para [std::atomic_flag](<#/doc/atomic/atomic_flag>) a ser acessado
- **order** — a ordenação de sincronização de memória

### Observações

`std::atomic_flag_clear` e `std::atomic_flag_clear_explicit` podem ser implementados como obj->clear() e obj->clear(order) respectivamente.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2138](<https://cplusplus.github.io/LWG/issue2138>) | C++11 | order poderia ser [std::memory_order_consume](<#/doc/atomic/memory_order>) | o comportamento é indefinido neste caso

### Veja também

[ atomic_flag](<#/doc/atomic/atomic_flag>)(C++11) | o tipo atômico booleano lock-free
(classe)
[ atomic_flag_test_and_setatomic_flag_test_and_set_explicit](<#/doc/atomic/atomic_flag_test_and_set>)(C++11)(C++11) | define atomicamente a flag como true e retorna seu valor anterior
(função)
[ memory_order](<#/doc/atomic/memory_order>)(C++11) | define restrições de ordenação de memória para a operação atômica fornecida
(enum)
[Documentação C](<#/>) para atomic_flag_clear, atomic_flag_clear_explicit