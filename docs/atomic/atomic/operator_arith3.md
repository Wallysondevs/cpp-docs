# std::atomic&lt;T&gt;::operator&amp;=,|=,^=

```cpp
membro apenas de especializações de `atomic<_Integral_`
T operator&=( T arg ) noexcept;  // (1) (desde C++11)
T operator&=( T arg ) volatile noexcept;  // (2) (desde C++11)
T operator|=( T arg ) noexcept;  // (3) (desde C++11)
T operator|=( T arg ) volatile noexcept;  // (4) (desde C++11)
T operator^=( T arg ) noexcept;  // (5) (desde C++11)
T operator^=( T arg ) volatile noexcept;  // (6) (desde C++11)
```

Substitui atomicamente o valor atual pelo resultado de uma computação envolvendo o valor anterior e `arg`. A operação é uma operação de leitura-modificação-escrita.

  * `operator&=` realiza um AND bit a bit atômico. Equivalente a `return fetch_and(arg) & arg;`.
  * `operator|=` realiza um OR bit a bit atômico. Equivalente a `return fetch_or(arg) | arg;`.
  * `operator^=` realiza um XOR bit a bit atômico. Equivalente a `return fetch_xor(arg) ^ arg;`.

É descontinuado se `[std::atomic](<#/doc/atomic/atomic>)<T>::is_always_lock_free` for `false` e qualquer sobrecarga `volatile` participar da resolução de sobrecarga. | (desde C++20)

### Parâmetros

- **arg** — o argumento para a operação aritmética

### Valor de retorno

O valor resultante (isto é, o resultado da aplicação do operador binário correspondente ao valor imediatamente anterior aos efeitos da função membro correspondente na [ordem de modificação](<#/doc/atomic/memory_order>) de `*this`).

### Observações

Ao contrário da maioria dos operadores de atribuição composta, os operadores de atribuição composta para tipos atômicos não retornam uma referência aos seus argumentos do lado esquerdo. Em vez disso, eles retornam uma cópia do valor armazenado.

### Veja também

[ fetch_and](<#/doc/atomic/atomic/fetch_and>) | realiza atomicamente um AND bit a bit entre o argumento e o valor do objeto atômico e obtém o valor mantido anteriormente
(função membro pública)
[ fetch_or](<#/doc/atomic/atomic/fetch_or>) | realiza atomicamente um OR bit a bit entre o argumento e o valor do objeto atômico e obtém o valor mantido anteriormente
(função membro pública)
[ fetch_xor](<#/doc/atomic/atomic/fetch_xor>) | realiza atomicamente um XOR bit a bit entre o argumento e o valor do objeto atômico e obtém o valor mantido anteriormente
(função membro pública)
[ operator++operator++(int)operator--operator--(int)](<#/doc/atomic/atomic/operator_arith>) | incrementa ou decrementa o valor atômico em um
(função membro pública)
[ operator+=operator-=](<#/doc/atomic/atomic/operator_arith2>) | adiciona ou subtrai do valor atômico
(função membro pública)