# std::chrono::tai_clock::now

```cpp
static std::chrono::time_point<std::chrono::tai_clock> now();  // (desde C++20)
```

  
Retorna um time point representando o ponto atual no tempo. O resultado é calculado como se fosse por [std::chrono::tai_clock::from_utc](<#/doc/chrono/tai_clock/from_utc>)([std::chrono::utc_clock::now](<#/doc/chrono/utc_clock/now>)()). Implementações podem usar um valor mais preciso de tempo TAI.

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
    
    volatile int sink; // prevents optimization
    
    void do_some_work(std::size_t size)
    {
        std::vector<int> v(size, 42);
        sink = std::accumulate(v.begin(), v.end(), 0); // ensures side effect
    }
    
    int main()
    {
        std::cout << std::fixed << std::setprecision(9) << std::left;
        for (auto size{1ull}; size < 1000'000'000ull; size *= 100)
        {
            const auto start = std::chrono::tai_clock::now();
            do_some_work(size);
            const auto end = std::chrono::tai_clock::now();
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