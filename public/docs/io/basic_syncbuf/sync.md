# std::basic_syncbuf&lt;CharT,Traits,Allocator&gt;::sync

protected:  
int sync() override;

  
Primeiro, registra que uma descarga (flush) está pendente, atualizando a flag privada apropriada.

Em seguida, se a política atual de emit-on-sync for verdadeira, faz uma chamada para [`emit()`](<#/doc/io/basic_syncbuf/emit>).

Caso contrário (se a política de emit-on-sync for falsa, que é o padrão), a descarga (flush) é suspensa até que [`emit()`](<#/doc/io/basic_syncbuf/emit>) seja chamado, como através de [`std::basic_osyncstream::emit()`](<#/doc/io/basic_osyncstream/emit>) ou [`std::basic_osyncstream::~basic_osyncstream`](<#/doc/io/basic_osyncstream/~basic_osyncstream>).

### Parâmetros

(nenhum) 

### Notas

`sync()` ou seu equivalente é implicitamente chamado por close(), seekoff() e seekpos() e explicitamente chamado por [std::basic_streambuf::pubsync()](<#/doc/io/basic_streambuf/pubsync>).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ sync](<#/doc/io/basic_streambuf/pubsync>)[virtual] | sincroniza os buffers com a sequência de caracteres associada   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ emit](<#/doc/io/basic_osyncstream/emit>) | chama [`emit()`](<#/doc/io/basic_syncbuf/emit>) no `basic_syncbuf` subjacente para transmitir seus dados internos para o destino final   
(função membro pública de `std::basic_osyncstream<CharT,Traits,Allocator>`)