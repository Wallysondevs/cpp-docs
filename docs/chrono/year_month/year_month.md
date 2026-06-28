# std::chrono::year_month::year_month

```cpp
year_month() = default;  // (1) (desde C++20)
constexpr year_month( const std::chrono::year& y,
const std::chrono::month& m ) noexcept;  // (2) (desde C++20)
```

Constrói um objeto `year_month`.

1) O construtor padrão deixa o ano e o mês não inicializados.

2) Constrói um objeto `year_month` armazenando o ano y e o mês m.

### Observações

Uma maneira mais conveniente de construir um `year_month` é com o operator/, por exemplo, 2007y/[std::chrono::April](<#/doc/chrono/month>).

### Veja também

[ operator/](<#/doc/chrono/operator_slash>)(C++20) | sintaxe convencional para criação de datas do calendário Gregoriano
(função)