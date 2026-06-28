# std::chrono::operator&lt;&lt;(std::chrono::local_time)

```cpp
template< class CharT, class Traits, class Duration >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::local_time<Duration>& tp );  // (desde C++20)
```

  
Imprime `tp` no stream `os`, como se por `os << [std::chrono::sys_time](<#/doc/chrono/system_clock>)<Duration>(tp.time_since_epoch());`. 

### Valor de retorno

`os`

### Veja também

[ operator<<(std::chrono::sys_time)](<#/doc/chrono/system_clock/operator_ltlt>)(C++20) |  realiza a saída de stream em um `sys_time`   
(modelo de função)  