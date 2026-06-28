# std::sub_match&lt;BidirIt&gt;::compare

int compare( const sub_match& m ) const; |  (1)  |  (desde C++11)  
---|---|---
int compare( const string_type& s ) const; |  (2)  |  (desde C++11)  
int compare( const value_type* c ) const; |  (3)  |  (desde C++11)  

  
1) Compara dois `sub_match`es diretamente comparando suas sequências de caracteres subjacentes. Equivalente a str().compare(m.str()).

2) Compara um `sub_match` com um [std::basic_string](<#/doc/string/basic_string>). Equivalente a str().compare(s).

3) Compara um `sub_match` com uma sequência terminada em nulo do tipo de caractere subjacente apontado por s. Equivalente a str().compare(c).

### Parâmetros

m  |  \-  |  uma referência para outro sub_match   
---|---|---
s  |  \-  |  uma referência para uma string a ser comparada   
c  |  \-  |  um ponteiro para uma sequência de caracteres terminada em nulo do `value_type` subjacente a ser comparada   
  
### Valor de retorno

Um valor menor que zero se este `sub_match` for _menor_ que a outra sequência de caracteres, zero se ambas as sequências de caracteres subjacentes forem iguais, maior que zero se este `sub_match` for _maior_ que a outra sequência de caracteres.

### Observações

Esta função é pouco utilizada diretamente pelo código de aplicação. Em vez disso, um dos operadores de comparação não-membros é usado.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Ver também

[ compare](<#/doc/string/basic_string/compare>) |  compara duas strings   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)  
[ stroperator string_type](<#/doc/regex/sub_match/str>) |  converte para o tipo de string subjacente   
(função membro pública)  
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/regex/sub_match/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) |  compara um `sub_match` com outro `sub_match`, uma string, ou um caractere   
(modelo de função)