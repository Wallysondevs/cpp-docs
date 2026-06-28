# std::collate&lt;CharT&gt;::collate

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
explicit collate( std::size_t refs = 0 );
```

Cria um facet `[std::collate](<#/doc/locale/collate>)` e encaminha a contagem de referência inicial `refs` para o construtor da classe base, [`locale::facet::facet()`](<#/>).

### Parâmetros

- **refs** — contagem de referência inicial