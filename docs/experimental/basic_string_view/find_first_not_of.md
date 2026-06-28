# std::experimental::basic_string_view&lt;CharT,Traits&gt;::find_first_not_of

constexpr size_type   
find_first_not_of(basic_string_view v, size_type pos = 0) const noexcept; |  (1)  |  (library fundamentals TS)  
constexpr size_type  
find_first_not_of(CharT c, size_type pos = 0) const noexcept; |  (2)  |  (library fundamentals TS)  
constexpr size_type  
find_first_not_of(const CharT* s, size_type pos, size_type count) const; |  (3)  |  (library fundamentals TS)  
constexpr size_type  
find_first_not_of(const CharT* s, size_type pos = 0) const; |  (4)  |  (library fundamentals TS)  

  
Encontra o primeiro caractere que não é igual a nenhum dos caracteres na sequência de caracteres fornecida.

1) Encontra o primeiro caractere que não é igual a nenhum dos caracteres de `v` nesta view, começando na posição `pos`.

2) Equivalente a find_first_not_of(basic_string_view(&c, 1), pos).

3) Equivalente a find_first_not_of(basic_string_view(s, count), pos).

4) Equivalente a find_first_not_of(basic_string_view(s), pos).

### Parâmetros

v  |  \-  |  view a ser pesquisada   
---|---|---
pos  |  \-  |  posição onde iniciar a pesquisa   
count  |  \-  |  comprimento da string de caracteres a comparar   
s  |  \-  |  ponteiro para uma string de caracteres a comparar   
ch  |  \-  |  caractere a comparar   
  
### Valor de retorno

Posição do primeiro caractere que não é igual a nenhum dos caracteres na string fornecida, ou [npos](<#/doc/experimental/basic_string_view/npos>) se nenhum caractere for encontrado.

### Complexidade

O(`size()` * `v.size()`) no pior caso.

### Veja também

[ find](<#/doc/experimental/basic_string_view/find>) |  encontra caracteres na view   
(função membro pública)  
[ rfind](<#/doc/experimental/basic_string_view/rfind>) |  encontra a última ocorrência de uma substring   
(função membro pública)  
[ find_first_of](<#/doc/experimental/basic_string_view/find_first_of>) |  encontra a primeira ocorrência de caracteres   
(função membro pública)  
[ find_last_of](<#/doc/experimental/basic_string_view/find_last_of>) |  encontra a última ocorrência de caracteres   
(função membro pública)  
[ find_last_not_of](<#/doc/experimental/basic_string_view/find_last_not_of>) |  encontra a última ausência de caracteres   
(função membro pública)