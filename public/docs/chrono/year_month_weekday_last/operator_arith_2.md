# std::chrono::operator+, std::chrono::operator- (std::chrono::year_month_weekday_last)

```cpp
constexpr std::chrono::year_month_weekday_last
operator+( const std::chrono::year_month_weekday_last& ymwdl,
const std::chrono::months& dm ) noexcept;  // (desde C++20)
constexpr std::chrono::year_month_weekday_last
operator+( const std::chrono::months& dm,
const std::chrono::year_month_weekday_last& ymwdl ) noexcept;  // (desde C++20)
constexpr std::chrono::year_month_weekday_last
operator+( const std::chrono::year_month_weekday_last& ymwdl,
const std::chrono::years& dy ) noexcept;  // (desde C++20)
constexpr std::chrono::year_month_weekday_last
operator+( const std::chrono::years& dy,
const std::chrono::year_month_weekday_last& ymwdl ) noexcept;  // (desde C++20)
constexpr std::chrono::year_month_weekday_last
operator-( const std::chrono::year_month_weekday_last& ymwdl,
const std::chrono::months& dm ) noexcept;  // (desde C++20)
constexpr std::chrono::year_month_weekday_last
operator-( const std::chrono::year_month_weekday_last& ymwdl,
const std::chrono::years& dy ) noexcept;  // (desde C++20)
```

  
1,2) Adiciona dm.count() meses à data representada por ymwdl. O resultado tem o mesmo [`year()`](<#/doc/chrono/year_month_weekday_last/accessors>) e [`month()`](<#/doc/chrono/year_month_weekday_last/accessors>) que [std::chrono::year_month](<#/doc/chrono/year_month>)(ymwdl.year(), ymwdl.month()) + dm e o mesmo [`weekday()`](<#/doc/chrono/year_month_weekday_last/accessors>) que ymwdl.

3,4) Adiciona dy.count() anos à data representada por ymwdl. O resultado é equivalente a [std::chrono::year_month_weekday_last](<#/doc/chrono/year_month_weekday_last>)(ymwdl.year() + dy, ymwdl.month(), ymwd.weekday_last()).

5) Subtrai dm.count() meses da data representada por ymwdl. Equivalente a ymwdl + -dm.

6) Subtrai dy.count() anos da data representada por ymwdl. Equivalente a ymwdl + -dy.

Para durações que são conversíveis tanto para std::chrono::years quanto para std::chrono::months, as sobrecargas de `years` (3,4,6) são preferidas se a chamada fosse ambígua de outra forma.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <chrono>
    using namespace std::chrono;
     
    int main()
    {
        constexpr auto ymwdl1{Tuesday[last]/11/2021};
        auto ymwdl2 = ymwdl1;
        ymwdl2 = std::chrono::months(12) + ymwdl2;
        ymwdl2 = ymwdl2 - std::chrono::years(1);
        assert(ymwdl1 == ymwdl2);
    }
```