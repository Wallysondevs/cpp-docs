# std::wctrans

Definido no cabeçalho `[<cwctype>](<#/doc/header/cwctype>)`

```c
std::wctrans_t wctrans( const char* str );
```

Constrói um valor do tipo [std::wctrans_t](<#/doc/string/wide>) que descreve uma categoria [LC_CTYPE](<#/doc/locale/LC_categories>) de mapeamento de caracteres largos. Pode ser um dos mapeamentos padrão, ou um mapeamento específico da locale, como `"tojhira"` ou `"tojkata"`.

### Parâmetros

- **str** — String C contendo o nome do mapeamento desejado. Os seguintes valores de `str` são suportados em todas as locales C: | Valor de `str` | Efeito
---|---
`"toupper"` | identifica o mapeamento usado por towupper
`"tolower"` | identifica o mapeamento usado por towlower

### Valor de retorno

Objeto [std::wctrans_t](<#/doc/string/wide>) adequado para uso com [std::towctrans](<#/doc/string/wide/towctrans>) para mapear caracteres largos de acordo com o mapeamento nomeado da locale C atual ou zero se `str` não nomear um mapeamento suportado pela locale C atual.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ towctrans](<#/doc/string/wide/towctrans>) | realiza o mapeamento de caracteres de acordo com a categoria de mapeamento [`LC_CTYPE`](<#/doc/locale/LC_categories>) especificada
(função)
[Documentação C](<#/>) para wctrans