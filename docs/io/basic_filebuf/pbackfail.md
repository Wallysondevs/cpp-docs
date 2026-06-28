# std::basic_filebuf&lt;CharT,Traits&gt;::pbackfail

protected:  
virtual int_type pbackfail( int_type c = Traits::eof() )

  
Esta função virtual protegida é chamada pelas funções públicas [`basic_streambuf::sungetc`](<#/doc/io/basic_streambuf/sungetc>) e [`basic_streambuf::sputbackc`](<#/doc/io/basic_streambuf/sputbackc>) (que, por sua vez, são chamadas por [`basic_istream::unget`](<#/doc/io/basic_istream/unget>) e [`basic_istream::putback`](<#/doc/io/basic_istream/putback>)). 

1) O chamador está solicitando que a área de leitura (get area) seja retrocedida em um caractere (`pbackfail()` é chamada sem argumentos), caso em que esta função relê o arquivo começando um byte antes e decrementa [`basic_streambuf::gptr()`](<#/doc/io/basic_streambuf/gptr>), por exemplo, chamando gbump(-1).

2) O chamador tenta colocar de volta (putback) um caractere diferente daquele recuperado anteriormente (`pbackfail()` é chamada com o caractere que precisa ser colocado de volta), caso em que

a) Primeiro, verifica se há uma posição de putback e, se não houver, retrocede a área de leitura (get area) relendo o arquivo começando um byte antes.

a) Em seguida, verifica qual caractere está na posição de putback. Se o caractere ali contido já for igual a `c`, conforme determinado por Traits::eq(to_char_type(c), gptr()[-1]), então simplesmente decrementa [`basic_streambuf::gptr()`](<#/doc/io/basic_streambuf/gptr>).

b) Caso contrário, se o buffer tiver permissão para modificar sua própria área de leitura (get area), decrementa [`basic_streambuf::gptr()`](<#/doc/io/basic_streambuf/gptr>) e escreve `c` para o local apontado por gptr() após o ajuste.

Esta função nunca modifica o arquivo, apenas a área de leitura (get area) do buffer em memória. 

Se o arquivo não estiver aberto (is_open()==false), esta função retorna Traits::eof() imediatamente. 

### Parâmetros

c  |  \-  |  o caractere a ser colocado de volta (put back), ou Traits::eof() para indicar que o retrocesso da área de leitura (get area) é solicitado   
  
### Valor de retorno

c em caso de sucesso, exceto se `c` for Traits::eof(), caso em que Traits::not_eof(c) é retornado. 

Traits::eof() em caso de falha. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ pbackfail](<#/doc/io/basic_streambuf/pbackfail>)[virtual] | coloca um caractere de volta na sequência de entrada, possivelmente modificando a sequência de entrada   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ sungetc](<#/doc/io/basic_streambuf/sungetc>) | move o próximo ponteiro na sequência de entrada para trás em um   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ sputbackc](<#/doc/io/basic_streambuf/sputbackc>) | coloca um caractere de volta na sequência de entrada   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ unget](<#/doc/io/basic_istream/unget>) | desextrai um caractere   
(função membro pública de `std::basic_istream<CharT,Traits>`)  
[ putback](<#/doc/io/basic_istream/putback>) | coloca um caractere no fluxo de entrada   
(função membro pública de `std::basic_istream<CharT,Traits>`)