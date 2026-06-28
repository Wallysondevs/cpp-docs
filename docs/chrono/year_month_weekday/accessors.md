# std::chrono::year_month_weekday::year, std::chrono::year_month_weekday::month, std::chrono::year_month_weekday::weekday, std::chrono::year_month_weekday::index, std::chrono::year_month_weekday::weekday_indexed

```cpp
constexpr std::chrono::year year() const noexcept;  // (1) (desde C++20)
constexpr std::chrono::month month() const noexcept;  // (2) (desde C++20)
constexpr std::chrono::weekday weekday() const noexcept;  // (3) (desde C++20)
constexpr unsigned index() const noexcept;  // (4) (desde C++20)
constexpr std::chrono::weekday_indexed weekday_indexed() const noexcept;  // (5) (desde C++20)
```

Recupera os valores dos campos armazenados neste objeto `year_month_weekday`.

### Valor de retorno

1) Retorna o valor `std::chrono::year` armazenado.

2) Retorna o valor `std::chrono::month` armazenado.

3) Retorna o valor `std::chrono::weekday` armazenado.

4) Retorna o índice do dia da semana armazenado.

5) weekday()[index()]

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <chrono>
    
    int main()
    {
        constexpr auto ym{std::chrono::year(2021)/std::chrono::January};
        constexpr auto wdi{std::chrono::Wednesday[1]};
        auto ymwdi{ym/wdi};
        const auto index{ymwdi.index() + 1};
        auto weekday{ymwdi.weekday() + std::chrono::days(1)};
        ymwdi = {ymwdi.year()/ymwdi.month()/weekday[index]};
        // Second Thursday in January, 2021
        assert(std::chrono::year_month_day{ymwdi} == std::chrono::January/14/2021);
    }
```