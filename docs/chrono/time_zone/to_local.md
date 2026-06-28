# std::chrono::time_zone::to_local

```cpp
template< class Duration >
auto to_local( const std::chrono::sys_time<Duration>& tp ) const
-> std::chrono::local_time<std::common_type_t<Duration, std::chrono::seconds>>;  // (desde C++20)
```

  
Converte o `sys_time` tp para o `local_time` correspondente neste fuso horário. 

### Valor de retorno

O `local_time` associado a tp e a este fuso horário. 

### Observações

A precisão do resultado é de pelo menos [std::chrono::seconds](<#/doc/chrono/duration>), e será mais fina se o argumento tiver precisão mais fina. 