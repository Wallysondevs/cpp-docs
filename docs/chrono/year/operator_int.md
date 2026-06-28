# std::chrono::year::operator int

```cpp
constexpr explicit operator int() const noexcept;  // (desde C++20)
```

Retorna o valor do ano armazenado em *this.

### Valor de retorno

O valor do ano armazenado em *this.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    using namespace std::chrono;
    
    int main()
    {
        constexpr std::chrono::year y{2020};
        std::cout << "The year is: " << static_cast<int>(y) << '\n';
    
        const year_month_day ymd{floor<days>(system_clock::now())};
        const std::chrono::year this_year{ymd.year()};
        std::cout << "This year is: " << int(this_year) << '\n';
    }
```

Saída possível:
```
    The year is: 2020
    This year is: 2023
```