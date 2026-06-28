# Cabeçalho da biblioteca padrão &lt;clocale&gt;

Este cabeçalho estava originalmente na biblioteca padrão C como [`<locale.h>`](<#/>).

Este cabeçalho faz parte da biblioteca de [processamento de texto](<#/doc/text>).

### Tipos

[ lconv](<#/doc/locale/lconv>) | detalhes de formatação, retornado por [std::localeconv](<#/doc/locale/localeconv>)
(classe)

### Constantes

[ NULL](<#/doc/types/NULL>) | constante de ponteiro nulo definida pela implementação
(constante de macro)
[ LC_ALLLC_COLLATELC_CTYPELC_MONETARYLC_NUMERICLC_TIME](<#/doc/locale/LC_categories>) | categorias de locale para [std::setlocale](<#/doc/locale/setlocale>)
(constante de macro)

### Funções

[ setlocale](<#/doc/locale/setlocale>) | obtém e define o locale C atual
(função)
[ localeconv](<#/doc/locale/localeconv>) | consulta detalhes de formatação numérica e monetária do locale atual
(função)

### Sinopse
```cpp
    namespace std {
      struct lconv;
    
      char* setlocale(int category, const char* locale);
      lconv* localeconv();
    }
    
    #define NULL        /* see description */
    #define LC_ALL      /* see description */
    #define LC_COLLATE  /* see description */
    #define LC_CTYPE    /* see description */
    #define LC_MONETARY /* see description */
    #define LC_NUMERIC  /* see description */
    #define LC_TIME     /* see description */
```

### Notas

* [NULL](<#/doc/types/NULL>) também é definido nos seguintes cabeçalhos:
    * [`<cstring>`](<#/doc/header/cstring>)
    * [`<ctime>`](<#/doc/header/ctime>)
    * [`<cstddef>`](<#/doc/header/cstddef>)
    * [`<cstdio>`](<#/doc/header/cstdio>)
    * [`<cwchar>`](<#/doc/header/cwchar>)
