# std::chrono::year_month_day::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

Verifica se este objeto `year_month_day` representa uma data de calendário válida.

### Valor de retorno

true se este objeto `year_month_day` representa uma data de calendário válida, ou seja, os valores de ano, mês e dia armazenados são todos válidos e o valor do dia armazenado está dentro do número de dias do ano e mês fornecidos. Caso contrário, false.

### Possível implementação

```cpp
    constexpr bool std::chrono::year_month_day::ok() const noexcept
    {
        return year().ok() && month().ok() && day().ok() &&
            day() <= (year()/month()/std::chrono::last).day();
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <chrono>
    
    int main()
    {
        constexpr auto ymd1 {std::chrono::day(1)/std::chrono::July/2020};
        static_assert(ymd1.ok());
    
        constexpr auto ymd2 {std::chrono::year(2020)/7/42};
        static_assert(not ymd2.ok());
    
        constexpr auto ymd3 {std::chrono::February/29/2020}; // ok, ano bissexto
        static_assert(ymd3.ok());
    
        constexpr auto ymd4 = ymd3 + std::chrono::years{1}; // ruim, não é um ano bissexto
        static_assert(ymd4 == std::chrono::February/29/2021 and not ymd4.ok());
    
        // para corrigir a data inválida, podemos querer ajustar para o último dia do mês:
        if constexpr (!ymd4.ok())
        {
            constexpr auto ymd = ymd4.year()/ymd4.month()/std::chrono::last;
            static_assert(ymd == std::chrono::February/28/2021 and ymd.ok());
        }
    
        // ou podemos querer transbordar para o próximo mês:
        if constexpr (!ymd4.ok())
        {
            constexpr auto st = std::chrono::sys_time<std::chrono::days>{ymd4};
            constexpr auto ymd = std::chrono::year_month_day{st};
            static_assert(ymd == std::chrono::March/1/2021 and ymd.ok());
        }
    }
```