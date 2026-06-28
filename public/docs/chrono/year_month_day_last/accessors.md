# std::chrono::year_month_day_last::year, std::chrono::year_month_day_last::month, std::chrono::year_month_day_last::day, std::chrono::year_month_day_last::month_day_last

```cpp
constexpr std::chrono::year year() const noexcept;  // (1) (desde C++20)
constexpr std::chrono::month month() const noexcept;  // (2) (desde C++20)
constexpr std::chrono::day day() const noexcept;  // (3) (desde C++20)
constexpr std::chrono::month_day_last month_day_last() const noexcept;  // (4) (desde C++20)
```

Recupera os valores dos campos armazenados neste objeto `year_month_day_last`.

### Valor de retorno

1) Retorna o valor std::chrono::year armazenado.

2) Retorna o valor std::chrono::month armazenado.

3) Um valor std::chrono::day correspondente ao último dia do ano e mês armazenados. Se this->ok() for falso, o valor de retorno é não especificado.

4) Um std::chrono::month_day_last construído a partir de `month()`.

### Exemplo

Execute este código
```cpp
    #include <chrono>
     
    int main()
    {
        constexpr auto ymdl{std::chrono::last/11/2020};
        static_assert
        (
            ymdl.day() == std::chrono::day(30) &&
            ymdl.month() == std::chrono::November &&
            ymdl.year() == std::chrono::year(2020) &&
            ymdl.month_day_last() == std::chrono::November/std::chrono::last
        );
    }
```