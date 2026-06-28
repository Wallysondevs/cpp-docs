# std::basic_spanbuf&lt;CharT,Traits&gt;::basic_spanbuf

```cpp
basic_spanbuf() : basic_spanbuf(std::ios_base::in | std::ios_base::out) {}  // (1) (desde C++23)
explicit basic_spanbuf( std::ios_base::openmode which )
: basic_spanbuf(std::span<CharT>{}, which) {}  // (2) (desde C++23)
explicit basic_spanbuf( std::span<CharT> buf, std::ios_base::openmode which =
std::ios_base::in | std::ios_base::out );  // (3) (desde C++23)
basic_spanbuf( const basic_spanbuf& ) = delete;  // (4) (desde C++23)
basic_spanbuf( basic_spanbuf&& rhs );  // (5) (desde C++23)
```

  
1) Construtor padrão. Cria um `basic_spanbuf` que não possui buffer subjacente e é aberto para entrada e saída. Os ponteiros para as áreas de leitura (get) e escrita (put) são definidos para o valor de ponteiro nulo.

2) O mesmo que (1), exceto que o `basic_spanbuf` é aberto no modo especificado por `which`.

3) Cria um `basic_spanbuf` que gerencia o buffer subjacente referenciado por `buf` (ou não possui buffer subjacente se `buf` estiver vazio) e é aberto no modo especificado por `which`. Os ponteiros para as áreas de leitura (get) e escrita (put) são definidos da seguinte forma, ou para o valor de ponteiro nulo se não mencionados na tabela:  Bits definidos no modo de abertura  
(afetando ponteiros para a área de leitura)  | Valor de retorno após a definição   
[eback()](<#/doc/io/basic_streambuf/gptr>) | [gptr()](<#/doc/io/basic_streambuf/gptr>) | [egptr()](<#/doc/io/basic_streambuf/gptr>)  
[std::ios_base::in](<#/doc/io/ios_base/openmode>) | s.data() | s.data() | s.data() + s.size()  
Bits definidos no modo de abertura  
(afetando ponteiros para a área de escrita)  | Valor de retorno após a definição [pbase()](<#/doc/io/basic_streambuf/pptr>) | [pptr()](<#/doc/io/basic_streambuf/pptr>) | [epptr()](<#/doc/io/basic_streambuf/pptr>) [std::ios_base::out](<#/doc/io/ios_base/openmode>) && ![std::ios_base::ate](<#/doc/io/ios_base/openmode>) | s.data() | s.data() | s.data() + s.size()
---|---|---|---
[std::ios_base::out](<#/doc/io/ios_base/openmode>) && [std::ios_base::ate](<#/doc/io/ios_base/openmode>) | s.data() | s.data() + s.size() | s.data() + s.size()  
  
4) O construtor de cópia é deletado. `basic_spanbuf` não é copiável.

5) Construtor de movimento. Constrói por movimento o subobjeto base `[std::basic_streambuf](<#/doc/io/basic_streambuf>)` a partir do de `rhs`. Os ponteiros para as áreas de leitura (get) e escrita (put), o modo de abertura e o buffer subjacente (se houver) são idênticos aos de `rhs` antes da construção. É definido pela implementação se `rhs` ainda mantém o buffer subjacente após a construção por movimento.

### Parâmetros

buf  |  \-  |  um [`std::span`](<#/doc/container/span>) referenciando o buffer subjacente   
---|---
rhs  |  \-  |  outro `basic_spanbuf`  
which  |  \-  |  especifica o modo de abertura do stream. É um tipo bitmask, as seguintes constantes são definidas:  |  Constante  |  Explicação   
[`app`](<#/doc/io/ios_base/openmode>) |  posiciona no final do stream antes de cada escrita   
[`binary`](<#/doc/io/ios_base/openmode>) |  abre em [modo binário](<#/doc/io/c/FILE>)  
[`in`](<#/doc/io/ios_base/openmode>) |  abre para leitura   
[`out`](<#/doc/io/ios_base/openmode>) |  abre para escrita   
[`trunc`](<#/doc/io/ios_base/openmode>) |  descarta o conteúdo do stream ao abrir   
[`ate`](<#/doc/io/ios_base/openmode>) |  posiciona no final do stream imediatamente após a abertura   
[`noreplace`](<#/doc/io/ios_base/openmode>) (C++23) |  abre em modo exclusivo   
  
### Notas

Esses construtores são tipicamente chamados pelos construtores de `std::basic_ispanstream`, `std::basic_ospanstream` e `std::basic_spanstream`.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ (construtor)](<#/doc/io/basic_ispanstream/basic_ispanstream>) |  constrói o `basic_ispanstream`   
(função membro pública de `std::basic_ispanstream<CharT,Traits>`)  
[ (construtor)](<#/doc/io/basic_ospanstream/basic_ospanstream>) |  constrói o `basic_ospanstream`   
(função membro pública de `std::basic_ospanstream<CharT,Traits>`)  
[ (construtor)](<#/doc/io/basic_spanstream/basic_spanstream>) |  constrói o `basic_spanstream`   
(função membro pública de `std::basic_spanstream<CharT,Traits>`)