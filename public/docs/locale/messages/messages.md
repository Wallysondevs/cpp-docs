# std::messages&lt;CharT&gt;::messages

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
explicit messages( std::size_t refs = 0 );
```

Cria um facet `[std::messages](<#/doc/locale/messages>)` e encaminha a contagem de referência inicial `refs` para o construtor da classe base, [`locale::facet::facet()`](<#/>).

### Parâmetros

- **refs** — contagem de referência inicial