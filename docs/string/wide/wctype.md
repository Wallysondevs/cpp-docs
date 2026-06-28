# std::wctype

Definido no cabeçalho `[<cwctype>](<#/doc/header/cwctype>)`

```c
std::wctype_t wctype( const char* str );
```

Constrói um valor do tipo [std::wctype_t](<#/doc/string/wide>) que descreve uma categoria [LC_CTYPE](<#/doc/locale/LC_categories>) de classificação de caracteres largos. Pode ser uma das categorias de classificação padrão, ou uma categoria específica da locale, como `"jkanji"`.

### Parâmetros

- **str** — C string contendo o nome da categoria desejada

Os seguintes valores de str são suportados em todas as locales C:

valor de `str` | efeito
---|---
`"alnum"` | identifica a categoria usada por [std::iswalnum](<#/doc/string/wide/iswalnum>)
`"alpha"` | identifica a categoria usada por [std::iswalpha](<#/doc/string/wide/iswalpha>)
`"blank"` | identifica a categoria usada por [std::iswblank](<#/doc/string/wide/iswblank>) (desde C++11)
`"cntrl"` | identifica a categoria usada por [std::iswcntrl](<#/doc/string/wide/iswcntrl>)
`"digit"` | identifica a categoria usada por [std::iswdigit](<#/doc/string/wide/iswdigit>)
`"graph"` | identifica a categoria usada por [std::iswgraph](<#/doc/string/wide/iswgraph>)
`"lower"` | identifica a categoria usada por [std::iswlower](<#/doc/string/wide/iswlower>)
`"print"` | identifica a categoria usada por [std::iswprint](<#/doc/string/wide/iswprint>)
`"space"` | identifica a categoria usada por [std::iswspace](<#/doc/string/wide/iswspace>)
`"upper"` | identifica a categoria usada por [std::iswupper](<#/doc/string/wide/iswupper>)
`"xdigit"` | identifica a categoria usada por [std::iswxdigit](<#/doc/string/wide/iswxdigit>)

### Valor de retorno

Objeto [std::wctype_t](<#/doc/string/wide>) adequado para uso com [std::iswctype](<#/doc/string/wide/iswctype>) para classificar caracteres largos de acordo com a categoria nomeada da locale C atual ou zero se str não nomear uma categoria suportada pela locale C atual.

### Ver também

[ iswctype](<#/doc/string/wide/iswctype>) | classifica um caractere largo de acordo com a categoria [`LC_CTYPE`](<#/doc/locale/LC_categories>) especificada
(função)
[Documentação C](<#/>) para wctype