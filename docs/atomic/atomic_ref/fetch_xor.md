# std::atomic_ref&lt;T&gt;::fetch_xor

```cpp
Fornecido apenas quando `T` é um tipo integral diferente de _cv_ bool
value_type fetch_xor( value_type arg,
std::memory_order order =
std::memory_order_seq_cst ) const noexcept;  // (desde C++20)
```

Substitui atomicamente o valor atual do objeto referenciado pelo resultado do XOR bit a bit do valor e de arg. Esta operação é uma operação de leitura-modificação-escrita. A memória é afetada de acordo com o valor de order.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_const_v](<#/doc/types/is_const>)&lt;T&gt; for false.

### Parâmetros

- **arg** — o outro argumento do XOR bit a bit
- **order** — restrições de ordem de memória a serem impostas

### Valor de retorno

O valor do objeto referenciado, imediatamente anterior aos efeitos desta função.

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3508](<https://cplusplus.github.io/LWG/issue3508>)
([P3323R1](<https://wg21.link/P3323R1>)) | C++20 | ` `fetch_xor` era sem sentido para const T ` | restrito a aceitar apenas `T` não-const