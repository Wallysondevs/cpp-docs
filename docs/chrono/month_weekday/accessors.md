# std::chrono::month_weekday::month, std::chrono::month_weekday::weekday_indexed

```cpp
constexpr std::chrono::month month() const noexcept;  // (1) (desde C++20)
constexpr std::chrono::weekday_indexed weekday_indexed() const noexcept;  // (2) (desde C++20)
```

Recupera uma cópia dos objetos [`month`](<#/doc/chrono/month>) e [`weekday_indexed`](<#/doc/chrono/weekday_indexed>) armazenados em *this.

### Valor de retorno

1) Uma cópia do objeto std::chrono::month armazenado em *this.

2) Uma cópia do objeto std::chrono::weekday_indexed armazenado em *this.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha;
     
        auto mwdi{std::chrono::March/std::chrono::Friday[1]}; // 1st Friday in a March
        std::cout << (std::chrono::year_month_day{mwdi/2024} == 
                      std::chrono::year_month_day{std::chrono::March/1/2024})
                      << ' ';
        auto index = mwdi.weekday_indexed().index();
        auto weekday = mwdi.weekday_indexed().weekday();
        mwdi = {mwdi.month(), weekday[index + 4]}; // 5th Friday in a March
        std::cout << (std::chrono::year_month_day{mwdi/2024} == 
                      std::chrono::year_month_day{std::chrono::March/29/2024})
                      << '\n';
    }
```

Saída:
```
    true true
```