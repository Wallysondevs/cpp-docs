# std::chrono::ceil(std::chrono::time_point)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class ToDuration, class Clock, class Duration >
constexpr std::chrono::time_point<Clock, ToDuration>
ceil( const std::chrono::time_point<Clock, Duration>& tp );
```

Retorna o menor time point `t` representável em `ToDuration` que é maior ou igual a tp.

A função não participa da resolução de sobrecarga a menos que `ToDuration` seja uma especialização de [std::chrono::duration](<#/doc/chrono/duration>).

### Parâmetros

- **tp** — time point para arredondar para cima

### Valor de retorno

tp arredondado para cima para o próximo time point usando uma duration do tipo `ToDuration`.

### Possível implementação
```cpp
    namespace detail
    {
        template<class> inline constexpr bool is_duration_v = false;
        template<class Rep, class Period> inline constexpr bool is_duration_v<
            std::chrono::duration<Rep, Period>> = true;
    }
    
    template<class To, class Clock, class FromDuration,
             class = std::enable_if_t<detail::is_duration_v<To>>>
    constexpr std::chrono::time_point<Clock, To>
        ceil(const std::chrono::time_point<Clock, FromDuration>& tp)
    {
        return std::chrono::time_point<Clock, To>{
                   std::chrono::ceil<To>(tp.time_since_epoch())};
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <string>
    
    template<typename TimePoint>
    std::string to_string(const TimePoint& time_point)
    {
        return std::to_string(time_point.time_since_epoch().count());
    }
    
    int main()
    {
        using namespace std::literals::chrono_literals;
        using Sec = std::chrono::seconds;
    
        std::cout << "Time point\t" "Cast\t" "Floor\t" "Round\t" "Ceil\n";
        std::cout << "(ms)\t\t"     "(s)\t"  "(s)\t"   "(s)\t"   "(s)\n";
        for (const auto value_ms : {5432ms, 5678ms})
        {
            std::chrono::time_point<std::chrono::system_clock, std::chrono::milliseconds>
                time_point_ms(value_ms);
    
            std::cout
                << to_string(time_point_ms) << "\t\t"
                << to_string(std::chrono::time_point_cast<Sec>(time_point_ms)) << '\t'
                << to_string(std::chrono::floor<Sec>(time_point_ms)) << '\t'
                << to_string(std::chrono::round<Sec>(time_point_ms)) << '\t'
                << to_string(std::chrono::ceil<Sec>(time_point_ms)) << '\n';
        }
    }
```

Saída:
```
    Time point	Cast	Floor	Round	Ceil
    (ms)		(s)	(s)	(s)	(s)
    5432		5	5	5	6
    5678		5	5	6	6
```

### Veja também

[ time_point_cast](<#/doc/chrono/time_point/time_point_cast>)(C++11) | converte um time point para outro time point no mesmo clock, com uma duration diferente
(modelo de função)
[ floor(std::chrono::time_point)](<#/doc/chrono/time_point/floor>)(C++17) | converte um time_point para outro, arredondando para baixo
(modelo de função)
[ round(std::chrono::time_point)](<#/doc/chrono/time_point/round>)(C++17) | converte um time_point para outro, arredondando para o mais próximo, empates para o par
(modelo de função)
[ ceil(std::chrono::duration)](<#/doc/chrono/duration/ceil>)(C++17) | converte uma duration para outra, arredondando para cima
(modelo de função)
[ ceilceilfceill](<#/doc/numeric/math/ceil>)(C++11)(C++11) | inteiro mais próximo não menor que o valor dado
(função)