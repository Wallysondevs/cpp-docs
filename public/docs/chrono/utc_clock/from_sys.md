# std::chrono::utc_clock::from_sys

```cpp
template< class Duration >
static std::chrono::utc_time<std::common_type_t<Duration, std::chrono::seconds>>
from_sys( const std::chrono::sys_time<Duration>& t );  // (desde C++20)
```

  
Converte um `sys_time` t para um `utc_time` `u` que representa o mesmo ponto no tempo.

u.time_since_epoch() - t.time_since_epoch() é igual ao número de segundos bissextos que foram inseridos entre t e 1 de janeiro de 1970. Se t for a data exata de uma inserção de segundo bissexto, esse segundo bissexto é contado como inserido.

### Valor de retorno

Um `utc_time` representando o mesmo ponto no tempo que t.

### Veja também

[ to_sys](<#/doc/chrono/utc_clock/to_sys>)[static] | converte `utc_time` para `sys_time`   
(função membro estática pública)  
[ clock_cast](<#/doc/chrono/clock_cast>)(C++20) | converte pontos no tempo de um clock para outro   
(modelo de função)