# Cabeçalho da biblioteca padrão &lt;cwctype&gt;

Este cabeçalho estava originalmente na biblioteca padrão C como [`<wctype.h>`](<#/>).

Este cabeçalho faz parte da biblioteca de [strings largas terminadas em nulo estilo C](<#/doc/string/wide>).

### Tipos

`wctrans_t` | tipo escalar que armazena mapeamento de caracteres específico da locale
---|---
`wctype_t` | tipo escalar que armazena classificação de caracteres específica da locale
`wint_t` | tipo inteiro que pode armazenar qualquer caractere largo válido e pelo menos mais um valor

### Macros

WEOF | um valor não-caractere do tipo wint_t usado para indicar erros
(constante de macro)

### Funções

##### Classificação de caracteres

---
[ iswalnum](<#/doc/string/wide/iswalnum>) | verifica se um caractere largo é alfanumérico
(função)
[ iswalpha](<#/doc/string/wide/iswalpha>) | verifica se um caractere largo é alfabético
(função)
[ iswlower](<#/doc/string/wide/iswlower>) | verifica se um caractere largo está em minúscula
(função)
[ iswupper](<#/doc/string/wide/iswupper>) | verifica se um caractere largo está em maiúscula
(função)
[ iswdigit](<#/doc/string/wide/iswdigit>) | verifica se um caractere largo é um dígito
(função)
[ iswxdigit](<#/doc/string/wide/iswxdigit>) | verifica se um caractere largo é um caractere hexadecimal
(função)
[ iswcntrl](<#/doc/string/wide/iswcntrl>) | verifica se um caractere largo é um caractere de controle
(função)
[ iswgraph](<#/doc/string/wide/iswgraph>) | verifica se um caractere largo é um caractere gráfico
(função)
[ iswspace](<#/doc/string/wide/iswspace>) | verifica se um caractere largo é um caractere de espaço
(função)
[ iswblank](<#/doc/string/wide/iswblank>)(desde C++11) | verifica se um caractere largo é um caractere em branco
(função)
[ iswprint](<#/doc/string/wide/iswprint>) | verifica se um caractere largo é um caractere imprimível
(função)
[ iswpunct](<#/doc/string/wide/iswpunct>) | verifica se um caractere largo é um caractere de pontuação
(função)
[ iswctype](<#/doc/string/wide/iswctype>) | classifica um caractere largo de acordo com a categoria [LC_CTYPE](<#/doc/locale/LC_categories>) especificada
(função)
[ wctype](<#/doc/string/wide/wctype>) | procura uma categoria de classificação de caracteres na locale C atual
(função)

##### Manipulação de caracteres

[ towlower](<#/doc/string/wide/towlower>) | converte um caractere largo para minúscula
(função)
[ towupper](<#/doc/string/wide/towupper>) | converte um caractere largo para maiúscula
(função)
[ towctrans](<#/doc/string/wide/towctrans>) | realiza mapeamento de caracteres de acordo com a categoria de mapeamento [LC_CTYPE](<#/doc/locale/LC_categories>) especificada
(função)
[ wctrans](<#/doc/string/wide/wctrans>) | procura uma categoria de mapeamento de caracteres na locale C atual
(função)