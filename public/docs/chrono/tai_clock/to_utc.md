# std::chrono::tai_clock::to_utc

```cpp
template< class Duration >
static std::chrono::utc_time<std::common_type_t<Duration, std::chrono::seconds>>
to_utc( const std::chrono::tai_time<Duration>& t ) noexcept;  // (desde C++20)
```

  
Converte o `tai_time` t para um `utc_time` representando o mesmo ponto no tempo.

### Valor de retorno

Um std::chrono::utc_time representando o mesmo ponto no tempo que t, calculado como se construindo um valor do tipo de retorno a partir de t.time_since_epoch() e subtraindo 378691210s (378691210 é o número de segundos entre as épocas dos dois clocks: 1958-01-01 00:00:00 TAI e 1970-01-01 00:00:00 UTC).

### Veja também

[ from_utc](<#/doc/chrono/tai_clock/from_utc>)[static] | converte `utc_time` para `tai_time`   
(função membro estática pública)  
[ clock_cast](<#/doc/chrono/clock_cast>)(C++20) | converte pontos no tempo de um clock para outro   
(modelo de função)