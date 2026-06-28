# std::basic_ispanstream&lt;CharT,Traits&gt;::basic_ispanstream

```cpp
explicit basic_ispanstream( std::span<CharT> s, std::ios_base::openmode mode =
std::ios_base::in );  // (1) (desde C++23)
template< class ROS >
explicit basic_ispanstream( ROS&& r );  // (2) (desde C++23)
basic_ispanstream( basic_ispanstream&& rhs );  // (3) (desde C++23)
basic_ispanstream( const basic_ispanstream& ) = delete;  // (4) (desde C++23)
```

  
Constrói um novo `basic_ispanstream`.

1) Usa o armazenamento referenciado por `s` como buffer subjacente inicial do dispositivo `std::basic_spanbuf` encapsulado. O objeto `std::basic_spanbuf` encapsulado é construído como `basic_spanbuf<Char, Traits>(s, mode | std::ios_base::in)`.

2) Usa o armazenamento referenciado por `r` após ser convertido para `std::span<const CharT>` como buffer subjacente inicial do dispositivo `std::basic_spanbuf` encapsulado. O objeto `std::basic_spanbuf` encapsulado é aberto no modo `std::ios_base::in`. Esta sobrecarga participa da resolução de sobrecarga somente se `ROS` modela `borrowed_range`, `std::convertible_to<ROS, std::span<CharT>>` for falso, e `std::convertible_to<ROS, std::span<const CharT>>` for verdadeiro.

3) Construtor de movimento. Constrói por movimento o subobjeto base `std::basic_istream` e o `std::basic_spanbuf` encapsulado a partir dos de `rhs`, e então chama `set_rdbuf` com o endereço do `std::basic_spanbuf` encapsulado em `*this` para instalá-lo.

4) Construtor de cópia é deletado. `basic_ispanstream` não é copiável.

### Parâmetros

s  |  \-  |  `std::span` referenciando o armazenamento a ser usado como buffer subjacente inicial do stream   
---|---
r  |  \-  |  [`borrowed_range`](<#/doc/ranges/borrowed_range>) a ser usado como buffer subjacente inicial do stream   
mode  |  \-  |  especifica o modo de abertura do stream. As seguintes constantes e OR bit-a-bit entre elas podem ser usadas:  |  Constante  |  Explicação   
[`app`](<#/doc/io/ios_base/openmode>) |  posiciona no final do stream antes de cada escrita   
[`binary`](<#/doc/io/ios_base/openmode>) |  abre em [modo binário](<#/doc/io/c/FILE>)  
[`in`](<#/doc/io/ios_base/openmode>) |  abre para leitura   
[`out`](<#/doc/io/ios_base/openmode>) |  abre para escrita   
[`trunc`](<#/doc/io/ios_base/openmode>) |  descarta o conteúdo do stream ao abrir   
[`ate`](<#/doc/io/ios_base/openmode>) |  posiciona no final do stream imediatamente após abrir   
[`noreplace`](<#/doc/io/ios_base/openmode>) (C++23) |  abre em modo exclusivo   
other  |  \-  |  outro `basic_ispanstream` do qual mover   
  
### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ (construtor)](<#/doc/io/basic_spanbuf/basic_spanbuf>) |  constrói um objeto `basic_spanbuf`   
(função membro pública de `std::basic_spanbuf<CharT,Traits>`)  