# std::experimental::basic_string_view&lt;CharT,Traits&gt;::find_last_of

constexpr size_type find_last_of(basic_string_view v, size_type pos = npos) const noexcept; | (1) | (TS de fundamentos da biblioteca)
---|---|---
constexpr size_type find_last_of(CharT c, size_type pos = npos) const noexcept; | (2) | (TS de fundamentos da biblioteca)
constexpr size_type find_last_of(const CharT* s, size_type pos, size_type count) const; | (3) | (TS de fundamentos da biblioteca)
constexpr size_type find_last_of(const CharT* s, size_type pos = npos) const; | (4) | (TS de fundamentos da biblioteca)

Encontra o último caractere igual a qualquer um dos caracteres na sequência de caracteres fornecida.

1) Encontra a última ocorrência de qualquer um dos caracteres de `v` nesta view, começando na posição `pos`.

2) Equivalente a find_last_of(basic_string_view(&c, 1), pos).

3) Equivalente a find_last_of(basic_string_view(s, count), pos).

4) Equivalente a find_last_of(basic_string_view(s), pos).

### Parâmetros

- **v** — view a ser pesquisada
- **pos** — posição na qual iniciar a busca
- **count** — comprimento da string de caracteres a ser pesquisada
- **s** — ponteiro para uma string de caracteres a ser pesquisada
- **ch** — caractere a ser pesquisado

### Valor de retorno

Posição da última ocorrência de qualquer caractere da substring, ou [npos](<#/doc/experimental/basic_string_view/npos>) se nenhum caractere for encontrado.

### Complexidade

O(`size()` * `v.size()`) no pior caso.

### Ver também

[ find](<#/doc/experimental/basic_string_view/find>) | encontra caracteres na view
(função membro pública)
[ rfind](<#/doc/experimental/basic_string_view/rfind>) | encontra a última ocorrência de uma substring
(função membro pública)
[ find_first_of](<#/doc/experimental/basic_string_view/find_first_of>) | encontra a primeira ocorrência de caracteres
(função membro pública)
[ find_first_not_of](<#/doc/experimental/basic_string_view/find_first_not_of>) | encontra a primeira ausência de caracteres
(função membro pública)
[ find_last_not_of](<#/doc/experimental/basic_string_view/find_last_not_of>) | encontra a última ausência de caracteres
(função membro pública)