# std::chrono::year_month_weekday::operator sys_days, std::chrono::year_month_weekday::operator local_days

```cpp
constexpr operator std::chrono::sys_days() const noexcept;  // (1) (desde C++20)
constexpr explicit operator std::chrono::local_days() const noexcept;  // (2) (desde C++20)
```

Converte *this para um [std::chrono::time_point](<#/doc/chrono/time_point>) representando a mesma data que este `year_month_weekday`.

1) Se year().ok() && month().ok() && weekday().ok():

  * Se index() == 0, retorna um `sys_days` que representa a data 7 dias antes do primeiro [`weekday()`](<#/doc/chrono/year_month_weekday/accessors>) do ano e mês.
  * Caso contrário, retorna um `sys_days` que representa a data (index() - 1) * 7 dias após o primeiro weekday() do ano e mês.

Caso contrário, o valor retornado é não especificado.

2) O mesmo que (1), mas retorna `local_days` em vez de `sys_days`. Equivalente a local_days(sys_days(*this).time_since_epoch()).

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    using namespace std::chrono;
    
    int main()
    {
        constexpr auto ymwd{Tuesday[2]/11/2021};
        std::cout << ymwd << '\n';
        // convert from field-based to serial-based to add hours
        constexpr auto sd = sys_days{ymwd} + 24h;
        std::cout << sd << '\n';
        constexpr auto ymd = floor<days>(sd);
        static_assert(ymd == November/10/2021);
    }
```

Saída:
```
    2021/Nov/Tue[2]
    2021-11-10 00:00:00
```