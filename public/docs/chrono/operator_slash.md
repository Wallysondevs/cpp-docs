# std::chrono::operator/(calendário)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
`year_month`
constexpr auto operator/( const std::chrono::year& y,
const std::chrono::month& m ) noexcept
-> std::chrono::year_month;
constexpr auto operator/( const std::chrono::year& y, int m ) noexcept
-> std::chrono::year_month;
`month_day`
constexpr auto operator/( const std::chrono::month& m,
const std::chrono::day& d ) noexcept
-> std::chrono::month_day;
constexpr auto operator/( const std::chrono::month& m, int d ) noexcept
-> std::chrono::month_day;
constexpr auto operator/( int m, const std::chrono::day& d ) noexcept
-> std::chrono::month_day;
constexpr auto operator/( const std::chrono::day& d,
const std::chrono::month& m ) noexcept
-> std::chrono::month_day;
constexpr auto operator/( const std::chrono::day& d, int m ) noexcept
-> std::chrono::month_day;
`month_day_last`
constexpr auto operator/( const std::chrono::month& m,
std::chrono::last_spec ) noexcept
-> std::chrono::month_day_last;
constexpr auto operator/( int m, std::chrono::last_spec ) noexcept
-> std::chrono::month_day_last;
constexpr auto operator/( std::chrono::last_spec,
const std::chrono::month& m ) noexcept
-> std::chrono::month_day_last;
constexpr auto operator/( std::chrono::last_spec, int m ) noexcept
-> std::chrono::month_day_last;
`month_weekday`
constexpr auto operator/( const std::chrono::month& m,
const std::chrono::weekday_indexed& wdi ) noexcept
-> std::chrono::month_weekday;
constexpr auto operator/( int m, const std::chrono::weekday_indexed& wdi ) noexcept
-> std::chrono::month_weekday;
constexpr auto operator/( const std::chrono::weekday_indexed& wdi,
const std::chrono::month& m ) noexcept
-> std::chrono::month_weekday;
constexpr auto operator/( const std::chrono::weekday_indexed& wdi, int m ) noexcept
-> std::chrono::month_weekday;
`month_weekday_last`
constexpr auto operator/( const std::chrono::month& m,
const std::chrono::weekday_last& wdl ) noexcept
-> std::chrono::month_weekday_last;
constexpr auto operator/( int m, const std::chrono::weekday_last& wdl ) noexcept
-> std::chrono::month_weekday_last;
constexpr auto operator/( const std::chrono::weekday_last& wdl,
const std::chrono::month& m ) noexcept
-> std::chrono::month_weekday_last;
constexpr auto operator/( const std::chrono::weekday_last& wdl, int m ) noexcept
-> std::chrono::month_weekday_last;
`year_month_day`
constexpr auto operator/( const std::chrono::year_month& ym,
const std::chrono::day& d ) noexcept
-> std::chrono::year_month_day;
constexpr auto operator/( const std::chrono::year_month& ym, int d ) noexcept
-> std::chrono::year_month_day;
constexpr auto operator/( const std::chrono::year& y,
const std::chrono::month_day& md ) noexcept
-> std::chrono::year_month_day;
constexpr auto operator/( int y, const std::chrono::month_day& md ) noexcept
-> std::chrono::year_month_day;
constexpr auto operator/( const std::chrono::month_day& md,
const std::chrono::year& y ) noexcept
-> std::chrono::year_month_day;
constexpr auto operator/( const std::chrono::month_day& md, int y ) noexcept
-> std::chrono::year_month_day;
`year_month_day_last`
constexpr auto operator/( const std::chrono::year_month& ym,
std::chrono::last_spec ) noexcept
-> std::chrono::year_month_day_last;
constexpr auto operator/( const std::chrono::year& y,
const std::chrono::month_day_last& mdl ) noexcept
-> std::chrono::year_month_day_last;
constexpr auto operator/( int y, const std::chrono::month_day_last& mdl ) noexcept
-> std::chrono::year_month_day_last;
constexpr auto operator/( const std::chrono::month_day_last& mdl,
const std::chrono::year& y ) noexcept
-> std::chrono::year_month_day_last;
constexpr auto operator/( const std::chrono::month_day_last& mdl, int y ) noexcept
-> std::chrono::year_month_day_last;
`year_month_weekday`
constexpr auto operator/( const std::chrono::year_month& ym,
const std::chrono::weekday_indexed& wdi ) noexcept
-> std::chrono::year_month_weekday;
constexpr auto operator/( const std::chrono::year& y,
const std::chrono::month_weekday& mwd ) noexcept
-> std::chrono::year_month_weekday;
constexpr auto operator/( int y, const std::chrono::month_weekday& mwd ) noexcept
-> std::chrono::year_month_weekday;
constexpr auto operator/( const std::chrono::month_weekday& mwd,
const std::chrono::year& y ) noexcept
-> std::chrono::year_month_weekday;
constexpr auto operator/( const std::chrono::month_weekday& mwd, int y ) noexcept
-> std::chrono::year_month_weekday;
`year_month_weekday_last`
constexpr auto operator/( const std::chrono::year_month& ym,
const std::chrono::weekday_last& wdl ) noexcept
-> std::chrono::year_month_weekday_last;
constexpr auto operator/( const std::chrono::year& y,
const std::chrono::month_weekday_last& mwdl ) noexcept
-> std::chrono::year_month_weekday_last;
constexpr auto operator/( int y, const std::chrono::month_weekday_last& mwdl ) noexcept
-> std::chrono::year_month_weekday_last;
constexpr auto operator/( const std::chrono::month_weekday_last& mwdl,
const std::chrono::year& y ) noexcept
-> std::chrono::year_month_weekday_last;
constexpr auto operator/( const std::chrono::month_weekday_last& mwdl, int y ) noexcept
-> std::chrono::year_month_weekday_last;
```

Essas sobrecargas do operator/ fornecem uma sintaxe convencional para a criação de datas do [calendário Gregoriano Proléptico](<https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar> "enwiki:Proleptic Gregorian calendar").

Para a criação de uma data completa, qualquer uma das três ordens a seguir é aceita:

* `_year/month/day_`,
* `_month/day/year_`,
* `_day/month/year_`.

Em cada caso, `_day_` pode ser substituído por um de:

* std::chrono::last, para o último dia do mês;
* `_weekday_[_i_]`, para o _i_-ésimo _weekday_ do mês;
* `_weekday_[std::chrono::last]`, para o último _weekday_ do mês.

Um inteiro simples é aceito se seu significado for inequívoco a partir dos tipos dos outros operandos: 2005y/4/5 é permitido, mas 5/April/2005 não é.

Tipos de data parcial ([`year_month`](<#/doc/chrono/year_month>), [`month_day`](<#/doc/chrono/month_day>), etc.) podem ser criados não aplicando o segundo operator/ em nenhuma das três ordens.

### Valor de retorno

1) [std::chrono::year_month](<#/doc/chrono/year_month>)(y, m)

2) [std::chrono::year_month](<#/doc/chrono/year_month>)(y, [std::chrono::month](<#/doc/chrono/month>)(m))

3,6) [std::chrono::month_day](<#/doc/chrono/month_day>)(m, d)

4) [std::chrono::month_day](<#/doc/chrono/month_day>)(m, [std::chrono::day](<#/doc/chrono/day>)(d))

5,7) [std::chrono::month_day](<#/doc/chrono/month_day>)([std::chrono::month](<#/doc/chrono/month>)(m), d)

8,10) [std::chrono::month_day_last](<#/doc/chrono/month_day_last>)(m)

9,11) [std::chrono::month_day_last](<#/doc/chrono/month_day_last>)([std::chrono::month](<#/doc/chrono/month>)(m))

12,14) [std::chrono::month_weekday](<#/doc/chrono/month_weekday>)(m, wdi)

13,15) [std::chrono::month_weekday](<#/doc/chrono/month_weekday>)([std::chrono::month](<#/doc/chrono/month>)(m), wdi)

16,18) [std::chrono::month_weekday_last](<#/doc/chrono/month_weekday_last>)(m, wdl)

17,19) [std::chrono::month_weekday_last](<#/doc/chrono/month_weekday_last>)([std::chrono::month](<#/doc/chrono/month>)(m), wdl)

20) [std::chrono::year_month_day](<#/doc/chrono/year_month_day>)(ym.year(), ym.month(), d)

21) [std::chrono::year_month_day](<#/doc/chrono/year_month_day>)(ym.year(), ym.month(), [std::chrono::day](<#/doc/chrono/day>)(d))

22,24) [std::chrono::year_month_day](<#/doc/chrono/year_month_day>)(y, md.month(), md.day())

23,25) [std::chrono::year_month_day](<#/doc/chrono/year_month_day>)([std::chrono::year](<#/doc/chrono/year>)(y), md.month(), md.day())

26) [std::chrono::year_month_day_last](<#/doc/chrono/year_month_day_last>)(ym.year(), [std::chrono::month_day_last](<#/doc/chrono/month_day_last>)(ym.month()))

27,29) [std::chrono::year_month_day_last](<#/doc/chrono/year_month_day_last>)(y, mdl)

28,30) [std::chrono::year_month_day_last](<#/doc/chrono/year_month_day_last>)([std::chrono::year](<#/doc/chrono/year>)(y), mdl)

31) [std::chrono::year_month_weekday](<#/doc/chrono/year_month_weekday>)(ym.year(), ym.month(), wdi)

32,34) [std::chrono::year_month_weekday](<#/doc/chrono/year_month_weekday>)(y, mwd.month(), mwd.weekday_indexed())

33,35) [std::chrono::year_month_weekday](<#/doc/chrono/year_month_weekday>)([std::chrono::year](<#/doc/chrono/year>)(y), mwd.month(), mwd.weekday_indexed())

36) [std::chrono::year_month_weekday_last](<#/doc/chrono/year_month_weekday_last>)(ym.year(), ym.month(), wdl)

37,39) [std::chrono::year_month_weekday_last](<#/doc/chrono/year_month_weekday_last>)(y, mwdl.month(), mwdl.weekday_last())

38,40) [std::chrono::year_month_weekday_last](<#/doc/chrono/year_month_weekday_last>)([std::chrono::year](<#/doc/chrono/year>)(y), mwdl.month(), mwdl.weekday_last())

### Exemplo

Execute este código
```cpp
    #include <chrono>
    using namespace std::chrono;
    
    constexpr auto ym{2021y/8};
    static_assert(ym == year_month(year(2021), August));
    
    constexpr auto md{9/15d};
    static_assert(md == month_day(September, day(15)));
    
    constexpr auto mdl{October/last};
    static_assert(mdl == month_day_last(month(10)));
    
    constexpr auto mw{11/Monday[3]};
    static_assert(mw == month_weekday(November, Monday[3]));
    
    constexpr auto mwdl{December/Sunday[last]};
    static_assert(mwdl == month_weekday_last(month(12), weekday_last(Sunday)));
    
    // Those 3 year/month/day orders that people actually use on this planet and beyond:
    constexpr auto ymd{year(2021)/January/day(23)};
    static_assert(ymd == month{1}/23/2021);
    static_assert(ymd == day{23}/1/2021);
    static_assert(ymd == year_month_day(2021y, month(January), 23d));
    
    int main() {}
```