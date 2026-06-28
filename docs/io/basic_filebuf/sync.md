# std::basic_filebuf&lt;CharT,Traits&gt;::sync

protected:  
virtual int sync()

  
Se uma área de escrita (put area) existir (por exemplo, o arquivo foi aberto para escrita), chama [overflow()](<#/doc/io/basic_streambuf/overflow>) para escrever toda a saída pendente no arquivo, então descarrega (flushes) o arquivo como se chamasse [std::fflush](<#/doc/io/c/fflush>).

Se uma área de leitura (get area) existir (por exemplo, o arquivo foi aberto para leitura), o efeito é definido pela implementação. Uma implementação típica pode esvaziar a área de leitura e mover a posição atual do arquivo para trás pelo número correspondente de bytes.

### Parâmetros

(nenhum)

### Valor de retorno

​0​ em caso de sucesso, -1 em caso de falha.

### Notas

`sync()` ou seu equivalente é implicitamente chamado para streams de saída por [`close()`](<#/doc/io/basic_filebuf/close>), [`seekoff()`](<#/doc/io/basic_filebuf/seekoff>), e [`seekpos()`](<#/doc/io/basic_filebuf/seekpos>) e explicitamente chamado por [std::basic_streambuf::pubsync()](<#/doc/io/basic_streambuf/pubsync>)

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ pubsync](<#/doc/io/basic_streambuf/pubsync>) | invoca sync()   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ fflush](<#/doc/io/c/fflush>) | sincroniza um stream de saída com o arquivo real   
(função)