# std::chrono::hh_mm_ss&lt;Duration&gt;::hh_mm_ss

```cpp
constexpr hh_mm_ss() noexcept : hh_mm_ss{Duration::zero()} {}  // (1)
constexpr explicit hh_mm_ss( Duration d );  // (2)
```

  
Constrói um objeto `hh_mm_ss`.

1) Constrói um objeto `hh_mm_ss` correspondente a `Duration::zero()`.

2) Constrói um objeto `hh_mm_ss` correspondente a d: 

  * `is_negative()` retorna `d < Duration::zero()`. 
  * `hours()` retorna [std::chrono::duration_cast](<#/doc/chrono/duration/duration_cast>)<[std::chrono::hours](<#/doc/chrono/duration>)>(abs(d)). 
  * `minutes()` retorna [std::chrono::duration_cast](<#/doc/chrono/duration/duration_cast>)<[std::chrono::minutes](<#/doc/chrono/duration>)>(abs(d) - hours()). 
  * `seconds()` retorna  
[std::chrono::duration_cast](<#/doc/chrono/duration/duration_cast>)<[std::chrono::seconds](<#/doc/chrono/duration>)>(abs(d) - hours() - minutes()). 
  * `subseconds()` retorna `abs(d) - hours() - minutes() - seconds()` se [std::chrono::treat_as_floating_point_v](<#/doc/chrono/treat_as_floating_point>)<precision::rep> for `true`; caso contrário, retorna [std::chrono::duration_cast](<#/doc/chrono/duration/duration_cast>)&lt;precision&gt;(abs(d) - hours() - minutes() - seconds()).

### Parâmetros

d  |  \-  |  a duration a ser decomposta   
  
### Exemplo

Execute este código
```
    #include <chrono>
    #include <print>
     
    int main()
    {
        std::println("Default constructor: {}", std::chrono::hh_mm_ss<std::chrono::minutes>{});
     
        std::chrono::time_point now = std::chrono::system_clock::now();
        std::chrono::hh_mm_ss time_of_day{now - std::chrono::floor<std::chrono::days>(now)};
        std::println("The time of day is: {}", time_of_day);
    }
```

Saída possível: 
```
    Default constructor: 00:00:00
    The time of day is: 12:13:14.151617189
```