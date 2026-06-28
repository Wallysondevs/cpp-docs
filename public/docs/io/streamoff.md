# std::streamoff

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
typedef /*implementation-defined*/ streamoff;
```

O tipo `std::streamoff` é um tipo integral assinado definido pela implementação (desde C++11) de tamanho suficiente para representar o tamanho máximo de arquivo possível suportado pelo sistema operacional. Tipicamente, este é um alias para long long. (desde C++11)

É usado para representar deslocamentos de posições de stream (valores do tipo [std::fpos](<#/doc/io/fpos>)). Um valor `std::streamoff` construído a partir de -1 também é usado para representar condições de erro por algumas das funções da biblioteca de E/S.

### Relação com std::fpos

  * a diferença entre dois objetos [std::fpos](<#/doc/io/fpos>) é um valor do tipo `std::streamoff`

  * um valor do tipo `std::streamoff` pode ser adicionado ou subtraído de [std::fpos](<#/doc/io/fpos>) resultando em um [std::fpos](<#/doc/io/fpos>) diferente.

  * um valor do tipo [std::fpos](<#/doc/io/fpos>) é implicitamente conversível para `std::streamoff` (o resultado da conversão é o deslocamento desde o início do arquivo).

  * um valor do tipo [std::fpos](<#/doc/io/fpos>) é construtível a partir de um valor do tipo `std::streamoff`

### Veja também

[ fpos](<#/doc/io/fpos>) | representa a posição absoluta em um stream ou arquivo
(modelo de classe)
[ seekg](<#/doc/io/basic_istream/seekg>) | define o indicador de posição de entrada
(função membro pública de `std::basic_istream<CharT,Traits>`)
[ seekp](<#/doc/io/basic_ostream/seekp>) | define o indicador de posição de saída
(função membro pública de `std::basic_ostream<CharT,Traits>`)