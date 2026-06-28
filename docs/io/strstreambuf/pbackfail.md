# std::strstreambuf::pbackfail

protected:  
virtual int_type pbackfail( int_type c = [EOF](<#/doc/io/c>) ); |  |  (obsoleto desde C++98)   
(removido em C++26)  

  
Esta função virtual protegida é chamada pelas funções públicas [`basic_streambuf::sungetc`](<#/doc/io/basic_streambuf/sungetc>) e [`basic_streambuf::sputbackc`](<#/doc/io/basic_streambuf/sputbackc>) (que, por sua vez, são chamadas por [`basic_istream::unget`](<#/doc/io/basic_istream/unget>) e [`basic_istream::putback`](<#/doc/io/basic_istream/putback>)). 

1) O chamador está solicitando que a área de leitura (get area) seja retrocedida em um caractere (`pbackfail()` é chamada sem argumentos ou com [EOF](<#/doc/io/c>) como argumento)

a) Primeiro, verifica se há uma posição de putback, e se realmente não houver, falha (`strstreambuf` não possui fonte de caractere externa para reler).

b) Se o chamador estava errado e a posição de putback está de fato disponível, simplesmente decrementa [`basic_streambuf::gptr()`](<#/doc/io/basic_streambuf/gptr>), por exemplo, chamando gbump(-1).

2) O chamador tenta colocar de volta (putback) um caractere diferente daquele recuperado anteriormente (`pbackfail()` é chamada com o caractere que precisa ser colocado de volta), caso em que

a) Primeiro, verifica se há uma posição de putback, e se não houver, falha.

b) Em seguida, verifica qual caractere está na posição de putback. Se o caractere ali contido já for igual a (char)c, então simplesmente decrementa [`basic_streambuf::gptr()`](<#/doc/io/basic_streambuf/gptr>).

c) Caso contrário, se o buffer for imodificável (este strstreambuf foi construído com um literal de string ou algum outro array const), falha.

d) Caso contrário, decrementa [`basic_streambuf::gptr()`](<#/doc/io/basic_streambuf/gptr>) e escreve c para o local apontado por gptr() após o ajuste.

### Parâmetros

c  |  \-  |  o caractere a ser colocado de volta (put back), ou Traits::eof() para indicar que o retrocesso da área de leitura (get area) é solicitado   
  
### Valor de retorno

c em caso de sucesso, exceto se c for [EOF](<#/doc/io/c>), caso em que um valor não especificado diferente de [EOF](<#/doc/io/c>) é retornado. 

[EOF](<#/doc/io/c>) em caso de falha. 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Ver também

[ pbackfail](<#/doc/io/basic_streambuf/pbackfail>)[virtual] |  coloca um caractere de volta na sequência de entrada, possivelmente modificando a sequência de entrada   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ sungetc](<#/doc/io/basic_streambuf/sungetc>) |  move o próximo ponteiro na sequência de entrada para trás em um   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ sputbackc](<#/doc/io/basic_streambuf/sputbackc>) |  coloca um caractere de volta na sequência de entrada   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ unget](<#/doc/io/basic_istream/unget>) |  desextrai um caractere   
(função membro pública de `std::basic_istream<CharT,Traits>`)  
[ putback](<#/doc/io/basic_istream/putback>) |  coloca um caractere no fluxo de entrada   
(função membro pública de `std::basic_istream<CharT,Traits>`)