# Cabeçalho da biblioteca padrão &lt;iostream&gt;

Este cabeçalho faz parte da biblioteca de [Entrada/saída](<#/doc/io>).

Incluir `<iostream>` se comporta como se definisse um objeto com duração de armazenamento estática do tipo [std::ios_base::Init](<#/doc/io/ios_base/Init>), cujo construtor inicializa os objetos de stream padrão se for o primeiro objeto `std::ios_base::Init` a ser construído, e cujo destrutor descarrega esses objetos (exceto `cin` e `wcin`) se for o último objeto `std::ios_base::Init` a ser destruído.

### Inclusões

---
[ &lt;ios&gt;](<#/doc/header/ios>)(desde C++11) | classe [std::ios_base](<#/doc/io/ios_base>), modelo de classe [std::basic_ios](<#/doc/io/basic_ios>) e typedefs
---|---
[ &lt;streambuf&gt;](<#/doc/header/streambuf>)(desde C++11) | modelo de classe [std::basic_streambuf](<#/doc/io/basic_streambuf>)
[ &lt;istream&gt;](<#/doc/header/istream>)(desde C++11) | modelo de classe [std::basic_istream](<#/doc/io/basic_istream>) e typedefs
[ &lt;ostream&gt;](<#/doc/header/ostream>)(desde C++11) | modelos de classe [std::basic_ostream](<#/doc/io/basic_ostream>), [std::basic_iostream](<#/doc/io/basic_iostream>) e typedefs

### Objetos

[ cinwcin](<#/doc/io/cin>) | lê do stream de entrada C padrão [stdin](<#/doc/io/c/std_streams>)
(objeto global)
[ coutwcout](<#/doc/io/cout>) | escreve para o stream de saída C padrão [stdout](<#/doc/io/c/std_streams>)
(objeto global)
[ cerrwcerr](<#/doc/io/cerr>) | escreve para o stream de erro C padrão [stderr](<#/doc/io/c/std_streams>), sem buffer
(objeto global)
[ clogwclog](<#/doc/io/clog>) | escreve para o stream de erro C padrão [stderr](<#/doc/io/c/std_streams>)
(objeto global)

### Sinopse
```cpp
    #include <ios>
    #include <streambuf>
    #include <istream>
    #include <ostream>
    
    namespace std {
      extern istream cin;
      extern ostream cout;
      extern ostream cerr;
      extern ostream clog;
    
      extern wistream wcin;
      extern wostream wcout;
      extern wostream wcerr;
      extern wostream wclog;
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 155](<https://cplusplus.github.io/LWG/issue155>) | C++98 | o tipo do objeto estático era `std::basic_ios::Init` (não estritamente errado, mas a redação era enganosa) | corrigido para `std::ios_base::Init`
[LWG 1123](<https://cplusplus.github.io/LWG/issue1123>) | C++98 | incluir `<iostream>` não garantia a construção de objetos [std::ios_base::Init](<#/doc/io/ios_base/Init>) | garante
