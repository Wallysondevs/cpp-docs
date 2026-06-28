# operator&lt;&lt;(std::experimental::basic_string_view)

Definido no cabeçalho `[<experimental/string_view>](<#/doc/header/experimental/string_view>)`

```c
template <class CharT, class Traits>
std::basic_ostream<CharT, Traits>&
operator<<(std::basic_ostream<CharT, Traits>& os,
std::basic_string_view <CharT, Traits> v);
```

Equivalente a os << v.to_string().

### Parâmetros

- **os** — um fluxo de saída de caracteres
- **v** — a view a ser inserida

### Valor de retorno

`os`