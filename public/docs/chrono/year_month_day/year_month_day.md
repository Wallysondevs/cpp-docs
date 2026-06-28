# std::chrono::year_month_day::year_month_day

```cpp
year_month_day() = default;  // (1) (desde C++20)
constexpr year_month_day( const std::chrono::year& y,
const std::chrono::month& m,
const std::chrono::day& d ) noexcept;  // (2) (desde C++20)
constexpr year_month_day( const std::chrono::year_month_day_last& ymdl ) noexcept;  // (3) (desde C++20)
constexpr year_month_day( const std::chrono::sys_days& dp ) noexcept;  // (4) (desde C++20)
constexpr explicit year_month_day( const std::chrono::local_days& dp ) noexcept;  // (5) (desde C++20)
```

  
Constrói um objeto `year_month_day`.

1) O construtor padrão deixa a data não inicializada.

2) Constrói um objeto `year_month_day` que armazena o ano y, o mês m e o dia d.

3) Constrói um objeto `year_month_day` que armazena o ano ymdl.year(), o mês ymdl.month() e o dia ymdl.day().

4) Constrói um objeto `year_month_day` que representa a mesma data que a representada por dp.

5) Constrói um objeto `year_month_day` que representa a mesma data que a representada por dp, como se fosse por year_month_day(sys_days(dp.time_since_epoch())).

Os construtores (3,4) definem conversões implícitas de std::chrono::year_month_day_last e std::chrono::sys_days, respectivamente.

Para qualquer objeto `year_month_day` `ymd` que represente uma data válida (ymd.ok() == true), converter `ymd` para sys_days e de volta resulta no mesmo valor.

### Observações

Um `year_month_day` também pode ser criado combinando um dos tipos de data parcial std::chrono::year_month e std::chrono::month_day com o componente ausente (dia e ano, respectivamente) usando operator/.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        using namespace std::chrono;
     
        constexpr auto ymd2 = std::chrono::year_month_day(
            2020y, std::chrono::January, 31d // overload (2)
        );
        std::cout << "ymd2: " << ymd2 << '\n';
     
        constexpr auto ymd3 = std::chrono::year_month_day(
            std::chrono::April / std::chrono::Monday[last] / 2023y // overload (3)
        );
        std::cout << "ymd3: " << ymd3 << '\n';
     
        const auto now = std::chrono::system_clock::now();
        const auto ymd4 = std::chrono::year_month_day(
            std::chrono::floor<std::chrono::days>(now) // overload (4)
        );
        std::cout << "ymd4: " << ymd4 << '\n';
    }
```

Saída possível:
```
    ymd2: 2020-01-31
    ymd3: 2023-04-24
    ymd4: 2023-08-30
```

### Veja também

[ operator/](<#/doc/chrono/operator_slash>)(C++20) | sintaxe convencional para criação de datas do calendário Gregoriano   
(function)  