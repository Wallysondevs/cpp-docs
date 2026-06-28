# std::emit_on_flush, std::noemit_on_flush

Definido no cabeçalho `[<ostream>](<#/doc/header/ostream>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>& emit_on_flush( std::basic_ostream<CharT, Traits>& os );
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>& noemit_on_flush( std::basic_ostream<CharT, Traits>& os );
```

  
Se os.rdbuf() realmente aponta para um [std::basic_syncbuf](<#/doc/io/basic_syncbuf>)<CharT, Traits, Allocator> `buf`, alterna se ele emite (isto é, transmite dados para o buffer de stream subjacente) quando descarregado: 

1) chama buf.set_emit_on_sync(true)

2) chama buf.set_emit_on_sync(false)

Caso contrário, esses manipuladores não têm efeito. 

Este é um manipulador de E/S (I/O) somente de saída, ele pode ser chamado com uma expressão como out << std::emit_on_flush para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>). 

  

### Parâmetros

os  |  \-  |  referência para stream de saída   
  
### Valor de retorno

`os` (referência para o stream após a manipulação) 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ set_emit_on_sync](<#/doc/io/basic_syncbuf/set_emit_on_sync>) |  altera a política atual de emitir-ao-sincronizar   
(função membro pública de `std::basic_syncbuf<CharT,Traits,Allocator>`)  