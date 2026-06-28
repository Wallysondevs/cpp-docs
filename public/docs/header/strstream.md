# Cabeçalho da biblioteca padrão &lt;strstream&gt; (descontinuado em C++98)(removido em C++26)

Este cabeçalho faz parte da biblioteca de [Entrada/Saída](<#/doc/io>).

### Classes

[ strstreambuf](<#/doc/io/strstreambuf>)(descontinuado em C++98)(removido em C++26) | implementa um dispositivo de array de caracteres brutos
(classe)
[ istrstream](<#/doc/io/istrstream>)(descontinuado em C++98)(removido em C++26) | implementa operações de entrada de array de caracteres
(classe)
[ ostrstream](<#/doc/io/ostrstream>)(descontinuado em C++98)(removido em C++26) | implementa operações de saída de array de caracteres
(classe)
[ strstream](<#/doc/io/strstream>)(descontinuado em C++98)(removido em C++26) | implementa operações de entrada/saída de array de caracteres
(classe)

### Notas

`< strstream>` foi descontinuado em C++98 e removido em C++26 (veja [P2867R1](<https://wg21.link/P2867R1>)).

A razão para a remoção é que C++20 e C++23 fornecem facilidades de substituição superiores, como a capacidade de mover strings eficientemente de [std::stringstream](<#/doc/io/basic_stringstream>)s (desde C++20, veja [P0408R7](<https://wg21.link/P0408R7>)), e a biblioteca [`<spanstream>`](<#/doc/header/spanstream>) (desde C++23, veja [P0448R4](<https://wg21.link/P0448R4>)).

### Sinopse
```cpp
    namespace std {
      class strstreambuf;
      class istrstream;
      class ostrstream;
      class strstream;
    }
```

#### Classe [std::strstreambuf](<#/doc/io/strstreambuf>)
```cpp
    namespace std {
      class strstreambuf : public basic_streambuf<char> {
      public:
        strstreambuf() : strstreambuf(0) {}
        explicit strstreambuf(streamsize alsize_arg);
        strstreambuf(void* (*palloc_arg)(size_t), void (*pfree_arg)(void*));
        strstreambuf(char* gnext_arg, streamsize n, char* pbeg_arg = nullptr);
        strstreambuf(const char* gnext_arg, streamsize n);
    
        strstreambuf(signed char* gnext_arg, streamsize n,
                     signed char* pbeg_arg = nullptr);
        strstreambuf(const signed char* gnext_arg, streamsize n);
        strstreambuf(unsigned char* gnext_arg, streamsize n,
                     unsigned char* pbeg_arg = nullptr);
        strstreambuf(const unsigned char* gnext_arg, streamsize n);
    
        virtual ~strstreambuf();
    
        void  freeze(bool freezefl = true);
        char* str();
        int   pcount();
    
      protected:
        int_type overflow (int_type c = EOF) override;
        int_type pbackfail(int_type c = EOF) override;
        int_type underflow() override;
        pos_type seekoff(off_type off, ios_base::seekdir way,
                         ios_base::openmode which = ios_base::in | ios_base::out) override;
        pos_type seekpos(pos_type sp,
                         ios_base::openmode which = ios_base::in | ios_base::out) override;
        streambuf* setbuf(char* s, streamsize n) override;
    
      private:
        using strstate = /*bitmask type*/;  // apenas para exposição
        static const strstate allocated;    // apenas para exposição
        static const strstate constant;     // apenas para exposição
        static const strstate dynamic;      // apenas para exposição
        static const strstate frozen;       // apenas para exposição
        strstate strmode;                   // apenas para exposição
        streamsize alsize;                  // apenas para exposição
        void* (*palloc)(size_t);            // apenas para exposição
        void (*pfree)(void*);               // apenas para exposição
      };
    }
```

#### Classe [std::istrstream](<#/doc/io/istrstream>)
```cpp
    namespace std {
      class istrstream : public basic_istream<char> {
      public:
        explicit istrstream(const char* s);
        explicit istrstream(char* s);
        istrstream(const char* s, streamsize n);
        istrstream(char* s, streamsize n);
        virtual ~istrstream();
    
        strstreambuf* rdbuf() const;
        char* str();
      private:
        strstreambuf sb;            // apenas para exposição
      };
    }
```

#### Classe [std::ostrstream](<#/doc/io/ostrstream>)
```cpp
    namespace std {
      class ostrstream : public basic_ostream<char> {
      public:
        ostrstream();
        ostrstream(char* s, int n, ios_base::openmode mode = ios_base::out);
        virtual ~ostrstream();
    
        strstreambuf* rdbuf() const;
        void freeze(bool freezefl = true);
        char* str();
        int pcount() const;
      private:
        strstreambuf sb;            // apenas para exposição
      };
    }
```

#### Classe [std::strstream](<#/doc/io/strstream>)
```cpp
    namespace std {
      class strstream
        : public basic_iostream<char> {
      public:
        // types
        using char_type = char;
        using int_type  = char_traits<char>::int_type;
        using pos_type  = char_traits<char>::pos_type;
        using off_type  = char_traits<char>::off_type;
    
        // constructors/destructor
        strstream();
        strstream(char* s, int n,
                  ios_base::openmode mode = ios_base::in | ios_base::out);
        virtual ~strstream();
    
        // members
        strstreambuf* rdbuf() const;
        void freeze(bool freezefl = true);
        int pcount() const;
        char* str();
    
      private:
        strstreambuf sb;            // apenas para exposição
      };
    }
```