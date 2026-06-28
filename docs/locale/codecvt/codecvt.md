# std::codecvt&lt;InternT,ExternT,StateT&gt;::codecvt

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
explicit codecvt( std::size_t refs = 0 );
```

  
Cria um facet [std::codecvt](<#/doc/locale/codecvt>) e encaminha a contagem de referência inicial `refs` para o construtor da classe base, [`locale::facet::facet()`](<#/>). 

### Parâmetros

refs  |  \-  |  contagem de referência inicial   