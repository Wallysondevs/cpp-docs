# std::chrono::year_month_day_last::year_month_day_last

```cpp
constexpr year_month_day_last( const std::chrono::year& y,  
const std::chrono::month_day_last& mdl ) noexcept;
```
| | | (desde C++20)

Constrói um objeto `year_month_day_last` que armazena o ano `y` e o mês `mdl.month()`. O objeto construído representa o último dia daquele ano e mês.

### Observações

Um `year_month_day_last` também pode ser criado combinando um `std::chrono::year_month` com `std::chrono::last` usando `operator/`.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::cout << "All last days of months of a given year:\n";
     
        constexpr std::chrono::year year{2021};
     
        for (int i{1}; i <= 12; ++i)
        {
            const std::chrono::month_day_last mdl{std::chrono::month(i) / std::chrono::last};
            const std::chrono::year_month_day_last ymdl{year, mdl};
            std::cout << ymdl << " day: " << ymdl.day() << '\n';
        }
    }
```

Saída possível:
```
    All last days of months of a given year: 
    2021/Jan/last day: 31
    2021/Feb/last day: 28
    2021/Mar/last day: 31
    2021/Apr/last day: 30
    2021/May/last day: 31
    2021/Jun/last day: 30
    2021/Jul/last day: 31
    2021/Aug/last day: 31
    2021/Sep/last day: 30
    2021/Oct/last day: 31
    2021/Nov/last day: 30
    2021/Dec/last day: 31
```

### Veja também

[ operator/](<#/doc/chrono/operator_slash>)(C++20) | sintaxe convencional para criação de datas do calendário Gregoriano
(function)