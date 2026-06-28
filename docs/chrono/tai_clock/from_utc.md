# std::chrono::tai_clock::from_utc

```cpp
template< class Duration >
static std::chrono::tai_time<std::common_type_t<Duration, std::chrono::seconds>>
from_utc( const std::chrono::utc_time<Duration>& ) noexcept;  // (desde C++20)
```

  
Converte o `utc_time` t para um `tai_time` representando o mesmo ponto no tempo. 

### Valor de retorno

Um std::chrono::tai_time representando o mesmo ponto no tempo que t, calculado como se fosse construindo um valor do tipo de retorno a partir de t.time_since_epoch() e adicionando 378691210s (378691210 é o número de segundos entre as épocas dos dois relógios: 1958-01-01 00:00:00 TAI e 1970-01-01 00:00:00 UTC). 

### Veja também

[ to_utc](<#/doc/chrono/tai_clock/to_utc>)[static] | converte `tai_time` para `utc_time`   
(função membro estática pública)  
[ clock_cast](<#/doc/chrono/clock_cast>)(C++20) | converte pontos no tempo de um relógio para outro   
(modelo de função)