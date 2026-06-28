# std::ctype&lt;CharT&gt;::ctype

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
explicit ctype( std::size_t refs = 0 );
```

Cria um facet [std::ctype](<#/doc/locale/ctype>) e encaminha a contagem de referência inicial refs para o construtor da classe base, [`locale::facet::facet()`](<#/>).

### Parâmetros

- **refs** — contagem de referência inicial