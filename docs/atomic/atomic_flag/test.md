# std::atomic_flag::test

```cpp
bool test( std::memory_order order =
std::memory_order_seq_cst ) const volatile noexcept;  // (1) (desde C++20)
bool test( std::memory_order order =
std::memory_order_seq_cst ) const noexcept;  // (2) (desde C++20)
```

  
Lê atomicamente o valor de `*this` e retorna o valor.

Se `order` for um de [std::memory_order_release](<#/doc/atomic/memory_order>) e [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), o comportamento é indefinido.

### Parâmetros

order  |  \-  |  a ordenação de sincronização de memória   
  
### Valor de retorno

O valor lido atomicamente.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ atomic_flag_testatomic_flag_test_explicit](<#/doc/atomic/atomic_flag_test>)(C++20)(C++20) |  retorna atomicamente o valor da flag   
(função)  