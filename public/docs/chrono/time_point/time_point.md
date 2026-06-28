# std::chrono::time_point&lt;Clock,Duration&gt;::time_point

```cpp
  // (1)
time_point();  // (desde C++11)
(constexpr desde C++14)
  // (2)
explicit time_point( const duration& d );  // (desde C++11)
(constexpr desde C++14)
  // (3)
template< class Duration2 >
time_point( const time_point<Clock, Duration2>& t );  // (desde C++11)
(constexpr desde C++14)
```

  
Constrói um novo `time_point` a partir de uma de várias fontes de dados opcionais. 

1) Construtor padrão, cria um `time_point` representando a época do `Clock` (ou seja, [time_since_epoch()](<#/doc/chrono/time_point/time_since_epoch>) é zero).

2) Constrói um `time_point` na época do `Clock` mais d.

3) Constrói um `time_point` convertendo t para `duration`. Este construtor só participa da resolução de sobrecarga se `Duration2` for implicitamente conversível para `duration`.

### Parâmetros

d  |  \-  |  uma `duration` para copiar   
---|---|---
t  |  \-  |  um `time_point` para converter   
  
### Exemplo

Execute este código
```cpp 
    #include <chrono>
    #include <iostream>
     
    using Clock = std::chrono::steady_clock;
    using TimePoint = std::chrono::time_point<Clock>;
     
    void print_ms(const TimePoint& point) 
    {
        using Ms = std::chrono::milliseconds;
        const Clock::duration since_epoch = point.time_since_epoch();
        std::cout << std::chrono::duration_cast<Ms>(since_epoch) << '\n';
    }
     
    int main() 
    {
        const TimePoint default_value = TimePoint(); // (1)
        print_ms(default_value); // 0ms
     
        const Clock::duration duration_4_seconds = std::chrono::seconds(4);
        const TimePoint time_point_4_seconds(duration_4_seconds); // (2)
        // 4 seconds from start of epoch
        print_ms(time_point_4_seconds); // 4000ms
     
        const TimePoint time_point_now = Clock::now(); // (3)
        print_ms(time_point_now); // 212178842ms
    }
```

Saída possível: 
```
    0ms
    4000ms
    212178842ms
```

### Veja também

[ (construtor)](<#/doc/chrono/duration/duration>) |  constrói uma nova duration   
(função membro pública de `std::chrono::duration<Rep,Period>`)  
[ duration_cast](<#/doc/chrono/duration/duration_cast>)(C++11) |  converte uma duration para outra, com um intervalo de tick diferente   
(template de função)