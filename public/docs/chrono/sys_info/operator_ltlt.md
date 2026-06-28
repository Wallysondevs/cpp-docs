# std::chrono::operator<< (std::chrono::sys_info)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>& operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::sys_info& r );
```

Insere uma representação textual de r em os. O formato exato não é especificado.

### Valor de retorno

os