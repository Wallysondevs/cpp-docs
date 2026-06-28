# std::atomic&lt;T&gt;::fetch_add

```cpp
membro apenas de especializações de `atomic<_Integral_` ﻿`>`
e especializações de `atomic<_Floating_` ﻿`>` (desde C++20)
T fetch_add( T arg, std::memory_order order = std::memory_order_seq_cst ) noexcept;  // (1) (desde C++11)
T fetch_add( T arg, std::memory_order order = std::memory_order_seq_cst ) volatile noexcept;  // (2) (desde C++11)
membro apenas da especialização parcial de `atomic<T*>`
T* fetch_add( std::ptrdiff_t arg, std::memory_order order = std::memory_order_seq_cst ) noexcept;  // (3) (desde C++11)
T* fetch_add( std::ptrdiff_t arg, std::memory_order order = std::memory_order_seq_cst ) volatile noexcept;  // (4) (desde C++11)
```

Substitui atomicamente o valor atual pelo resultado da adição aritmética do valor e de `arg`. Ou seja, ele executa um pós-incremento atômico. A operação é uma operação de leitura-modificação-escrita. A memória é afetada de acordo com o valor de `order`.

1,2) Para tipos integrais com sinal, a aritmética é definida para usar a representação de complemento de dois. Não há resultados indefinidos. Para tipos de ponto flutuante, o [ambiente de ponto flutuante](<#/doc/numeric/fenv>) em vigor pode ser diferente do ambiente de ponto flutuante da thread chamadora. A operação não precisa estar em conformidade com os traits correspondentes de [std::numeric_limits](<#/doc/types/numeric_limits>), mas é encorajada a fazê-lo. Se o resultado não for um valor representável para seu tipo, o resultado é não especificado, mas a operação, de outra forma, não tem comportamento indefinido. | (desde C++20)

3,4) O resultado pode ser um endereço indefinido, mas a operação, de outra forma, não tem comportamento indefinido.

Se `T` não for um tipo de objeto completo, o programa é malformado.

É descontinuado se [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt;::is_always_lock_free for falso e a sobrecarga (2) ou (4) participar da resolução de sobrecarga. | (desde C++20)

### Parâmetros

- **arg** — o outro argumento da adição aritmética
- **order** — restrições de ordem de memória a serem impostas

### Valor de retorno

O valor imediatamente anterior aos efeitos desta função na [ordem de modificação](<#/doc/atomic/memory_order>) de `*this`.

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <atomic>
    #include <iostream>
    #include <thread>
    
    std::atomic<long long> data{10};
    std::array<long long, 5> return_values{};
    
    void do_work(int thread_num)
    {
        long long val = data.fetch_add(1, std::memory_order_relaxed);
        return_values[thread_num] = val;
    }
    
    int main()
    {
        {
            std::jthread th0{do_work, 0};
            std::jthread th1{do_work, 1};
            std::jthread th2{do_work, 2};
            std::jthread th3{do_work, 3};
            std::jthread th4{do_work, 4};
        }
    
        std::cout << "Result : " << data << '\n';
    
        for (long long val : return_values)
            std::cout << "Seen return value : " << val << std::endl;
    }
```

Saída possível:
```
    Result : 15
    Seen return value : 11
    Seen return value : 10
    Seen return value : 14
    Seen return value : 12
    Seen return value : 13
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0558R1](<https://wg21.link/P0558R1>) | C++11 | aritmética permitida em ponteiros para void ou função (possivelmente cv-qualificados) | tornou-se malformado

### Veja também

[ atomic_fetch_addatomic_fetch_add_explicit](<#/doc/atomic/atomic_fetch_add>)(C++11)(C++11) | adiciona um valor não atômico a um objeto atômico e obtém o valor anterior do atômico
(modelo de função)
[ operator++operator++(int)operator--operator--(int)](<#/doc/atomic/atomic/operator_arith>) | incrementa ou decrementa o valor atômico em um
(função membro pública)