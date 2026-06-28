# std::chrono::month_weekday::month_weekday

```cpp
constexpr month_weekday( const std::chrono::month& m,
const std::chrono::weekday_indexed& wdi ) noexcept;  // (desde C++20)
```

  
Constrói um objeto `month_weekday` que armazena o [`month`](<#/doc/chrono/month>) m e o [`weekday_indexed`](<#/doc/chrono/weekday_indexed>) wdi. 

### Observações

Uma maneira mais conveniente de construir um `month_weekday` é com operator/, por exemplo, [std::chrono::April](<#/doc/chrono/month>)/[std::chrono::Sunday](<#/doc/chrono/weekday>)[2]. 

### Veja também

[ operator/](<#/doc/chrono/operator_slash>)(C++20) | sintaxe convencional para criação de data do calendário Gregoriano   
(função)  