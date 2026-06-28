# std::basic_ios&lt;CharT,Traits&gt;::narrow

char narrow( char_type c, char dfault ) const;

  
Converte um caractere `c` específico do locale atual para seu equivalente padrão. O resultado é convertido de `char_type` para `char` se necessário. Se nenhuma conversão puder ser realizada, a função retorna `dfault`.

Efetivamente chama [std::use_facet](<#/doc/locale/use_facet>)< [std::ctype](<#/doc/locale/ctype>)<char_type> >(getloc()).narrow(c, dfault);.

### Parâmetros

c  |  \-  |  caractere a ser convertido   
---|---|---
dfault  |  \-  |  caractere a ser retornado se a conversão não for bem-sucedida   
  
### Valor de retorno

Caractere convertido para seu equivalente padrão e então para `char`. `dfault` é retornado se a conversão falhar.

### Veja também

[ widen](<#/doc/io/basic_ios/widen>) |  alarga caracteres   
(função membro pública)  
[ narrow](<#/doc/locale/ctype/narrow>) |  invoca `do_narrow`   
(função membro pública de `std::ctype<CharT>`)  
[ wctob](<#/doc/string/multibyte/wctob>) |  estreita um caractere largo para um caractere estreito de byte único, se possível   
(função)