# std::atomic&lt;T&gt;::exchange

```cpp
T exchange( T desired, std::memory_order order =
std::memory_order_seq_cst ) noexcept;  // (1) (desde C++11)
T exchange( T desired, std::memory_order order =
std::memory_order_seq_cst ) volatile noexcept;  // (2) (desde C++11)
```

  
Substitui atomicamente o valor subjacente por `desired` (uma operação de leitura-modificação-escrita). A memória é afetada de acordo com o valor de `order`.

É descontinuado se [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt;::is_always_lock_free for `false` e a sobrecarga (2) participar da resolução de sobrecarga. | (desde C++20)  
  
### Parâmetros

desired  |  \-  |  valor a ser atribuído   
---|---|---
order  |  \-  |  restrições de ordem de memória a serem impostas   
  
### Valor de retorno

O valor da variável atômica antes da chamada.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <atomic>
    #include <cstddef>
    #include <iostream>
    #include <syncstream>
    #include <thread>
    #include <vector>
     
    int main()
    {
        constexpr int thread_count{5};
        constexpr int sum{5};
     
        std::atomic<int> atom{0};
        std::atomic<int> counter{0};
     
        auto increment_to_sum = &
        {
            for (int next = 0; next < sum;)
            {
                // each thread is writing a value from its own knowledge
                const int current = atom.exchange(next);
                counter++;
                // sync writing to prevent from interrupting by other threads
                std::osyncstream(std::cout)
                    << "Thread #" << id << " (id=" << std::this_thread::get_id()
                    << ") wrote " << next << " replacing the old value "
                    << current << ".\n";
                next = std::max(current, next) + 1;
            }
        };
     
        std::vector<std::thread> v;
        for (std::size_t i = 0; i < thread_count; ++i)
            v.emplace_back(increment_to_sum, i);
     
        for (auto& tr : v)
            tr.join();
     
        std::cout << thread_count << " threads take "
                  << counter << " times in total to "
                  << "increment 0 to " << sum << ".\n";
    }
```

Saída possível: 
```
    Thread #1 (id=139722332333824) wrote 0 replacing the old value 0.
    Thread #2 (id=139722323941120) wrote 0 replacing the old value 0.
    Thread #1 (id=139722332333824) wrote 1 replacing the old value 0.
    Thread #1 (id=139722332333824) wrote 2 replacing the old value 1.
    Thread #1 (id=139722332333824) wrote 3 replacing the old value 2.
    Thread #1 (id=139722332333824) wrote 4 replacing the old value 3.
    Thread #0 (id=139722340726528) wrote 0 replacing the old value 0.
    Thread #3 (id=139722315548416) wrote 0 replacing the old value 0.
    Thread #3 (id=139722315548416) wrote 1 replacing the old value 4.
    Thread #0 (id=139722340726528) wrote 1 replacing the old value 1.
    Thread #4 (id=139722307155712) wrote 0 replacing the old value 1.
    Thread #4 (id=139722307155712) wrote 2 replacing the old value 2.
    Thread #4 (id=139722307155712) wrote 3 replacing the old value 2.
    Thread #4 (id=139722307155712) wrote 4 replacing the old value 3.
    Thread #2 (id=139722323941120) wrote 1 replacing the old value 0.
    Thread #0 (id=139722340726528) wrote 2 replacing the old value 1.
    Thread #2 (id=139722323941120) wrote 2 replacing the old value 4.
    Thread #0 (id=139722340726528) wrote 3 replacing the old value 2.
    Thread #0 (id=139722340726528) wrote 4 replacing the old value 3.
    5 threads take 19 times in total to increment 0 to 5.
```

### Veja também

[ atomic_exchangeatomic_exchange_explicit](<#/doc/atomic/atomic_exchange>)(C++11)(C++11) |  substitui atomicamente o valor do objeto atômico com um argumento não atômico e retorna o valor antigo do atômico   
(modelo de função)  
[ exchange](<#/doc/utility/exchange>)(C++14) |  substitui o argumento por um novo valor e retorna seu valor anterior   
(modelo de função)