# std::chrono::year_month_weekday::year_month_weekday

```cpp
year_month_weekday() = default;  // (1) (desde C++20)
constexpr year_month_weekday( const std::chrono::year& y,
const std::chrono::month& m,
const std::chrono::weekday_indexed& wdi ) noexcept;  // (2) (desde C++20)
constexpr year_month_weekday( const std::chrono::sys_days& dp ) noexcept;  // (3) (desde C++20)
constexpr explicit year_month_weekday( const std::chrono::local_days& dp ) noexcept;  // (4) (desde C++20)
```

  
Constrói um objeto `year_month_weekday`.

1) O construtor padrão deixa os campos não inicializados.

2) Constrói um objeto `year_month_weekday` armazenando o ano y, o mês m, o dia da semana wdi.weekday() e o índice do dia da semana wdi.index().

3) Constrói um objeto `year_month_weekday` correspondente à data representada por dp. Para qualquer objeto `year_month_weekday` que armazene uma data válida, convertê-lo para `sys_days` e de volta resulta no mesmo valor. Este construtor define uma conversão implícita de `sys_days` para `year_month_weekday`.

4) Constrói um objeto `year_month_weekday` correspondente à data representada por dp. Equivalente a year_month_weekday(sys_days(dp.time_since_epoch())).

### Notas

Um `year_month_weekday` também pode ser criado combinando um dos tipos de data parcial std::chrono::year_month e std::chrono::month_weekday com o componente ausente (dia da semana indexado e ano, respectivamente) usando `operator/`.

### Veja também

[ operator/](<#/doc/chrono/operator_slash>)(C++20) | sintaxe convencional para criação de data do calendário Gregoriano   
(função)  