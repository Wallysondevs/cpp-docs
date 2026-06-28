# Biblioteca de entrada/saída

C++ inclui as seguintes bibliotecas de entrada/saída: uma biblioteca de [E/S baseada em stream](<#/doc/io>) com [estilo OOP](<https://en.wikipedia.org/wiki/Object-oriented_programming> "enwiki:Object-oriented programming"), uma [família de funções baseadas em impressão](<#/doc/io>) (desde C++23), e o conjunto padrão de funções de [E/S estilo C](<#/doc/io>).

### E/S baseada em stream

A biblioteca de entrada/saída baseada em stream é organizada em torno de dispositivos abstratos de entrada/saída. Esses dispositivos abstratos permitem que o mesmo código lide com entrada/saída para arquivos, streams de memória ou dispositivos adaptadores personalizados que realizam operações arbitrárias (por exemplo, compressão) em tempo real.

A maioria das classes é baseada em template, de modo que podem ser adaptadas a qualquer tipo de caractere básico. Typedefs separados são fornecidos para os tipos de caracteres básicos mais comuns (char e wchar_t). As classes são organizadas na seguinte hierarquia:

Diagrama de Herança

##### Abstração

---
Definido no header `[<ios>](<#/doc/header/ios>)`

```cpp
 ios_base
(classe)
 basic_ios
(class template)
Definido no header `<streambuf>`
 basic_streambuf
(class template)
Definido no header `<ostream>`
 basic_ostream
e fornece interface de saída de alto nível
(class template)
Definido no header `<istream>`
 basic_istream
e fornece interface de entrada de alto nível
(class template)
 basic_iostream
e fornece interface de entrada/saída de alto nível
(class template)
```

##### Implementação de E/S de Arquivo

Definido no header `[<fstream>](<#/doc/header/fstream>)`

```cpp
 basic_filebuf
(class template)
 basic_ifstream
(class template)
 basic_ofstream
(class template)
 basic_fstream
(class template)
```

##### Implementação de E/S de String

Definido no header `[<sstream>](<#/doc/header/sstream>)`

```cpp
 basic_stringbuf
(class template)
 basic_istringstream
(class template)
 basic_ostringstream
(class template)
 basic_stringstream
(class template)
```

##### Implementações de E/S de Array

Definido no header `[<spanstream>](<#/doc/header/spanstream>)`

```cpp
 basic_spanbuf(C++23)
(class template)
 basic_ispanstream(C++23)
(class template)
 basic_ospanstream(C++23)
(class template)
 basic_spanstream(C++23)
(class template)
Definido no header `<strstream>`
 strstreambuf(obsoleto desde C++98)(removido em C++26)
(classe)
 istrstream(obsoleto desde C++98)(removido em C++26)
(classe)
 ostrstream(obsoleto desde C++98)(removido em C++26)
(classe)
 strstream(obsoleto desde C++98)(removido em C++26)
(classe)
```

##### Saída Sincronizada (desde C++20)

Definido no header `[<syncstream>](<#/doc/header/syncstream>)`

```cpp
 basic_syncbuf(C++20)
(class template)
 basic_osyncstream(C++20)
(class template)
```

#### Typedefs

Os seguintes typedefs para tipos de caracteres comuns são fornecidos no namespace `std`:

Tipo | Definição
Definido no header `[<ios>](<#/doc/header/ios>)`

```cpp
std::ios
std::wios
Definido no header `<streambuf>`
std::streambuf
std::wstreambuf
Definido no header `<istream>`
std::istream
std::wistream
std::iostream
std::wiostream
Definido no header `<ostream>`
std::ostream
std::wostream
Definido no header `<fstream>`
std::filebuf
std::wfilebuf
std::ifstream
std::wifstream
std::ofstream
std::wofstream
std::fstream
std::wfstream
Definido no header `<sstream>`
std::stringbuf
std::wstringbuf
std::istringstream
std::wistringstream
std::ostringstream
std::wostringstream
std::stringstream
std::wstringstream
Definido no header `<spanstream>`
std::spanbuf (C++23)
std::wspanbuf (C++23)
std::ispanstream (C++23)
std::wispanstream (C++23)
std::ospanstream (C++23)
std::wospanstream (C++23)
std::spanstream (C++23)
std::wspanstream (C++23)
Definido no header `<syncstream>`
std::syncbuf (C++20)
std::wsyncbuf (C++20)
std::osyncstream (C++20)
std::wosyncstream (C++20)
```

#### Objetos de stream padrão predefinidos

Definido no header `[<iostream>](<#/doc/header/iostream>)`
---
[ cinwcin](<#/doc/io/cin>) | lê do stream de entrada C padrão [stdin](<#/doc/io/c/std_streams>)
(objeto global)
[ coutwcout](<#/doc/io/cout>) | escreve para o stream de saída C padrão [stdout](<#/doc/io/c/std_streams>)
(objeto global)
[ cerrwcerr](<#/doc/io/cerr>) | escreve para o stream de erro C padrão [stderr](<#/doc/io/c/std_streams>), sem buffer
(objeto global)
[ clogwclog](<#/doc/io/clog>) | escreve para o stream de erro C padrão [stderr](<#/doc/io/c/std_streams>)
(objeto global)

#### [Manipuladores de E/S](<#/doc/io/manip>)

A biblioteca de E/S baseada em stream usa [manipuladores de E/S](<#/doc/io/manip>) (por exemplo, [std::boolalpha](<#/doc/io/manip/boolalpha>), [std::hex](<#/doc/io/manip/hex>), etc.) para controlar o comportamento dos streams.

#### Tipos

Os seguintes tipos auxiliares são definidos:

Definido no header `[<ios>](<#/doc/header/ios>)`
---
[ streamoff](<#/doc/io/streamoff>) | representa a posição relativa de arquivo/stream (offset de fpos), suficiente para representar qualquer tamanho de arquivo
(typedef)
[ streamsize](<#/doc/io/streamsize>) | representa o número de caracteres transferidos em uma operação de E/S ou o tamanho de um buffer de E/S
(typedef)
[ fpos](<#/doc/io/fpos>) | representa a posição absoluta em um stream ou um arquivo
(class template)

Os seguintes nomes de typedef para [std::fpos](<#/doc/io/fpos>)<[std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> são fornecidos:

Definido no header `[<iosfwd>](<#/doc/header/iosfwd>)`
---
Tipo | Definição
---|---
`std::streampos` | [std::fpos](<#/doc/io/fpos>)<[std::char_traits](<#/doc/string/char_traits>)&lt;char&gt;::state_type>
`std::wstreampos` | [std::fpos](<#/doc/io/fpos>)<[std::char_traits](<#/doc/string/char_traits>)<wchar_t>::state_type>
`std::u8streampos` (C++20) | [std::fpos](<#/doc/io/fpos>)<[std::char_traits](<#/doc/string/char_traits>)<char8_t>::state_type>
`std::u16streampos` (C++11) | [std::fpos](<#/doc/io/fpos>)<[std::char_traits](<#/doc/string/char_traits>)<char16_t>::state_type>
`std::u32streampos` (C++11) | [std::fpos](<#/doc/io/fpos>)<[std::char_traits](<#/doc/string/char_traits>)<char32_t>::state_type>

#### Interface de categoria de erro (desde C++11)

Definido no header `[<ios>](<#/doc/header/ios>)`
---
[ io_errc](<#/doc/io/io_errc>)(C++11) | os códigos de erro de stream de E/S
(enum)
[ iostream_category](<#/doc/io/iostream_category>)(C++11) | identifica a categoria de erro do iostream
(função)

### Funções de impressão (desde C++23)

As funções da família de impressão com reconhecimento Unicode que realizam E/S formatada em texto já formatado. Elas trazem todos os benefícios de desempenho de [std::format](<#/doc/utility/format/format>), são independentes de locale por padrão, reduzem o estado global, evitam alocar um objeto [std::string](<#/doc/string/basic_string>) temporário e chamar operator<<, e, em geral, tornam a formatação mais eficiente em comparação com [iostreams](<#/doc/io>) e [stdio](<#/doc/io>).

As seguintes funções tipo print são fornecidas:

Definido no header `[<print>](<#/doc/header/print>)`
---
[ print](<#/doc/io/print>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) ou um stream de arquivo usando representação [formatada](<#/doc/utility/format>) dos argumentos
(function template)
[ println](<#/doc/io/println>)(C++23) | o mesmo que std::print, exceto que cada impressão é terminada por uma nova linha adicional
(function template)
[ vprint_unicodevprint_unicode_buffered](<#/doc/io/vprint_unicode>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) com capacidade Unicode ou um stream de arquivo usando representação de argumento [type-erased](<#/doc/utility/format/basic_format_args>)
(função)
[ vprint_nonunicodevprint_nonunicode_buffered](<#/doc/io/vprint_nonunicode>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) ou um stream de arquivo usando representação de argumento [type-erased](<#/doc/utility/format/basic_format_args>)
(função)
Definido no header `[<ostream>](<#/doc/header/ostream>)`

```cpp
 print(std::ostream)(C++23)
(function template)
 println(std::ostream)(C++23)
(function template)
```

### [E/S estilo C](<#/doc/io/c>)

C++ também inclui as [funções de entrada/saída definidas por C](<#/doc/io/c>), como [std::fopen](<#/doc/io/c/fopen>), [std::getc](<#/doc/io/c/fgetc>), etc.

### Veja também

[Biblioteca Filesystem](<#/doc/filesystem>) (desde C++17)
---