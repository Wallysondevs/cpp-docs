# std::chrono::year_month_weekday_last::year_month_weekday_last

```cpp
constexpr
year_month_weekday_last( const std::chrono::year& y, const std::chrono::month& m,
const std::chrono::weekday_last& wdl ) noexcept;
```
| | | (desde C++20)

Constrói um objeto `year_month_weekday_last` armazenando o ano y, o mês m, e o dia da semana wdl.weekday(). O objeto construído representa o último dia da semana daquele ano e mês.

### Notas

Um `year_month_weekday_last` também pode ser criado combinando um dos tipos de data parcial `std::chrono::year_month` e `std::chrono::month_weekday_last` com o componente ausente (`weekday_last` e `year`, respectivamente) usando `operator/`.

### Veja também

[ operator/](<#/doc/chrono/operator_slash>)(C++20) | sintaxe convencional para criação de datas do calendário Gregoriano
(função)