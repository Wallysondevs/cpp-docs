# std::chrono::weekday_last::weekday

```cpp
constexpr std::chrono::weekday weekday() const noexcept;  // (desde C++20)
```

Recupera uma cópia do objeto `std::chrono::weekday` armazenado em `*this`.

### Valor de retorno

Uma cópia do objeto `std::chrono::weekday` armazenado em `*this`.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
    using namespace std::chrono;
    
    int main()
    {
        std::cout << std::boolalpha;
    
        auto wdl{Tuesday[last]}; // Last Tuesday of a month
        std::cout << (year_month_day{wdl/10/2019} ==
                      year_month_day{October/29/2019}) << ' ';
    
        wdl = {(wdl.weekday() + days(2))[last]}; // Last Tuesday is now last Thursday
        std::cout << (year_month_day{wdl/10/2019} ==
                      year_month_day{October/31/2019}) << '\n';
    }
```

Saída:
```
    true true
```