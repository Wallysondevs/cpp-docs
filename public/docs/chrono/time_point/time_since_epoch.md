# std::chrono::time_point&lt;Clock,Duration&gt;::time_since_epoch

```cpp
duration time_since_epoch() const;  // (desde C++11)
(constexpr desde C++14)
```

  
Retorna uma [duration](<#/doc/chrono/duration>) representando a quantidade de tempo entre *this e a epoch do `clock`. 

### Parâmetros

(nenhum) 

### Valor de retorno

A quantidade de tempo entre este `time_point` e a epoch do `clock`. 

### Exemplo

Execute este código
```
    #include <chrono>
    #include <ctime>
    #include <iostream>
     
    int main()
    {
        const auto p0 = std::chrono::time_point<std::chrono::system_clock>{};
        const auto p1 = std::chrono::system_clock::now();
        const auto p2 = p1 - std::chrono::hours(24);
     
        std::time_t epoch_time = std::chrono::system_clock::to_time_t(p0);
        std::cout << "epoch: " << std::ctime(&epoch_time);
        std::time_t today_time = std::chrono::system_clock::to_time_t(p1);
        std::cout << "today: " << std::ctime(&today_time);
     
        std::cout << "hours since epoch: "
                  << std::chrono::duration_cast<std::chrono::hours>(
                         p1.time_since_epoch()).count() 
                  << '\n';
        std::cout << "yesterday, hours since epoch: "
                  << std::chrono::duration_cast<std::chrono::hours>(
                         p2.time_since_epoch()).count() 
                  << '\n';
    }
```

Saída possível: 
```
    epoch: Thu Jan  1 00:00:00 1970
    today: Fri Jun 30 10:44:11 2017
    hours since epoch: 416338
    yesterday, hours since epoch: 416314
```