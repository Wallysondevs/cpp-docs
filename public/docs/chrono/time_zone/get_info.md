# std::chrono::time_zone::get_info

```cpp
template< class Duration >
std::chrono::sys_info get_info( const std::chrono::sys_time<Duration>& tp ) const;  // (desde C++20)
template< class Duration >
std::chrono::local_info get_info( const std::chrono::local_time<Duration>& tp ) const;  // (desde C++20)
```

  
Obtém informações sobre este fuso horário no ponto no tempo tp. 

### Valor de retorno

1) Uma estrutura std::chrono::sys_info `i` contendo as informações do fuso horário em vigor para este fuso horário no ponto no tempo tp. tp estará no intervalo `[`i.begin`, `i.end`)`.

2) Uma estrutura std::chrono::local_info contendo informações sobre o tempo local tp neste fuso horário.