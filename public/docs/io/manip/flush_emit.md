# std::flush_emit

Definido no header `[<ostream>](<#/doc/header/ostream>)`

```cpp
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>& flush_emit( std::basic_ostream<CharT, Traits>& os );  // (desde C++20)
```

Descarrega a sequência de saída `os` como se chamasse os.flush(). Em seguida, se os.rdbuf() realmente apontar para um [std::basic_syncbuf](<#/doc/io/basic_syncbuf>)<CharT, Traits, Allocator> `buf`, chama buf.emit().

Este é um manipulador de E/S (I/O) somente de saída, ele pode ser chamado com uma expressão como out << std::flush_emit para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>).

### Parâmetros

- **os** — referência para o stream de saída

### Valor de retorno

`os` (referência para o stream após a manipulação)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ flush](<#/doc/io/basic_ostream/flush>) | sincroniza com o dispositivo de armazenamento subjacente
(função membro pública de `std::basic_ostream<CharT,Traits>`)