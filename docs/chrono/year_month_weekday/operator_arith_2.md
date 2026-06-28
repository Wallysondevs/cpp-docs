# std::chrono::operator+, std::chrono::operator- (std::chrono::year_month_weekday)

```cpp
constexpr std::chrono::year_month_weekday
operator+( const std::chrono::year_month_weekday& ymwd,
const std::chrono::months& dm ) noexcept;  // (1) (desde C++20)
constexpr std::chrono::year_month_weekday
operator+( const std::chrono::months& dm,
const std::chrono::year_month_weekday& ymwd ) noexcept;  // (2) (desde C++20)
constexpr std::chrono::year_month_weekday
operator+( const std::chrono::year_month_weekday& ymwd,
const std::chrono::years& dy ) noexcept;  // (3) (desde C++20)
constexpr std::chrono::year_month_weekday
operator+( const std::chrono::years& dy,
const std::chrono::year_month_weekday& ymwd ) noexcept;  // (4) (desde C++20)
constexpr std::chrono::year_month_weekday
operator-( const std::chrono::year_month_weekday& ymwd,
const std::chrono::months& dm ) noexcept;  // (5) (desde C++20)
constexpr std::chrono::year_month_weekday
operator-( const std::chrono::year_month_weekday& ymwd,
const std::chrono::years& dy ) noexcept;  // (6) (desde C++20)
```

  
1,2) Adiciona dm.count() meses à data representada por ymwd. O resultado tem o mesmo [`year()`](<#/doc/chrono/year_month_weekday/accessors>) e [`month()`](<#/doc/chrono/year_month_weekday/accessors>) que [std::chrono::year_month](<#/doc/chrono/year_month>)(ymwd.year(), ymwd.month()) + dm e o mesmo [`weekday()`](<#/doc/chrono/year_month_weekday/accessors>) e [`index()`](<#/doc/chrono/year_month_weekday/accessors>) que ymwd.

3,4) Adiciona dy.count() anos à data representada por ymwd. O resultado é equivalente a [std::chrono::year_month_weekday](<#/doc/chrono/year_month_weekday>)(ymwd.year() + dy, ymwd.month(), ymwd.weekday_indexed()).

5) Subtrai dm.count() meses da data representada por ymwd. Equivalente a ymwd + -dm.

6) Subtrai dy.count() anos da data representada por ymwd. Equivalente a ymwd + -dy.

Para durações que são conversíveis tanto para std::chrono::years quanto para std::chrono::months, as sobrecargas de `years` (3,4,6) são preferidas se a chamada fosse ambígua de outra forma.

### Observações

Mesmo que ymwd.ok() seja verdadeiro, o `year_month_weekday` resultante pode não representar uma data válida se ymwd.index() for 5.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        auto ymwdi{1/std::chrono::Wednesday[1]/2021};
        std::cout << ymwdi << '\n';
    
        ymwdi = std::chrono::years(5) + ymwdi;
        // First Wednesday in January, 2026
        std::cout << ymwdi << '\n';
        assert(static_cast<std::chrono::year_month_day>(ymwdi) ==
               std::chrono::January/7/2026);
    
        ymwdi = ymwdi - std::chrono::months(6);
        // First Wednesday in July, 2025
        std::cout << ymwdi << '\n';
        assert(static_cast<std::chrono::year_month_day>(ymwdi) ==
               std::chrono::July/2/2025);
    }
```

Saída:
```
    2021/Jan/Wed[1]
    2026/Jan/Wed[1]
    2025/Jul/Wed[1]
```