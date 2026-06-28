# std::chrono::gps_clock::to_utc

```cpp
template< class Duration >
static std::chrono::utc_time<std::common_type_t<Duration, std::chrono::seconds>>
to_utc( const std::chrono::gps_time<Duration>& t ) noexcept;  // (desde C++20)
```

  
Converte o `gps_time` t para um `utc_time` representando o mesmo ponto no tempo. 

### Valor de retorno

Um std::chrono::utc_time representando o mesmo ponto no tempo que `t`, calculado como se fosse construindo um valor do tipo de retorno a partir de t.time_since_epoch() e adicionando 315964809s (315964809 é o número de segundos entre as épocas dos dois clocks: 1980-01-06 00:00:00 UTC para `gps_clock` e 1970-01-01 00:00:00 UTC para `utc_clock`). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ from_utc](<#/doc/chrono/gps_clock/from_utc>)[static] | converte um `utc_time` para `gps_time`   
(função membro estática pública)  
[ clock_cast](<#/doc/chrono/clock_cast>)(C++20) | converte pontos no tempo de um clock para outro   
(modelo de função)