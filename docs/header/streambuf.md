# Cabeçalho da biblioteca padrão &lt;streambuf&gt;

Este cabeçalho faz parte da biblioteca de [Entrada/Saída](<#/doc/io>).

### Classes

---
[ basic_streambuf](<#/doc/io/basic_streambuf>) | abstrai um dispositivo bruto
(modelo de classe)
`streambuf` | [std::basic_streambuf](<#/doc/io/basic_streambuf>)&lt;char&gt;
(typedef)
`wstreambuf` | [std::basic_streambuf](<#/doc/io/basic_streambuf>)<wchar_t>
(typedef)

### Sinopse
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_streambuf;
      using streambuf  = basic_streambuf<char>;
      using wstreambuf = basic_streambuf<wchar_t>;
    }
```

#### Modelo de classe [std::basic_streambuf](<#/doc/io/basic_streambuf>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
      class basic_streambuf {
      public:
        using char_type   = CharT;
        using int_type    = typename Traits::int_type;
        using pos_type    = typename Traits::pos_type;
        using off_type    = typename Traits::off_type;
        using traits_type = Traits;
     
        virtual ~basic_streambuf();
     
        // localidades
        locale   pubimbue(const locale& loc);
        locale   getloc() const;
     
        // buffer e posicionamento
        basic_streambuf* pubsetbuf(char_type* s, streamsize n);
        pos_type pubseekoff(off_type off, ios_base::seekdir way,
                            ios_base::openmode which
                              = ios_base::in | ios_base::out);
        pos_type pubseekpos(pos_type sp,
                            ios_base::openmode which
                              = ios_base::in | ios_base::out);
        int      pubsync();
     
        // áreas de leitura e escrita
        // área de leitura
        streamsize in_avail();
        int_type snextc();
        int_type sbumpc();
        int_type sgetc();
        streamsize sgetn(char_type* s, streamsize n);
     
        // retorno
        int_type sputbackc(char_type c);
        int_type sungetc();
     
        // área de escrita
        int_type   sputc(char_type c);
        streamsize sputn(const char_type* s, streamsize n);
     
      protected:
        basic_streambuf();
        basic_streambuf(const basic_streambuf& rhs);
        basic_streambuf& operator=(const basic_streambuf& rhs);
     
        void swap(basic_streambuf& rhs);
     
        // acesso à área de leitura
        char_type* eback() const;
        char_type* gptr()  const;
        char_type* egptr() const;
        void       gbump(int n);
        void       setg(char_type* gbeg, char_type* gnext, char_type* gend);
     
        // acesso à área de escrita
        char_type* pbase() const;
        char_type* pptr() const;
        char_type* epptr() const;
        void       pbump(int n);
        void       setp(char_type* pbeg, char_type* pend);
     
        // funções virtuais
        // localidades
        virtual void imbue(const locale& loc);
     
        // gerenciamento de buffer e posicionamento
        virtual basic_streambuf* setbuf(char_type* s, streamsize n);
        virtual pos_type seekoff(off_type off, ios_base::seekdir way,
                                 ios_base::openmode which
                                   = ios_base::in | ios_base::out);
        virtual pos_type seekpos(pos_type sp,
                                 ios_base::openmode which
                                   = ios_base::in | ios_base::out);
        virtual int      sync();
     
        // área de leitura
        virtual streamsize showmanyc();
        virtual streamsize xsgetn(char_type* s, streamsize n);
        virtual int_type   underflow();
        virtual int_type   uflow();
     
        // retorno
        virtual int_type   pbackfail(int_type c = Traits::eof());
     
        // área de escrita
        virtual streamsize xsputn(const char_type* s, streamsize n);
        virtual int_type   overflow(int_type c = Traits::eof());
      };
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

RD | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 56](<https://cplusplus.github.io/LWG/issue56>) | C++98 | o tipo de retorno de `showmanyc` era int na sinopse | corrigido para streamsize