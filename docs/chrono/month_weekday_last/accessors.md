# std::chrono::month_weekday_last::month, std::chrono::month_weekday_last::weekday_last

```cpp
constexpr std::chrono::month month() const noexcept;  // (1) (desde C++20)
constexpr std::chrono::weekday_last weekday_last() const noexcept;  // (2) (desde C++20)
```

Recupera uma cópia dos objetos [`month`](<#/doc/chrono/month>) e [`weekday_last`](<#/doc/chrono/weekday_last>) armazenados em `*this`.

### Valor de retorno

1) Uma cópia do objeto `std::chrono::month` armazenado em `*this`.

2) Uma cópia do objeto `std::chrono::weekday_last` armazenado em `*this`.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    using namespace std::chrono;
     
    int main()
    {
        std::cout << std::boolalpha;
     
        auto mwdl{March/Friday[last]}; // Last Friday in a March
        auto ywdl{year(2024)/mwdl};
        std::cout << (year_month_day{ywdl} == 
                      year_month_day{March/29/2024}) << ' ';
        // Last Friday of the next month, in 2024
        mwdl = {(mwdl.month() + months(1))/mwdl.weekday_last()};
        ywdl = {year(2024)/mwdl}; 
        std::cout << (year_month_day{ywdl} == 
                      year_month_day{April/26/2024}) << '\n';
    }
```

Saída:
```
    true true
```