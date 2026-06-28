# std::basic_syncbuf&lt;CharT,Traits,Allocator&gt;::emit

bool emit();

  
Transmite atomicamente toda a saída pendente para o stream encapsulado.

Todas as chamadas a emit() que transferem caracteres para o mesmo objeto de buffer de stream encapsulado parecem ser executadas em uma ordem total, onde cada chamada a emit() [sincroniza-se com](<#/doc/atomic/memory_order>) chamadas subsequentes a emit() nessa ordem total, mesmo que essas chamadas sejam feitas através de diferentes instâncias de std::basic_syncbuf/std::basic_osyncstream. Na prática, isso significa que emit() adquire um lock associado unicamente ao objeto de stream encapsulado: por exemplo, ele poderia ser mantido em um hash map estático onde o endereço do stream encapsulado é usado como chave.

Se uma chamada a [`sync`](<#/doc/io/basic_syncbuf/sync>) tiver sido feita desde a última chamada a emit(), então também descarrega (flushes) o stream encapsulado chamando [`pubsync()`](<#/doc/io/basic_streambuf/pubsync>) nele.

### Parâmetros

(nenhum)

### Valor de retorno

true se todas as seguintes condições forem verdadeiras:

  * existe um stream encapsulado (o ponteiro para o streambuf encapsulado não é nulo)
  * todos os caracteres do armazenamento temporário foram enviados com sucesso para o stream encapsulado
  * a chamada a [`pubsync()`](<#/doc/io/basic_streambuf/pubsync>), se solicitada, também foi concluída com sucesso.

Retorna false caso contrário.

### Notas

Normalmente chamado pelo destrutor ou move assignment do std::basic_osyncstream proprietário, ou por [`std::basic_osyncstream::emit`](<#/doc/io/basic_osyncstream/emit>).

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ (destrutor)](<#/doc/io/basic_osyncstream/~basic_osyncstream>) | destrói o `basic_osyncstream` e emite seu buffer interno   
(função membro pública de `std::basic_osyncstream<CharT,Traits,Allocator>`)  
[ emit](<#/doc/io/basic_osyncstream/emit>) | chama `emit()` no `basic_syncbuf` subjacente para transmitir seus dados internos para o destino final   
(função membro pública de `std::basic_osyncstream<CharT,Traits,Allocator>`)  
[ (construtor)](<#/doc/io/basic_syncbuf/basic_syncbuf>) | constrói um objeto `basic_syncbuf`   
(função membro pública)