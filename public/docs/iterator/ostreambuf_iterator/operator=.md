# std::ostreambuf_iterator&lt;CharT,Traits&gt;::operator=

ostreambuf_iterator& operator=( CharT c );

  
Se `failed()` retornar `false`, insere o caractere `c` no buffer de stream associado chamando `pbuf->sputc(c)`, onde `pbuf` é o membro privado do tipo `streambuf_type*`. Caso contrário, não faz nada. 

Se a chamada para `pbuf->sputc(c)` retornar `Traits::eof`, define o flag `failed()` como `true`. 

### Parâmetros

c  |  \-  |  o caractere a ser inserido   
  
### Valor de retorno

*this

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ sputc](<#/doc/io/basic_streambuf/sputc>) |  escreve um caractere na área de escrita e avança o próximo ponteiro   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  