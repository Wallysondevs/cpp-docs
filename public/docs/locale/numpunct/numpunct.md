# std::numpunct&lt;CharT&gt;::numpunct

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
explicit numpunct( std::size_t refs = 0 );
```

Cria um `facet` [std::numpunct](<#/doc/locale/numpunct>) e encaminha a contagem de referência inicial `refs` para o construtor da classe base, [`locale::facet::facet()`](<#/>).

### Parâmetros

- **refs** — contagem de referência inicial