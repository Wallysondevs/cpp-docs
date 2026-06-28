# std::basic_streambuf&lt;CharT,Traits&gt;::eback, gptr, egptr

char_type* eback() const; | (1) |
---|---|---
char_type* gptr() const; | (2) |
char_type* egptr() const; | (3) |

Retorna ponteiros que definem a get area.

1) Retorna o ponteiro para o início da get area.

2) Retorna o ponteiro para o caractere atual (_ponteiro de leitura_) na get area.

3) Retorna o ponteiro para uma posição após o final da get area.

### Parâmetros

(nenhum)

### Valor de retorno

1) O ponteiro para o início da get area.

2) O ponteiro para o caractere atual (_ponteiro de leitura_) na get area.

3) O ponteiro para uma posição após o final da get area.

### Observações

Enquanto os nomes "gptr" e "egptr" se referem à get area, o nome "eback" se refere ao final da putback area: retrocedendo a partir de `gptr`, caracteres podem ser devolvidos (put back) até `eback`.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ pbasepptrepptr](<#/doc/io/basic_streambuf/pptr>) | retorna um ponteiro para o início, caractere atual e o final da put area
(função membro protegida)