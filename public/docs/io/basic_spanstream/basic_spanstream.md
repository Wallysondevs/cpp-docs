# std::basic_spanstream&lt;CharT,Traits&gt;::basic_spanstream

```cpp
explicit basic_spanstream( std::span<CharT> s, std::ios_base::openmode mode =
std::ios_base::in | std::ios_base::out );  // (1) (desde C++23)
basic_spanstream( basic_spanstream&& rhs );  // (2) (desde C++23)
basic_spanstream( const basic_spanstream& ) = delete;  // (3) (desde C++23)
```

  
Constrói um novo `basic_spanstream`.

1) Usa o armazenamento referenciado por `s` como buffer subjacente inicial do dispositivo `std::basic_spanbuf` encapsulado. O objeto `std::basic_spanbuf` encapsulado é construído como `basic_spanbuf<Char, Traits>(s, mode)`.

2) Construtor de movimento. Constrói por movimento o subobjeto base `std::basic_iostream` e o `std::basic_spanbuf` encapsulado a partir dos de `rhs`, e então chama `set_rdbuf` com o endereço do `std::basic_spanbuf` encapsulado em `*this` para instalá-lo.

3) O construtor de cópia é deletado. `basic_spanstream` não é copiável.

### Parâmetros

s  |  \-  |  `std::span` referenciando o armazenamento a ser usado como buffer subjacente inicial do stream   
---|---
mode  |  \-  |  especifica o modo de abertura do stream. As seguintes constantes e OR bit-a-bit entre elas podem ser usadas:  |  Constante  |  Explicação   
[`app`](<#/doc/io/ios_base/openmode>) |  busca o final do stream antes de cada escrita   
[`binary`](<#/doc/io/ios_base/openmode>) |  abre em [modo binário](<#/doc/io/c/FILE>)  
[`in`](<#/doc/io/ios_base/openmode>) |  abre para leitura   
[`out`](<#/doc/io/ios_base/openmode>) |  abre para escrita   
[`trunc`](<#/doc/io/ios_base/openmode>) |  descarta o conteúdo do stream ao abrir   
[`ate`](<#/doc/io/ios_base/openmode>) |  busca o final do stream imediatamente após a abertura   
[`noreplace`](<#/doc/io/ios_base/openmode>) (C++23) |  abre em modo exclusivo   
other  |  \-  |  outro `basic_spanstream` do qual mover   
  
### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ (constructor)](<#/doc/io/basic_spanbuf/basic_spanbuf>) |  constrói um objeto `basic_spanbuf`   
(função membro pública de `std::basic_spanbuf<CharT,Traits>`)  