# Cabeçalho da biblioteca padrão &lt;ios&gt;

Este cabeçalho faz parte da [biblioteca de Entrada/Saída](<#/doc/io>).

### Inclusões

---
[ &lt;iosfwd&gt;](<#/doc/header/iosfwd>) | Declarações antecipadas de todas as classes na biblioteca de entrada/saída

### Classes

[ ios_base](<#/doc/io/ios_base>) | gerencia flags de formatação e exceções de entrada/saída
(classe)
[ basic_ios](<#/doc/io/basic_ios>) | gerencia um buffer de stream arbitrário
(modelo de classe)
[`std::ios`](<#/doc/io/basic_ios>) | [std::basic_ios](<#/doc/io/basic_ios>)&lt;char&gt; (typedef)
---|---
[`std::wios`](<#/doc/io/basic_ios>) | [std::basic_ios](<#/doc/io/basic_ios>)<wchar_t> (typedef)
[ fpos](<#/doc/io/fpos>) | representa a posição absoluta em um stream ou arquivo
(modelo de classe)
[ io_errc](<#/doc/io/io_errc>)(C++11) | os códigos de erro de stream de E/S
(enum)
[ is_error_code_enum<std::io_errc>](<#/doc/io/io_errc/is_error_code_enum>)(C++11) | estende o type trait [std::is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>) para identificar códigos de erro de iostream
(especialização de modelo de classe)
[ streamoff](<#/doc/io/streamoff>) | representa a posição relativa de arquivo/stream (offset de fpos), suficiente para representar qualquer tamanho de arquivo
(typedef)
[ streamsize](<#/doc/io/streamsize>) | representa o número de caracteres transferidos em uma operação de E/S ou o tamanho de um buffer de E/S
(typedef)

### Funções

[ iostream_category](<#/doc/io/iostream_category>)(C++11) | identifica a categoria de erro de iostream
(função)
[ make_error_code(std::io_errc)](<#/doc/io/io_errc/make_error_code>)(C++11) | constrói um código de erro de iostream
(função)
[ make_error_condition(std::io_errc)](<#/doc/io/io_errc/make_error_condition>)(C++11) | constrói uma condição de erro de iostream
(função)
[ boolalphanoboolalpha](<#/doc/io/manip/boolalpha>) | alterna entre a representação textual e numérica de booleanos
(função)
[ showbasenoshowbase](<#/doc/io/manip/showbase>) | controla se um prefixo é usado para indicar a base numérica
(função)
[ showpointnoshowpoint](<#/doc/io/manip/showpoint>) | controla se o ponto decimal é sempre incluído na representação de ponto flutuante
(função)
[ showposnoshowpos](<#/doc/io/manip/showpos>) | controla se o sinal `+` é usado com números não negativos
(função)
[ skipwsnoskipws](<#/doc/io/manip/skipws>) | controla se espaços em branco iniciais são ignorados na entrada
(função)
[ uppercasenouppercase](<#/doc/io/manip/uppercase>) | controla se caracteres maiúsculos são usados em alguns formatos de saída
(função)
[ unitbufnounitbuf](<#/doc/io/manip/unitbuf>) | controla se a saída é descarregada após cada operação
(função)
[ internalleftright](<#/doc/io/manip/left>) | define o posicionamento dos caracteres de preenchimento
(função)
[ dechexoct](<#/doc/io/manip/hex>) | altera a base usada para E/S de inteiros
(função)
[ fixedscientifichexfloatdefaultfloat](<#/doc/io/manip/fixed>)(C++11)(C++11) | altera a formatação usada para E/S de ponto flutuante
(função)

### Sinopse
```cpp
    #include <iosfwd>
    
    namespace std {
      using streamoff  = /* implementation-defined */;
      using streamsize = /* implementation-defined */;
      template<class StateT> class fpos;
    
      class ios_base;
      template<class CharT, class Traits = char_traits<CharT>>
        class basic_ios;
    
      // manipulators
      ios_base& boolalpha  (ios_base& str);
      ios_base& noboolalpha(ios_base& str);
    
      ios_base& showbase   (ios_base& str);
      ios_base& noshowbase (ios_base& str);
    
      ios_base& showpoint  (ios_base& str);
      ios_base& noshowpoint(ios_base& str);
    
      ios_base& showpos    (ios_base& str);
      ios_base& noshowpos  (ios_base& str);
    
      ios_base& skipws     (ios_base& str);
      ios_base& noskipws   (ios_base& str);
    
      ios_base& uppercase  (ios_base& str);
      ios_base& nouppercase(ios_base& str);
    
      ios_base& unitbuf    (ios_base& str);
      ios_base& nounitbuf  (ios_base& str);
    
      // adjustfield
      ios_base& internal   (ios_base& str);
      ios_base& left       (ios_base& str);
      ios_base& right      (ios_base& str);
    
      // basefield
      ios_base& dec        (ios_base& str);
      ios_base& hex        (ios_base& str);
      ios_base& oct        (ios_base& str);
    
      // floatfield
      ios_base& fixed      (ios_base& str);
      ios_base& scientific (ios_base& str);
      ios_base& hexfloat   (ios_base& str);
      ios_base& defaultfloat(ios_base& str);
    
      // error reporting
      enum class io_errc {
        stream = 1
      };
    
      template<> struct is_error_code_enum<io_errc> : public true_type { };
      error_code make_error_code(io_errc e) noexcept;
      error_condition make_error_condition(io_errc e) noexcept;
      const error_category& iostream_category() noexcept;
    }
```

#### Classe [std::ios_base](<#/doc/io/ios_base>)
```cpp
    namespace std {
      class ios_base {
      public:
        class failure;              // see description
    
        // fmtflags
        using fmtflags = /*bitmask-type-1*/;
        static constexpr fmtflags boolalpha = /* unspecified */;
        static constexpr fmtflags dec = /* unspecified */;
        static constexpr fmtflags fixed = /* unspecified */;
        static constexpr fmtflags hex = /* unspecified */;
        static constexpr fmtflags internal = /* unspecified */;
        static constexpr fmtflags left = /* unspecified */;
        static constexpr fmtflags oct = /* unspecified */;
        static constexpr fmtflags right = /* unspecified */;
        static constexpr fmtflags scientific = /* unspecified */;
        static constexpr fmtflags showbase = /* unspecified */;
        static constexpr fmtflags showpoint = /* unspecified */;
        static constexpr fmtflags showpos = /* unspecified */;
        static constexpr fmtflags skipws = /* unspecified */;
        static constexpr fmtflags unitbuf = /* unspecified */;
        static constexpr fmtflags uppercase = /* unspecified */;
        static constexpr fmtflags adjustfield = /* see description */;
        static constexpr fmtflags basefield = /* see description */;
        static constexpr fmtflags floatfield = /* see description */;
    
        // iostate
        using iostate = /*bitmask-type-2*/;
        static constexpr iostate badbit = /* unspecified */;
        static constexpr iostate eofbit = /* unspecified */;
        static constexpr iostate failbit = /* unspecified */;
        static constexpr iostate goodbit = /* see description */;
    
        // openmode
        using openmode = /*bitmask-type-3*/;
        static constexpr openmode app = /* unspecified */;
        static constexpr openmode ate = /* unspecified */;
        static constexpr openmode binary = /* unspecified */;
        static constexpr openmode in = /* unspecified */;
        static constexpr openmode out = /* unspecified */;
        static constexpr openmode trunc = /* unspecified */;
        static constexpr openmode noreplace = /* unspecified */
    
        // seekdir
        using seekdir = /*bitmask-type-4*/;
        static constexpr seekdir beg = /* unspecified */;
        static constexpr seekdir cur = /* unspecified */;
        static constexpr seekdir end = /* unspecified */;
    
        class Init;
    
        // fmtflags state
        fmtflags flags() const;
        fmtflags flags(fmtflags fmtfl);
        fmtflags setf(fmtflags fmtfl);
        fmtflags setf(fmtflags fmtfl, fmtflags mask);
        void unsetf(fmtflags mask);
    
        streamsize precision() const;
        streamsize precision(streamsize prec);
        streamsize width() const;
        streamsize width(streamsize wide);
    
        // locales
        locale imbue(const locale& loc);
        locale getloc() const;
    
        // storage
        static int xalloc();
        long&  iword(int idx);
        void*& pword(int idx);
    
        // destructor
        virtual ~ios_base();
    
        // callbacks
        enum event { erase_event, imbue_event, copyfmt_event };
        using event_callback = void (*)(event, ios_base&, int idx);
        void register_callback(event_callback fn, int idx);
    
        ios_base(const ios_base&) = delete;
        ios_base& operator=(const ios_base&) = delete;
    
        static bool sync_with_stdio(bool sync = true);
    
      protected:
        ios_base();
    
      private:
        static int index;           // exposition only
        long*  iarray;              // exposition only
        void** parray;              // exposition only
      };
    }
```

#### Classe [std::ios_base::failure](<#/doc/io/ios_base/failure>)
```cpp
    namespace std {
      class ios_base::failure : public system_error {
      public:
        explicit failure(const string& msg, const error_code& ec = io_errc::stream);
        explicit failure(const char* msg, const error_code& ec = io_errc::stream);
      };
    }
```

#### Classe [std::ios_base::Init](<#/doc/io/ios_base/Init>)
```cpp
    namespace std {
      class ios_base::Init {
      public:
        Init();
        Init(const Init&) = default;
        ~Init();
        Init& operator=(const Init&) = default;
      private:
        static int init_cnt;        // exposition only
      };
    }
```

#### Modelo de classe [std::fpos](<#/doc/io/fpos>)
```cpp
    namespace std {
      template<class StateT> class fpos {
      public:
        // members
        StateT state() const;
        void state(stateT);
      private;
        StateT st;                  // exposition only
      };
    }
```

#### Modelo de classe [std::basic_ios](<#/doc/io/basic_ios>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
      class basic_ios : public ios_base {
      public:
        using char_type   = CharT;
        using int_type    = typename Traits::int_type;
        using pos_type    = typename Traits::pos_type;
        using off_type    = typename Traits::off_type;
        using traits_type = Traits;
    
        // flags functions
        explicit operator bool() const;
        bool operator!() const;
        iostate rdstate() const;
        void clear(iostate state = goodbit);
        void setstate(iostate state);
        bool good() const;
        bool eof()  const;
        bool fail() const;
        bool bad()  const;
    
        iostate exceptions() const;
        void exceptions(iostate except);
    
        // constructor/destructor
        explicit basic_ios(basic_streambuf<CharT, Traits>* sb);
        virtual ~basic_ios();
    
        // members
        basic_ostream<CharT, Traits>* tie() const;
        basic_ostream<CharT, Traits>* tie(basic_ostream<CharT, Traits>* tiestr);
    
        basic_streambuf<CharT, Traits>* rdbuf() const;
        basic_streambuf<CharT, Traits>* rdbuf(basic_streambuf<CharT, Traits>* sb);
    
        basic_ios& copyfmt(const basic_ios& rhs);
    
        char_type fill() const;
        char_type fill(char_type ch);
    
        locale imbue(const locale& loc);
    
        char      narrow(char_type c, char dfault) const;
        char_type widen(char c) const;
    
        basic_ios(const basic_ios&) = delete;
        basic_ios& operator=(const basic_ios&) = delete;
    
      protected:
        basic_ios();
        void init(basic_streambuf<CharT, Traits>* sb);
        void move(basic_ios& rhs);
        void move(basic_ios&& rhs);
        void swap(basic_ios& rhs) noexcept;
        void set_rdbuf(basic_streambuf<CharT, Traits>* sb);
      };
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 35](<https://cplusplus.github.io/LWG/issue35>) | C++98 | os protótipos de unitbuf e nounitbuf estavam faltando na sinopse | adicionado
[LWG 78](<https://cplusplus.github.io/LWG/issue78>) | C++98 | o tipo do parâmetro fn de [`ios_base::register_callback`](<#/doc/io/ios_base/register_callback>) na sinopse foi especificado incorretamente como `event_call_back` | corrigido para `event_callback`