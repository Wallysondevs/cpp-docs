# std::basic_streambuf&lt;CharT,Traits&gt;::basic_streambuf

```cpp
protected:
basic_streambuf();  // (1)
protected:
basic_streambuf(const basic_streambuf& rhs);  // (2) (desde C++11)
```

  
1) Constrói o objeto `basic_streambuf`, inicializa os seis membros ponteiro (`eback()`, `gptr()`, `egptr()`, `pbase()`, `pptr()`, e `epptr()`) para valores de ponteiro nulo, e o membro `locale` para [std::locale](<#/doc/locale/locale>)(), uma cópia da locale global C++ no momento da construção.

2) Constrói uma cópia de `rhs`, inicializando os seis ponteiros e o objeto `locale` com as cópias dos valores mantidos por `rhs`. Note que esta é uma cópia rasa (shallow copy): os ponteiros do `basic_streambuf` recém-construído estão apontando para o mesmo array de caracteres que os ponteiros de `rhs`.

Ambos os construtores são protegidos e são chamados apenas pelas classes `streambuf` concretas, como [std::basic_filebuf](<#/doc/io/basic_filebuf>), [std::basic_stringbuf](<#/doc/io/basic_stringbuf>), ou [std::strstreambuf](<#/doc/io/strstreambuf>). 

### Parâmetros

rhs  |  \-  |  um objeto streambuf para copiar   
  
### Notas

Até C++11, era não especificado se `basic_streambuf` ou qualquer de suas classes derivadas era [CopyConstructible](<#/doc/named_req/CopyConstructible>) ([LWG issue 421](<https://cplusplus.github.io/LWG/issue421>)), e diferentes implementações da biblioteca C++ forneciam opções distintas. 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ (construtor)](<#/doc/io/basic_filebuf/basic_filebuf>) |  constrói um objeto `basic_filebuf`   
(função membro pública de `std::basic_filebuf<CharT,Traits>`)  
[ (construtor)](<#/doc/io/basic_stringbuf/basic_stringbuf>) |  constrói um objeto `basic_stringbuf`   
(função membro pública de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ (construtor)](<#/doc/io/strstreambuf/strstreambuf>) |  constrói um objeto `strstreambuf`   
(função membro pública de `std::strstreambuf`)