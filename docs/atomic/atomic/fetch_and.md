# std::atomic&lt;T&gt;::fetch_and

```cpp
membro apenas de especializações de `atomic<_Integral_`
T fetch_and( T arg, std::memory_order order = <br> std::memory_order_seq_cst ) noexcept;  // (1) (desde C++11)
T fetch_and( T arg, std::memory_order order = <br> std::memory_order_seq_cst ) volatile noexcept;  // (2) (desde C++11)
```

Substitui atomicamente o valor atual pelo resultado do AND bit a bit do valor e de `arg`. A operação é uma operação de leitura-modificação-escrita. A memória é afetada de acordo com o valor de `order`.

É descontinuado se [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt;::is_always_lock_free for `false` e a sobrecarga (2) participar da resolução de sobrecarga. | (desde C++20)

### Parâmetros

- **arg** — o outro argumento do AND bit a bit
- **order** — restrições de ordem de memória a serem impostas

### Valor de retorno

O valor imediatamente anterior aos efeitos desta função na [ordem de modificação](<#/doc/atomic/memory_order>) de `*this`.

### Ver também

[ atomic_fetch_andatomic_fetch_and_explicit](<#/doc/atomic/atomic_fetch_and>)(C++11)(C++11) | substitui o objeto atômico pelo resultado do AND bit a bit com um argumento não atômico e obtém o valor anterior do atômico
(modelo de função)