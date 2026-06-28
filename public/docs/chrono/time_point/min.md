# std::chrono::time_point&lt;Clock,Duration&gt;::min

```cpp
static constexpr time_point min(); |  | (ate C++20)
static constexpr time_point min() noexcept;  // (desde C++20)
```

  
Retorna um `time_point` com a menor duração possível, isto é, time_point(duration::min()). 

### Parâmetros

(nenhum) 

### Valor de retorno

O menor `time_point` possível. 

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iomanip>
    #include <iostream>
    #include <ratio>
    #include <string>
    
    constexpr auto steady_min = std::chrono::steady_clock::time_point::min();
    
    void animate_frame_at_time_offset(double game_time)
    {
        std::cout << std::string(static_cast<int>(game_time) % 10 + 1, '*') << '\n';
    }
    
    int main()
    {
        auto last_frame = steady_min;
        std::chrono::duration<double, std::micro> game_time{0.0};
    
        for (int n = 0; n < 5; ++n)
        {
            const auto current_frame = std::chrono::steady_clock::now();
            // inicializa o timer se for o primeiro frame:
            if (last_frame == steady_min)
                last_frame = current_frame;
            game_time += current_frame - last_frame;
            std::cout << "Drawing frame at " << std::setprecision(10)
                      << std::setw(8) << game_time.count() << " μs ";
            animate_frame_at_time_offset(game_time.count());
        }
    }
```

Saída possível: 
```
    Drawing frame at        0 μs *
    Drawing frame at  134.499 μs *****
    Drawing frame at  274.337 μs *****
    Drawing frame at  416.571 μs *******
    Drawing frame at  561.124 μs **
```