# Cabeçalho da biblioteca padrão &lt;locale&gt;

Este cabeçalho faz parte da biblioteca de [processamento de texto](<#/doc/text>).

### Classes

---
[ locale](<#/doc/locale/locale>) | conjunto de facets polimórficos que encapsulam diferenças culturais
(classe)

##### Conversões de string e stream

[ wstring_convert](<#/doc/locale/wstring_convert>)(desde C++11)(obsoleto desde C++17)(removido em C++26) | realiza conversões entre uma wide string e uma byte string
(modelo de classe)
[ wbuffer_convert](<#/doc/locale/wbuffer_convert>)(desde C++11)(obsoleto desde C++17)(removido em C++26) | realiza conversão entre um buffer de stream de bytes e um buffer de wide stream
(modelo de classe)

##### Classes base de categoria de facet

[ ctype_base](<#/doc/locale/ctype_base>) | define categorias de classificação de caracteres
(classe)
[ codecvt_base](<#/doc/locale/codecvt_base>) | define erros de conversão de caracteres
(classe)
[ messages_base](<#/doc/locale/messages_base>) | define o tipo de catálogo de mensagens
(classe)
[ time_base](<#/doc/locale/time_base>) | define constantes de formato de data
(classe)
[ money_base](<#/doc/locale/money_base>) | define padrões de formatação monetária
(classe)

##### Categorias de facet

[ ctype](<#/doc/locale/ctype>) | define tabelas de classificação de caracteres
(modelo de classe)
[ ctype&lt;char&gt;](<#/doc/locale/ctype_char>) | especialização de [std::ctype](<#/doc/locale/ctype>) para o tipo char
(especialização de modelo de classe)
[ codecvt](<#/doc/locale/codecvt>) | converte entre codificações de caracteres, incluindo UTF-8, UTF-16, UTF-32
(modelo de classe)
[ collate](<#/doc/locale/collate>) | define comparação lexicográfica e hashing de strings
(modelo de classe)
[ messages](<#/doc/locale/messages>) | implementa a recuperação de strings de catálogos de mensagens
(modelo de classe)
[ time_get](<#/doc/locale/time_get>) | analisa valores de tempo/data de uma sequência de caracteres de entrada em [std::tm](<#/doc/chrono/c/tm>)
(modelo de classe)
[ time_put](<#/doc/locale/time_put>) | formata o conteúdo de [std::tm](<#/doc/chrono/c/tm>) para saída como sequência de caracteres
(modelo de classe)
[ num_get](<#/doc/locale/num_get>) | analisa valores numéricos de uma sequência de caracteres de entrada
(modelo de classe)
[ num_put](<#/doc/locale/num_put>) | formata valores numéricos para saída como sequência de caracteres
(modelo de classe)
[ numpunct](<#/doc/locale/numpunct>) | define regras de pontuação numérica
(modelo de classe)
[ money_get](<#/doc/locale/money_get>) | analisa e constrói um valor monetário a partir de uma sequência de caracteres de entrada
(modelo de classe)
[ money_put](<#/doc/locale/money_put>) | formata um valor monetário para saída como uma sequência de caracteres
(modelo de classe)
[ moneypunct](<#/doc/locale/moneypunct>) | define parâmetros de formatação monetária usados por [std::money_get](<#/doc/locale/money_get>) e [std::money_put](<#/doc/locale/money_put>)
(modelo de classe)

##### Categorias de facet específicas de locale

[ ctype_byname](<#/doc/locale/ctype_byname>) | representa o [std::ctype](<#/doc/locale/ctype>) fornecido pelo sistema para o locale nomeado
(modelo de classe)
[ codecvt_byname](<#/doc/locale/codecvt_byname>) | representa o [std::codecvt](<#/doc/locale/codecvt>) fornecido pelo sistema para o locale nomeado
(modelo de classe)
[ messages_byname](<#/doc/locale/messages_byname>) | representa o [std::messages](<#/doc/locale/messages>) fornecido pelo sistema para o locale nomeado
(modelo de classe)
[ collate_byname](<#/doc/locale/collate_byname>) | representa o [std::collate](<#/doc/locale/collate>) fornecido pelo sistema para o locale nomeado
(modelo de classe)
[ time_get_byname](<#/doc/locale/time_get_byname>) | representa o [std::time_get](<#/doc/locale/time_get>) fornecido pelo sistema para o locale nomeado
(modelo de classe)
[ time_put_byname](<#/doc/locale/time_put_byname>) | representa o [std::time_put](<#/doc/locale/time_put>) fornecido pelo sistema para o locale nomeado
(modelo de classe)
[ numpunct_byname](<#/doc/locale/numpunct_byname>) | representa o [std::numpunct](<#/doc/locale/numpunct>) fornecido pelo sistema para o locale nomeado
(modelo de classe)
[ moneypunct_byname](<#/doc/locale/moneypunct_byname>) | representa o [std::moneypunct](<#/doc/locale/moneypunct>) fornecido pelo sistema para o locale nomeado
(modelo de classe)

### Funções

##### Locales e facets

[ use_facet](<#/doc/locale/use_facet>) | obtém um facet de um locale
(modelo de função)
[ has_facet](<#/doc/locale/has_facet>) | verifica se um locale implementa um facet específico
(modelo de função)

##### Classificação de caracteres

[ isspace(std::locale)](<#/doc/locale/isspace>) | verifica se um caractere é classificado como espaço em branco por um locale
(modelo de função)
[ isblank(std::locale)](<#/doc/locale/isblank>)(desde C++11) | verifica se um caractere é classificado como um caractere em branco por um locale
(modelo de função)
[ iscntrl(std::locale)](<#/doc/locale/iscntrl>) | verifica se um caractere é classificado como um caractere de controle por um locale
(modelo de função)
[ isupper(std::locale)](<#/doc/locale/isupper>) | verifica se um caractere é classificado como maiúsculo por um locale
(modelo de função)
[ islower(std::locale)](<#/doc/locale/islower>) | verifica se um caractere é classificado como minúsculo por um locale
(modelo de função)
[ isalpha(std::locale)](<#/doc/locale/isalpha>) | verifica se um caractere é classificado como alfabético por um locale
(modelo de função)
[ isdigit(std::locale)](<#/doc/locale/isdigit>) | verifica se um caractere é classificado como um dígito por um locale
(modelo de função)
[ ispunct(std::locale)](<#/doc/locale/ispunct>) | verifica se um caractere é classificado como pontuação por um locale
(modelo de função)
[ isxdigit(std::locale)](<#/doc/locale/isxdigit>) | verifica se um caractere é classificado como um dígito hexadecimal por um locale
(modelo de função)
[ isalnum(std::locale)](<#/doc/locale/isalnum>) | verifica se um caractere é classificado como alfanumérico por um locale
(modelo de função)
[ isprint(std::locale)](<#/doc/locale/isprint>) | verifica se um caractere é classificado como imprimível por um locale
(modelo de função)
[ isgraph(std::locale)](<#/doc/locale/isgraph>) | verifica se um caractere é classificado como gráfico por um locale
(modelo de função)

##### Conversões de caracteres

[ toupper(std::locale)](<#/doc/locale/toupper>) | converte um caractere para maiúscula usando o facet ctype de um locale
(modelo de função)
[ tolower(std::locale)](<#/doc/locale/tolower>) | converte um caractere para minúscula usando o facet `ctype` de um locale
(modelo de função)

#### Synopsis
```cpp
    namespace std {
    
        // locale:
        class locale;
        template <class Facet> const Facet& use_facet(const locale&);
        template <class Facet> bool has_facet(const locale&) noexcept;
    
        // convenience interfaces:
        template <class CharT> bool isspace (CharT c, const locale& loc);
        template <class CharT> bool isprint (CharT c, const locale& loc);
        template <class CharT> bool iscntrl (CharT c, const locale& loc);
        template <class CharT> bool isupper (CharT c, const locale& loc);
        template <class CharT> bool islower (CharT c, const locale& loc);
        template <class CharT> bool isalpha (CharT c, const locale& loc);
        template <class CharT> bool isdigit (CharT c, const locale& loc);
        template <class CharT> bool ispunct (CharT c, const locale& loc);
        template <class CharT> bool isxdigit(CharT c, const locale& loc);
        template <class CharT> bool isalnum (CharT c, const locale& loc);
        template <class CharT> bool isgraph (CharT c, const locale& loc);
        template <class CharT> CharT toupper(CharT c, const locale& loc);
        template <class CharT> CharT tolower(CharT c, const locale& loc);
        template <class Codecvt, class Elem = wchar_t,
                  class Wide_alloc = std::allocator<Elem>,
            class Byte_alloc = std::allocator<char>> class wstring_convert;
        template <class Codecvt, class Elem = wchar_t,
                  class Tr = char_traits<Elem>> class wbuffer_convert;
    
        // ctype:
        class ctype_base;
        template <class CharT> class ctype;
        template <>            class ctype<char>; // specialization
        template <class CharT> class ctype_byname;
        class codecvt_base;
        template <class internT, class externT, class stateT> class codecvt;
        template <class internT, class externT, class stateT> class codecvt_byname;
    
        // numeric:
        template <class CharT, class InputIter = istreambuf_iterator<CharT>> class num_get;
        template <class CharT, class OutputIter = osterambuf_iterator<CharT>> class num_put;
        template <class CharT> class numpunct;
        template <class CharT> class numpunct_byname;
    
        // collation:
        template <class CharT> class collate;
        template <class CharT> class collate_byname;
    
        // date and time:
        class time_base;
        template <class CharT, class InputIter = istreambuf_iterator<CharT>>
            class time_get;
        template <class CharT, class InputIter> = istreambuf_iterator<CharT>>
            class time_get_byname;
        template <class CharT, class OutputIter> = ostreambuf_iterator<CharT>>
            class time_put;
        template <class CharT, class OutputIter> = ostreambuf_iterator<CharT>>
            class time_put_byname;
    
        // money:
        class money_base;
        template <class CharT, class InputIter = istreambuf_iterator<CharT>> >
            class money_get;
        template <class CharT, class OutputIter = ostreambuf_iterator<CharT>> >
            class money_put;
        template <class CharT, bool Intl = false> class moneypunct;
        template <class CharT, bool Intl = false> class moneypunct_byname;
    
        // message retrieval:
        class messages_base;
        template <class CharT> class messages;
        template <class CharT> class messages_byname;
    }
```

#### Class [std::locale](<#/doc/locale/locale>)
```cpp
    class locale
    {
    public:
        // types:
        class facet;
        class id;
        typedef int category;
        static const category // values assigned here are for exposition only
            none     = 0,
            collate  = 0x010,
            ctype    = 0x020,
            monetary = 0x040,
            numeric  = 0x080,
            time     = 0x100,
            messages = 0x200,
            all = collate | ctype | monetary | numeric | time | messages;
    
        // construct/copy/destroy:
        locale() noexcept;
        locale(const locale& other) noexcept;
        explicit locale(const char* std_name);
        explicit locale(const string& std_name);
        locale(const locale& other, const char* std_name, category);
        locale(const locale& other, const string& std_name, category);
        template <class Facet> locale(const locale& other, Facet* f);
        locale(const locale& other, const locale& one, category);
        ~locale();
    
        // not virtual
        const locale& operator=(const locale& other) noexcept;
        template <class Facet> locale combine(const locale& other) const;
    
        // locale operations:
        basic_string<char>
        name() const;
        bool operator==(const locale& other) const;
        bool operator!=(const locale& other) const;
        template <class CharT, class Traits, class Allocator>
        bool operator()(const basic_string<CharT,Traits,Allocator>& s1,
                        const basic_string<CharT,Traits,Allocator>& s2) const;
    
        // global locale objects:
        static
        locale global(const locale&);
        static const locale& classic();
    };
```

#### Class [std::ctype_base](<#/doc/locale/ctype_base>)
```cpp
    class ctype_base
    {
    public:
        typedef /*bitmask-type*/ mask;
    
        // numeric values are for exposition only.
        static const mask space = 1 << 0;
        static const mask print = 1 << 1;
        static const mask cntrl = 1 << 2;
        static const mask upper = 1 << 3;
        static const mask lower = 1 << 4;
        static const mask alpha = 1 << 5;
        static const mask digit = 1 << 6;
        static const mask punct = 1 << 7;
        static const mask xdigit= 1 << 8;
        static const mask blank = 1 << 9;
        static const mask alnum = alpha | digit;
        static const mask graph = alnum | punct;
    };
```

#### Class [std::ctype](<#/doc/locale/ctype>)
```cpp
    template <class CharT>
    class ctype : public locale::facet, public ctype_base
    {
    public:
        typedef CharT char_type;
    
        explicit ctype(size_t refs = 0);
    
        bool is(mask m, CharT c) const;
        const CharT* is(const CharT* low, const CharT* high, mask* vec) const;
        const CharT* scan_is(mask m,
                             const CharT* low, const CharT* high) const;
        const CharT* scan_not(mask m,
                              const CharT* low, const CharT* high) const;
    
        CharT        toupper(CharT c) const;
        const CharT* toupper(CharT* low, const CharT* high) const;
        CharT        tolower(CharT c) const;
        const CharT* tolower(CharT* low, const CharT* high) const;
    
        CharT        widen(char c) const;
        const char*  widen(const char* low, const char* high, CharT* to) const;
        char         narrow(CharT c, char dfault) const;
        const CharT* narrow(const CharT* low, const CharT*, char dfault,
                            char* to) const;
    
        static locale::id id;
    
    protected:
        ~ctype();
        virtual bool do_is(mask m, CharT c) const;
        virtual const CharT* do_is(const CharT* low, const CharT* high,
                                   mask* vec) const;
        virtual const CharT* do_scan_is(mask m,
                                        const CharT* low, const CharT* high) const;
        virtual const CharT* do_scan_not(mask m,
                                         const CharT* low, const CharT* high) const;
    
        virtual CharT do_toupper(CharT) const;
        virtual const CharT* do_toupper(CharT* low, const CharT* high) const;
        virtual CharT do_tolower(CharT) const;
        virtual const CharT* do_tolower(CharT* low, const CharT* high) const;
        virtual CharT do_widen(char) const;
        virtual const char*  do_widen(const char* low, const char* high,
                                      CharT* dest) const;
        virtual char do_narrow(CharT, char dfault) const;
        virtual const CharT* do_narrow(const CharT* low, const CharT* high,
                                       char dfault, char* dest) const;
    };
```

#### Class [std::ctype_byname](<#/doc/locale/ctype_byname>)
```cpp
    template <class CharT>
    class ctype_byname : public ctype<CharT>
    {
    public:
        typedef typename ctype<CharT>::mask mask;
        explicit ctype_byname(const char*, size_t refs = 0);
        explicit ctype_byname(const string&, size_t refs = 0);
        protected:
        ~ctype_byname();
    };
```

#### Class [std::ctype](<#/doc/locale/ctype>)&lt;char&gt;
```cpp
    template <> class ctype<char>
        : public locale::facet, public ctype_base
    {
    public:
        typedef char char_type;
        explicit ctype(const mask* tab = 0, bool del = false,
                       size_t refs = 0);
        bool is(mask m, char c) const;
        const char* is(const char* low, const char* high, mask* vec) const;
        const char* scan_is (mask m,
                             const char* low, const char* high) const;
        const char* scan_not(mask m,
                             const char* low, const char* high) const;
        char        toupper(char c) const;
        const char* toupper(char* low, const char* high) const;
        char        tolower(char c) const;
        const char* tolower(char* low, const char* high) const;
        char        widen(char c) const;
        const char* widen(const char* low, const char* high, char* to) const;
        char        narrow(char c, char dfault) const;
        const char* narrow(const char* low, const char* high, char dfault,
                           char* to) const;
    
        static locale::id id;
    
        static const size_t table_size = /* implementation-defined */;
        const mask* table() const noexcept;
        static const mask* classic_table() noexcept;
    
    protected:
        ~ctype();
        virtual char        do_toupper(char c) const;
        virtual const char* do_toupper(char* low, const char* high) const;
        virtual char        do_tolower(char c) const;
        virtual const char* do_tolower(char* low, const char* high) const;
        virtual char        do_widen(char c) const;
        virtual const char* do_widen(const char* low,
                                     const char* high,
                                     char* to) const;
        virtual char        do_narrow(char c, char dfault) const;
        virtual const char* do_narrow(const char* low,
                                      const char* high,
                                      char dfault, char* to) const;
    };
```

#### Class [std::codecvt_base](<#/doc/locale/codecvt_base>)
```cpp
    class codecvt_base
    {
    public:
        enum result { ok, partial, error, noconv };
    };
```

#### Class [std::codecvt](<#/doc/locale/codecvt>)
```cpp
    template <class internT, class externT, class stateT>
    class codecvt : public locale::facet, public codecvt_base
    {
    public:
        typedef internT intern_type;
        typedef externT extern_type;
        typedef stateT state_type;
        explicit codecvt(size_t refs = 0);
        result out(stateT& state,
                   const internT* from, const internT* from_end,
                   const internT*& from_next,
                   externT* to, externT* to_end, externT*& to_next) const;
        result unshift(stateT& state, externT* to,
                       externT* to_end, externT*& to_next) const;
        result in(stateT& state,
                  const externT* from, const externT* from_end,
                  const externT*& from_next,
                  internT* to,
                  internT* to_end, internT*& to_next) const;
        int encoding() const noexcept;
        bool always_noconv() const noexcept;
        int length(stateT&, const externT* from, const externT* end,
                   size_t max) const;
        int max_length() const noexcept;
        static locale::id id;
    protected:
        ~codecvt();
        virtual result do_out(stateT& state,
                              const internT* from, const internT* from_end,
                              const internT*& from_next,
                              externT* to,
                              externT* to_end, externT*& to_next) const;
        virtual result do_in(stateT& state,
                             const externT* from, const externT* from_end,
                             const externT*& from_next,
                             internT* to,
                             internT* to_end, internT*& to_next) const;
        virtual result do_unshift(stateT& state,
                                  externT* to,
                                  externT* to_end, externT*& to_next) const;
        virtual int do_encoding() const noexcept;
        virtual bool do_always_noconv() const noexcept;
        virtual int do_length(stateT&, const externT* from,
                              const externT* end, size_t max) const;
        virtual int do_max_length() const noexcept;
    };
```

#### Class [std::codecvt_byname](<#/doc/locale/codecvt_byname>)
```cpp
    template <class internT, class externT, class stateT>
    class codecvt_byname : public codecvt<internT, externT, stateT>
    {
    public:
        explicit codecvt_byname(const char*, size_t refs = 0);
        explicit codecvt_byname(const string&, size_t refs = 0);
    protected:
        ~codecvt_byname();
    };
```

#### Class [std::num_get](<#/doc/locale/num_get>)
```cpp
    template <class CharT, class InputIter = istreambuf_iterator<CharT>>
    class num_get : public locale::facet
    {
    public:
        typedef CharT           char_type;
        typedef InputIter   iter_type;
        explicit num_get(size_t refs = 0);
        iter_type get(iter_type in, iter_type end, ios_base&,
                      ios_base::iostate& err, bool& v) const;
        iter_type get(iter_type in, iter_type end, ios_base&,
                      ios_base::iostate& err, long& v) const;
        iter_type get(iter_type in, iter_type end, ios_base&,
                      ios_base::iostate& err, long long& v) const;
        iter_type get(iter_type in, iter_type end, ios_base&,
                      ios_base::iostate& err, unsigned short& v) const;
        iter_type get(iter_type in, iter_type end, ios_base&,
                      ios_base::iostate& err, unsigned int& v) const;
        iter_type get(iter_type in, iter_type end, ios_base&,
                      ios_base::iostate& err, unsigned long& v) const;
        iter_type get(iter_type in, iter_type end, ios_base&,
                      ios_base::iostate& err, unsigned long long& v) const;
        iter_type get(iter_type in, iter_type end, ios_base&,
                      ios_base::iostate& err, float& v) const;
        iter_type get(iter_type in, iter_type end, ios_base&,
                      ios_base::iostate& err, double& v) const;
        iter_type get(iter_type in, iter_type end, ios_base&,
                      ios_base::iostate& err, long double& v) const;
        iter_type get(iter_type in, iter_type end, ios_base&,
                      ios_base::iostate& err, void*& v) const;
    
        static locale::id id;
    
    protected:
        ~num_get();
    
        virtual iter_type do_get(iter_type, iter_type, ios_base&,
                                 ios_base::iostate& err, bool& v) const;
        virtual iter_type do_get(iter_type, iter_type, ios_base&,
                                 ios_base::iostate& err, long& v) const;
        virtual iter_type do_get(iter_type, iter_type, ios_base&,
                                 ios_base::iostate& err, long long& v) const;
        virtual iter_type do_get(iter_type, iter_type, ios_base&,
                                 ios_base::iostate& err, unsigned short& v) const;
        virtual iter_type do_get(iter_type, iter_type, ios_base&,
                                 ios_base::iostate& err, unsigned int& v) const;
        virtual iter_type do_get(iter_type, iter_type, ios_base&,
                                 ios_base::iostate& err, unsigned long& v) const;
        virtual iter_type do_get(iter_type, iter_type, ios_base&,
                                 ios_base::iostate& err, unsigned long long& v) const;
        virtual iter_type do_get(iter_type, iter_type, ios_base&,
                                 ios_base::iostate& err, float& v) const;
        virtual iter_type do_get(iter_type, iter_type, ios_base&,
                                 ios_base::iostate& err, double& v) const;
        virtual iter_type do_get(iter_type, iter_type, ios_base&,
                                 ios_base::iostate& err, long double& v) const;
        virtual iter_type do_get(iter_type, iter_type, ios_base&,
                                 ios_base::iostate& err, void*& v) const;
    };
```

#### Class [std::num_put](<#/doc/locale/num_put>)
```cpp
    template <class CharT, class OutputIter = ostreambuf_iterator<CharT>>
    class num_put : public locale::facet
    {
    public:
        typedef CharT char_type;
        typedef OutputIter iter_type;
    
        explicit num_put(size_t refs = 0);
    
        iter_type put(iter_type s, ios_base& f, char_type fill,
                      bool v) const;
        iter_type put(iter_type s, ios_base& f, char_type fill,
                      long v) const;
        iter_type put(iter_type s, ios_base& f, char_type fill,
                      long long v) const;
        iter_type put(iter_type s, ios_base& f, char_type fill,
                      unsigned long v) const;
        iter_type put(iter_type s, ios_base& f, char_type fill,
                      unsigned long long v) const;
        iter_type put(iter_type s, ios_base& f, char_type fill,
                      double v) const;
        iter_type put(iter_type s, ios_base& f, char_type fill,
                      long double v) const;
        iter_type put(iter_type s, ios_base& f, char_type fill,
                      const void* v) const;
    
        static locale::id id;
    
    protected:
        ~num_put();
    
        virtual iter_type do_put(iter_type, ios_base&, char_type fill,
                                 bool v) const;
        virtual iter_type do_put(iter_type, ios_base&, char_type fill,
                                 long v) const;
        virtual iter_type do_put(iter_type, ios_base&, char_type fill,
                                 long long v) const;
        virtual iter_type do_put(iter_type, ios_base&, char_type fill,
                                 unsigned long) const;
        virtual iter_type do_put(iter_type, ios_base&, char_type fill,
                                 unsigned long long) const;
        virtual iter_type do_put(iter_type, ios_base&, char_type fill,
                                 double v) const;
        virtual iter_type do_put(iter_type, ios_base&, char_type fill,
                                 long double v) const;
        virtual iter_type do_put(iter_type, ios_base&, char_type fill,
                                 const void* v) const;
    };
```

#### Class [std::numpunct](<#/doc/locale/numpunct>)
```cpp
    template <class CharT>
    class numpunct : public locale::facet
    {
    public:
        typedef CharT char_type;
        typedef basic_string<CharT> string_type;
    
        explicit numpunct(size_t refs = 0);
    
        char_type   decimal_point() const;
        char_type   thousands_sep() const;
        string      grouping()      const;
        string_type truename()      const;
        string_type falsename()     const;
    
        static locale::id id;
    
    protected:
        ~numpunct(); // virtual
    
        virtual char_type   do_decimal_point() const;
        virtual char_type   do_thousands_sep() const;
        virtual string      do_grouping()      const;
        virtual string_type do_truename()      const; // for bool
        virtual string_type do_falsename()     const; // for bool
    };
```

#### Class [std::numpunct_byname](<#/doc/locale/numpunct_byname>)
```cpp
    template <class CharT>
    class numpunct_byname : public numpunct<CharT>
    {
    public:
        typedef CharT char_type;
        typedef basic_string<CharT> string_type;
    
        explicit numpunct_byname(const char*, size_t refs = 0);
        explicit numpunct_byname(const string&, size_t refs = 0);
    
    protected:
        ~numpunct_byname();
    };
```

#### Class [std::collate](<#/doc/locale/collate>)
```cpp
    template <class CharT>
    class collate : public locale::facet
    {
    public:
        typedef CharT char_type;
        typedef basic_string<CharT> string_type;
    
        explicit collate(size_t refs = 0);
    
        int compare(const CharT* low1, const CharT* high1,
                    const CharT* low2, const CharT* high2) const;
        string_type transform(const CharT* low, const CharT* high) const;
        long hash(const CharT* low, const CharT* high) const;
    
        static locale::id id;
    
    protected:
        ~collate();
    
        virtual int do_compare(const CharT* low1, const CharT* high1,
                               const CharT* low2, const CharT* high2) const;
        virtual string_type do_transform(const CharT* low,
                                         const CharT* high) const;
        virtual long do_hash (const CharT* low, const CharT* high) const;
    };
```

#### Class [std::collate_byname](<#/doc/locale/collate_byname>)
```cpp
    template <class CharT>
    class collate_byname : public collate<CharT>
    {
    public:
        typedef basic_string<CharT> string_type;
    
        explicit collate_byname(const char*, size_t refs = 0);
        explicit collate_byname(const string&, size_t refs = 0);
    
    protected:
        ~collate_byname();
    };
```

#### Class [std::time_base](<#/doc/locale/time_base>)
```cpp
    class time_base
    {
    public:
        enum dateorder { no_order, dmy, mdy, ymd, ydm };
    };
```

#### Class [std::time_get](<#/doc/locale/time_get>)
```cpp
    template <class CharT, class InputIter = istreambuf_iterator<CharT>>
    class time_get : public locale::facet, public time_base
    {
    public:
        typedef CharT char_type;
        typedef InputIter iter_type;
    
        explicit time_get(size_t refs = 0);
    
        dateorder date_order() const;
        iter_type get_time(iter_type s, iter_type end, ios_base& f,
                           ios_base::iostate& err, tm* t) const;
        iter_type get_date(iter_type s, iter_type end, ios_base& f,
                           ios_base::iostate& err, tm* t) const;
        iter_type get_weekday(iter_type s, iter_type end, ios_base& f,
                              ios_base::iostate& err, tm* t) const;
        iter_type get_monthname(iter_type s, iter_type end, ios_base& f,
                                ios_base::iostate& err, tm* t) const;
        iter_type get_year(iter_type s, iter_type end, ios_base& f,
                           ios_base::iostate& err, tm* t) const;
        iter_type get(iter_type s, iter_type end, ios_base& f,
                      ios_base::iostate& err, tm* t, char format,
                      char modifier = 0) const;
        iter_type get(iter_type s, iter_type end, ios_base& f,
                      ios_base::iostate& err, tm* t,
                      const char_type* fmt, const char_type* fmtend) const;
    
        static locale::id id;
    
    protected:
        ~time_get();
    
        virtual dateorder do_date_order() const;
        virtual iter_type do_get_time(iter_type s, iter_type end, ios_base&,
```
```cpp
        virtual iter_type do_get_date(iter_type s, iter_type end, ios_base&,
                                      ios_base::iostate& err, tm* t) const;
        virtual iter_type do_get_weekday(iter_type s, iter_type end, ios_base&,
                                         ios_base::iostate& err, tm* t) const;
        virtual iter_type do_get_monthname(iter_type s, iter_type end, ios_base&,
                                           ios_base::iostate& err, tm* t) const;
        virtual iter_type do_get_year(iter_type s, iter_type end, ios_base&,
                                      ios_base::iostate& err, tm* t) const;
        virtual iter_type do_get(iter_type s, iter_type end, ios_base& f,
                                 ios_base::iostate& err, tm* t,
                                 char format, char modifier) const;
    };
```

#### Classe [std::time_get_byname](<#/doc/locale/time_get_byname>)
```cpp
    template <class CharT, class InputIter = istreambuf_iterator<CharT>>
    class time_get_byname : public time_get<CharT, InputIter>
    {
    public:
        typedef time_base::dateorder dateorder;
        typedef InputIter iter_type;
    
        explicit time_get_byname(const char*, size_t refs = 0);
        explicit time_get_byname(const string&, size_t refs = 0);
    
    protected:
        ~time_get_byname();
    };
```

#### Classe [std::time_put](<#/doc/locale/time_put>)
```cpp
    template <class CharT, class OutputIter = ostreambuf_iterator<CharT>>
    class time_put : public locale::facet
    {
    public:
        typedef CharT char_type;
        typedef OutputIter iter_type;
    
        explicit time_put(size_t refs = 0);
    
        // o seguinte é implementado em termos de outras funções membro.
        iter_type put(iter_type s, ios_base& f, char_type fill, const tm* tmb,
                      const CharT* pattern, const CharT* pat_end) const;
        iter_type put(iter_type s, ios_base& f, char_type fill,
                      const tm* tmb, char format, char modifier = 0) const;
    
        static locale::id id;
    
    protected:
        ~time_put();
    
        virtual iter_type do_put(iter_type s, ios_base&, char_type, const tm* t,
                                 char format, char modifier) const;
    };
```

#### Classe [std::time_put_byname](<#/doc/locale/time_put_byname>)
```cpp
    template <class CharT, class OutputIter = ostreambuf_iterator<CharT>>
    class time_put_byname : public time_put<CharT, OutputIter>
    {
    public:
        typedef CharT char_type;
        typedef OutputIter iter_type;
    
        explicit time_put_byname(const char*, size_t refs = 0);
        explicit time_put_byname(const string&, size_t refs = 0);
    
    protected:
        ~time_put_byname();
    };
```

#### Classe [std::money_get](<#/doc/locale/money_get>)
```cpp
    template <class CharT, class InputIter = istreambuf_iterator<CharT>>
    class money_get : public locale::facet
    {
    public:
        typedef CharT char_type;
        typedef InputIter iter_type;
        typedef basic_string<CharT> string_type;
    
        explicit money_get(size_t refs = 0);
    
        iter_type get(iter_type s, iter_type end, bool intl, ios_base& f,
                      ios_base::iostate& err, long double& units) const;
        iter_type get(iter_type s, iter_type end, bool intl, ios_base& f,
                      ios_base::iostate& err, string_type& digits) const;
    
        static locale::id id;
    
    protected:
        ~money_get();
    
        virtual iter_type do_get(iter_type, iter_type, bool, ios_base&,
                                 ios_base::iostate& err,
                                 long double& units) const;
        virtual iter_type do_get(iter_type, iter_type, bool, ios_base&,
                                 ios_base::iostate& err,
                                 string_type& digits) const;
    };
```

#### Classe [std::money_put](<#/doc/locale/money_put>)
```cpp
    template <class CharT, class OutputIter = ostreambuf_iterator<CharT>>
    class money_put : public locale::facet
    {
    public:
        typedef CharT char_type;
        typedef OutputIter iter_type;
        typedef basic_string<CharT> string_type;
    
        explicit money_put(size_t refs = 0);
    
        iter_type put(iter_type s, bool intl, ios_base& f,
                      char_type fill, long double units) const;
        iter_type put(iter_type s, bool intl, ios_base& f,
                      char_type fill, const string_type& digits) const;
    
        static locale::id id;
    
    protected:
        ~money_put();
    
        virtual iter_type do_put(iter_type, bool, ios_base&, char_type fill,
                                 long double units) const;
        virtual iter_type do_put(iter_type, bool, ios_base&, char_type fill,
                                 const string_type& digits) const;
    };
```

#### Classe [std::money_base](<#/doc/locale/money_base>)
```cpp
    class money_base
    {
    public:
        enum part { none, space, symbol, sign, value };
        struct pattern { char field[4]; };
    };
```

#### Classe [std::moneypunct](<#/doc/locale/moneypunct>)
```cpp
    template <class CharT, bool International = false>
    class moneypunct : public locale::facet, public money_base
    {
    public:
        typedef CharT char_type;
        typedef basic_string<CharT> string_type;
    
        explicit moneypunct(size_t refs = 0);
    
        CharT       decimal_point() const;
        CharT       thousands_sep() const;
        string      grouping()      const;
        string_type curr_symbol()   const;
        string_type positive_sign() const;
        string_type negative_sign() const;
        int         frac_digits()   const;
        pattern     pos_format()    const;
        pattern     neg_format()    const;
    
        static locale::id id;
        static const bool intl = International;
    
    protected:
        ~moneypunct();
    
        virtual CharT       do_decimal_point() const;
        virtual CharT       do_thousands_sep() const;
        virtual string      do_grouping()      const;
        virtual string_type do_curr_symbol()   const;
        virtual string_type do_positive_sign() const;
        virtual string_type do_negative_sign() const;
        virtual int         do_frac_digits()   const;
        virtual pattern     do_pos_format()    const;
        virtual pattern     do_neg_format()    const;
    };
```

#### Classe [std::moneypunct_byname](<#/doc/locale/moneypunct_byname>)
```cpp
    template <class CharT, bool Intl = false>
    class moneypunct_byname : public moneypunct<CharT, Intl>
    {
    public:
        typedef money_base::pattern pattern;
        typedef basic_string<CharT> string_type;
    
        explicit moneypunct_byname(const char*, size_t refs = 0);
        explicit moneypunct_byname(const string&, size_t refs = 0);
    
    protected:
        ~moneypunct_byname();
    };
```

#### Classe [std::messages_base](<#/doc/locale/messages_base>)
```cpp
    class messages_base
    {
    public:
        typedef /* tipo inteiro assinado não especificado */ catalog;
    };
```

#### Classe [std::messages](<#/doc/locale/messages>)
```cpp
    template <class CharT>
    class messages : public locale::facet, public messages_base {
    public:
        typedef CharT char_type;
        typedef basic_string<CharT> string_type;
    
        explicit messages(size_t refs = 0);
    
        catalog open(const basic_string<char>& fn, const locale&) const;
        string_type get(catalog c, int set, int msgid,
                        const string_type& dfault) const;
        void close(catalog c) const;
    
        static locale::id id;
    
    protected:
        ~messages();
    
        virtual catalog do_open(const basic_string<char>&, const locale&) const;
        virtual string_type do_get(catalog, int set, int msgid,
                                   const string_type& dfault) const;
        virtual void do_close(catalog) const;
    };
```

#### Classe [std::messages_byname](<#/doc/locale/messages_byname>)
```cpp
    template <class CharT>
    class messages_byname : public messages<CharT>
    {
    public:
        typedef messages_base::catalog catalog;
        typedef basic_string<CharT> string_type;
    
        explicit messages_byname(const char*, size_t refs = 0);
        explicit messages_byname(const string&, size_t refs = 0);
    
    protected:
        ~messages_byname();
    };
```

#### Classe [std::wstring_convert](<#/doc/locale/wstring_convert>)
```cpp
    template<class Codecvt, class Elem = wchar_t,
        class Wide_alloc = std::allocator<Elem>,
        class Byte_alloc = std::allocator<char>>
    class wstring_convert
    {
    public:
        typedef std::basic_string<char, char_traits<char>, Byte_alloc> byte_string;
        typedef std::basic_string<Elem, char_traits<Elem>, Wide_alloc> wide_string;
        typedef typename Codecvt::state_type state_type;
        typedef typename wide_string::traits_type::int_type int_type;
    
        explicit wstring_convert(Codecvt* pcvt = new Codecvt);
        wstring_convert(Codecvt* pcvt, state_type state);
        explicit wstring_convert(const byte_string& byte_err,
                                 const wide_string& wide_err = wide_string());
        ~wstring_convert();
    
        wstring_convert(const wstring_convert&) = delete;
        wstring_convert& operator=(const wstring_convert&) = delete;
    
        wide_string from_bytes(char byte);
        wide_string from_bytes(const char* ptr);
        wide_string from_bytes(const byte_string& str);
        wide_string from_bytes(const char* first, const char* last);
        byte_string to_bytes(Elem wchar);
        byte_string to_bytes(const Elem* wptr);
        byte_string to_bytes(const wide_string& wstr);
        byte_string to_bytes(const Elem* first, const Elem* last);
        size_t converted() const noexcept;
        state_type state() const;
    
    private:
        byte_string byte_err_string; // apenas para exposição
        wide_string wide_err_string; // apenas para exposição
        Codecvt* cvtptr;             // apenas para exposição
        state_type cvtstate;         // apenas para exposição
        size_t cvtcount;             // apenas para exposição
    };
```

#### Classe [std::wbuffer_convert](<#/doc/locale/wbuffer_convert>)
```cpp
    template<class Codecvt,
        class Elem = wchar_t,
        class Tr = std::char_traits<Elem>>
    class wbuffer_convert : public std::basic_streambuf<Elem, Tr>
    {
    public:
        typedef typename Codecvt::state_type state_type;
    
        explicit wbuffer_convert(std::streambuf* bytebuf = 0,
                                 Codecvt* pcvt = new Codecvt,
                                 state_type state = state_type());
        ~wbuffer_convert();
    
        wbuffer_convert(const wbuffer_convert&) = delete;
        wbuffer_convert& operator=(const wbuffer_convert&) = delete;
    
        std::streambuf* rdbuf() const;
        std::streambuf* rdbuf(std::streambuf* bytebuf);
        state_type state() const;
    private:
        std::streambuf* bufptr; // apenas para exposição
        Codecvt* cvtptr;        // apenas para exposição
        state_type cvtstate;    // apenas para exposição
    };
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 71](<https://cplusplus.github.io/LWG/issue71>) | C++98 | o parâmetro end de [`time_get::do_get_monthname`](<#/doc/locale/time_get/get_monthname>) estava faltando na sinopse | adicionado
[LWG 75](<https://cplusplus.github.io/LWG/issue75>) | C++98 | o tipo do parâmetro state dos membros [`length`](<#/doc/locale/codecvt/length>) e `do_length` de [`codecvt`](<#/doc/locale/codecvt>) e [`codecvt_byname`](<#/doc/locale/codecvt_byname>) era const stateT& na sinopse | corrigido para stateT&
[LWG 124](<https://cplusplus.github.io/LWG/issue124>) | C++98 | os tipos de retorno dos membros `do_scan_is` e `do_scan_not` de [`codecvt_byname`](<#/doc/locale/codecvt_byname>) eram const char* na sinopse | corrigido para const charT*
[LWG 228](<https://cplusplus.github.io/LWG/issue228>) | C++98 | todas as funções membro virtuais de `XXX_byname` facets estavam listadas nas sinopses | lista apenas o destrutor (removeu todas as outras funções membro virtuais)
[LWG 268](<https://cplusplus.github.io/LWG/issue268>) | C++98 | os pontos e vírgulas após as declarações do construtor padrão e do construtor de cópia de [std::locale](<#/doc/locale/locale>) estavam faltando na sinopse | adicionado
[LWG 1298](<https://cplusplus.github.io/LWG/issue1298>) | C++98 | havia uma especialização explícita [`ctype_byname`](<#/doc/locale/ctype_byname>)&lt;char&gt; na sinopse | removido