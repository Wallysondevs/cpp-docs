# std::chrono::month_day_last::month_day_last

```cpp
constexpr explicit month_day_last( const std::chrono::month& m ) noexcept;  // (desde C++20)
```

  
Constrói um objeto `month_day_last` que representa o último dia do mês m.

### Notes

Uma maneira mais conveniente de construir um `month_day_last` é com `operator/`, por exemplo, [std::chrono::April](<#/doc/chrono/month>)/[std::chrono::last](<#/doc/chrono/last_spec>).

### See also

[ operator/](<#/doc/chrono/operator_slash>)(C++20) | sintaxe convencional para criação de datas do calendário Gregoriano   
(function)  