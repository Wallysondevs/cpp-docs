# Cabeçalho da biblioteca padrão &lt;syncstream&gt; (C++20)

Este cabeçalho faz parte da biblioteca de [Entrada/Saída](<#/doc/io>).

### Inclusões

---
[ &lt;ostream&gt;](<#/doc/header/ostream>) | templates de classe [std::basic_ostream](<#/doc/io/basic_ostream>), [std::basic_iostream](<#/doc/io/basic_iostream>) e typedefs

### Classes

[ basic_syncbuf](<#/doc/io/basic_syncbuf>)(C++20) | wrapper de dispositivo de saída sincronizado
(modelo de classe)
[ basic_osyncstream](<#/doc/io/basic_osyncstream>)(C++20) | wrapper de stream de saída sincronizado
(modelo de classe)
`syncbuf` (C++20) | [std::basic_syncbuf](<#/doc/io/basic_syncbuf>)&lt;char&gt;
(typedef)
`wsyncbuf` (C++20) | [std::basic_syncbuf](<#/doc/io/basic_syncbuf>)<wchar_t>
(typedef)
`osyncstream` (C++20) | [std::basic_osyncstream](<#/doc/io/basic_osyncstream>)&lt;char&gt;
(typedef)
`wosyncstream` (C++20) | [std::basic_osyncstream](<#/doc/io/basic_osyncstream>)<wchar_t>
(typedef)

### Funções

[ std::swap(std::basic_syncbuf)](<#/doc/io/basic_syncbuf/swap2>)(C++20) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)

### Sinopse
```cpp
    #include <ostream>
    
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
        class basic_syncbuf;
    
      using syncbuf = basic_syncbuf<char>;
      using wsyncbuf = basic_syncbuf<wchar_t>;
    
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
        class basic_osyncstream;
    
      using osyncstream = basic_osyncstream<char>;
      using wosyncstream = basic_osyncstream<wchar_t>;
    }
```

#### Modelo de classe std::basic_syncbuf
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
      class basic_syncbuf : public basic_streambuf<CharT, Traits> {
      public:
        using char_type      = CharT;
        using int_type       = typename Traits::int_type;
        using pos_type       = typename Traits::pos_type;
        using off_type       = typename Traits::off_type;
        using traits_type    = Traits;
        using allocator_type = Allocator;
    
        using streambuf_type = basic_streambuf<CharT, Traits>;
    
        // construção e destruição
        basic_syncbuf()
          : basic_syncbuf(nullptr) {}
        explicit basic_syncbuf(streambuf_type* obuf)
          : basic_syncbuf(obuf, Allocator()) {}
        basic_syncbuf(streambuf_type*, const Allocator&);
        basic_syncbuf(basic_syncbuf&&);
        ~basic_syncbuf();
    
        // atribuição e swap
        basic_syncbuf& operator=(basic_syncbuf&&);
        void swap(basic_syncbuf&);
    
        // funções membro
        bool emit();
        streambuf_type* get_wrapped() const noexcept;
        allocator_type get_allocator() const noexcept;
        void set_emit_on_sync(bool) noexcept;
    
      protected:
        // funções virtuais sobrescritas
        int sync() override;
    
      private:
        streambuf_type* wrapped;    // apenas para exposição
        bool emit_on_sync{};        // apenas para exposição
      };
    
      // algoritmos especializados
      template<class CharT, class Traits, class Allocator>
        void swap(basic_syncbuf<CharT, Traits, Allocator>&,
                  basic_syncbuf<CharT, Traits, Allocator>&);
    }
```

#### Modelo de classe std::basic_osyncstream
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>,
               class Allocator = allocator<CharT>>
      class basic_osyncstream : public basic_ostream<CharT, Traits> {
      public:
        using char_type   = CharT;
        using int_type    = typename Traits::int_type;
        using pos_type    = typename Traits::pos_type;
        using off_type    = typename Traits::off_type;
        using traits_type = Traits;
    
        using allocator_type = Allocator;
        using streambuf_type = basic_streambuf<CharT, Traits>;
        using syncbuf_type   = basic_syncbuf<CharT, Traits, Allocator>;
    
        // construção e destruição
        basic_osyncstream(streambuf_type*, const Allocator&);
        explicit basic_osyncstream(streambuf_type* obuf)
          : basic_osyncstream(obuf, Allocator()) {}
        basic_osyncstream(basic_ostream<CharT, Traits>& os, const Allocator& allocator)
          : basic_osyncstream(os.rdbuf(), allocator) {}
        explicit basic_osyncstream(basic_ostream<CharT, Traits>& os)
          : basic_osyncstream(os, Allocator()) {}
        basic_osyncstream(basic_osyncstream&&) noexcept;
        ~basic_osyncstream();
    
        // atribuição
        basic_osyncstream& operator=(basic_osyncstream&&) noexcept;
    
        // funções membro
        void emit();
        streambuf_type* get_wrapped() const noexcept;
        syncbuf_type* rdbuf() const noexcept
        { return const_cast<syncbuf_type*>(addressof(sb)); }
    
      private:
        syncbuf_type sb;    // apenas para exposição
      };
    }
```