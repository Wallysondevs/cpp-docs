# std::time_put&lt;CharT,OutputIt&gt;::time_put

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
explicit time_put( std::size_t refs = 0 );
```

Cria um facet [std::time_put](<#/doc/locale/time_put>) e encaminha a contagem de referência inicial `refs` para o construtor da classe base, [`locale::facet::facet()`](<#/>).

### Parâmetros

- **refs** — contagem de referência inicial