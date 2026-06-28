# std::basic_ofstream&lt;CharT,Traits&gt;::close

void close();

  
Fecha o arquivo associado.

Efetivamente chama [`rdbuf()->close()`](<#/doc/io/basic_filebuf/close>). Se ocorrer um erro durante a operação, setstate(failbit) é chamado.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Notas

Esta função é chamada pelo destrutor de `basic_ofstream` quando o objeto de stream sai do escopo e geralmente não é invocada diretamente.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Ver também

[ is_open](<#/doc/io/basic_ofstream/is_open>) |  verifica se o stream tem um arquivo associado   
(função membro pública)  
[ open](<#/doc/io/basic_ofstream/open>) |  abre um arquivo e o associa ao stream   
(função membro pública)  
[ close](<#/doc/io/basic_filebuf/close>) |  descarrega o buffer da área de escrita e fecha o arquivo associado   
(função membro pública de `std::basic_filebuf<CharT,Traits>`)