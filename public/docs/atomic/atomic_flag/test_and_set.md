# std::atomic_flag::test_and_set

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
bool test_and_set( std::memory_order order = \
std::memory_order_seq_cst ) volatile noexcept;
bool test_and_set( std::memory_order order = \
std::memory_order_seq_cst ) noexcept;
```

Altera atomicamente o estado de um [std::atomic_flag](<#/doc/atomic/atomic_flag>) para definido (true) e retorna o valor que ele possuía anteriormente.

### Parâmetros

- **order** — a ordem de sincronização de memória

### Veja também

[ clear](<#/doc/atomic/atomic_flag/clear>) | define atomicamente a flag como false
(função membro pública)
[ atomic_flag_test_and_setatomic_flag_test_and_set_explicit](<#/doc/atomic/atomic_flag_test_and_set>)(C++11)(C++11) | define atomicamente a flag como true e retorna seu valor anterior
(função)
[ memory_order](<#/doc/atomic/memory_order>)(C++11) | define restrições de ordenação de memória para a operação atômica fornecida
(enum)