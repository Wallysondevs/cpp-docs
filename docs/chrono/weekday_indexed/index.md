# std::chrono::weekday_indexed::index

```cpp
constexpr unsigned index() const noexcept;  // (desde C++20)
```

  
Acessa o índice armazenado em *this. 

### Valor de retorno

O índice armazenado em *this. 

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        std::cout << std::boolalpha;
    
        std::chrono::weekday_indexed wdi {std::chrono::Tuesday[2]}; // 2nd Tuesday of a month
        std::cout << (std::chrono::year_month_day{wdi/10/2019} == 
                      std::chrono::year_month_day{std::chrono::October/8/2019}) << ' ';
    
        wdi = {wdi.weekday()[wdi.index() + 2]}; // 2nd Tuesday => 4th Tuesday
        std::cout << (std::chrono::year_month_day{wdi/10/2019} == 
                      std::chrono::year_month_day{std::chrono::October/22/2019}) << '\n';
    }
```

Saída: 
```
    true true
```