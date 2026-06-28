# std::chrono::operator+, std::chrono::operator- (std::chrono::year_month_day)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr std::chrono::year_month_day operator+( const std::chrono::year_month_day& ymd,
const std::chrono::months& dm
) noexcept;
constexpr std::chrono::year_month_day operator+( const std::chrono::months& dm,
const std::chrono::year_month_day& ymd
) noexcept;
constexpr std::chrono::year_month_day operator+( const std::chrono::year_month_day& ymd,
const std::chrono::years& dy
) noexcept;
constexpr std::chrono::year_month_day operator+( const std::chrono::years& dy,
const std::chrono::year_month_day& ymd
) noexcept;
constexpr std::chrono::year_month_day operator-( const std::chrono::year_month_day& ymd,
const std::chrono::months& dm
) noexcept;
constexpr std::chrono::year_month_day operator-( const std::chrono::year_month_day& ymd,
const std::chrono::years& dy
) noexcept;
```

1,2) Adiciona dm.count() meses à data representada por ymd. O resultado tem o mesmo day() que ymd e o mesmo year() e month() que [std::chrono::year_month](<#/doc/chrono/year_month>)(ymd.year(), ymd.month()) + dm.

3,4) Adiciona dy.count() anos à data representada por ymd. O resultado é equivalente a [std::chrono::year_month_day](<#/doc/chrono/year_month_day>)(ymd.year() + dy, ymd.month(), ymd.day().

5) Subtrai dm.count() meses da data representada por ymd. Equivalente a ymd + -dm.

6) Subtrai dy.count() anos da data representada por ymd. Equivalente a ymd + -dy.

Para durações que são conversíveis tanto para std::chrono::years quanto para std::chrono::months, as sobrecargas de `years` (3,4,6) são preferidas se a chamada seria ambígua de outra forma.

### Observações

Mesmo que ymd.ok() seja true, o `year_month_day` resultante pode não representar uma data válida se ymd.day() for 29, 30 ou 31.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        std::cout << std::boolalpha;
    
        auto ymd{std::chrono::day(1)/std::chrono::July/2021};
    
        ymd = ymd + std::chrono::months(4);
        std::cout << (ymd.month() == std::chrono::November) << ' '
                  << (ymd.year() == std::chrono::year(2021)) << ' ';
    
        ymd = ymd - std::chrono::years(10);
        std::cout << (ymd.month() == std::chrono::month(11)) << ' '
                  << (ymd.year() == std::chrono::year(2011)) << '\n';
    }
```

Saída:
```
    true true true true
```