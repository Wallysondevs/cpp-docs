# std::basic_syncbuf&lt;CharT,Traits,Allocator&gt;::set_emit_on_sync

void set_emit_on_sync( bool b ) noexcept;

  
Altera a política atual de emit-on-sync.

O valor false (o padrão) indica que qualquer flush será adiado até uma chamada para emit.

O valor true faz com que os flushes sejam aplicados imediatamente.

### Parâmetros

b  |  \-  |  novo valor para a política emit-on-sync   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ sync](<#/doc/io/basic_streambuf/pubsync>)[virtual] | sincroniza os buffers com a sequência de caracteres associada   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ emit](<#/doc/io/basic_syncbuf/emit>) | transmite atomicamente o buffer interno completo para o streambuf encapsulado   
(função membro pública)  
[ emit_on_flushnoemit_on_flush](<#/doc/io/manip/emit_on_flush>)(C++20) | controla se um [`basic_syncbuf`](<#/doc/io/basic_syncbuf>) de um stream emite em flush   
(modelo de função)