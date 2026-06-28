# std::chrono::year_month_day::operator sys_days, std::chrono::year_month_day::operator local_days

```cpp
constexpr operator std::chrono::sys_days() const noexcept;  // (1) (desde C++20)
constexpr explicit operator std::chrono::local_days() const noexcept;  // (2) (desde C++20)
```

Converte *this para um [std::chrono::time_point](<#/doc/chrono/time_point>) representando a mesma data que este [`year_month_day`](<#/doc/chrono/year_month_day>).

1) Se ok() for true, o valor de retorno contém uma contagem de dias desde a época (epoch) do [std::chrono::system_clock](<#/doc/chrono/system_clock>) (1970-01-01) até *this. O resultado é negativo se *this representar uma data anterior a ela.

Caso contrário, se o ano e o mês armazenados forem válidos (year().ok() && month().ok() for true), então o valor retornado é sys_days(year()/month()/1d) + (day() - 1d).

Caso contrário (se year().ok() && month().ok() for false), o valor de retorno é não especificado.

Um std::chrono::sys_days no intervalo [[std::chrono::days](<#/doc/chrono/duration>){-12687428}, [std::chrono::days](<#/doc/chrono/duration>){11248737}], quando convertido para [`year_month_day`](<#/doc/chrono/year_month_day>) e de volta, produz o mesmo valor.

2) O mesmo que (1), mas retorna local_days em vez disso. Equivalente a return local_days(sys_days(*this).time_since_epoch());.

### Notas

A conversão para std::chrono::sys_days e de volta pode ser usada para normalizar um [`year_month_day`](<#/doc/chrono/year_month_day>) que contém um dia inválido, mas um ano e mês válidos:
```cpp
    using namespace std::chrono;
    auto ymd = 2017y/January/0;
    ymd = sys_days{ymd};
    // ymd is now 2016y/December/31
```

A normalização do ano e do mês pode ser feita adicionando (ou subtraindo) zero std::chrono::months:
```cpp
    using namespace std::chrono;
    constexpr year_month_day normalize(year_month_day ymd)
    {
        ymd += months{0}; // normalizes year and month
        return sys_days{ymd}; // normalizes day
    }
    static_assert(normalize(2017y/33/59) == 2019y/10/29);
```

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        using namespace std::chrono;
        const auto today = sys_days{std::chrono::floor<days>(system_clock::now())};
        for (const year_month_day ymd : {{November/15/2020}, {November/15/2120}, today})
        {
            std::cout << ymd;
            const auto delta = (sys_days{ymd} - today).count();
            (delta < 0) ? std::cout << " was " << -delta << " day(s) ago\n" :
            (delta > 0) ? std::cout << " is " << delta << " day(s) from now\n"
                        : std::cout << " is today!\n";
        }
    }
```

Saída possível:
```
    2020-11-15 was 1014 day(s) ago
    2120-11-15 is 35510 day(s) from now
    2023-08-26 is today!
```