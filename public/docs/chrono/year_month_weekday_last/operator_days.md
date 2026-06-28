# std::chrono::year_month_weekday_last::operator sys_days, std::chrono::year_month_weekday_last::operator local_days

```cpp
constexpr operator std::chrono::sys_days() const noexcept;  // (1) (desde C++20)
constexpr explicit operator std::chrono::local_days() const noexcept;  // (2) (desde C++20)
```

Converte *this para um [std::chrono::time_point](<#/doc/chrono/time_point>) representando a mesma data que este `year_month_weekday_last`.

1) Se [`ok()`](<#/doc/chrono/year_month_weekday_last/ok>) for true, retorna um `sys_days` que representa o último [`weekday()`](<#/doc/chrono/year_month_weekday_last/accessors>) do [`year()`](<#/doc/chrono/year_month_weekday_last/accessors>) e [`month()`](<#/doc/chrono/year_month_weekday_last/accessors>). Caso contrário, o valor retornado é não especificado.

2) O mesmo que (1), mas retorna `local_days` em vez de `sys_days`. Equivalente a local_days(sys_days(*this).time_since_epoch()).

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
    using namespace std::chrono;
    
    int main()
    {
        constexpr auto ymwdl{Tuesday[last]/11/2021};
        static_assert(static_cast<local_days>(ymwdl) ==
                      static_cast<local_days>(November/30/2021));
        // converte de baseado em campos para baseado em série para adicionar dias
        constexpr auto sd = static_cast<sys_days>(ymwdl);
        constexpr year_month_day ymd{sd + days(42)};
        std::cout << ymd << '\n';
    }
```

Saída:
```
    2022-01-11
```