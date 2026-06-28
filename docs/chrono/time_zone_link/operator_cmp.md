# std::chrono::operator==,&lt;=&gt;(std::chrono::time_zone_link)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
bool operator==( const std::chrono::time_zone_link& x,
const std::chrono::time_zone_link& y ) noexcept;
std::strong_ordering operator<=>( const std::chrono::time_zone_link& x,
const std::chrono::time_zone_link& y ) noexcept;
```

Compara os dois valores `time_zone_link` x e y pelo nome.

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de `operator<=>` e `operator==` respectivamente.

### Valor de retorno

1) x.name() == y.name()

2) x.name() <=> y.name()