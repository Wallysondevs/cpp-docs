# std::chrono::time_point&lt;Clock,Duration&gt;::max

```cpp
static constexpr time_point max(); |  | (ate C++20)
static constexpr time_point max() noexcept;  // (desde C++20)
```

  
Retorna um `time_point` com a maior duração possível, ou seja, time_point(duration::max()). 

### Parâmetros

(nenhum) 

### Valor de retorno

O maior `time_point` possível. 

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
    #include <vector>
     
    int main() 
    {
        std::chrono::time_point<std::chrono::system_clock> now =
            std::chrono::system_clock::now();
        std::vector<std::chrono::time_point<std::chrono::system_clock>> times
        {
            now - std::chrono::hours(24),
            now - std::chrono::hours(48),
            now + std::chrono::hours(24)
        };  
     
        std::chrono::time_point<std::chrono::system_clock> earliest =
            std::chrono::time_point<std::chrono::system_clock>::max();
     
        std::cout << "all times:\n";
        for (const auto& time : times)
        {
            std::time_t t = std::chrono::system_clock::to_time_t(time);
            std::cout << std::ctime(&t);
     
            if (time < earliest)
                earliest = time;
        }
     
        std::time_t t = std::chrono::system_clock::to_time_t(earliest);
        std::cout << "earliest:\n" << std::ctime(&t);
    }
```

Saída possível: 
```
    all times:
    Sun Oct  7 19:06:48 2012
    Sat Oct  6 19:06:48 2012
    Tue Oct  9 19:06:48 2012
    earliest:
    Sat Oct  6 19:06:48 2012
```