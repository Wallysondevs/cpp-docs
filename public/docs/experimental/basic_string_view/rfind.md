# std::experimental::basic_string_view&lt;CharT,Traits&gt;::rfind

constexpr size_type rfind(basic_string_view v, size_type pos = npos) const noexcept; | (1) | (library fundamentals TS)
---|---|---
constexpr size_type rfind(CharT c, size_type pos = npos) const noexcept; | (2) | (library fundamentals TS)
constexpr size_type rfind(const CharT* s, size_type pos, size_type count) const; | (3) | (library fundamentals TS)
constexpr size_type rfind(const CharT* s, size_type pos = npos) const; | (4) | (library fundamentals TS)

Encontra a última substring igual à sequência de caracteres fornecida.

1) Encontra a última ocorrência de `v` nesta view, começando na posição `pos`.

2) Equivalente a rfind(basic_string_view(&c, 1), pos).

3) Equivalente a rfind(basic_string_view(s, count), pos).

4) Equivalente a rfind(basic_string_view(s), pos).

### Parâmetros

- **v** — view a ser procurada
- **pos** — posição na qual iniciar a busca
- **count** — comprimento da substring a ser procurada
- **s** — ponteiro para uma string de caracteres a ser procurada
- **ch** — caractere a ser procurado

### Valor de retorno

Posição do primeiro caractere da substring encontrada ou [npos](<#/doc/experimental/basic_string_view/npos>) se nenhuma substring for encontrada.

### Complexidade

O(`size()` * `v.size()`) no pior caso.

### Veja também

[ find](<#/doc/experimental/basic_string_view/find>) | encontra caracteres na view
(função membro pública)
[ find_first_of](<#/doc/experimental/basic_string_view/find_first_of>) | encontra a primeira ocorrência de caracteres
(função membro pública)
[ find_last_of](<#/doc/experimental/basic_string_view/find_last_of>) | encontra a última ocorrência de caracteres
(função membro pública)
[ find_first_not_of](<#/doc/experimental/basic_string_view/find_first_not_of>) | encontra a primeira ausência de caracteres
(função membro pública)
[ find_last_not_of](<#/doc/experimental/basic_string_view/find_last_not_of>) | encontra a última ausência de caracteres
(função membro pública)