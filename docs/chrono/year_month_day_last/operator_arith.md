# std::chrono::year_month_day_last::operator+=, std::chrono::year_month_day_last::operator-=

```cpp
constexpr std::chrono::year_month_day_last&
operator+=( const std::chrono::years& dy ) const noexcept;  // (1) (desde C++20)
constexpr std::chrono::year_month_day_last&
operator+=( const std::chrono::months& dm ) const noexcept;  // (2) (desde C++20)
constexpr std::chrono::year_month_day_last&
operator-=( const std::chrono::years& dy ) const noexcept;  // (3) (desde C++20)
constexpr std::chrono::year_month_day_last&
operator-=( const std::chrono::months& dm ) const noexcept;  // (4) (desde C++20)
```

  
Modifica o ponto no tempo que *this representa pela duração dy ou dm.

1) Equivalente a `*this = *this + dy;`.

2) Equivalente a `*this = *this + dm;`.

3) Equivalente a `*this = *this - dy;`.

4) Equivalente a `*this = *this - dm;`.

Para durações que são conversíveis tanto para `std::chrono::years` quanto para `std::chrono::months`, as sobrecargas de `years` (1,3) são preferidas se a chamada seria ambígua de outra forma.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <chrono>
     
    int main()
    {
        auto ymdl{11/std::chrono::last/2020};
     
        ymdl += std::chrono::years(15);
        assert(ymdl.day() == std::chrono::day(30));
        assert(ymdl.month() == std::chrono::November);
        assert(ymdl.year() == std::chrono::year(2035));
     
        ymdl -= std::chrono::months(6);
        assert(ymdl.day() == std::chrono::day(31));
        assert(ymdl.month() == std::chrono::May);
        assert(ymdl.year() == std::chrono::year(2035));
    }
```

### Veja também

[ operator+operator-](<#/doc/chrono/year_month_day_last/operator_arith_2>)(C++20) | adiciona ou subtrai um `year_month_day_last` e um certo número de anos ou meses   
(função)  