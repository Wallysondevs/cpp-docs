# std::basic_streambuf&lt;CharT,Traits&gt;::snextc

int_type snextc();

  
Avança a sequência de entrada em um caractere e lê um caractere.

A função chama [sbumpc()](<#/doc/io/basic_streambuf/sbumpc>) para avançar a sequência de entrada. Se essa função retornar Traits::eof() significando que a sequência de entrada foi esgotada e [uflow()](<#/doc/io/basic_streambuf/uflow>) não conseguiu recuperar mais dados, Traits::eof() é retornado. Caso contrário, [sgetc()](<#/doc/io/basic_streambuf/sgetc>) é chamado para ler o caractere.

### Parâmetros

(nenhum) 

### Valor de retorno

O valor do próximo caractere. Se a sequência de entrada tiver sido esgotada, Traits::eof() é retornado.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ sgetc](<#/doc/io/basic_streambuf/sgetc>) | lê um caractere da sequência de entrada sem avançar a sequência   
(função membro pública)  
[ sbumpcstossc](<#/doc/io/basic_streambuf/sbumpc>)(removido em C++17) | lê um caractere da sequência de entrada e avança a sequência   
(função membro pública)