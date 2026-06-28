# std::chrono::operator==(std::chrono::year_month_weekday_last)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::year_month_weekday_last& x,
const std::chrono::year_month_weekday_last& y ) noexcept;
```

Compara os dois valores `year_month_weekday_last` x e y.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Valor de retorno

x.year() == y.year() && x.month() == y.month() && x.weekday() == y.weekday()

### Exemplo

Executar este código
```
    #include <chrono>
    #include <iostream>
    using namespace std::chrono;
    
    int main()
    {
        constexpr auto ymwdl1{Tuesday[last]/11/2021};
        auto ymwdl2 = Tuesday[last]/11/2020;
        ymwdl2 += months(12);
        std::cout << std::boolalpha << (ymwdl1 == ymwdl2) << '\n';
    }
```

Saída:
```
    true
```