# std::basic_syncbuf&lt;CharT,Traits,Allocator&gt;::get_wrapped

streambuf_type* get_wrapped() const noexcept;

  
Retorna um ponteiro para o [std::basic_streambuf](<#/doc/io/basic_streambuf>) encapsulado.

### Parâmetros

(nenhum)

### Notas

Não se espera que esta função seja chamada diretamente: ela é chamada através de [`std::basic_osyncstream::get_wrapped`](<#/doc/io/basic_osyncstream/get_wrapped>).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ get_wrapped](<#/doc/io/basic_osyncstream/get_wrapped>) | obtém um ponteiro para o buffer de stream de destino final   
(função membro pública de `std::basic_osyncstream<CharT,Traits,Allocator>`)  