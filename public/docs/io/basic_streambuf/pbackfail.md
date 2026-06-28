# std::basic_streambuf&lt;CharT,Traits&gt;::pbackfail

protected:  
virtual int_type pbackfail( int_type c = Traits::eof() );

  
Esta função só pode ser chamada se qualquer uma das seguintes condições for satisfeita: 

  * `gptr()` é [nulo](<#/doc/language/pointer>), 
  * `gptr() == eback()`, ou 
  * `traits::eq(traits::to_char_type(c), gptr()[-1])` retorna `false`. 

Esta função é chamada pelas funções públicas [sungetc()](<#/doc/io/basic_streambuf/sungetc>) e [sputbackc()](<#/doc/io/basic_streambuf/sputbackc>) (que, por sua vez, são chamadas por [`basic_istream::unget`](<#/doc/io/basic_istream/unget>) e [`basic_istream::putback`](<#/doc/io/basic_istream/putback>)) quando uma das seguintes situações ocorre: 

1) Não há posição de retorno (`putback`) na área de leitura (`get area`) (`pbackfail()` é chamada sem argumentos). Nesta situação, o propósito de `pbackfail()` é retroceder a área de leitura em um caractere, se a sequência de caracteres associada permitir isso (por exemplo, um `streambuf` apoiado por arquivo pode recarregar o buffer de um arquivo, começando um caractere antes). 

2) O chamador tenta retornar (`putback`) um caractere diferente daquele recuperado anteriormente (`pbackfail()` é chamada com o caractere que precisa ser retornado). Nesta situação, o propósito de `pbackfail()` é colocar o caractere `c` na área de leitura na posição imediatamente anterior a [`basic_streambuf::gptr()`](<#/doc/io/basic_streambuf/gptr>) e, se possível, modificar a sequência de caracteres associada para refletir essa mudança. Isso pode envolver o retrocesso da área de leitura como na primeira variante.

A versão padrão da classe base desta função não faz nada e retorna `Traits::eof()` em todas as situações. Esta função é sobrescrita pelas classes derivadas: [`basic_stringbuf::pbackfail`](<#/doc/io/basic_stringbuf/pbackfail>), [`basic_filebuf::pbackfail`](<#/doc/io/basic_filebuf/pbackfail>), [`strstreambuf::pbackfail`](<#/doc/io/strstreambuf/pbackfail>), e espera-se que seja sobrescrita por classes de `stream` de bibliotecas de terceiros e definidas pelo usuário. 

### Parâmetros

ch  |  \-  |  caractere a ser retornado ou `Traits::eof()` se apenas o retrocesso for solicitado   
  
### Valor de retorno

`Traits::eof()` em caso de falha, algum outro valor para indicar sucesso. A versão da classe base sempre falha. 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 32](<https://cplusplus.github.io/LWG/issue32>) | C++98  | a condição de chamada 'traits::eq(*gptr(),traits::to_char_type(c))  
retorna false' não correspondia à descrição de [sputbackc()](<#/doc/io/basic_streambuf/sputbackc>) | corrigido para corresponder à descrição   
  
### Veja também

[ pbackfail](<#/doc/io/basic_filebuf/pbackfail>)[virtual] |  retrocede a sequência de entrada para reverter a leitura de um caractere, sem afetar o arquivo associado   
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)  
[ pbackfail](<#/doc/io/basic_stringbuf/pbackfail>)[virtual] |  coloca um caractere de volta na sequência de entrada   
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ pbackfail](<#/doc/io/strstreambuf/pbackfail>)[virtual] |  retrocede a sequência de entrada para reverter a leitura de um caractere   
(função membro virtual protegida de `std::strstreambuf`)  
[ sungetc](<#/doc/io/basic_streambuf/sungetc>) |  move o próximo ponteiro na sequência de entrada para trás em uma posição   
(função membro pública)  
[ sputbackc](<#/doc/io/basic_streambuf/sputbackc>) |  coloca um caractere de volta na sequência de entrada   
(função membro pública)