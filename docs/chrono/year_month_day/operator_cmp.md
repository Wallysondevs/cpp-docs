# std::chrono::operator==,&lt;=&gt;(std::chrono::year_month_day)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::year_month_day& x,
const std::chrono::year_month_day& y ) noexcept;
constexpr std::strong_ordering
operator<=>( const std::chrono::year_month_day& x,
const std::chrono::year_month_day& y ) noexcept;
```

Compara os dois valores `year_month_day` x e y. Esta é uma comparação lexicográfica: o [`year()`](<#/doc/chrono/year_month_day/accessors>) é comparado primeiro, depois o [`month()`](<#/doc/chrono/year_month_day/accessors>), e então o [`day()`](<#/doc/chrono/year_month_day/accessors>).

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [`sintetizados`](<#/doc/language/operators>) a partir de operator<=> e operator==, respectivamente.

### Valor de retorno

1) x.year() == y.year() && x.month() == y.month() && x.day() == y.day()

2) Se x.year() <=> y.year != 0, x.year() <=> y.year; caso contrário, se x.month() <=> y.month() != 0, x.month() <=> y.month(); caso contrário, x.day() <=> y.day().

### Notas

Se ambos x e y representam datas válidas (x.ok() && y.ok() == true), o resultado da comparação lexicográfica é consistente com a ordem do calendário.

### Exemplo

Execute este código
```cpp
    #include <chrono>
     
    int main()
    {
        constexpr auto ymd1{std::chrono::day(13)/7/1337};
        constexpr auto ymd2{std::chrono::year(1337)/7/13};
        static_assert(ymd1 == ymd2);
        static_assert(ymd1 <= ymd2);
        static_assert(ymd1 >= ymd2);
        static_assert(ymd1 <=> ymd2 == 0);
    }
```