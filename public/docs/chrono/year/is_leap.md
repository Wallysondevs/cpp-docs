# std::chrono::year::is_leap

```cpp
constexpr bool is_leap() const noexcept;  // (desde C++20)
```

Determina se *this representa um ano bissexto no [calendário gregoriano proléptico](<https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar> "enwiki:Proleptic Gregorian calendar").

*this representa um ano bissexto se o valor do ano armazenado
* é divisível por 4 e não divisível por 100; ou
* é divisível por 400.

### Valor de retorno

true se *this representa um ano bissexto, caso contrário false.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        using namespace std::chrono_literals;
        for (const std::chrono::year y : {2020y, 2021y, 2000y, 3000y})
        {
            if (const int iy{static_cast<int>(y)}; y.is_leap())
                std::cout << iy << " is a leap year because it is divisible by "
                          << (iy % 400 == 0 ? "400\n" : "4 and not divisible by 100\n");
            else
                std::cout << iy << " is not a leap year\n";
        }
    }
```

Saída:
```
    2020 is a leap year because it is divisible by 4 and not divisible by 100
    2021 is not a leap year
    2000 is a leap year because it is divisible by 400
    3000 is not a leap year
```