# std::basic_spanbuf&lt;CharT,Traits&gt;::span

```cpp
std::span<CharT> span() const noexcept;  // (1) (desde C++23)
void span( std::span<CharT> s ) noexcept;  // (2) (desde C++23)
```

1) Obtém um `span` que referencia a área escrita se [std::ios_base::out](<#/doc/io/ios_base/openmode>) estiver definido no modo de abertura, ou um `span` que referencia o buffer subjacente caso contrário.

2) Faz com que o `basic_spanbuf` realize E/S no buffer referenciado por `s`. Define ponteiros para a área de leitura (get area), área de escrita (put area), ou ambos. Bits definidos no modo de abertura
(afetando ponteiros para a área de leitura) | Valor de retorno após a definição
[eback()](<#/doc/io/basic_streambuf/gptr>) | [gptr()](<#/doc/io/basic_streambuf/gptr>) | [egptr()](<#/doc/io/basic_streambuf/gptr>)
[std::ios_base::in](<#/doc/io/ios_base/openmode>) | s.data() | s.data() | s.data() + s.size()
Bits definidos no modo de abertura
(afetando ponteiros para a área de escrita) | Valor de retorno após a definição [pbase()](<#/doc/io/basic_streambuf/pptr>) | [pptr()](<#/doc/io/basic_streambuf/pptr>) | [epptr()](<#/doc/io/basic_streambuf/pptr>) [std::ios_base::out](<#/doc/io/ios_base/openmode>) && ![std::ios_base::ate](<#/doc/io/ios_base/openmode>) | s.data() | s.data() | s.data() + s.size()
---|---|---|---
[std::ios_base::out](<#/doc/io/ios_base/openmode>) && [std::ios_base::ate](<#/>) | s.data() | s.data() + s.size() | s.data() + s.size()

### Parâmetros

- **s** — um [`std::span`](<#/doc/container/span>) que referencia o buffer fornecido pelo usuário

### Valor de retorno

1) [std::span](<#/doc/container/span>)&lt;CharT&gt;(pbase(), pptr()) se [std::ios_base::out](<#/doc/io/ios_base/openmode>) estiver definido no modo de abertura, ou um [std::span](<#/doc/container/span>)&lt;CharT&gt; que referencia todo o buffer subjacente caso contrário.

2) (nenhum)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ str](<#/doc/io/basic_stringbuf/str>) | substitui ou obtém uma cópia da string de caracteres associada
(função membro pública de `std::basic_stringbuf<CharT,Traits,Allocator>`)
[ view](<#/doc/io/basic_stringbuf/view>)(C++20) | obtém uma view sobre a sequência de caracteres subjacente
(função membro pública de `std::basic_stringbuf<CharT,Traits,Allocator>`)
[ str](<#/doc/io/strstreambuf/str>) | marca o buffer como congelado e retorna o ponteiro inicial da sequência de entrada
(função membro pública de `std::strstreambuf`)