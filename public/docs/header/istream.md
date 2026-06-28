# Cabeçalho da biblioteca padrão &lt;istream&gt;

Este cabeçalho faz parte da biblioteca de [entrada/saída](<#/doc/io>).

### Classes

---
[ basic_istream](<#/doc/io/basic_istream>) | envolve um dado dispositivo abstrato ([std::basic_streambuf](<#/doc/io/basic_streambuf>))
e fornece uma interface de entrada de alto nível
(modelo de classe)
[std::istream](<#/doc/io/basic_istream>) | [std::basic_istream](<#/doc/io/basic_istream>)&lt;char&gt;
(typedef)
[std::wistream](<#/doc/io/basic_istream>) | [std::basic_istream](<#/doc/io/basic_istream>)<wchar_t>
(typedef)
[ basic_iostream](<#/doc/io/basic_iostream>) | envolve um dado dispositivo abstrato ([std::basic_streambuf](<#/doc/io/basic_streambuf>))
e fornece uma interface de entrada/saída de alto nível
(modelo de classe)
[std::iostream](<#/doc/io/basic_iostream>) | [std::basic_iostream](<#/doc/io/basic_iostream>)&lt;char&gt;
(typedef)
[std::wiostream](<#/doc/io/basic_iostream>) | [std::basic_iostream](<#/doc/io/basic_iostream>)<wchar_t>
(typedef)

### Funções

[ operator>>(std::basic_istream)](<#/doc/io/basic_istream/operator_gtgt2>) | extrai caracteres e arrays de caracteres
(modelo de função)

##### Manipuladores

[ ws](<#/doc/io/manip/ws>) | consome espaços em branco
(modelo de função)

### Sinopse
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_istream;
    
      using istream  = basic_istream<char>;
      using wistream = basic_istream<wchar_t>;
    
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_iostream;
    
      using iostream  = basic_iostream<char>;
      using wiostream = basic_iostream<wchar_t>;
    
      template<class CharT, class Traits>
        basic_istream<CharT, Traits>& ws(basic_istream<CharT, Traits>& is);
    
      template<class Istream, class T>
        Istream&& operator>>(Istream&& is, T&& x);
    }
```

#### Modelo de classe [std::basic_istream](<#/doc/io/basic_istream>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
      class basic_istream : virtual public basic_ios<CharT, Traits> {
      public:
        // tipos (herdados de basic_ios)
        using char_type   = CharT;
        using int_type    = typename Traits::int_type;
        using pos_type    = typename Traits::pos_type;
        using off_type    = typename Traits::off_type;
        using traits_type = Traits;
    
        // construtor/destrutor
        explicit basic_istream(basic_streambuf<CharT, Traits>* sb);
        virtual ~basic_istream();
    
        // prefixo/sufixo
        class sentry;
    
        // entrada formatada
        basic_istream& operator>>(basic_istream& (*pf)(basic_istream&));
        basic_istream& operator>>(basic_ios<CharT, Traits>& (*pf)(basic_ios<CharT, Traits>&));
        basic_istream& operator>>(ios_base& (*pf)(ios_base&));
    
        basic_istream& operator>>(bool& n);
        basic_istream& operator>>(short& n);
        basic_istream& operator>>(unsigned short& n);
        basic_istream& operator>>(int& n);
        basic_istream& operator>>(unsigned int& n);
        basic_istream& operator>>(long& n);
        basic_istream& operator>>(unsigned long& n);
        basic_istream& operator>>(long long& n);
        basic_istream& operator>>(unsigned long long& n);
        basic_istream& operator>>(float& f);
        basic_istream& operator>>(double& f);
        basic_istream& operator>>(long double& f);
        basic_istream& operator>>(/*extended-floating-point-type*/& f);
    
        basic_istream& operator>>(void*& p);
        basic_istream& operator>>(basic_streambuf<char_type, Traits>* sb);
    
        // entrada não formatada
        streamsize gcount() const;
        int_type get();
        basic_istream& get(char_type& c);
        basic_istream& get(char_type* s, streamsize n);
        basic_istream& get(char_type* s, streamsize n, char_type delim);
        basic_istream& get(basic_streambuf<char_type, Traits>& sb);
        basic_istream& get(basic_streambuf<char_type, Traits>& sb, char_type delim);
    
        basic_istream& getline(char_type* s, streamsize n);
        basic_istream& getline(char_type* s, streamsize n, char_type delim);
    
        basic_istream& ignore(streamsize n = 1, int_type delim = Traits::eof());
        int_type       peek();
        basic_istream& read    (char_type* s, streamsize n);
        streamsize     readsome(char_type* s, streamsize n);
    
        basic_istream& putback(char_type c);
        basic_istream& unget();
        int sync();
    
        pos_type tellg();
        basic_istream& seekg(pos_type);
        basic_istream& seekg(off_type, ios_base::seekdir);
    
      protected:
        // construtor de cópia/movimentação
        basic_istream(const basic_istream&) = delete;
        basic_istream(basic_istream&& rhs);
    
        // atribuição e troca
        basic_istream& operator=(const basic_istream&) = delete;
        basic_istream& operator=(basic_istream&& rhs);
        void swap(basic_istream& rhs);
      };
    
      // modelos de extração de caracteres
      template<class CharT, class Traits>
        basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>&, CharT&);
      template<class Traits>
        basic_istream<char, Traits>& operator>>(basic_istream<char, Traits>&, unsigned char&);
      template<class Traits>
        basic_istream<char, Traits>& operator>>(basic_istream<char, Traits>&, signed char&);
    
      template<class CharT, class Traits, size_t N>
        basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>&, CharT(&)[N]);
      template<class Traits, size_t N>
        basic_istream<char, Traits>& operator>>(basic_istream<char, Traits>&, unsigned char(&)[N]);
      template<class Traits, size_t N>
        basic_istream<char, Traits>& operator>>(basic_istream<char, Traits>&, signed char(&)[N]);
    }
```

#### Classe [std::basic_istream::sentry](<#/doc/io/basic_istream/sentry>)
```cpp
    namespace std {
      template<class CharT, class Traits>
      class basic_istream<CharT, Traits>::sentry {
        bool ok_;                   // apenas para exposição
      public:
        explicit sentry(basic_istream& is, bool noskipws = false);
        ~sentry();
        explicit operator bool() const { return ok_; }
        sentry(const sentry&) = delete;
        sentry& operator=(const sentry&) = delete;
      };
    }
```

#### Modelo de classe [std::basic_iostream](<#/doc/io/basic_iostream>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
      class basic_iostream
        : public basic_istream<CharT, Traits>,
          public basic_ostream<CharT, Traits> {
      public:
        using char_type   = CharT;
        using int_type    = typename Traits::int_type;
        using pos_type    = typename Traits::pos_type;
        using off_type    = typename Traits::off_type;
        using traits_type = Traits;
    
        // construtor
        explicit basic_iostream(basic_streambuf<CharT, Traits>* sb);
    
        // destrutor
        virtual ~basic_iostream();
    
      protected:
        // construtor
        basic_iostream(const basic_iostream&) = delete;
        basic_iostream(basic_iostream&& rhs);
    
        // atribuição e troca
        basic_iostream& operator=(const basic_iostream&) = delete;
        basic_iostream& operator=(basic_iostream&& rhs);
        void swap(basic_iostream& rhs);
      };
    }
```