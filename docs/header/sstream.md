# Cabeçalho da biblioteca padrão &lt;sstream&gt;

Este cabeçalho faz parte da [biblioteca de Entrada/Saída](<#/doc/io>).

### Classes

---
[ basic_stringbuf](<#/doc/io/basic_stringbuf>) | implementa um dispositivo de string bruto
(modelo de classe)
[ basic_istringstream](<#/doc/io/basic_istringstream>) | implementa operações de entrada de stream de string de alto nível
(modelo de classe)
[ basic_ostringstream](<#/doc/io/basic_ostringstream>) | implementa operações de saída de stream de string de alto nível
(modelo de classe)
[ basic_stringstream](<#/doc/io/basic_stringstream>) | implementa operações de entrada/saída de stream de string de alto nível
(modelo de classe)
`stringbuf` | [std::basic_stringbuf](<#/doc/io/basic_stringbuf>)&lt;char&gt;
(definição de tipo)
`wstringbuf` | [std::basic_stringbuf](<#/doc/io/basic_stringbuf>)<wchar_t>
(definição de tipo)
`istringstream` | [std::basic_istringstream](<#/doc/io/basic_istringstream>)&lt;char&gt;
(definição de tipo)
`wistringstream` | [std::basic_istringstream](<#/doc/io/basic_istringstream>)<wchar_t>
(definição de tipo)
`ostringstream` | [std::basic_ostringstream](<#/doc/io/basic_ostringstream>)&lt;char&gt;
(definição de tipo)
`wostringstream` | [std::basic_ostringstream](<#/doc/io/basic_ostringstream>)<wchar_t>
(definição de tipo)
`stringstream` | [std::basic_stringstream](<#/doc/io/basic_stringstream>)&lt;char&gt;
(definição de tipo)
`wstringstream` | [std::basic_stringstream](<#/doc/io/basic_stringstream>)<wchar_t>
(definição de tipo)

### Funções

[ std::swap(std::basic_stringbuf)](<#/doc/io/basic_stringbuf/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ std::swap(std::basic_istringstream)](<#/doc/io/basic_istringstream/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ std::swap(std::basic_ostringstream)](<#/doc/io/basic_ostringstream/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ std::swap(std::basic_stringstream)](<#/doc/io/basic_stringstream/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)

### Sinopse
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
        class basic_stringbuf;
    
      using stringbuf  = basic_stringbuf<char>;
      using wstringbuf = basic_stringbuf<wchar_t>;
    
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
        class basic_istringstream;
    
      using istringstream  = basic_istringstream<char>;
      using wistringstream = basic_istringstream<wchar_t>;
    
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
        class basic_ostringstream;
      using ostringstream  = basic_ostringstream<char>;
      using wostringstream = basic_ostringstream<wchar_t>;
    
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
        class basic_stringstream;
      using stringstream  = basic_stringstream<char>;
      using wstringstream = basic_stringstream<wchar_t>;
    }
```

#### Modelo de classe [std::basic_stringbuf](<#/doc/io/basic_stringbuf>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
      class basic_stringbuf : public basic_streambuf<CharT, Traits> {
      public:
        using char_type      = CharT;
        using int_type       = typename Traits::int_type;
        using pos_type       = typename Traits::pos_type;
        using off_type       = typename Traits::off_type;
        using traits_type    = Traits;
        using allocator_type = Allocator;
    
        // construtores
        basic_stringbuf() : basic_stringbuf(ios_base::in | ios_base::out) {}
        explicit basic_stringbuf(ios_base::openmode which);
        explicit basic_stringbuf(
          const basic_string<CharT, Traits, Allocator>& s,
          ios_base::openmode which = ios_base::in | ios_base::out);
        explicit basic_stringbuf(const Allocator& a)
          : basic_stringbuf(ios_base::in | ios_base::out, a) {}
        basic_stringbuf(ios_base::openmode which, const Allocator& a);
        explicit basic_stringbuf(
          basic_string<CharT, Traits, Allocator>&& s,
          ios_base::openmode which = ios_base::in | ios_base::out);
        template<class SAlloc>
          basic_stringbuf(
            const basic_string<CharT, Traits, SAlloc>& s, const Allocator& a)
            : basic_stringbuf(s, ios_base::in | ios_base::out, a) {}
        template<class SAlloc>
          basic_stringbuf(
            const basic_string<CharT, Traits, SAlloc>& s,
            ios_base::openmode which, const Allocator& a);
        template<class SAlloc>
          explicit basic_stringbuf(
            const basic_string<CharT, Traits, SAlloc>& s,
            ios_base::openmode which = ios_base::in | ios_base::out);
        basic_stringbuf(const basic_stringbuf&) = delete;
        basic_stringbuf(basic_stringbuf&& rhs);
        basic_stringbuf(basic_stringbuf&& rhs, const Allocator& a);
    
        // atribuição e troca
        basic_stringbuf& operator=(const basic_stringbuf&) = delete;
        basic_stringbuf& operator=(basic_stringbuf&& rhs);
        void swap(basic_stringbuf& rhs) noexcept(see below);
    
        // getters e setters
        allocator_type get_allocator() const noexcept;
    
        basic_string<CharT, Traits, Allocator> str() const &;
        template<class SAlloc>
          basic_string<CharT,Traits,SAlloc> str(const SAlloc& sa) const;
        basic_string<CharT, Traits, Allocator> str() &&;
        basic_string_view<CharT, Traits> view() const noexcept;
    
        void str(const basic_string<CharT, Traits, Allocator>& s);
        template<class SAlloc>
          void str(const basic_string<CharT, Traits, SAlloc>& s);
        void str(basic_string<CharT, Traits, Allocator>&& s);
    
      protected:
        // funções virtuais sobrescritas
        int_type underflow() override;
        int_type pbackfail(int_type c = Traits::eof()) override;
        int_type overflow (int_type c = Traits::eof()) override;
        basic_streambuf<CharT, Traits>* setbuf(CharT*, streamsize) override;
    
        pos_type seekoff(off_type off, ios_base::seekdir way,
                         ios_base::openmode which
                          = ios_base::in | ios_base::out) override;
        pos_type seekpos(pos_type sp,
                         ios_base::openmode which
                          = ios_base::in | ios_base::out) override;
    
      private:
        ios_base::openmode mode;                        // apenas para exposição
        basic_string<CharT, Traits, Allocator> buf;     // apenas para exposição
        void init_buf_ptrs();                           // apenas para exposição
      };
    
      template<class CharT, class Traits, class Allocator>
        void swap(basic_stringbuf<CharT, Traits, Allocator>& x,
                  basic_stringbuf<CharT, Traits, Allocator>& y) noexcept(noexcept(x.swap(y)));
    }
```

#### Modelo de classe [std::basic_istringstream](<#/doc/io/basic_istringstream>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
      class basic_istringstream : public basic_istream<CharT, Traits> {
      public:
        using char_type      = CharT;
        using int_type       = typename Traits::int_type;
        using pos_type       = typename Traits::pos_type;
        using off_type       = typename Traits::off_type;
        using traits_type    = Traits;
        using allocator_type = Allocator;
    
        // construtores
        basic_istringstream() : basic_istringstream(ios_base::in) {}
        explicit basic_istringstream(ios_base::openmode which);
        explicit basic_istringstream(
          const basic_string<CharT, Traits, Allocator>& s,
          ios_base::openmode which = ios_base::in);
        basic_istringstream(ios_base::openmode which, const Allocator& a);
        explicit basic_istringstream(
          basic_string<CharT, Traits, Allocator>&& s,
          ios_base::openmode which = ios_base::in);
        template<class SAlloc>
          basic_istringstream(
            const basic_string<CharT, Traits, SAlloc>& s, const Allocator& a)
            : basic_istringstream(s, ios_base::in, a) {}
        template<class SAlloc>
          basic_istringstream(
            const basic_string<CharT, Traits, SAlloc>& s,
            ios_base::openmode which, const Allocator& a);
        template<class SAlloc>
          explicit basic_istringstream(
            const basic_string<CharT, Traits, SAlloc>& s,
            ios_base::openmode which = ios_base::in);
        basic_istringstream(const basic_istringstream&) = delete;
        basic_istringstream(basic_istringstream&& rhs);
    
        // atribuição e troca
        basic_istringstream& operator=(const basic_istringstream&) = delete;
        basic_istringstream& operator=(basic_istringstream&& rhs);
        void swap(basic_istringstream& rhs);
    
        // membros
        basic_stringbuf<CharT, Traits, Allocator>* rdbuf() const;
        basic_string<CharT, Traits, Allocator> str() const &;
        template<class SAlloc>
          basic_string<CharT,Traits,SAlloc> str(const SAlloc& sa) const;
        basic_string<CharT, Traits, Allocator> str() &&;
        basic_string_view<CharT, Traits> view() const noexcept;
    
        void str(const basic_string<CharT, Traits, Allocator>& s);
        template<class SAlloc>
          void str(const basic_string<CharT, Traits, SAlloc>& s);
        void str(basic_string<CharT, Traits, Allocator>&& s);
    
      private:
        basic_stringbuf<CharT, Traits, Allocator> sb;   // apenas para exposição
      };
    
      template<class CharT, class Traits, class Allocator>
        void swap(basic_istringstream<CharT, Traits, Allocator>& x,
                  basic_istringstream<CharT, Traits, Allocator>& y);
    }
```

#### Modelo de classe [std::basic_ostringstream](<#/doc/io/basic_ostringstream>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
      class basic_ostringstream : public basic_ostream<CharT, Traits> {
      public:
        using char_type      = CharT;
        using int_type       = typename Traits::int_type;
        using pos_type       = typename Traits::pos_type;
        using off_type       = typename Traits::off_type;
        using traits_type    = Traits;
        using allocator_type = Allocator;
    
        // construtores
        basic_ostringstream() : basic_ostringstream(ios_base::out) {}
        explicit basic_ostringstream(ios_base::openmode which);
        explicit basic_ostringstream(
          const basic_string<CharT, Traits, Allocator>& s,
          ios_base::openmode which = ios_base::out);
        basic_ostringstream(ios_base::openmode which, const Allocator& a);
        explicit basic_ostringstream(
          basic_string<CharT, Traits, Allocator>&& s,
          ios_base::openmode which = ios_base::out);
        template<class SAlloc>
          basic_ostringstream(
            const basic_string<CharT, Traits, SAlloc>& s, const Allocator& a)
            : basic_ostringstream(s, ios_base::out, a) {}
        template<class SAlloc>
          basic_ostringstream(
            const basic_string<CharT, Traits, SAlloc>& s,
            ios_base::openmode which, const Allocator& a);
        template<class SAlloc>
          explicit basic_ostringstream(
            const basic_string<CharT, Traits, SAlloc>& s,
            ios_base::openmode which = ios_base::out);
        basic_ostringstream(const basic_ostringstream&) = delete;
        basic_ostringstream(basic_ostringstream&& rhs);
    
        // atribuição e troca
        basic_ostringstream& operator=(const basic_ostringstream&) = delete;
        basic_ostringstream& operator=(basic_ostringstream&& rhs);
        void swap(basic_ostringstream& rhs);
    
        // membros
        basic_stringbuf<CharT, Traits, Allocator>* rdbuf() const;
    
        basic_string<CharT, Traits, Allocator> str() const &;
        template<class SAlloc>
          basic_string<CharT,Traits,SAlloc> str(const SAlloc& sa) const;
        basic_string<CharT, Traits, Allocator> str() &&;
        basic_string_view<CharT, Traits> view() const noexcept;
    
        void str(const basic_string<CharT, Traits, Allocator>& s);
        template<class SAlloc>
          void str(const basic_string<CharT, Traits, SAlloc>& s);
        void str(basic_string<CharT, Traits, Allocator>&& s);
    
       private:
        basic_stringbuf<CharT, Traits, Allocator> sb;   // apenas para exposição
      };
    
      template<class CharT, class Traits, class Allocator>
        void swap(basic_ostringstream<CharT, Traits, Allocator>& x,
                  basic_ostringstream<CharT, Traits, Allocator>& y);
    }
```

#### Modelo de classe [std::basic_stringstream](<#/doc/io/basic_stringstream>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
      class basic_stringstream : public basic_iostream<CharT, Traits> {
      public:
        using char_type      = CharT;
        using int_type       = typename Traits::int_type;
        using pos_type       = typename Traits::pos_type;
        using off_type       = typename Traits::off_type;
        using traits_type    = Traits;
        using allocator_type = Allocator;
    
        // construtores
        basic_stringstream() : basic_stringstream(ios_base::out | ios_base::in) {}
        explicit basic_stringstream(ios_base::openmode which);
        explicit basic_stringstream(
          const basic_string<CharT, Traits, Allocator>& s,
          ios_base::openmode which = ios_base::out | ios_base::in);
        basic_stringstream(ios_base::openmode which, const Allocator& a);
        explicit basic_stringstream(
          basic_string<CharT, Traits, Allocator>&& s,
          ios_base::openmode which = ios_base::out | ios_base::in);
        template<class SAlloc>
          basic_stringstream(
            const basic_string<CharT, Traits, SAlloc>& s, const Allocator& a)
            : basic_stringstream(s, ios_base::out | ios_base::in, a) {}
        template<class SAlloc>
          basic_stringstream(
            const basic_string<CharT, Traits, SAlloc>& s,
            ios_base::openmode which, const Allocator& a);
        template<class SAlloc>
          explicit basic_stringstream(
            const basic_string<CharT, Traits, SAlloc>& s,
            ios_base::openmode which = ios_base::out | ios_base::in);
        basic_stringstream(const basic_stringstream&) = delete;
        basic_stringstream(basic_stringstream&& rhs);
    
        // atribuição e troca
        basic_stringstream& operator=(const basic_stringstream&) = delete;
        basic_stringstream& operator=(basic_stringstream&& rhs);
        void swap(basic_stringstream& rhs);
    
        // membros
        basic_stringbuf<CharT, Traits, Allocator>* rdbuf() const;
    
        basic_string<CharT, Traits, Allocator> str() const &;
        template<class SAlloc>
          basic_string<CharT,Traits,SAlloc> str(const SAlloc& sa) const;
        basic_string<CharT, Traits, Allocator> str() &&;
        basic_string_view<CharT, Traits> view() const noexcept;
    
        void str(const basic_string<CharT, Traits, Allocator>& s);
        template<class SAlloc>
          void str(const basic_string<CharT, Traits, SAlloc>& s);
        void str(basic_string<CharT, Traits, Allocator>&& s);
    
      private:
        basic_stringbuf<CharT, Traits> sb;  // apenas para exposição
      };
    
      template<class CharT, class Traits, class Allocator>
        void swap(basic_stringstream<CharT, Traits, Allocator>& x,
                  basic_stringstream<CharT, Traits, Allocator>& y);
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto [LWG 170](<https://cplusplus.github.io/LWG/issue170>) | C++98 | as definições de `traits_type` estavam faltando nas sinopses de
---|---|---
[std::basic_ostringstream](<#/doc/io/basic_ostringstream>) e [std::basic_stringstream](<#/doc/io/basic_stringstream>) | adicionado
[LWG 251](<https://cplusplus.github.io/LWG/issue251>) | C++98 | as definições de `allocator_type` estavam faltando nas sinopses de
[std::basic_stringbuf](<#/doc/io/basic_stringbuf>), [std::basic_istringstream](<#/doc/io/basic_istringstream>)
[std::basic_ostringstream](<#/doc/io/basic_ostringstream>) e [std::basic_stringstream](<#/doc/io/basic_stringstream>) | adicionado