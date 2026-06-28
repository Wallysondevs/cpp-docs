# std::chrono::operator==,&lt;=&gt;(std::chrono::year_month_day_last)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::year_month_day_last& x,
const std::chrono::year_month_day_last& y ) noexcept;
constexpr std::strong_ordering
operator<=>( const std::chrono::year_month_day_last& x,
const std::chrono::year_month_day_last& y ) noexcept;
```

  
Compara os dois valores `year_month_day_last` x e y. Esta é uma comparação lexicográfica: o [`year()`](<#/doc/chrono/year_month_day_last/accessors>) é comparado primeiro, depois o [`month()`](<#/doc/chrono/year_month_day_last/accessors>). 

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator==, respectivamente. 

### Valor de retorno

1) x.year() == y.year() && x.month() == y.month()

2) x.year() <=> y.year() != 0 ? x.year() <=> y.year() : x.month() <=> y.month()

### Observações

Se ambos x e y representarem datas válidas (x.ok() && y.ok() == true), o resultado da comparação lexicográfica é consistente com a ordem do calendário. 

### Exemplo

Execute este código
```
    #include <cassert>
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        auto ymdl1{11/std::chrono::last/2020};
        auto mdl{std::chrono::last/std::chrono::November};
        auto ymdl2{mdl/2020};
        assert(ymdl1 == ymdl2);
     
        ymdl1 -= std::chrono::months{2};
        ymdl2 -= std::chrono::months{1};
        assert(ymdl1 < ymdl2);
    }
```