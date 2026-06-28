# std::chrono::year_month_day::year, std::chrono::year_month_day::month, std::chrono::year_month_day::day

```cpp
constexpr std::chrono::year year() const noexcept;  // (1) (desde C++20)
constexpr std::chrono::month month() const noexcept;  // (2) (desde C++20)
constexpr std::chrono::day day() const noexcept;  // (3) (desde C++20)
```

Recupera os valores de ano, mês e dia armazenados neste objeto `year_month_day`.

### Valor de retorno

1) Retorna o valor `std::chrono::year` armazenado.

2) Retorna o valor `std::chrono::month` armazenado.

3) Retorna o valor `std::chrono::day` armazenado.

### Exemplo

Execute este código
```
    #include <chrono>
    
    int main()
    {
        constexpr std::chrono::year_month_day ymd{std::chrono::July/1/2021};
    
        static_assert(ymd.year() == std::chrono::year(2021));
        static_assert(ymd.month() == std::chrono::month(7));
        static_assert(ymd.day() == std::chrono::day(1));
    }
```