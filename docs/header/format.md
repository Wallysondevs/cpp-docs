# Cabeçalho da biblioteca padrão &lt;format&gt; (C++20)

Este cabeçalho faz parte da biblioteca de [processamento de texto](<#/doc/text>).

### Conceitos

---
[ formattable](<#/doc/utility/format/formattable>)(C++23) | especifica que um tipo é formatável, ou seja, ele especializa [std::formatter](<#/doc/utility/format/formatter>) e fornece as funções membro `parse` e `format`
(concept)

### Enumerações

[ range_format](<#/doc/utility/format/range_format>)(C++23) | especifica como um range deve ser formatado
(enum)

### Classes

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(class template)
[ range_formatter](<#/doc/utility/format/range_formatter>)(C++23) | class template que auxilia na implementação de especializações de [std::formatter](<#/doc/utility/format/formatter>) para tipos range
(class template)
[ basic_format_parse_contextformat_parse_contextwformat_parse_context](<#/doc/utility/format/basic_format_parse_context>)(C++20)(C++20)(C++20) | estado do parser de string de formatação
(class template)
[ basic_format_contextformat_contextwformat_context](<#/doc/utility/format/basic_format_context>)(C++20)(C++20)(C++20) | estado de formatação, incluindo todos os argumentos de formatação e o iterator de saída
(class template)
[ basic_format_arg](<#/doc/utility/format/basic_format_arg>)(C++20) | class template que fornece acesso a um argumento de formatação para formatters definidos pelo usuário
(class template)
[ basic_format_argsformat_argswformat_args](<#/doc/utility/format/basic_format_args>)(C++20)(C++20)(C++20) | classe que fornece acesso a todos os argumentos de formatação
(class template)
[ basic_format_stringformat_stringwformat_string](<#/doc/utility/format/basic_format_string>)(C++20)(C++20)(C++20) | class template que realiza verificações de string de formatação em tempo de compilação no momento da construção
(class template)
[ format_error](<#/doc/utility/format/format_error>)(C++20) | tipo de exceção lançada em erros de formatação
(class)

##### Especializações de Formatter

[ std::formatter<_pair-or-tuple_ >](<#/doc/utility/format/tuple_formatter>)(C++23) | suporte de formatação para `pair` e `tuple`
(class template specialization)
[ std::formatter<_range_ >](<#/doc/utility/format/ranges_formatter>)(C++23) | suporte de formatação para ranges
(class template specialization)

### Funções

[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(function template)
[ format_to](<#/doc/utility/format/format_to>)(C++20) | escreve a representação formatada de seus argumentos através de um iterator de saída
(function template)
[ format_to_n](<#/doc/utility/format/format_to_n>)(C++20) | escreve a representação formatada de seus argumentos através de um iterator de saída, sem exceder o tamanho especificado
(function template)
[ formatted_size](<#/doc/utility/format/formatted_size>)(C++20) | determina o número de caracteres necessários para armazenar a representação formatada de seus argumentos
(function template)
[ runtime_format](<#/doc/utility/format/runtime_format>)(C++26) | cria strings de formato em tempo de execução diretamente utilizáveis em funções de formatação orientadas ao usuário
(function)
[ vformat](<#/doc/utility/format/vformat>)(C++20) | variante não-template de [std::format](<#/doc/utility/format/format>) usando representação de argumento com type-erasure
(function)
[ vformat_to](<#/doc/utility/format/vformat_to>)(C++20) | variante não-template de [std::format_to](<#/doc/utility/format/format_to>) usando representação de argumento com type-erasure
(function template)
[ visit_format_arg](<#/doc/utility/format/visit_format_arg>)(C++20) (obsoleto desde C++26) | interface de visitação de argumento para formatters definidos pelo usuário
(function template)
[ make_format_argsmake_wformat_args](<#/doc/utility/format/make_format_args>)(C++20)(C++20) | cria um objeto com type-erasure que referencia todos os argumentos de formatação, conversível para `format_args`
(function template)

### Ajudantes

[ format_kind](<#/doc/utility/format/format_kind>)(C++23) | seleciona um std::range_format adequado para um range
(variable template)
[ enable_nonlocking_formatter_optimization](<#/doc/utility/format/enable_nonlocking_formatter_optimization>)(C++23) | indica que o tipo de argumento pode ser impresso eficientemente
(variable template)

### Synopsis
```cpp
    namespace std {
      // class template basic_format_context
      template<class Out, class CharT> class basic_format_context;
      using format_context = basic_format_context</* unspecified */, char>;
      using wformat_context = basic_format_context</* unspecified */, wchar_t>;
    
      // class template basic_format_args
      template<class Context> class basic_format_args;
      using format_args = basic_format_args<format_context>;
      using wformat_args = basic_format_args<wformat_context>;
    
      // class template basic_format_string
      template<class CharT, class... Args>
        struct basic_format_string;
    
      template<class... Args>
        using format_string = basic_format_string<char, type_identity_t<Args>...>;
      template<class... Args>
        using wformat_string = basic_format_string<wchar_t, type_identity_t<Args>...>;
    
      // formatting functions
      template<class... Args>
        string format(format_string<Args...> fmt, Args&&... args);
      template<class... Args>
        wstring format(wformat_string<Args...> fmt, Args&&... args);
      template<class... Args>
        string format(const locale& loc, format_string<Args...> fmt, Args&&... args);
      template<class... Args>
        wstring format(const locale& loc, wformat_string<Args...> fmt, Args&&... args);
    
      string vformat(string_view fmt, format_args args);
      wstring vformat(wstring_view fmt, wformat_args args);
      string vformat(const locale& loc, string_view fmt, format_args args);
      wstring vformat(const locale& loc, wstring_view fmt, wformat_args args);
    
      template<class Out, class... Args>
        Out format_to(Out out, format_string<Args...> fmt, Args&&... args);
      template<class Out, class... Args>
        Out format_to(Out out, wformat_string<Args...> fmt, Args&&... args);
      template<class Out, class... Args>
        Out format_to(Out out, const locale& loc, format_string<Args...> fmt, Args&&... args);
      template<class Out, class... Args>
        Out format_to(Out out, const locale& loc, wformat_string<Args...> fmt, Args&&... args);
    
      template<class Out>
        Out vformat_to(Out out, string_view fmt, format_args args);
      template<class Out>
        Out vformat_to(Out out, wstring_view fmt, wformat_args args);
      template<class Out>
        Out vformat_to(Out out, const locale& loc, string_view fmt, format_args args);
      template<class Out>
        Out vformat_to(Out out, const locale& loc, wstring_view fmt, wformat_args args);
    
      template<class Out> struct format_to_n_result {
        Out out;
        iter_difference_t<Out> size;
      };
      template<class Out, class... Args>
        format_to_n_result<Out> format_to_n(Out out, iter_difference_t<Out> n,
                                            format_string<Args...> fmt, Args&&... args);
      template<class Out, class... Args>
        format_to_n_result<Out> format_to_n(Out out, iter_difference_t<Out> n,
                                            wformat_string<Args...> fmt, Args&&... args);
      template<class Out, class... Args>
        format_to_n_result<Out> format_to_n(Out out, iter_difference_t<Out> n,
                                            const locale& loc, format_string<Args...> fmt,
                                            Args&&... args);
      template<class Out, class... Args>
        format_to_n_result<Out> format_to_n(Out out, iter_difference_t<Out> n,
                                            const locale& loc, wformat_string<Args...> fmt,
                                            Args&&... args);
    
      template<class... Args>
        size_t formatted_size(format_string<Args...> fmt, Args&&... args);
      template<class... Args>
        size_t formatted_size(wformat_string<Args...> fmt, Args&&... args);
      template<class... Args>
        size_t formatted_size(const locale& loc, format_string<Args...> fmt, Args&&... args);
      template<class... Args>
        size_t formatted_size(const locale& loc, wformat_string<Args...> fmt, Args&&... args);
    
      // formatter
      template<class T, class CharT = char>
        struct formatter;
    
      // variable template enable_nonlocking_formatter_optimization
      template<class T>
        constexpr bool enable_nonlocking_formatter_optimization = false;
    
      // concept formattable
      template<class T, class CharT>
        concept formattable = /* see description */;
    
      template<class R, class CharT>
        concept __const_formattable_range =                               // exposition only
          ranges::input_range<const R> &&
          formattable<ranges::range_reference_t<const R>, CharT>;
    
      template<class R, class CharT>
        using __fmt_maybe_const =                                         // exposition only
          conditional_t<__const_formattable_range<R, CharT>, const R, R>;
    
      // class template basic_format_parse_context
      template<class CharT> class basic_format_parse_context;
      using format_parse_context = basic_format_parse_context<char>;
      using wformat_parse_context = basic_format_parse_context<wchar_t>;
    
      // formatting of ranges
      // variable template format_kind
      enum class range_format {
        disabled,
        map,
        set,
        sequence,
        string,
        debug_string
      };
    
      template<class R>
        constexpr /* unspecified */ format_kind = /* unspecified */;
    
      template<ranges::input_range R>
          requires same_as<R, remove_cvref_t<R>>
        constexpr range_format format_kind<R> = /* see description */;
    
      // class template range_formatter
      template<class T, class CharT = char>
        requires same_as<remove_cvref_t<T>, T> && formattable<T, CharT>
      class range_formatter;
    
      // class template range-default-formatter
      template<range_format K, ranges::input_range R, class CharT>
        struct __range_default_formatter;                                 // exposition only
    
      // specializations for maps, sets, and strings
      template<ranges::input_range R, class CharT>
        requires (format_kind<R> != range_format::disabled) &&
                 formattable<ranges::range_reference_t<R>, CharT>
      struct formatter<R, CharT> : __range_default_formatter<format_kind<R>, R, CharT> { };
    
      // arguments
      // class template basic_format_arg
      template<class Context> class basic_format_arg;
    
      template<class Visitor, class Context>
        decltype(auto) visit_format_arg(Visitor&& vis, basic_format_arg<Context> arg);
    
      // class template format-arg-store
      template<class Context, class... Args> class __format_arg_store;    // exposition only
    
      template<class Context = format_context, class... Args>
        __format_arg_store<Context, Args...>
          make_format_args(Args&&... fmt_args);
      template<class... Args>
        __format_arg_store<wformat_context, Args...>
          make_wformat_args(Args&&... args);
    
      // class format_error
      class format_error;
    }
```

#### Class template std::basic_format_string
```cpp
    namespace std {
      template<class CharT, class... Args>
      struct basic_format_string {
      private:
        basic_string_view<CharT> str;         // exposition only
    
      public:
        template<class T> consteval basic_format_string(const T& s);
    
        constexpr basic_string_view<CharT> get() const noexcept { return str; }
      };
    }
```

#### Concept `std::formattable`
```cpp
    template<class T, class CharT>
      concept formattable =
        semiregular<formatter<remove_cvref_t<T>, CharT>> &&
        requires(formatter<remove_cvref_t<T>, CharT> f,
                 const formatter<remove_cvref_t<T>, CharT> cf,
                 T t,
                 basic_format_context<__fmt_iter_for<CharT>, CharT> fc,
                 basic_format_parse_context<CharT> pc) {
            { f.parse(pc) } -> same_as<basic_format_parse_context<CharT>::iterator>;
            { cf.format(t, fc) } -> same_as<__fmt_iter_for<CharT>>;
        };
```

#### Class template [std::basic_format_parse_context](<#/doc/utility/format/basic_format_parse_context>)
```cpp
    namespace std {
      template<class CharT>
      class basic_format_parse_context {
      public:
        using char_type = CharT;
        using const_iterator = typename basic_string_view<CharT>::const_iterator;
        using iterator = const_iterator;
    
      private:
        iterator begin_;                                    // exposition only
        iterator end_;                                      // exposition only
        enum indexing { unknown, manual, automatic };       // exposition only
        indexing indexing_;                                 // exposition only
        size_t next_arg_id_;                                // exposition only
        size_t num_args_;                                   // exposition only
    
      public:
        constexpr explicit basic_format_parse_context(basic_string_view<CharT> fmt,
                                                      size_t num_args = 0) noexcept;
        basic_format_parse_context(const basic_format_parse_context&) = delete;
        basic_format_parse_context& operator=(const basic_format_parse_context&) = delete;
    
        constexpr const_iterator begin() const noexcept;
        constexpr const_iterator end() const noexcept;
        constexpr void advance_to(const_iterator it);
    
        constexpr size_t next_arg_id();
        constexpr void check_arg_id(size_t id);
    
        template<class... Ts>
        constexpr void check_dynamic_spec(size_t id) noexcept;
        constexpr void check_dynamic_spec_integral(size_t id) noexcept;
        constexpr void check_dynamic_spec_string(size_t id) noexcept;
      };
    }
```

#### Class template [std::basic_format_context](<#/doc/utility/format/basic_format_context>)
```cpp
    namespace std {
      template<class Out, class CharT>
      class basic_format_context {
        basic_format_args<basic_format_context> args_;      // exposition only
        Out out_;                                           // exposition only
    
        basic_format_context(const basic_format_context&) = delete;
        basic_format_context& operator=(const basic_format_context&) = delete;
    
      public:
        using iterator = Out;
        using char_type = CharT;
        template<class T> using formatter_type = formatter<T, CharT>;
    
        basic_format_arg<basic_format_context> arg(size_t id) const noexcept;
        std::locale locale();
    
        iterator out();
        void advance_to(iterator it);
      };
    }
```

#### Variable template std::format_kind
```cpp
    template<ranges::input_range R>
        requires same_as<R, remove_cvref_t<R>>
      constexpr range_format format_kind<R> = /* see description */;
```

#### Class template std::range_formatter
```cpp
    namespace std {
      template<class T, class CharT = char>
        requires same_as<remove_cvref_t<T>, T> && formattable<T, CharT>
      class range_formatter {
        formatter<T, CharT> underlying_;                        // exposition only
        basic_string_view<CharT> separator_ =                   // exposition only
          __STATICALLY_WIDEN<CharT>(", ");
        basic_string_view<CharT> __opening_bracket_ =           // exposition only
          __STATICALLY_WIDEN<CharT>("[");
        basic_string_view<CharT> __closing_bracket_ =           // exposition only
          __STATICALLY_WIDEN<CharT>("]");
    
      public:
        constexpr void set_separator(basic_string_view<CharT> sep);
        constexpr void set_brackets(basic_string_view<CharT> opening,
                                    basic_string_view<CharT> closing);
        constexpr formatter<T, CharT>& underlying() { return underlying_; }
        constexpr const formatter<T, CharT>& underlying() const { return underlying_; }
    
        template<class ParseContext>
          constexpr typename ParseContext::iterator
            parse(ParseContext& ctx);
    
        template<ranges::input_range R, class FormatContext>
            requires formattable<ranges::range_reference_t<R>, CharT> &&
                     same_as<remove_cvref_t<ranges::range_reference_t<R>>, T>
          typename FormatContext::iterator
            format(R&& r, FormatContext& ctx) const;
      };
    }
```

#### Class template ___range_default_formatter_
```cpp
    namespace std {
      template<ranges::input_range R, class CharT>
      struct __range_default_formatter<range_format::sequence, R, CharT> {
      private:
        using __maybe_const_r = __fmt_maybe_const<R, CharT>;
        range_formatter<remove_cvref_t<ranges::range_reference_t<__maybe_const_r>>,
                        CharT> underlying_;       // exposition only
    
      public:
        constexpr void set_separator(basic_string_view<CharT> sep);
        constexpr void set_brackets(basic_string_view<CharT> opening,
                                    basic_string_view<CharT> closing);
    
        template<class ParseContext>
          constexpr typename ParseContext::iterator
            parse(ParseContext& ctx);
    
        template<class FormatContext>
          typename FormatContext::iterator
            format(__maybe_const_r& elems, FormatContext& ctx) const;
      };
    }
```

#### Especialização de ___range_default_formatter_ para maps
```cpp
    namespace std {
      template<ranges::input_range R, class CharT>
      struct __range_default_formatter<range_format::map, R, CharT> {
      private:
        using __maybe_const_map = __fmt_maybe_const<R, CharT>;          // exposition only
        using __element_type =                                          // exposition only
          remove_cvref_t<ranges::range_reference_t<__maybe_const_map>>;
        range_formatter<__element_type, CharT> underlying_;             // exposition only
      public:
        constexpr __range_default_formatter();
    
        template<class ParseContext>
          constexpr typename ParseContext::iterator
            parse(ParseContext& ctx);
    
        template<class FormatContext>
          typename FormatContext::iterator
            format(__maybe_const_map& r, FormatContext& ctx) const;
      };
    }
```

#### Especialização de ___range_default_formatter_ para sets
```cpp
    namespace std {
      template<ranges::input_range R, class CharT>
      struct __range_default_formatter<range_format::set, R, CharT> {
      private:
        using __maybe_const_set = __fmt_maybe_const<R, CharT>;          // exposition only
        range_formatter<remove_cvref_t<ranges::range_reference_t<__maybe_const_set>>,
                        CharT> underlying_;                             // exposition only
      public:
        constexpr __range_default_formatter();
    
        template<class ParseContext>
          constexpr typename ParseContext::iterator
            parse(ParseContext& ctx);
    
        template<class FormatContext>
          typename FormatContext::iterator
            format(__maybe_const_set& r, FormatContext& ctx) const;
      };
    }
```

#### Especialização de ___range_default_formatter_ para strings
```cpp
    namespace std {
      template<range_format K, ranges::input_range R, class CharT>
        requires (K == range_format::string || K == range_format::debug_string)
      struct __range_default_formatter<K, R, CharT> {
      private:
        formatter<basic_string<CharT>, CharT> underlying_;              // exposition only
    
      public:
        template<class ParseContext>
          constexpr typename ParseContext::iterator
            parse(ParseContext& ctx);
    
        template<class FormatContext>
          typename FormatContext::iterator
            format(/* see description */& str, FormatContext& ctx) const;
      };
    }
```

#### Class template [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>)
```cpp
    namespace std {
      template<class Context>
      class basic_format_arg {
      public:
        class handle;
    
      private:
        using char_type = typename Context::char_type;                     // exposition only
    
        variant<monostate, bool, char_type,
                int, unsigned int, long long int, unsigned long long int,
                float, double, long double,
                const char_type*, basic_string_view<char_type>,
                const void*, handle> value;                                // exposition only
    
        template<class T> explicit basic_format_arg(T&& v) noexcept;       // exposition only
        explicit basic_format_arg(float n) noexcept;                       // exposition only
        explicit basic_format_arg(double n) noexcept;                      // exposition only
        explicit basic_format_arg(long double n) noexcept;                 // exposition only
        explicit basic_format_arg(const char_type* s);                     // exposition only
    
        template<class traits>
          explicit basic_format_arg(
            basic_string_view<char_type, traits> s) noexcept;              // exposition only
    
        template<class traits, class Allocator>
          explicit basic_format_arg(
            const basic_string<char_type, traits, Allocator>& s) noexcept; // exposition only
    
        explicit basic_format_arg(nullptr_t) noexcept;                     // exposition only
    
        template<class T>
          explicit basic_format_arg(T* p) noexcept;                        // exposition only
    
      public:
        basic_format_arg() noexcept;
    
        explicit operator bool() const noexcept;
    
        template<class Visitor>
          decltype(auto) visit(this basic_format_arg arg, Visitor&& vis);
        template<class R, class Visitor>
          R visit(this basic_format_arg arg, Visitor&& vis);
      };
    }
```

#### Classe std::basic_format_arg::handle
```cpp
    namespace std {
      template<class Context>
      class basic_format_arg<Context>::handle {
        const void* ptr_;                                           // exposition only
        void (*format_)(basic_format_parse_context<char_type>&,
                        Context&, const void*);                     // exposition only
    
        template<class T> explicit handle(T&& val) noexcept;        // exposition only
    
        friend class basic_format_arg<Context>;                     // exposition only
    
      public:
        void format(basic_format_parse_context<char_type>&, Context& ctx) const;
      };
    }
```

#### Class template ___format_arg_store_
```cpp
    namespace std {
      template<class Context, class... Args>
      class __format_arg_store {                                    // exposition only
        array<basic_format_arg<Context>, sizeof...(Args)> args;     // exposition only
      };
    }
```

#### Class template [std::basic_format_args](<#/doc/utility/format/basic_format_args>)
```cpp
    namespace std {
      template<class Context>
      class basic_format_args {
        size_t size_;                               // exposition only
        const basic_format_arg<Context>* data_;     // exposition only
    
      public:
        template<class... Args>
          basic_format_args(const __format_arg_store<Context, Args...>& store) noexcept;
    
        basic_format_arg<Context> get(size_t i) const noexcept;
      };
    }
```

#### Formatter de tupla
```cpp
    namespace std {
      template<class CharT, formattable<CharT>... Ts>
      struct formatter<__pair_or_tuple<Ts...>, CharT> {
      private:
        tuple<formatter<remove_cvref_t<Ts>, CharT>...> underlying_;     // exposition only
        basic_string_view<CharT> separator_ =                           // exposition only
          __STATICALLY_WIDEN<CharT>(", ");
        basic_string_view<CharT> opening_bracket_ =                     // exposition only
          __STATICALLY_WIDEN<CharT>("(");
        basic_string_view<CharT> closing_bracket_ =                     // exposition only
          __STATICALLY_WIDEN<CharT>(")");
    
      public:
        constexpr void set_separator(basic_string_view<CharT> sep);
        constexpr void set_brackets(basic_string_view<CharT> opening,
                                    basic_string_view<CharT> closing);
    
        template<class ParseContext>
          constexpr typename ParseContext::iterator
            parse(ParseContext& ctx);
    
        template<class FormatContext>
          typename FormatContext::iterator
            format(/* see description */& elems, FormatContext& ctx) const;
      };
    }
```

#### Classe [std::format_error](<#/doc/utility/format/format_error>)
```cpp
    namespace std {
      class format_error : public runtime_error {
      public:
        explicit format_error(const string& what_arg);
        explicit format_error(const char* what_arg);
      };
    }
```