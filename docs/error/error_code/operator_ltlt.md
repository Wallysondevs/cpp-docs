# std::operator<<(std::error_code)

Definido no cabeçalho `[<system_error>](<#/doc/header/system_error>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( basic_ostream<CharT, Traits>& os, const error_code& ec );
```

Realiza uma operação de saída de stream no código de erro ec.

Equivalente a os << ec.category().name() << ':' << ec.value().

### Parâmetros

- **os** — stream de saída para inserir dados
- **ec** — código de erro

### Valor de retorno

`os`