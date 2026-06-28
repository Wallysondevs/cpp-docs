# std::chrono::utc_clock::to_sys

```cpp
template< class Duration >
static std::chrono::sys_time<std::common_type_t<Duration, std::chrono::seconds>>
to_sys( const std::chrono::utc_time<Duration>& t );  // (desde C++20)
```

  
Converte um `utc_time` t para um `sys_time` representando o mesmo ponto no tempo (se possível).

Se t representa um ponto no tempo durante uma inserção de segundo bissexto, o último valor representável de `sys_time` anterior à inserção do segundo bissexto é retornado. Em todos os outros casos, utc_clock::from_sys(utc_clock::to_sys(t)) == t.

### Valor de retorno

Um `sys_time` representando o mesmo ponto no tempo que t, ou o último valor representável anterior à inserção do segundo bissexto se t representa um ponto no tempo durante uma inserção de segundo bissexto.

### Veja também

[ from_sys](<#/doc/chrono/utc_clock/from_sys>)[static] | converte `sys_time` para `utc_time`   
(função membro estática pública)  
[ clock_cast](<#/doc/chrono/clock_cast>)(C++20) | converte pontos no tempo de um clock para outro   
(modelo de função)