# std::atomic&lt;T&gt;::fetch_sub

```cpp
membro apenas de especializações de `atomic<_Integral_` ﻿`>`
e especializações de `atomic<_Floating_` ﻿`>` (desde C++20)
T fetch_sub( T arg, std::memory_order order = std::memory_order_seq_cst ) noexcept;  // (1) (desde C++11)
T fetch_sub( T arg, std::memory_order order = std::memory_order_seq_cst ) volatile noexcept;  // (2) (desde C++11)
membro apenas da especialização parcial de `atomic<T*>`
T* fetch_sub( std::ptrdiff_t arg, std::memory_order order = std::memory_order_seq_cst ) noexcept;  // (3) (desde C++11)
T* fetch_sub( std::ptrdiff_t arg, std::memory_order order = std::memory_order_seq_cst ) volatile noexcept;  // (4) (desde C++11)
```

Substitui atomicamente o valor atual pelo resultado da subtração aritmética do valor e de arg. Ou seja, ele executa um pós-decremento atômico. A operação é uma operação de leitura-modificação-escrita. A memória é afetada de acordo com o valor de order.

1,2) Para tipos integrais com sinal, a aritmética é definida para usar a representação de complemento de dois. Não há resultados indefinidos. Para tipos de ponto flutuante, o [ambiente de ponto flutuante](<#/doc/numeric/fenv>) em vigor pode ser diferente do ambiente de ponto flutuante da thread chamadora. A operação não precisa estar em conformidade com os traits correspondentes de [std::numeric_limits](<#/doc/types/numeric_limits>), mas é encorajada a fazê-lo. Se o resultado não for um valor representável para seu tipo, o resultado é não especificado, mas a operação, de outra forma, não tem comportamento indefinido. | (desde C++20)

3,4) O resultado pode ser um endereço indefinido, mas a operação, de outra forma, não tem comportamento indefinido.

Se `T` não for um tipo de objeto completo, o programa é malformado.

É preterido se [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt;::is_always_lock_free for false e a sobrecarga (2) ou (4) participar da resolução de sobrecarga. | (desde C++20)

### Parâmetros

- **arg** — o outro argumento da subtração aritmética
- **order** — restrições de ordem de memória a serem impostas

### Valor de retorno

O valor imediatamente anterior aos efeitos desta função na [ordem de modificação](<#/doc/atomic/memory_order>) de *this.

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0558R1](<https://wg21.link/P0558R1>) | C++11 | aritmética permitida em ponteiros para void ou função (possivelmente cv-qualified) | tornou-se malformado

### Veja também

[ atomic_fetch_subatomic_fetch_sub_explicit](<#/doc/atomic/atomic_fetch_sub>)(C++11)(C++11) | subtrai um valor não atômico de um objeto atômico e obtém o valor anterior do atômico
(modelo de função)
[ operator++operator++(int)operator--operator--(int)](<#/doc/atomic/atomic/operator_arith>) | incrementa ou decrementa o valor atômico em um
(função membro pública)