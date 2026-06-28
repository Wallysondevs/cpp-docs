# std::atomic_ref&lt;T&gt;::fetch_max

```cpp
Fornecido apenas quando `T` é um tipo integral diferente de `_cv_ bool` ou um tipo ponteiro para objeto
value_type fetch_max( value_type arg,
std::memory_order order =
std::memory_order_seq_cst ) const noexcept;  // (desde C++26)
```

Atomicamente substitui o valor atual do objeto referenciado pelo resultado de [std::max](<#/doc/algorithm/max>) do valor e `arg`. Ou seja, ele executa uma operação atômica de máximo. A operação é uma operação de leitura-modificação-escrita (read-modify-write). A memória é afetada de acordo com o valor de `order`.

Se `T` é um tipo ponteiro e os ponteiros apontam para objetos completos diferentes (ou subobjetos destes), a [comparação de ponteiros](<#/doc/language/operator_comparison>) não estabelece uma [ordenação fraca estrita](<https://en.wikipedia.org/wiki/strict_weak_ordering> "enwiki:strict weak ordering").

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_const_v](<#/doc/types/is_const>)`<T>` for `false`.

### Parâmetros

- **arg** — o outro argumento de [std::max](<#/doc/algorithm/max>)
- **order** — restrições de ordem de memória a serem impostas

### Valor de retorno

O valor imediatamente anterior aos efeitos desta função na [ordem de modificação](<#/doc/atomic/memory_order>) de `*this`.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_atomic_min_max`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | Mínimo/máximo atômico

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo