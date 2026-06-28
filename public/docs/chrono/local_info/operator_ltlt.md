# std::chrono::operator&lt;&lt; (std::chrono::local_info)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>& operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::local_info& r );
```

  
Insere uma representação textual de `r` em `os`. O formato exato não é especificado. 

### Valor de retorno

`os`