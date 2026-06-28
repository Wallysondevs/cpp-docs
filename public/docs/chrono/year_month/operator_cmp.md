# std::chrono::operator==,&lt;=&gt;(std::chrono::year_month)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::year_month& x,
const std::chrono::year_month& y ) noexcept;
constexpr std::strong_ordering operator<=>( const std::chrono::year_month& x,
const std::chrono::year_month& y ) noexcept;
```

  
Compara os dois valores `year_month` x e y. 

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator==, respectivamente. 

### Valor de retorno

1) x.year() == y.year() && x.month() == y.month()

2) x.year() <=> y.year() != 0 ? x.year() <=> y.year() : x.month() <=> y.month()

### Exemplo

Execute este código
```cpp 
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        using namespace std::chrono;
    
        constexpr year_month ym1{year(2021), month(7)};
        constexpr year_month ym2{year(2021)/7};
        static_assert(ym1 == ym2);
        std::cout << ym1 << '\n';
    
        static_assert((2020y/1 < 2020y/2) && (2020y/2 == 2020y/2) && (2020y/3 <= 2021y/3) &&
                      (2023y/1 > 2020y/2) && (3020y/2 != 2020y/2) && (2020y/3 >= 2020y/3));
    }
```

Saída: 
```
    2021/Jul
```