# std::chrono::weekday::weekday

```cpp
weekday() = default;  // (1) (desde C++20)
constexpr explicit weekday( unsigned wd ) noexcept;  // (2) (desde C++20)
constexpr weekday( const std::chrono::sys_days& sd ) noexcept;  // (3) (desde C++20)
constexpr explicit weekday( const std::chrono::local_days& ld ) noexcept;  // (4) (desde C++20)
```

Constrói um objeto `weekday`.

1) O construtor padrão deixa o valor do dia da semana não inicializado.

2) Constrói um objeto `weekday` contendo o valor do dia da semana `wd`. Se `wd == 7`, o valor contido é `0`. Se `wd > 255`, o valor contido é não especificado.

3) Constrói um objeto `weekday` representando o dia da semana ao qual `sd` corresponde. Este construtor define uma conversão implícita de std::chrono::sys_days para `weekday`.

4) Constrói um objeto `weekday` representando o dia da semana ao qual `ld` corresponde, como se por weekday([std::chrono::sys_days](<#/doc/chrono/system_clock>)(ld.time_since_epoch())).

### Parâmetros

- **wd** — um valor de dia da semana
- **sd** — um objeto de dias do sistema
- **ld** — um objeto de dias locais

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        constexpr std::chrono::weekday friday{5}; // uses overload (2)
        static_assert(friday == std::chrono::Friday);
    
        for (int y{2020}; y <= 2024; ++y)
        {
            const std::chrono::year cur_year{y};
            for (int cur_month{1}; cur_month != 13; ++cur_month)
            {
                const std::chrono::year_month_day ymd{cur_year/cur_month/13};
                const std::chrono::weekday cur_weekday{std::chrono::sys_days(ymd)}; // (3)
                if (cur_weekday == friday)
                    std::cout << ymd << " is " << friday << '\n';
            }
        }
    }
```

Saída:
```
    2020-03-13 is Fri
    2020-11-13 is Fri
    2021-08-13 is Fri
    2022-05-13 is Fri
    2023-01-13 is Fri
    2023-10-13 is Fri
    2024-09-13 is Fri
    2024-12-13 is Fri
```