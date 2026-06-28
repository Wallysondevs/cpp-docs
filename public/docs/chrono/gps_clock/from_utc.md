# std::chrono::gps_clock::from_utc

```cpp
template< class Duration >
static std::chrono::gps_time<std::common_type_t<Duration, std::chrono::seconds>>
from_utc( const std::chrono::utc_time<Duration>& ) noexcept;  // (desde C++20)
```

  
Converte o `utc_time` t para um `gps_time` representando o mesmo ponto no tempo. 

### Valor de retorno

Um std::chrono::gps_time representando o mesmo ponto no tempo que t, calculado como se fosse construindo um valor do tipo de retorno a partir de t.time_since_epoch() e subtraindo 315964809s (315964809 é o número de segundos entre as épocas dos dois clocks: 1980-01-06 00:00:00 UTC para `gps_clock` e 1970-01-01 00:00:00 UTC para `utc_clock`). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ to_utc](<#/doc/chrono/gps_clock/to_utc>)[static] |  converte um `gps_time` para `utc_time`   
(função membro estática pública)  
[ clock_cast](<#/doc/chrono/clock_cast>)(C++20) |  converte pontos no tempo de um clock para outro   
(modelo de função)