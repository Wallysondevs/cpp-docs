# std::atomic_flag_test, std::atomic_flag_test_explicit

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
bool atomic_flag_test( const volatile std::atomic_flag* object ) noexcept;
bool atomic_flag_test( const std::atomic_flag* object ) noexcept;
bool atomic_flag_test_explicit( const volatile std::atomic_flag* object,
std::memory_order order ) noexcept;
bool atomic_flag_test_explicit( const std::atomic_flag* object,
std::memory_order order ) noexcept;
```

Lê atomicamente o valor do *object e retorna o valor.

1,2) A ordem de sincronização de memória é [std::memory_order_seq_cst](<#/doc/atomic/memory_order>).

3,4) A ordem de sincronização de memória é order.

Se order for um de std::memory_order::release e std::memory_order::acq_rel, o comportamento é indefinido.

### Parâmetros

- **object** — ponteiro para o objeto `atomic_flag` a ser lido
- **order** — a ordenação de sincronização de memória

### Valor de retorno

O valor lido atomicamente.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_atomic_flag_test`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | `std::atomic_flag::test`

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ test](<#/doc/atomic/atomic_flag/test>)(C++20) | retorna atomicamente o valor do flag
(função membro pública de `std::atomic_flag`)