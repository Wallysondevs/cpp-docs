# std::chrono::year_month_weekday_last::operator+=, std::chrono::year_month_weekday_last::operator-=

```cpp
constexpr std::chrono::year_month_weekday_last&
operator+=( const std::chrono::years& dy ) const noexcept;  // (1) (desde C++20)
constexpr std::chrono::year_month_weekday_last&
operator+=( const std::chrono::months& dm ) const noexcept;  // (2) (desde C++20)
constexpr std::chrono::year_month_weekday_last&
operator-=( const std::chrono::years& dy ) const noexcept;  // (3) (desde C++20)
constexpr std::chrono::year_month_weekday_last&
operator-=( const std::chrono::months& dm ) const noexcept;  // (4) (desde C++20)
```

  
Modifica o ponto no tempo que *this representa pela duração dy ou dm.

1) Equivalente a *this = *this + dy;.

2) Equivalente a *this = *this + dm;.

3) Equivalente a *this = *this - dy;.

4) Equivalente a *this = *this - dm;.

Para durações que são conversíveis tanto para std::chrono::years quanto para std::chrono::months, as sobrecargas de `years` (1,3) são preferidas se a chamada seria ambígua de outra forma.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
    using namespace std::chrono;
     
    int main()
    {
        auto ymwdl{August/Friday[last]/2022};
        std::cout << year_month_day{ymwdl} << '\n';
        ymwdl += months(2);
        std::cout << year_month_day{ymwdl} << '\n';
        ymwdl -= years(1); 
        std::cout << year_month_day{ymwdl} << '\n';
    }
```

Saída: 
```
    2022-08-26
    2022-10-28
    2021-10-29
```

### Veja também

[ operator+operator-](<#/doc/chrono/year_month_weekday_last/operator_arith_2>)(C++20) |  adiciona ou subtrai um `year_month_weekday_last` e um certo número de anos ou meses   
(function)  