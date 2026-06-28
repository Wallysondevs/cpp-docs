# std::experimental::basic_string_view&lt;CharT,Traits&gt;::copy

size_type copy( CharT* dest,  
size_type count,  
size_type pos = 0) const; |  |  (library fundamentals TS)  

  
Copia a substring `[pos, pos + rcount)` para a string de caracteres apontada por `dest`, onde `rcount` é o menor entre `count` e size() - pos. 

### Parâmetros

dest  |  \-  |  ponteiro para a string de caracteres de destino   
---|---|---
pos  |  \-  |  posição do primeiro caractere   
count  |  \-  |  comprimento da substring solicitada   
  
### Valor de retorno

Número de caracteres copiados 

### Exceções

[std::out_of_range](<#/doc/error/out_of_range>) se pos > size(). 

### Complexidade

Linear em `rcount`. 

### Veja também

[ substr](<#/doc/experimental/basic_string_view/substr>) |  retorna uma substring   
(função membro pública)  