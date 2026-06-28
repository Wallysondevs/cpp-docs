# std::chrono::weekday_last::weekday_last

```cpp
constexpr explicit weekday_last( const std::chrono::weekday& wd ) noexcept;  // (desde C++20)
```

  
Constrói um objeto `weekday_last` armazenando o dia da semana `wd`.

### Notes

Uma maneira mais conveniente de construir um `weekday_last` é com o `operator[]` de `weekday`, ou seja, `wd[[std::chrono::last](<#/doc/chrono/last_spec>)]`.

### Example

Run this code
```
    #include <chrono>
    #include <iostream>
    using namespace std::chrono;
     
    int main()
    {
        const year_month_day ymd{floor<days>(system_clock::now())};
        const weekday_last wdl{Sunday[last]}; // A last Sunday of a month
        const year_month_day last_sun{ymd.year() / ymd.month() / wdl};
     
        std::cout << "The last Sunday of current month falls on "
                  << (int)last_sun.year() << '/'
                  << (unsigned)last_sun.month() << '/'
                  << (unsigned)last_sun.day() << '\n';
    }
```

Saída possível: 
```
    The last Sunday of current month falls on 2021/9/26
```