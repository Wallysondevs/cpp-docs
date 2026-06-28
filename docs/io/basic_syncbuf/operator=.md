# std::basic_syncbuf&lt;CharT,Traits,Allocator&gt;::operator=

basic_syncbuf& operator=( basic_syncbuf&& other );

Primeiro, chama [`emit()`](<#/doc/io/basic_syncbuf/emit>) para transmitir toda a saída pendente (e descarga atrasada, se houver) para o stream encapsulado.

Em seguida, realiza a atribuição por movimento, movendo todo o conteúdo de `other`, incluindo o armazenamento temporário, o ponteiro do stream encapsulado, a política e todo o outro estado (como o ponteiro do mutex). Após o movimento, `other` não está associado a um stream, e `other.get_wrapped() == nullptr`. Os ponteiros de membro da área de escrita da classe base [std::basic_streambuf](<#/doc/io/basic_streambuf>) de `other` são garantidos como nulos. Destruir um `other` do qual foi movido não produzirá nenhuma saída.

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::propagate_on_container_move_assignment::value for `false`, então o alocador permanece inalterado. Caso contrário, após a atribuição por movimento, `get_allocator()` é igual a `other.get_allocator()`.

### Parâmetros

- **other** — outro `std::basic_syncbuf` do qual mover

### Valor de retorno

`*this`

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ operator=](<#/>) | atribui um objeto `basic_osyncstream`
(função membro pública de `std::basic_osyncstream<CharT,Traits,Allocator>`)
[ (constructor)](<#/doc/io/basic_syncbuf/basic_syncbuf>) | constrói um objeto `basic_syncbuf`
(função membro pública)
[ emit](<#/doc/io/basic_syncbuf/emit>) | transmite atomicamente o buffer interno completo para o streambuf encapsulado
(função membro pública)
[ swap](<#/doc/io/basic_syncbuf/swap>) | troca dois objetos `basic_syncbuf`
(função membro pública)