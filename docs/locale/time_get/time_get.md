# std::time_get&lt;CharT,InputIt&gt;::time_get

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
explicit time_get( std::size_t refs = 0 );
```

  
Cria um facet `[std::time_get](<#/doc/locale/time_get>)` e encaminha a contagem de referência inicial `refs` para o construtor da classe base, [`locale::facet::facet()`](<#/>). 

### Parâmetros

refs  |  \-  |  contagem de referência inicial   