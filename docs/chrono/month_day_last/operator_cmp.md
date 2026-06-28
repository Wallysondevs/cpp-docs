# std::chrono::operator==,&lt;=&gt;(std::chrono::month_day_last)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::month_day_last& x,
const std::chrono::month_day_last& y ) noexcept;
constexpr std::strong_ordering operator<=>( const std::chrono::month_day_last& x,
const std::chrono::month_day_last& y ) noexcept;
```

Compara os dois valores `month_day_last` x e y.

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator==, respectivamente.

### Valor de retorno

1) x.month() == y.month()

2) x.month() <=> y.month()

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        constexpr auto mdl1{std::chrono::February/std::chrono::last};
        constexpr std::chrono::month_day_last mdl2{std::chrono::month(2)};
        std::cout << std::boolalpha << (mdl1 == mdl2) << '\n';
     
        static_assert(mdl1 <= mdl2);
    }
```

Saída:
```
    true
```