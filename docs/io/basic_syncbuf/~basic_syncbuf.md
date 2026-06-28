# std::basic_syncbuf&lt;CharT,Traits,Allocator&gt;::~basic_syncbuf

~basic_syncbuf();

Chama [`emit()`](<#/doc/io/basic_syncbuf/emit>) para transmitir toda a saída pendente (e descarga atrasada, se houver) para o stream encapsulado. Se uma exceção for lançada por esta chamada, ela é capturada e ignorada.

### Parâmetros

(nenhum)

### Notas

Normalmente chamado pelo destrutor do std::basic_osyncstream proprietário.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ (destrutor)](<#/doc/io/basic_osyncstream/~basic_osyncstream>) | destrói o `basic_osyncstream` e emite seu buffer interno
(função membro pública de `std::basic_osyncstream<CharT,Traits,Allocator>`)
[ (construtor)](<#/doc/io/basic_syncbuf/basic_syncbuf>) | constrói um objeto `basic_syncbuf`
(função membro pública)