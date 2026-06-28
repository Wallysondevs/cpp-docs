# std::basic_ostringstream&lt;CharT,Traits,Allocator&gt;::basic_ostringstream

```cpp
  // (1)
explicit basic_ostringstream( std::ios_base::openmode mode =
std::ios_base::out );  // (até C++11)
explicit basic_ostringstream( std::ios_base::openmode mode );  // (desde C++11)
basic_ostringstream()
: basic_ostringstream(std::ios_base::out) {}  // (2) (desde C++11)
explicit basic_ostringstream
( const std::basic_string<CharT, Traits, Allocator>& str,
std::ios_base::openmode mode =
std::ios_base::out );  // (3)
explicit basic_ostringstream
( std::basic_string<CharT, Traits, Allocator>&& str,
std::ios_base::openmode mode =
std::ios_base::out );  // (4) (desde C++20)
basic_ostringstream( std::ios_base::openmode mode, const Allocator& a );  // (5) (desde C++20)
template< class SAlloc >
basic_ostringstream( const std::basic_string<CharT, Traits, SAlloc>& str,
std::ios_base::openmode mode, const Allocator& a );  // (6) (desde C++20)
template< class SAlloc >
basic_ostringstream( const std::basic_string<CharT, Traits, SAlloc>& str,
const Allocator& a )
: basic_ostringstream(str, std::ios_base::out, a) {}  // (7) (desde C++20)
template< class SAlloc >
explicit basic_ostringstream
( const std::basic_string<CharT, Traits, SAlloc>& str,
std::ios_base::openmode mode =
std::ios_base::out );  // (8) (desde C++20)
template< class StringViewLike >
explicit basic_ostringstream
( const StringViewLike& t,
std::ios_base::openmode mode =
std::ios_base::out );  // (9) (desde C++26)
template< class StringViewLike >
basic_ostringstream( const StringViewLike& t,
std::ios_base::openmode mode, const Allocator& a );  // (10) (desde C++26)
template< class StringViewLike >
basic_ostringstream( const StringViewLike& t, const Allocator& a );  // (11) (desde C++26)
basic_ostringstream( basic_ostringstream&& other );  // (12) (desde C++11)
```

  
Constrói um novo stream de string.

Dado

  * `base_type` como [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>, e
  * `buf_type` como [std::basic_stringbuf](<#/doc/io/basic_stringbuf>)<CharT, Traits, Allocator>,

a base [std::basic_ostream](<#/doc/io/basic_ostream>) e o membro de dados `_sb_` (apenas para exposição) são inicializados da seguinte forma.

Sobrecarga  | [std::basic_ostream](<#/doc/io/basic_ostream>) base  | `_sb_`  
---|---|---
(1) | base_type([std::addressof](<#/doc/memory/addressof>)(sb))[1](<#/doc/io/basic_ostringstream/basic_ostringstream>) | buf_type(mode | [std::ios_base::out](<#/doc/io/ios_base/openmode>))  
(2) | buf_type([std::ios_base::out](<#/doc/io/ios_base/openmode>))  
(3) | buf_type(str, mode | [std::ios_base::out](<#/doc/io/ios_base/openmode>))  
(4) | buf_type(std::move(str), mode | [std::ios_base::out](<#/doc/io/ios_base/openmode>))  
(5) | buf_type(mode | [std::ios_base::out](<#/doc/io/ios_base/openmode>), a)  
(6) | buf_type(str, mode | [std::ios_base::out](<#/doc/io/ios_base/openmode>), a)  
(7) | buf_type(str, [std::ios_base::out](<#/doc/io/ios_base/openmode>), a)  
(8) | buf_type(str, mode | [std::ios_base::out](<#/doc/io/ios_base/openmode>))  
(9) | [std::addressof](<#/doc/memory/addressof>)(sb) | {t, mode | [std::ios_base::out](<#/doc/io/ios_base/openmode>), Allocator()}  
(10) | {t, mode | [std::ios_base::out](<#/doc/io/ios_base/openmode>), a}  
(11) | {t, [std::ios_base::out](<#/doc/io/ios_base/openmode>), a}  
(12) | move constructed from other's [std::basic_ostream](<#/doc/io/basic_ostream>) base  | move constructed from other.sb  
  
  1. [↑](<#/doc/io/basic_ostringstream/basic_ostringstream>) A base [std::basic_iostream](<#/doc/io/basic_iostream>) foi inicializada com base_type(&sb) (para as sobrecargas (1,3)) até C++11.

8) Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_same_v](<#/doc/types/is_same>)<SAlloc, Allocator> for falso.

9-11) Estas sobrecargas participam da resolução de sobrecarga apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&, [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for verdadeiro.

### Parâmetros

str  |  \-  |  string a ser usada como conteúdo inicial do stream de string t  |  \-  |  um objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) a ser usado como conteúdo inicial do stream de string a  |  \-  |  alocador usado para alocar o conteúdo do stream de string mode  |  \-  |  especifica o modo de abertura do stream. É um [BitmaskType](<#/doc/named_req/BitmaskType>), as seguintes constantes são definidas:  |  Constante  |  Explicação [`app`](<#/doc/io/ios_base/openmode>) |  posiciona no final do stream antes de cada escrita
---|---
[`binary`](<#/doc/io/ios_base/openmode>) |  abre em [modo binário](<#/doc/io/c/FILE>)  
[`in`](<#/doc/io/ios_base/openmode>) |  abre para leitura   
[`out`](<#/doc/io/ios_base/openmode>) |  abre para escrita   
[`trunc`](<#/doc/io/ios_base/openmode>) |  descarta o conteúdo do stream ao abrir   
[`ate`](<#/doc/io/ios_base/openmode>) |  posiciona no final do stream imediatamente após abrir   
[`noreplace`](<#/doc/io/ios_base/openmode>) (C++23) |  abre em modo exclusivo   
other  |  \-  |  outro stream de string para usar como fonte   
  
### Notas

A construção de objetos `basic_ostringstream` descartáveis em um loop apertado, como quando usados para conversão de string, pode ser significativamente mais custosa do que chamar [str()](<#/doc/io/basic_ostringstream/str>) para reutilizar o mesmo objeto.

Macro de teste de funcionalidade [Feature-test](<#/doc/utility/feature_test>) | Valor | Std | Funcionalidade   
---|---|---|---
[`__cpp_lib_sstream_from_string_view`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Interface de [std::stringstream](<#/doc/io/basic_stringstream>)s com [std::string_view](<#/doc/string/basic_string_view>), ([9-11](<#/doc/io/basic_ostringstream/basic_ostringstream>))  
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        // default constructor (input/output stream)
        std::stringstream buf1;
        buf1 << 7;
        int n = 0;
        buf1 >> n;
        std::cout << "buf1 = " << buf1.str() << " n = " << n << '\n';
     
        // input stream
        std::istringstream inbuf("-10");
        inbuf >> n;
        std::cout << "n = " << n << '\n';
     
        // output stream in append mode (C++11)
        std::ostringstream buf2("test", std::ios_base::ate);
        buf2 << '1';
        std::cout << buf2.str() << '\n';
    }
```

Saída:
```
    buf1 = 7 n = 7
    n = -10
    test1
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11  | o construtor padrão era explícito  | tornado implícito   
  
### Veja também

[ str](<#/doc/io/basic_ostringstream/str>) |  obtém ou define o conteúdo do objeto de dispositivo de string subjacente   
(função membro pública)  
[ (construtor)](<#/doc/io/basic_stringbuf/basic_stringbuf>) |  constrói um objeto `basic_stringbuf`   
(função membro pública de `std::basic_stringbuf<CharT,Traits,Allocator>`)