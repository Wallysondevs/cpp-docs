# std::atomic&lt;T&gt;::fetch_min

```cpp
membro apenas de especializações de `atomic<_Integral_`
T fetch_min( T arg, std::memory_order order = std::memory_order_seq_cst ) noexcept;  // (1) (desde C++26)
T fetch_min( T arg, std::memory_order order = std::memory_order_seq_cst ) volatile noexcept;  // (2) (desde C++26)
membro apenas da especialização parcial de `atomic<T*>`
T* fetch_min( T* arg, std::memory_order order = std::memory_order_seq_cst ) noexcept;  // (3) (desde C++26)
T* fetch_min( T* arg, std::memory_order order = std::memory_order_seq_cst ) volatile noexcept;  // (4) (desde C++26)
```

Substitui atomicamente o valor atual pelo resultado de [std::min](<#/doc/algorithm/min>) do valor e arg. Ou seja, ele executa uma operação atômica de mínimo. A operação é uma operação de leitura-modificação-escrita. A memória é afetada de acordo com o valor de order.

3,4) Se os ponteiros apontam para objetos completos diferentes (ou subobjetos destes), a [comparação de ponteiros](<#/doc/language/operator_comparison>) não estabelece uma [ordenação fraca estrita](<https://en.wikipedia.org/wiki/strict_weak_ordering> "enwiki:strict weak ordering").

É descontinuado se [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt;::is_always_lock_free for false e a sobrecarga (2) ou (4) participar da resolução de sobrecarga.

### Parâmetros

- **arg** — o outro argumento de [std::min](<#/doc/algorithm/min>)
- **order** — restrições de ordem de memória a serem impostas

### Valor de retorno

O valor imediatamente anterior aos efeitos desta função na [ordem de modificação](<#/doc/atomic/memory_order>) de *this.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_atomic_min_max`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | Mínimo/máximo atômico

### Exemplo

| Esta seção está incompleta
Reason: no example