# std::basic_spanbuf&lt;CharT,Traits&gt;::setbuf

protected:  
[std::basic_streambuf](<#/doc/io/basic_streambuf>)<CharT, Traits>* setbuf( CharT *s, [std::streamsize](<#/doc/io/streamsize>) n ) override; |  |  (desde C++23)  

  
Faz com que o `basic_spanbuf` realize E/S (entrada/saída) no buffer `[`s`, `s + n`)`. Equivalentemente, chama this->span([std::span](<#/doc/container/span>)&lt;CharT&gt;(s, n)) e então retorna this. 

Bits definidos no modo de abertura  
(afetando ponteiros para a área de leitura)  | Valor de retorno após a definição   
[eback()](<#/doc/io/basic_streambuf/gptr>) | [gptr()](<#/doc/io/basic_streambuf/gptr>) | [egptr()](<#/doc/io/basic_streambuf/gptr>)  
[std::ios_base::in](<#/doc/io/ios_base/openmode>) | s | s | s + n  
Bits definidos no modo de abertura  
(afetando ponteiros para a área de escrita)  | Valor de retorno após a definição [pbase()](<#/doc/io/basic_streambuf/pptr>) | [pptr()](<#/doc/io/basic_streambuf/pptr>) | [epptr()](<#/doc/io/basic_streambuf/pptr>) [std::ios_base::out](<#/doc/io/ios_base/openmode>) && ![std::ios_base::ate](<#/doc/io/ios_base/openmode>) | s | s | s + n
---|---|---|---
[std::ios_base::out](<#/doc/io/ios_base/openmode>) && [std::ios_base::ate](<#/doc/io/ios_base/openmode>) | s | s + n | s + n  
  
Esta função é virtual protegida, ela só pode ser chamada através de `pubsetbuf()` ou de funções membro de uma classe definida pelo usuário derivada de std::basic_spanbuf. 

### Parâmetros

s  |  \-  |  ponteiro para o primeiro `CharT` no buffer fornecido pelo usuário   
---|---|---
n  |  \-  |  o número de elementos `CharT` no buffer fornecido pelo usuário   
  
### Valor de retorno

this

### Notas

O stream buffer obsoleto [std::strstreambuf](<#/doc/io/strstreambuf>) ou o dispositivo boost.IOStreams [`boost::basic_array`](<https://www.boost.org/doc/libs/release/libs/iostreams/doc/classes/array.html#array>) também podem implementar o buffering de E/S sobre um array de caracteres fornecido pelo usuário. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ pubsetbuf](<#/doc/io/basic_streambuf/pubsetbuf>) |  invoca setbuf()   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ setbuf](<#/doc/io/basic_stringbuf/setbuf>)[virtual] |  tenta substituir a sequência de caracteres controlada por um array   
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ setbuf](<#/doc/io/strstreambuf/setbuf>)[virtual] |  tenta substituir a sequência de caracteres controlada por um array   
(função membro virtual protegida de `std::strstreambuf`)