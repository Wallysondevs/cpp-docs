# std::chrono::month_weekday_last::month_weekday_last

```cpp
constexpr month_weekday_last( const std::chrono::month& m,
const std::chrono::weekday_last& wdl ) noexcept;  // (desde C++20)
```

  
Constrói um objeto `month_weekday_last` que armazena o [`month`](<#/doc/chrono/month>) m e o [`weekday_last`](<#/doc/chrono/weekday_last>) wdl. 

### Notas

Uma maneira mais conveniente de construir um `month_weekday_last` é com o operator/, por exemplo, [std::chrono::April](<#/doc/chrono/month>)/[std::chrono::Sunday](<#/doc/chrono/weekday>)[[std::chrono::last](<#/doc/chrono/last_spec>)]. 

### Veja também

[ operator/](<#/doc/chrono/operator_slash>)(C++20) | sintaxe convencional para criação de datas do calendário Gregoriano   
(função)  