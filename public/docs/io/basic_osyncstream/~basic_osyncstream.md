# std::basic_osyncstream&lt;CharT,Traits,Allocator&gt;::~basic_osyncstream

~basic_osyncstream();

  
Destrói um stream de saída sincronizado.

A destruição do membro `std::basic_syncbuf` emitirá qualquer saída armazenada em buffer que ainda não tenha sido emitida.

### Parâmetros

(nenhum)

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ (destrutor)](<#/doc/io/basic_syncbuf/~basic_syncbuf>) | destrói o `basic_syncbuf` e emite seu buffer interno   
(função membro pública de `std::basic_syncbuf<CharT,Traits,Allocator>`)  