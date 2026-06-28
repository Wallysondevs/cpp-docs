# Cabeçalho da biblioteca padrão &lt;fstream&gt;

Este cabeçalho faz parte da biblioteca [Input/Output](<#/doc/io>).

### Classes

---
[ basic_filebuf](<#/doc/io/basic_filebuf>) | implementa um dispositivo de arquivo bruto
(modelo de classe)
[ basic_ifstream](<#/doc/io/basic_ifstream>) | implementa operações de entrada de stream de arquivo de alto nível
(modelo de classe)
[ basic_ofstream](<#/doc/io/basic_ofstream>) | implementa operações de saída de stream de arquivo de alto nível
(modelo de classe)
[ basic_fstream](<#/doc/io/basic_fstream>) | implementa operações de entrada/saída de stream de arquivo de alto nível
(modelo de classe)
`filebuf` | [std::basic_filebuf](<#/doc/io/basic_filebuf>)&lt;char&gt;
(typedef)
`wfilebuf` | [std::basic_filebuf](<#/doc/io/basic_filebuf>)<wchar_t>
(typedef)
`ifstream` | [std::basic_ifstream](<#/doc/io/basic_ifstream>)&lt;char&gt;
(typedef)
`wifstream` | [std::basic_ifstream](<#/doc/io/basic_ifstream>)<wchar_t>
(typedef)
`ofstream` | [std::basic_ofstream](<#/doc/io/basic_ofstream>)&lt;char&gt;
(typedef)
`wofstream` | [std::basic_ofstream](<#/doc/io/basic_ofstream>)<wchar_t>
(typedef)
`fstream` | [std::basic_fstream](<#/doc/io/basic_fstream>)&lt;char&gt;
(typedef)
`wfstream` | [std::basic_fstream](<#/doc/io/basic_fstream>)<wchar_t>
(typedef)

### Funções

[ std::swap(std::basic_filebuf)](<#/doc/io/basic_filebuf/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ std::swap(std::basic_ifstream)](<#/doc/io/basic_ifstream/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ std::swap(std::basic_ofstream)](<#/doc/io/basic_ofstream/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ std::swap(std::basic_fstream)](<#/doc/io/basic_fstream/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)

### Sinopse
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_filebuf;
      using filebuf  = basic_filebuf<char>;
      using wfilebuf = basic_filebuf<wchar_t>;
    
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_ifstream;
      using ifstream  = basic_ifstream<char>;
      using wifstream = basic_ifstream<wchar_t>;
    
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_ofstream;
      using ofstream  = basic_ofstream<char>;
      using wofstream = basic_ofstream<wchar_t>;
    
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_fstream;
      using fstream  = basic_fstream<char>;
      using wfstream = basic_fstream<wchar_t>;
    }
```

#### Modelo de classe [std::basic_filebuf](<#/doc/io/basic_filebuf>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
      class basic_filebuf : public basic_streambuf<CharT, Traits> {
      public:
        using char_type   = CharT;
        using int_type    = typename Traits::int_type;
        using pos_type    = typename Traits::pos_type;
        using off_type    = typename Traits::off_type;
        using traits_type = Traits;
    
        // construtores/destrutor
        basic_filebuf();
        basic_filebuf(const basic_filebuf&) = delete;
        basic_filebuf(basic_filebuf&& rhs);
        virtual ~basic_filebuf();
    
        // atribuição e troca
        basic_filebuf& operator=(const basic_filebuf&) = delete;
        basic_filebuf& operator=(basic_filebuf&& rhs);
        void swap(basic_filebuf& rhs);
    
        // membros
        bool is_open() const;
        basic_filebuf* open(const char* s, ios_base::openmode mode);
        basic_filebuf* open(const filesystem::path::value_type* s,
                            ios_base::openmode mode);   // apenas sistemas wide
        basic_filebuf* open(const string& s,
                            ios_base::openmode mode);
        basic_filebuf* open(const filesystem::path& s,
                            ios_base::openmode mode);
        basic_filebuf* close();
    
      protected:
        // funções virtuais sobrescritas
        streamsize showmanyc() override;
        int_type underflow() override;
        int_type uflow() override;
        int_type pbackfail(int_type c = Traits::eof()) override;
        int_type overflow (int_type c = Traits::eof()) override;
    
        basic_streambuf<CharT, Traits>* setbuf(char_type* s,
                                               streamsize n) override;
        pos_type seekoff(off_type off, ios_base::seekdir way,
                         ios_base::openmode which
                          = ios_base::in | ios_base::out) override;
        pos_type seekpos(pos_type sp,
                         ios_base::openmode which
                          = ios_base::in | ios_base::out) override;
        int      sync() override;
        void     imbue(const locale& loc) override;
      };
    
      template<class CharT, class Traits>
        void swap(basic_filebuf<CharT, Traits>& x,
                  basic_filebuf<CharT, Traits>& y);
    }
```

#### Modelo de classe [std::basic_ifstream](<#/doc/io/basic_ifstream>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
      class basic_ifstream : public basic_istream<CharT, Traits> {
      public:
        using char_type   = CharT;
        using int_type    = typename Traits::int_type;
        using pos_type    = typename Traits::pos_type;
        using off_type    = typename Traits::off_type;
        using traits_type = Traits;
    
        // construtores
        basic_ifstream();
        explicit basic_ifstream(const char* s,
                                ios_base::openmode mode = ios_base::in);
        explicit basic_ifstream(const filesystem::path::value_type* s,
                                ios_base::openmode mode = ios_base::in);// apenas sistemas wide
        explicit basic_ifstream(const string& s,
                                ios_base::openmode mode = ios_base::in);
        explicit basic_ifstream(const filesystem::path& s,
                                ios_base::openmode mode = ios_base::in);
        basic_ifstream(const basic_ifstream&) = delete;
        basic_ifstream(basic_ifstream&& rhs);
    
        // atribuição e troca
        basic_ifstream& operator=(const basic_ifstream&) = delete;
        basic_ifstream& operator=(basic_ifstream&& rhs);
        void swap(basic_ifstream& rhs);
    
        // membros
        basic_filebuf<CharT, Traits>* rdbuf() const;
    
        bool is_open() const;
        void open(const char* s, ios_base::openmode mode = ios_base::in);
        void open(const filesystem::path::value_type* s,
                  ios_base::openmode mode = ios_base::in);  // apenas sistemas wide
        void open(const string& s, ios_base::openmode mode = ios_base::in);
        void open(const filesystem::path& s, ios_base::openmode mode = ios_base::in);
        void close();
      private:
        basic_filebuf<CharT, Traits> sb;    // apenas para exposição
      };
    
      template<class CharT, class Traits>
        void swap(basic_ifstream<CharT, Traits>& x,
                  basic_ifstream<CharT, Traits>& y);
    }
```

#### Modelo de classe [std::basic_ofstream](<#/doc/io/basic_ofstream>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
      class basic_ofstream : public basic_ostream<CharT, Traits> {
      public:
        using char_type   = CharT;
        using int_type    = typename Traits::int_type;
        using pos_type    = typename Traits::pos_type;
        using off_type    = typename Traits::off_type;
        using traits_type = Traits;
    
        // construtores
        basic_ofstream();
        explicit basic_ofstream(const char* s,
                                ios_base::openmode mode = ios_base::out);
        explicit basic_ofstream(const filesystem::path::value_type* s,  // apenas sistemas wide
                                ios_base::openmode mode = ios_base::out);
        explicit basic_ofstream(const string& s,
                                ios_base::openmode mode = ios_base::out);
        explicit basic_ofstream(const filesystem::path& s,
                                ios_base::openmode mode = ios_base::out);
        basic_ofstream(const basic_ofstream&) = delete;
        basic_ofstream(basic_ofstream&& rhs);
    
        // atribuição e troca
        basic_ofstream& operator=(const basic_ofstream&) = delete;
        basic_ofstream& operator=(basic_ofstream&& rhs);
        void swap(basic_ofstream& rhs);
    
        // membros
        basic_filebuf<CharT, Traits>* rdbuf() const;
    
        bool is_open() const;
        void open(const char* s, ios_base::openmode mode = ios_base::out);
        void open(const filesystem::path::value_type* s,
                  ios_base::openmode mode = ios_base::out);     // apenas sistemas wide
        void open(const string& s, ios_base::openmode mode = ios_base::out);
        void open(const filesystem::path& s, ios_base::openmode mode = ios_base::out);
        void close();
      private:
        basic_filebuf<CharT, Traits> sb;    // apenas para exposição
      };
    
      template<class CharT, class Traits>
        void swap(basic_ofstream<CharT, Traits>& x,
                  basic_ofstream<CharT, Traits>& y);
    }
```

#### Modelo de classe [std::basic_fstream](<#/doc/io/basic_fstream>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
      class basic_fstream : public basic_iostream<CharT, Traits> {
      public:
        using char_type   = CharT;
        using int_type    = typename Traits::int_type;
        using pos_type    = typename Traits::pos_type;
        using off_type    = typename Traits::off_type;
        using traits_type = Traits;
    
        // construtores
        basic_fstream();
        explicit basic_fstream(
          const char* s,
          ios_base::openmode mode = ios_base::in | ios_base::out);
        explicit basic_fstream(
          const filesystem::path::value_type* s,
          ios_base::openmode mode = ios_base::in | ios_base::out);    // apenas sistemas wide
        explicit basic_fstream(
          const string& s,
          ios_base::openmode mode = ios_base::in | ios_base::out);
        explicit basic_fstream(
          const filesystem::path& s,
          ios_base::openmode mode = ios_base::in | ios_base::out);
        basic_fstream(const basic_fstream&) = delete;
        basic_fstream(basic_fstream&& rhs);
    
        // atribuição e troca
        basic_fstream& operator=(const basic_fstream&) = delete;
        basic_fstream& operator=(basic_fstream&& rhs);
        void swap(basic_fstream& rhs);
    
        // membros
        basic_filebuf<CharT, Traits>* rdbuf() const;
        bool is_open() const;
        void open(
          const char* s,
          ios_base::openmode mode = ios_base::in | ios_base::out);
        void open(
          const filesystem::path::value_type* s,
          ios_base::openmode mode = ios_base::in | ios_base::out);    // apenas sistemas wide
        void open(
          const string& s,
          ios_base::openmode mode = ios_base::in | ios_base::out);
        void open(
          const filesystem::path& s,
          ios_base::openmode mode = ios_base::in | ios_base::out);
        void close();
    
      private:
        basic_filebuf<CharT, Traits> sb;    // apenas para exposição
      };
    
      template<class CharT, class Traits>
        void swap(basic_fstream<CharT, Traits>& x,
                  basic_fstream<CharT, Traits>& y);
    }
```