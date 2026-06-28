# std::chrono::year_month_weekday::operator+=, std::chrono::year_month_weekday::operator-=

```cpp
constexpr std::chrono::year_month_weekday&
operator+=( const std::chrono::years& dy ) const noexcept;  // (1) (desde C++20)
constexpr std::chrono::year_month_weekday&
operator+=( const std::chrono::months& dm ) const noexcept;  // (2) (desde C++20)
constexpr std::chrono::year_month_weekday&
operator-=( const std::chrono::years& dy ) const noexcept;  // (3) (desde C++20)
constexpr std::chrono::year_month_weekday&
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
        auto ymwi{1/std::chrono::Wednesday[2]/2021};
        std::cout << ymwi << '\n';
     
        ymwi += std::chrono::years(5);
        std::cout << ymwi << '\n';
        assert(static_cast<std::chrono::year_month_day>(ymwi) ==
                           std::chrono::year(2026)/1/14);
     
        ymwi -= std::chrono::months(1);
        std::cout << ymwi << '\n';
        assert(static_cast<std::chrono::year_month_day>(ymwi) == 
                           std::chrono::day(10)/12/2025);
    }
```

Saída: 
```
    2021/Jan/Wed[2]
    2026/Jan/Wed[2]
    2025/Dec/Wed[2]
```

### Veja também

[ operator+operator-](<#/doc/chrono/year_month_weekday/operator_arith_2>)(C++20) |  adiciona ou subtrai um `year_month_weekday` e um certo número de anos ou meses   
(função)  