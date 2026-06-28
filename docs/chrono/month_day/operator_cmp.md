# std::chrono::operator==,&lt;=&gt;(std::chrono::month_day)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::month_day& x,
const std::chrono::month_day& y ) noexcept;
constexpr std::strong_ordering operator<=>( const std::chrono::month_day& x,
const std::chrono::month_day& y ) noexcept;
```

Compara dois valores `month_day`.

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator==, respectivamente.

### Valor de retorno

1) x.month() == y.month() && x.day() == y.day()

2) x.month() <=> y.month() != 0 ? x.month() <=> y.month() : x.day() <=> y.day()

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        constexpr auto md1{std::chrono::August/15};
        constexpr auto md2{std::chrono::month(8)/std::chrono::day(15)};
        std::cout << std::boolalpha << (md1 == md2) << '\n';
    
        static_assert(md1 <= md2);
    }
```

Saída:
```
    true
```