# std::experimental::basic_string_view&lt;CharT,Traits&gt;::substr

constexpr basic_string_view  
substr(size_type pos = 0, size_type count = npos ) const;

  
Retorna uma view da substring `[pos, pos + rcount)`, onde `rcount` é o menor entre `count` e size() - pos. 

### Parâmetros

pos  |  \-  |  posição do primeiro caractere   
---|---|---
count  |  \-  |  comprimento solicitado   
  
### Valor de retorno

View da substring `[pos, pos + rcount)`. 

### Exceções

[std::out_of_range](<#/doc/error/out_of_range>) se pos > size()

### Complexidade

Constante. 

### Veja também

[ copy](<#/doc/experimental/basic_string_view/copy>) |  copia caracteres   
(função membro pública)  
[ find](<#/doc/experimental/basic_string_view/find>) |  encontra caracteres na view   
(função membro pública)