# std::atomic&lt;T&gt;::operator++,++(int),--,--(int)

```cpp
membro apenas de especializações de `atomic<_Integral_` ﻿`>`
T operator++() noexcept;  // (1) (desde C++11)
T operator++() volatile noexcept;  // (2) (desde C++11)
T operator++( int ) noexcept;  // (3) (desde C++11)
T operator++( int ) volatile noexcept;  // (4) (desde C++11)
T operator\--() noexcept;  // (5) (desde C++11)
T operator\--() volatile noexcept;  // (6) (desde C++11)
T operator\--( int ) noexcept;  // (7) (desde C++11)
T operator\--( int ) volatile noexcept;  // (8) (desde C++11)
membro apenas de especialização parcial de `atomic<T*>`
T* operator++() noexcept;  // (9) (desde C++11)
T* operator++() volatile noexcept;  // (10) (desde C++11)
T* operator++( int ) noexcept;  // (11) (desde C++11)
T* operator++( int ) volatile noexcept;  // (12) (desde C++11)
T* operator\--() noexcept;  // (13) (desde C++11)
T* operator\--() volatile noexcept;  // (14) (desde C++11)
T* operator\--( int ) noexcept;  // (15) (desde C++11)
T* operator\--( int ) volatile noexcept;  // (16) (desde C++11)
```

  
Incrementa ou decrementa atomicamente o valor atual. A operação é uma operação de leitura-modificação-escrita.

  * operator++() realiza o pré-incremento atômico. Equivalente a return fetch_add(1) + 1;.
  * operator++(int) realiza o pós-incremento atômico. Equivalente a return fetch_add(1);.
  * operator\--() realiza o pré-decremento atômico. Equivalente a return fetch_sub(1) - 1;.
  * operator\--(int) realiza o pós-decremento atômico. Equivalente a return fetch_sub(1);.

1-8) Para tipos integrais com sinal, a aritmética é definida para usar a representação de complemento de dois. Não há resultados indefinidos.

9-16) O resultado pode ser um endereço indefinido, mas as operações, de outra forma, não possuem comportamento indefinido.

Se `T` não for um tipo de objeto completo, o programa é malformado.

É descontinuado se [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt;::is_always_lock_free for falso e qualquer sobrecarga volatile participar da resolução de sobrecarga. | (desde C++20)  
  
### Valor de retorno

operator++() e operator\--() retornam o valor da variável atômica após a modificação. Formalmente, o resultado de incrementar/decrementar o valor imediatamente anterior aos efeitos desta função na [ordem de modificação](<#/doc/atomic/memory_order>) de *this.

operator++(int) e operator\--(int) retornam o valor da variável atômica antes da modificação. Formalmente, o valor imediatamente anterior aos efeitos desta função na [ordem de modificação](<#/doc/atomic/memory_order>) de *this.

### Observações

Ao contrário da maioria dos operadores de pré-incremento e pré-decremento, os operadores de pré-incremento e pré-decremento para tipos atômicos não retornam uma referência ao objeto modificado. Eles retornam uma cópia do valor armazenado.

### Exemplo

Execute este código
```cpp
    #include <atomic>
    #include <chrono>
    #include <iomanip>
    #include <iostream>
    #include <mutex>
    #include <random>
    #include <string>
    #include <thread>
    
    std::atomic<int> atomic_count{0};
    
    std::mutex cout_mutex;
    int completed_writes{0};
    
    constexpr int global_max_count{72};
    constexpr int writes_per_line{8};
    constexpr int max_delay{100};
    
    template<int Max>
    int random_value()
    {
        static std::uniform_int_distribution<int> distr{1, Max};
        static std::random_device engine;
        static std::mt19937 noise{engine()};
        static std::mutex rand_mutex;
        std::lock_guard lock{rand_mutex};
        return distr(noise);
    }
    
    int main()
    {
        auto work = 
        {
            for (int count{}; (count = ++atomic_count) <= global_max_count;)
            {
                std::this_thread::sleep_for>(
                    std::chrono::milliseconds>(random_value<max_delay>()));
    
                // print thread `id` and `count` value
                {
                    std::lock_guard lock{cout_mutex};
    
                    const bool new_line = ++completed_writes % writes_per_line == 0;
    
                    std::cout << id << std::setw>(3) << count << "  "
                              << (new_line ? "\n" : "") << std::flush;
                }
            }
        };
    
        std::jthread j1(work, "░"), j2(work, "▒"), j3(work, "▓"), j4(work, "█");
    }
```

Saída possível:
```
    ▒  2  ░  1  ▒  5  ▒  7  █  4  ░  6  ▓  3  ▒  8  
    ▓ 11  █  9  ▓ 13  ░ 10  █ 14  ▒ 12  ░ 16  ░ 19  
    ▓ 15  ▒ 18  ▓ 21  ▒ 22  █ 17  █ 25  ▒ 24  █ 26  
    ░ 20  ░ 29  ▒ 27  ▓ 23  ▒ 31  ▒ 33  ▓ 32  █ 28  
    ░ 30  ░ 37  ▒ 34  ▓ 35  █ 36  █ 41  ▓ 40  ▒ 39  
    ░ 38  ▓ 43  █ 42  ▓ 46  ▓ 48  █ 47  █ 50  ░ 45  
    ▒ 44  ▒ 53  ▒ 54  ▓ 49  ▒ 55  █ 51  ▒ 57  █ 58  
    ░ 52  ▓ 56  ░ 61  ▒ 59  █ 60  ▓ 62  ▒ 64  ░ 63  
    ░ 68  ▓ 66  █ 65  █ 71  ▒ 67  ▓ 70  ░ 69  █ 72
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P0558R1](<https://wg21.link/P0558R1>) | C++11  | aritmética permitida em ponteiros para void ou função (possivelmente cv-qualified)  | tornada malformada   
  
### Veja também

[ fetch_add](<#/doc/atomic/atomic/fetch_add>) |  adiciona atomicamente o argumento ao valor armazenado no objeto atômico e obtém o valor mantido anteriormente   
(função membro pública)  
[ fetch_sub](<#/doc/atomic/atomic/fetch_sub>) |  subtrai atomicamente o argumento do valor armazenado no objeto atômico e obtém o valor mantido anteriormente   
(função membro pública)  
[ operator+=operator-=](<#/doc/atomic/atomic/operator_arith2>) |  adiciona ou subtrai do valor atômico   
(função membro pública)  
[ operator&=operator|=operator^=](<#/doc/atomic/atomic/operator_arith3>) |  realiza AND, OR, XOR bit a bit com o valor atômico   
(função membro pública)