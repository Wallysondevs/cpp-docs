# std::chrono::year_month_day_last::operator sys_days, std::chrono::year_month_day_last::operator local_days

```cpp
constexpr operator std::chrono::sys_days() const noexcept;  // (1) (desde C++20)
constexpr explicit operator std::chrono::local_days() const noexcept;  // (2) (desde C++20)
```

Converte *this para um [std::chrono::time_point](<#/doc/chrono/time_point>) representando a mesma data que este `year_month_day_last`. Isso é equivalente a compor um `year_month_day` a partir de `year()`, `month()` e `day()` e converter esse `year_month_day` para o tipo de destino.

1) Equivalente a [std::chrono::sys_days](<#/doc/chrono/system_clock>)(year()/month()/day()).

2) Equivalente a [std::chrono::local_days](<#/doc/chrono/local_t>)(year()/month()/day()).

### Exemplo

Execute este código
```
    #include <array>
    #include <chrono>
    #include <iostream>
    #include <string_view>
    using namespace std::chrono;
    using namespace std::literals;
     
    int main()
    {
        constexpr std::chrono::year y{2023y};
        constexpr std::array quarters{"1st"sv, "2nd"sv, "3rd"sv, "4th"sv};
        constexpr auto mq{12 / 4}; // months per quarter        
     
        std::cout << "In year " << static_cast<int>(y) << '\n';
        for (auto q = 1; q < 5; ++q)
        {
            const auto ls = y / std::chrono::month(q * mq) / Sunday[last];
            const auto ld = y / std::chrono::month(q * mq) / last;
            // subtract last Sunday from last day for day of week
            const auto index = (sys_days(ld) - sys_days(ls)).count();
            std::cout << "The " << quarters[q - 1] << " quarter ends on a "  
                      << std::chrono::weekday(index) << '\n';
        }
    }
```

Saída:
```
    In year 2023
    The 1st quarter ends on a Fri
    The 2nd quarter ends on a Fri
    The 3rd quarter ends on a Sat
    The 4th quarter ends on a Sun
```

### Veja também

[ operator sys_daysoperator local_days](<#/doc/chrono/year_month_day/operator_days>) | converte para um [std::chrono::time_point](<#/doc/chrono/time_point>)
(função membro pública de `std::chrono::year_month_day`)