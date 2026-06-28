# std::chrono::high_resolution_clock::now

```cpp
static std::chrono::time_point<std::chrono::high_resolution_clock> now() noexcept;  // (desde C++11)
```

  
Retorna um time point representando o ponto atual no tempo. 

### Valor de retorno

Um time point representando o tempo atual. 

### Exemplo

Execute este código
```cpp 
    #include <chrono>
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <numeric>
    #include <vector>
     
    volatile int sink; // previne otimização
     
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
            const auto start = std::chrono::high_resolution_clock::now();
            do_some_work(size);
            const auto end = std::chrono::high_resolution_clock::now();
            const std::chrono::duration<double> diff = end - start;
            std::cout << "start = " << start << "; end = " << end << ";\n";
            std::cout << "diff = " << diff << "; size = " << size << '\n';
        }
    }
```

Saída possível: 
```
    start = 2024-10-25 13:37:42.016233947; end = 2024-10-25 13:37:42.016239362;
    diff = 0.000005415s; size = 1
    start = 2024-10-25 13:37:42.016384595; end = 2024-10-25 13:37:42.016386581;
    diff = 0.000001986s; size = 100
    start = 2024-10-25 13:37:42.016394197; end = 2024-10-25 13:37:42.016445830;
    diff = 0.000051633s; size = 10000
    start = 2024-10-25 13:37:42.016452737; end = 2024-10-25 13:37:42.022496657;
    diff = 0.006043920s; size = 1000000
    start = 2024-10-25 13:37:42.022511298; end = 2024-10-25 13:37:42.658639946;
    diff = 0.636128648s; size = 100000000
```