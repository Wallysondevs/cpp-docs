# std::chrono::steady_clock::now

```cpp
static std::chrono::time_point<std::chrono::steady_clock> now() noexcept;  // (desde C++11)
```

  
Retorna um time point representando o ponto atual no tempo. 

### Valor de retorno

Um time point representando o tempo atual. 

### Exemplo

Execute este código
```
    #include <chrono>
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <numeric>
    #include <vector>
     
    volatile int sink; // impede otimização
     
    void do_some_work(std::size_t size)
    {
        std::vector<int> v(size, 42);
        sink = std::accumulate(v.begin(), v.end(), 0); // garante efeito colateral
    }
     
    int main()
    {
        std::cout << std::fixed << std::setprecision(9) << std::left;
        for (auto size{1ull}; size < 1000'000'000ull; size *= 100)
        {
            const auto start = std::chrono::steady_clock::now();
            do_some_work(size);
            const auto end = std::chrono::steady_clock::now();
            const std::chrono::duration<double> diff = end - start;
     
            std::cout << "diff = " << diff << "; size = " << size << '\n';
        }
    }
```

Saída possível: 
```
    diff = 0.000005415s; size = 1
    diff = 0.000001986s; size = 100
    diff = 0.000051633s; size = 10000
    diff = 0.006043920s; size = 1000000
    diff = 0.636128648s; size = 100000000
```