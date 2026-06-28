# std::chrono::year_month_day::operator+=, std::chrono::year_month_day::operator-=

```cpp
constexpr std::chrono::year_month_day&
operator+=( const std::chrono::years& dy ) const noexcept;  // (1) (desde C++20)
constexpr std::chrono::year_month_day&
operator+=( const std::chrono::months& dm ) const noexcept;  // (2) (desde C++20)
constexpr std::chrono::year_month_day&
operator-=( const std::chrono::years& dy ) const noexcept;  // (3) (desde C++20)
constexpr std::chrono::year_month_day&
operator-=( const std::chrono::months& dm ) const noexcept;  // (4) (desde C++20)
```

  
Modifica o ponto no tempo que *this representa pela duração dy ou dm.

1) Equivalente a *this = *this + dy;.

2) Equivalente a *this = *this + dm;.

3) Equivalente a *this = *this - dy;.

4) Equivalente a *this = *this - dm;.

Para durações que são conversíveis tanto para std::chrono::years quanto para std::chrono::months, as sobrecargas de `years` (1,3) são preferidas se a chamada fosse ambígua de outra forma.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        constexpr auto monthsInYear{12};
        auto ymd{std::chrono::day(1)/std::chrono::July/2020};
        std::cout << "#1 " << ymd << '\n';
     
        ymd -= std::chrono::years(10);
        std::cout << "#2 " << ymd << '\n';
        assert(ymd.month() == std::chrono::July);
        assert(ymd.year() == std::chrono::year(2010));
     
        ymd += std::chrono::months(10 * monthsInYear + 11);
        std::cout << "#3 " << ymd << '\n';
        assert(ymd.month() == std::chrono::month(6));
        assert(ymd.year() == std::chrono::year(2021));
     
        // Handling the ymd += months "overflow" case.
        ymd = std::chrono::May/31/2021; // ok
        std::cout << "#4 " << ymd << '\n';
        assert(ymd.ok());
     
        ymd += std::chrono::months{1}; // bad date: June has only 30 days
        std::cout << "#5 " << ymd << '\n';
        assert(not ymd.ok());
        assert(ymd == std::chrono::June/31/2021);
     
        // Snap to the last day of the month, June 30:
        const auto ymd1 = ymd.year()/ymd.month()/std::chrono::last;
        std::cout << "#6 " << ymd1 << '\n';
        assert(ymd1.ok());
        assert(ymd1 == std::chrono::June/30/2021);
     
        // Overflow into the next month, July 1 (via converting to/from sys_days):
        const std::chrono::year_month_day ymd2 = std::chrono::sys_days{ymd};
        std::cout << "#7 " << ymd2 << '\n';
        assert(ymd2.ok());
        assert(ymd2 == std::chrono::July/1/2021);
    }
```

Saída: 
```
    #1 2020-07-01
    #2 2010-07-01
    #3 2021-06-01
    #4 2021-05-31
    #5 2021-06-31 is not a valid date
    #6 2021/Jun/last
    #7 2021-07-01
```

### Veja também

[ operator+operator-](<#/doc/chrono/year_month_day/operator_arith_2>)(C++20) | adiciona ou subtrai um `year_month_day` e um certo número de anos ou meses   
(função)  