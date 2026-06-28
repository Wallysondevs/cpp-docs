# std::chrono::time_point_cast

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class ToDuration, class Clock, class Duration >
std::chrono::time_point<Clock, ToDuration>
time_point_cast( const std::chrono::time_point<Clock, Duration> &t );
(até C++14)
template< class ToDuration, class Clock, class Duration >
constexpr std::chrono::time_point<Clock, ToDuration>
time_point_cast( const std::chrono::time_point<Clock, Duration> &t );
```

Converte um [std::chrono::time_point](<#/doc/chrono/time_point>) de uma duração para outra.

`time_point_cast` participa da resolução de sobrecarga somente se `ToDuration` for uma especialização de [std::chrono::duration](<#/doc/chrono/duration>).

### Parâmetros

- **t** — `time_point` a ser convertido

### Valor de retorno

[std::chrono::time_point](<#/doc/chrono/time_point>)<Clock, ToDuration>(
[std::chrono::duration_cast](<#/doc/chrono/duration/duration_cast>)&lt;ToDuration&gt;(t.time_since_epoch())).

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    using namespace std::chrono_literals;
    
    using Clock = std::chrono::high_resolution_clock;
    using Ms = std::chrono::milliseconds;
    using Sec = std::chrono::seconds;
    
    template<class Duration>
    using TimePoint = std::chrono::time_point<Clock, Duration>;
    
    inline void print_ms(const TimePoint<Ms>& time_point)
    {
        std::cout << time_point.time_since_epoch().count() << " ms\n";
    }
    
    int main()
    {
        TimePoint<Sec> time_point_sec{4s};
    
        // implicit conversion, no precision loss
        TimePoint<Ms> time_point_ms = time_point_sec;
        print_ms(time_point_ms); // 4000 ms
    
        time_point_ms = TimePoint<Ms>{5756ms};
        print_ms(time_point_ms); // 5756 ms
    
        // explicit cast, need when precision loss may happen
        // 5756 truncated to 5000
        time_point_sec = std::chrono::time_point_cast<Sec>(time_point_ms);
        print_ms(time_point_sec); // 5000 ms
    }
```

Saída:
```
    4000 ms
    5756 ms
    5000 ms
```

### Ver também

[ floor(std::chrono::time_point)](<#/doc/chrono/time_point/floor>)(C++17) | converte um time_point para outro, arredondando para baixo
(modelo de função)
[ ceil(std::chrono::time_point)](<#/doc/chrono/time_point/ceil>)(C++17) | converte um time_point para outro, arredondando para cima
(modelo de função)
[ round(std::chrono::time_point)](<#/doc/chrono/time_point/round>)(C++17) | converte um time_point para outro, arredondando para o mais próximo, empates para o par
(modelo de função)
[ duration_cast](<#/doc/chrono/duration/duration_cast>)(C++11) | converte uma duração para outra, com um intervalo de tick diferente
(modelo de função)