# std::chrono::weekday_indexed::weekday

```cpp
constexpr std::chrono::weekday weekday() const noexcept;  // (desde C++20)
```

  
Recupera uma cópia do objeto `std::chrono::weekday` armazenado em `*this`.

### Valor de retorno

Uma cópia do objeto `std::chrono::weekday` armazenado em `*this`.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha;
     
        // 2nd Tuesday of a month
        std::chrono::weekday_indexed wdi{std::chrono::Tuesday[2]};
        std::cout << (std::chrono::year_month_day{wdi/10/2019} == 
                      std::chrono::year_month_day{std::chrono::October/8/2019}) << ' ';
     
        // 2nd Tuesday => 2nd Thursday
        wdi = {wdi.weekday() + std::chrono::days(2), wdi.index()};
        std::cout << (std::chrono::year_month_day{wdi/10/2019} == 
                      std::chrono::year_month_day{std::chrono::October/10/2019}) << '\n';
    }
```

Saída: 
```
    true true
```

### Veja também

[ index](<#/doc/chrono/weekday_indexed/index>) |  acessa o índice armazenado   
(função membro pública)  