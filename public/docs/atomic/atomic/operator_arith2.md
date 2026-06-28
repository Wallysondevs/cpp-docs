# std::atomic&lt;T&gt;::operator+=,-=

```cpp
membro apenas de especializações de `atomic<_Integral_` ﻿`>`
e especializações de `atomic<_Floating_` ﻿`>` (desde C++20)
T operator+=( T arg ) noexcept;  // (1) (desde C++11)
T operator+=( T arg ) volatile noexcept;  // (2) (desde C++11)
T operator-=( T arg ) noexcept;  // (3) (desde C++11)
T operator-=( T arg ) volatile noexcept;  // (4) (desde C++11)
membro apenas da especialização parcial de `atomic<T*>`
T* operator+=( std::ptrdiff_t arg ) noexcept;  // (5) (desde C++11)
T* operator+=( std::ptrdiff_t arg ) volatile noexcept;  // (6) (desde C++11)
T* operator-=( std::ptrdiff_t arg ) noexcept;  // (7) (desde C++11)
T* operator-=( std::ptrdiff_t arg ) volatile noexcept;  // (8) (desde C++11)
```

  
Substitui atomicamente o valor atual pelo resultado de um cálculo envolvendo o valor anterior e arg. A operação é uma operação de leitura-modificação-escrita.

  * operator+= realiza adição atômica. Equivalente a return fetch_add(arg) + arg;. 
  * operator-= realiza subtração atômica. Equivalente a return fetch_sub(arg) - arg;. 

1-4) Para tipos integrais com sinal, a aritmética é definida para usar a representação de complemento de dois. Não há resultados indefinidos. Para tipos de ponto flutuante, o [ambiente de ponto flutuante](<#/doc/numeric/fenv>) em vigor pode ser diferente do ambiente de ponto flutuante da thread chamadora. A operação não precisa estar em conformidade com as características correspondentes de [std::numeric_limits](<#/doc/types/numeric_limits>), mas é encorajada a fazê-lo. Se o resultado não for um valor representável para seu tipo, o resultado é não especificado, mas a operação, de outra forma, não tem comportamento indefinido.  | (desde C++20)  
  
5-8) O resultado pode ser um endereço indefinido, mas as operações, de outra forma, não têm comportamento indefinido.

Se `T` não for um tipo de objeto completo, o programa é malformado.

  

É descontinuado se [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt;::is_always_lock_free for falso e qualquer sobrecarga volatile participar da resolução de sobrecarga.  | (desde C++20)  
  
### Parâmetros

arg  |  \-  |  o argumento para a operação aritmética   
  
### Valor de retorno

O valor resultante (ou seja, o resultado da aplicação do operador binário correspondente ao valor imediatamente anterior aos efeitos da função membro correspondente na [ordem de modificação](<#/doc/atomic/memory_order>) de *this). 

### Observações

Ao contrário da maioria dos operadores de atribuição composta, os operadores de atribuição composta para tipos atômicos não retornam uma referência aos seus argumentos do lado esquerdo. Em vez disso, eles retornam uma cópia do valor armazenado. 

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[P0558R1](<https://wg21.link/P0558R1>) | C++11  | aritmética permitida em ponteiros para void ou função (possivelmente cv-qualified)  | tornado malformado   
  
### Veja também

[ fetch_add](<#/doc/atomic/atomic/fetch_add>) |  adiciona atomicamente o argumento ao valor armazenado no objeto atômico e obtém o valor mantido anteriormente   
(função membro pública)  
[ fetch_sub](<#/doc/atomic/atomic/fetch_sub>) |  subtrai atomicamente o argumento do valor armazenado no objeto atômico e obtém o valor mantido anteriormente   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)](<#/doc/atomic/atomic/operator_arith>) |  incrementa ou decrementa o valor atômico em um   
(função membro pública)  
[ operator&=operator|=operator^=](<#/doc/atomic/atomic/operator_arith3>) |  realiza AND, OR, XOR bit a bit com o valor atômico   
(função membro pública)