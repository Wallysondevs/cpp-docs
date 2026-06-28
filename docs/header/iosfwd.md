# Cabeçalho da biblioteca padrão &lt;iosfwd&gt;

Este cabeçalho contém declarações antecipadas para a biblioteca [Input/output](<#/doc/io>).
  
### Declarações antecipadas  
  
---  
Definido no cabeçalho `[<string>](<#/doc/header/string>)`  

```cpp
std::char_traits
std::char_traits<char>
std::char_traits<wchar_t>
std::char_traits<char8_t> (C++20)
std::char_traits<char16_t> (C++11)
std::char_traits<char32_t> (C++11)
Definido no cabeçalho `<memory>`
 allocator
(modelo de classe)
Definido no cabeçalho `<ios>`
 basic_ios
(modelo de classe)
 fpos
(modelo de classe)
Definido no cabeçalho `<streambuf>`
 basic_streambuf
(modelo de classe)
Definido no cabeçalho `<ostream>`
 basic_ostream
e fornece uma interface de saída de alto nível
(modelo de classe)
Definido no cabeçalho `<istream>`
 basic_istream
e fornece uma interface de entrada de alto nível
(modelo de classe)
 basic_iostream
e fornece uma interface de entrada/saída de alto nível
(modelo de classe)
Definido no cabeçalho `<fstream>`
 basic_filebuf
(modelo de classe)
 basic_ifstream
(modelo de classe)
 basic_ofstream
(modelo de classe)
 basic_fstream
(modelo de classe)
Definido no cabeçalho `<sstream>`
 basic_stringbuf
(modelo de classe)
 basic_istringstream
(modelo de classe)
 basic_ostringstream
(modelo de classe)
 basic_stringstream
(modelo de classe)
Definido no cabeçalho `<syncstream>`
 basic_syncbuf(C++20)
(modelo de classe)
 basic_osyncstream(C++20)
(modelo de classe)
Definido no cabeçalho `<spanstream>`
 basic_spanbuf(C++23)
(modelo de classe)
 basic_ispanstream(C++23)
(modelo de classe)
 basic_ospanstream(C++23)
(modelo de classe)
 basic_spanstream(C++23)
(modelo de classe)
Definido no cabeçalho `<strstream>`
 strstreambuf(obsoleto em C++98)(removido em C++26)
(classe)
 istrstream(obsoleto em C++98)(removido em C++26)
(classe)
 ostrstream(obsoleto em C++98)(removido em C++26)
(classe)
 strstream(obsoleto em C++98)(removido em C++26)
(classe)
```

  
### Typedefs e especializações  
  
[std::streampos](<#/doc/io/fpos>) | [std::fpos](<#/doc/io/fpos>)<[std::char_traits](<#/doc/string/char_traits>)&lt;char&gt;::state_type>  
---|---
[std::wstreampos](<#/doc/io/fpos>) | [std::fpos](<#/doc/io/fpos>)<[std::char_traits](<#/doc/string/char_traits>)<wchar_t>::state_type>  
[std::u8streampos](<#/doc/io/fpos>) | [std::fpos](<#/doc/io/fpos>)<[std::char_traits](<#/doc/string/char_traits>)<char8_t>::state_type>  
[std::u16streampos](<#/doc/io/fpos>) | [std::fpos](<#/doc/io/fpos>)<[std::char_traits](<#/doc/string/char_traits>)<char16_t>::state_type>  
[std::u32streampos](<#/doc/io/fpos>) | [std::fpos](<#/doc/io/fpos>)<[std::char_traits](<#/doc/string/char_traits>)<char32_t>::state_type>  
Além disso, para cada modelo de classe `std::basic__T_` declarado neste cabeçalho, `std::_T_` e `std::w _T_` são declarados como um sinônimo de `std::basic__T_ <char>` e `std::basic__T_ <wchar_t>`, respectivamente.   
  
### Sinopse
```cpp
    namespace std {
      template<class CharT> struct char_traits;
      template<> struct char_traits<char>;
      template<> struct char_traits<char8_t>;
      template<> struct char_traits<char16_t>;
      template<> struct char_traits<char32_t>;
      template<> struct char_traits<wchar_t>;
    
      template<class T> class allocator;
    
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_ios;
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_streambuf;
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_istream;
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_ostream;
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_iostream;
    
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
        class basic_stringbuf;
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
        class basic_istringstream;
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
        class basic_ostringstream;
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
        class basic_stringstream;
    
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_filebuf;
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_ifstream;
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_ofstream;
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_fstream;
    
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
        class basic_syncbuf;
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
        class basic_osyncstream;
    
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_spanbuf;
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_ispanstream;
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_ospanstream;
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_spanstream;
    
      template<class CharT, class Traits = char_traits<CharT>>
        class istreambuf_iterator;
      template<class CharT, class Traits = char_traits<CharT>>
        class ostreambuf_iterator;
    
      using ios  = basic_ios<char>;
      using wios = basic_ios<wchar_t>;
    
      using streambuf = basic_streambuf<char>;
      using istream   = basic_istream<char>;
      using ostream   = basic_ostream<char>;
      using iostream  = basic_iostream<char>;
    
      using stringbuf     = basic_stringbuf<char>;
      using istringstream = basic_istringstream<char>;
      using ostringstream = basic_ostringstream<char>;
      using stringstream  = basic_stringstream<char>;
    
      using filebuf  = basic_filebuf<char>;
      using ifstream = basic_ifstream<char>;
      using ofstream = basic_ofstream<char>;
      using fstream  = basic_fstream<char>;
    
      using syncbuf     = basic_syncbuf<char>;
      using osyncstream = basic_osyncstream<char>;
    
      using spanbuf     = basic_spanbuf<char>;
      using ispanstream = basic_ispanstream<char>;
      using ospanstream = basic_ospanstream<char>;
      using spanstream  = basic_spanstream<char>;
    
      using wstreambuf = basic_streambuf<wchar_t>;
      using wistream   = basic_istream<wchar_t>;
      using wostream   = basic_ostream<wchar_t>;
      using wiostream  = basic_iostream<wchar_t>;
    
      using wstringbuf     = basic_stringbuf<wchar_t>;
      using wistringstream = basic_istringstream<wchar_t>;
      using wostringstream = basic_ostringstream<wchar_t>;
      using wstringstream  = basic_stringstream<wchar_t>;
    
      using wfilebuf  = basic_filebuf<wchar_t>;
      using wifstream = basic_ifstream<wchar_t>;
      using wofstream = basic_ofstream<wchar_t>;
      using wfstream  = basic_fstream<wchar_t>;
    
      using wsyncbuf     = basic_syncbuf<wchar_t>;
      using wosyncstream = basic_osyncstream<wchar_t>;
    
      using wspanbuf     = basic_spanbuf<wchar_t>;
      using wispanstream = basic_ispanstream<wchar_t>;
      using wospanstream = basic_ospanstream<wchar_t>;
      using wspanstream  = basic_spanstream<wchar_t>;
    
      template<class State> class fpos;
      using streampos = fpos<char_traits<char>::state_type>;
      using wstreampos = fpos<char_traits<wchar_t>::state_type>;
      using u8streampos = fpos<char_traits<char8_t>::state_type>;
      using u16streampos = fpos<char_traits<char16_t>::state_type>;
      using u32streampos = fpos<char_traits<char32_t>::state_type>;
    }
    
    // deprecated
    namespace std {
      class strstreambuf;
      class istrstream;
      class ostrstream;
      class strstream;
    }
```