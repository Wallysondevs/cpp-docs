# std::chrono::operator+, std::chrono::operator- (std::chrono::year_month_day_last)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr std::chrono::year_month_day_last
operator+( const std::chrono::year_month_day_last& ymdl,
const std::chrono::months& dm ) noexcept;
constexpr std::chrono::year_month_day_last
operator+( const std::chrono::months& dm,
const std::chrono::year_month_day_last& ymdl ) noexcept;
constexpr std::chrono::year_month_day_last
operator+( const std::chrono::year_month_day_last& ymdl,
const std::chrono::years& dy ) noexcept;
constexpr std::chrono::year_month_day_last
operator+( const std::chrono::years& dy,
const std::chrono::year_month_day_last& ymdl ) noexcept;
constexpr std::chrono::year_month_day_last
operator-( const std::chrono::year_month_day_last& ymdl,
const std::chrono::months& dm ) noexcept;
constexpr std::chrono::year_month_day_last
operator-( const std::chrono::year_month_day_last& ymdl,
const std::chrono::years& dy ) noexcept;
```

1,2) Adiciona dm.count() meses à data representada por ymdl. O resultado tem o mesmo [`year()`](<#/doc/chrono/year_month_day_last/accessors>) e [`month()`](<#/doc/chrono/year_month_day_last/accessors>) que [std::chrono::year_month](<#/doc/chrono/year_month>)(ymdl.year(), ymdl.month()) + dm.

3,4) Adiciona dy.count() anos à data representada por ymdl. O resultado é equivalente a [std::chrono::year_month_day_last](<#/doc/chrono/year_month_day_last>)(ymdl.year() + dy, ymdl.month_day_last()).

5) Subtrai dm.count() meses da data representada por ymdl. Equivalente a ymdl + -dm.

6) Subtrai dy.count() anos da data representada por ymdl. Equivalente a ymdl + -dy.

Para durations que são conversíveis para ambos std::chrono::years e std::chrono::months, as sobrecargas de `years` (3,4,6) são preferidas se a chamada seria ambígua de outra forma.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        auto ymdl{11/std::chrono::last/2020};
        std::cout << ymdl << '\n';
    
        ymdl = std::chrono::years(10) + ymdl;
        std::cout << ymdl << '\n';
        assert(ymdl == std::chrono::day(30)/
                       std::chrono::November/
                       std::chrono::year(2030));
    
        ymdl = ymdl - std::chrono::months(6);
        std::cout << ymdl << '\n';
        assert(ymdl == std::chrono::day(31)/
                       std::chrono::May/
                       std::chrono::year(2030));
    }
```

Saída:
```
    2020/Nov/last
    2030/Nov/last
    2030/May/last
```