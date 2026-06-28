# std::chrono::operator==(std::chrono::year_month_weekday)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::year_month_weekday& x,
const std::chrono::year_month_weekday& y ) noexcept;
```

Compara os dois valores `year_month_weekday` x e y.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Valor de retorno

x.year() == y.year() && x.month() == y.month() && x.weekday_indexed() == y.weekday_indexed()

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    using namespace std::chrono;
    
    int main()
    {
        constexpr auto ymwdi1{Wednesday[1]/January/2021};
        constexpr year_month_weekday ymwdi2{year(2021), month(1), weekday(3)[1]};
        std::cout << std::boolalpha << (ymwdi1 == ymwdi2) << '\n';
    }
```

Saída:
```
    true
```