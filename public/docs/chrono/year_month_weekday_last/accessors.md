# std::chrono::year_month_weekday_last::year, std::chrono::year_month_weekday_last::month, std::chrono::year_month_weekday_last::weekday, std::chrono::year_month_weekday_last::weekday_last

```cpp
constexpr std::chrono::year year() const noexcept;  // (1) (desde C++20)
constexpr std::chrono::month month() const noexcept;  // (2) (desde C++20)
constexpr std::chrono::weekday weekday() const noexcept;  // (3) (desde C++20)
constexpr std::chrono::weekday_last weekday_last() const noexcept;  // (4) (desde C++20)
```

Recupera os valores dos campos armazenados neste objeto `year_month_weekday_last`.

### Valor de retorno

1) Retorna o valor `std::chrono::year` armazenado.

2) Retorna o valor `std::chrono::month` armazenado.

3) Retorna o valor `std::chrono::weekday` armazenado.

4) [std::chrono::weekday_last](<#/doc/chrono/weekday_last>)(weekday())

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    using namespace std::chrono;
    
    int main()
    {
        auto ymwdl{Tuesday[last]/November/2022};
        auto wdl = ymwdl.weekday_last();
        wdl = (wdl.weekday() + days(1))[last];
        ymwdl = {ymwdl.year() + years(1), ymwdl.month() - months(2), wdl};
        std::cout << year_month_day(ymwdl) << '\n';
    }
```

Saída:
```
    2023-09-27
```