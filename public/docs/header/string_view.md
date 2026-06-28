# Cabeçalho da biblioteca padrão &lt;string_view&gt; (C++17)

Este cabeçalho faz parte da biblioteca de [strings](<#/doc/string>).

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte para o operador de comparação de três vias

### Classes

[ basic_string_view](<#/doc/string/basic_string_view>)(C++17) | string view somente leitura
(modelo de classe)
[std::string_view](<#/doc/string/basic_string_view>) (C++17) | [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;char&gt;
---|---
[std::u8string_view](<#/doc/string/basic_string_view>) (C++20) | [std::basic_string_view](<#/doc/string/basic_string_view>)<char8_t>
[std::u16string_view](<#/doc/string/basic_string_view>) (C++17) | [std::basic_string_view](<#/doc/string/basic_string_view>)<char16_t>
[std::u32string_view](<#/doc/string/basic_string_view>) (C++17) | [std::basic_string_view](<#/doc/string/basic_string_view>)<char32_t>
[std::wstring_view](<#/doc/string/basic_string_view>) (C++17) | [std::basic_string_view](<#/doc/string/basic_string_view>)<wchar_t>
[ std::hash<std::string_view>std::hash<std::wstring_view>std::hash<std::u8string_view>std::hash<std::u16string_view>std::hash<std::u32string_view>](<#/doc/string/basic_string_view/hash>)(C++17)(C++17)(C++20)(C++17)(C++17) | Suporte a hash para string views
(especialização de modelo de classe)

##### Declarações antecipadas

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```cpp
 hash(C++11)
(modelo de classe)
```

### Funções

[ operator==operator!=operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/string/basic_string_view/operator_cmp>)(C++17)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente duas string views
(modelo de função)
[ operator<<](<#/doc/string/basic_string_view/operator_ltlt>)(C++17) | realiza saída de stream em string views
(modelo de função)
[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(modelo de função)

##### Acesso a Range

[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(modelo de função)
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array
(modelo de função)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) | retorna um reverse iterator para o início de um container ou array
(modelo de função)
[ rendcrend](<#/doc/iterator/rend>)(C++14) | retorna um reverse end iterator para um container ou array
(modelo de função)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(modelo de função)
[ empty](<#/doc/iterator/empty>)(C++17) | verifica se o container está vazio
(modelo de função)
[ data](<#/doc/iterator/data>)(C++17) | obtém o ponteiro para o array subjacente
(modelo de função)

##### Literais

Definido no namespace inline `std::literals::string_view_literals`

```cpp
 operator""sv(C++17)
(função)
```

### Sinopse
```cpp
    #include <compare>
     
    namespace std {
      // class template basic_string_view
      template<class CharT, class Traits = char_traits<CharT>>
      class basic_string_view;
     
      template<class CharT, class Traits>
        inline constexpr bool ranges::enable_view<basic_string_view<CharT, Traits>> = true;
      template<class CharT, class Traits>
        inline constexpr bool ranges::enable_borrowed_range<basic_string_view<CharT, Traits>> =
          true;
     
      // non-member comparison functions
      template<class CharT, class Traits>
        constexpr bool operator==(basic_string_view<CharT, Traits> x,
                                  basic_string_view<CharT, Traits> y) noexcept;
      template<class CharT, class Traits>
        constexpr /* see description */
          operator<=>(basic_string_view<CharT, Traits> x,
                      basic_string_view<CharT, Traits> y) noexcept;
     
      // sufficient additional overloads of comparison functions
     
      // inserters and extractors
      template<class CharT, class Traits>
        basic_ostream<CharT, Traits>&
          operator<<(basic_ostream<CharT, Traits>& os,
                     basic_string_view<CharT, Traits> str);
     
      // basic_string_view typedef names
      using string_view    = basic_string_view<char>;
      using u8string_view  = basic_string_view<char8_t>;
      using u16string_view = basic_string_view<char16_t>;
      using u32string_view = basic_string_view<char32_t>;
      using wstring_view   = basic_string_view<wchar_t>;
     
      // hash support
      template<class T> struct hash;
      template<> struct hash<string_view>;
      template<> struct hash<u8string_view>;
      template<> struct hash<u16string_view>;
      template<> struct hash<u32string_view>;
      template<> struct hash<wstring_view>;
     
      inline namespace literals {
      inline namespace string_view_literals {
        // suffix for basic_string_view literals
        constexpr string_view    operator""sv(const char* str, size_t len) noexcept;
        constexpr u8string_view  operator""sv(const char8_t* str, size_t len) noexcept;
        constexpr u16string_view operator""sv(const char16_t* str, size_t len) noexcept;
        constexpr u32string_view operator""sv(const char32_t* str, size_t len) noexcept;
        constexpr wstring_view   operator""sv(const wchar_t* str, size_t len) noexcept;
      }
      }
    }
```

#### Modelo de classe [std::basic_string_view](<#/doc/string/basic_string_view>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
      class basic_string_view {
      public:
        // types
        using Traits_type            = Traits;
        using value_type             = CharT;
        using pointer                = value_type*;
        using const_pointer          = const value_type*;
        using reference              = value_type&;
        using const_reference        = const value_type&;
        using const_iterator         = /* implementation-defined */
        using iterator               = const_iterator;
        using const_reverse_iterator = reverse_iterator<const_iterator>;
        using reverse_iterator       = const_reverse_iterator;
        using size_type              = size_t;
        using difference_type        = ptrdiff_t;
        static constexpr size_type npos = size_type(-1);
     
        // construction and assignment
        constexpr basic_string_view() noexcept;
        constexpr basic_string_view(const basic_string_view&) noexcept = default;
        constexpr basic_string_view& operator=(const basic_string_view&) noexcept = default;
        constexpr basic_string_view(const CharT* str);
        constexpr basic_string_view(nullptr_t) = delete;
        constexpr basic_string_view(const CharT* str, size_type len);
        template<class It, class End>
          constexpr basic_string_view(It begin, End end);
        template<class R>
          constexpr explicit basic_string_view(R&& r);
     
        // iterator support
        constexpr const_iterator begin() const noexcept;
        constexpr const_iterator end() const noexcept;
        constexpr const_iterator cbegin() const noexcept;
        constexpr const_iterator cend() const noexcept;
        constexpr const_reverse_iterator rbegin() const noexcept;
        constexpr const_reverse_iterator rend() const noexcept;
        constexpr const_reverse_iterator crbegin() const noexcept;
        constexpr const_reverse_iterator crend() const noexcept;
     
        // capacity
        constexpr size_type size() const noexcept;
        constexpr size_type length() const noexcept;
        constexpr size_type max_size() const noexcept;
        constexpr bool empty() const noexcept;
     
        // element access
        constexpr const_reference operator const;
        constexpr const_reference at(size_type pos) const;
        constexpr const_reference front() const;
        constexpr const_reference back() const;
        constexpr const_pointer data() const noexcept;
     
        // modifiers
        constexpr void remove_prefix(size_type n);
        constexpr void remove_suffix(size_type n);
        constexpr void swap(basic_string_view& s) noexcept;
     
        // string operations
        constexpr size_type copy(CharT* s, size_type n, size_type pos = 0) const;
     
        constexpr basic_string_view substr(size_type pos = 0, size_type n = npos) const;
     
        constexpr int compare(basic_string_view s) const noexcept;
        constexpr int compare(size_type pos1, size_type n1, basic_string_view s) const;
        constexpr int compare(size_type pos1, size_type n1, basic_string_view s,
                              size_type pos2, size_type n2) const;
        constexpr int compare(const CharT* s) const;
        constexpr int compare(size_type pos1, size_type n1, const CharT* s) const;
        constexpr int compare(size_type pos1, size_type n1, const CharT* s,
                              size_type n2) const;
     
        constexpr bool starts_with(basic_string_view x) const noexcept;
        constexpr bool starts_with(CharT x) const noexcept;
        constexpr bool starts_with(const CharT* x) const;
        constexpr bool ends_with(basic_string_view x) const noexcept;
        constexpr bool ends_with(CharT x) const noexcept;
        constexpr bool ends_with(const CharT* x) const;
     
        constexpr bool contains(basic_string_view x) const noexcept;
        constexpr bool contains(CharT x) const noexcept;
        constexpr bool contains(const CharT* x) const;
     
        // searching
        constexpr size_type find(basic_string_view s, size_type pos = 0) const noexcept;
        constexpr size_type find(CharT c, size_type pos = 0) const noexcept;
        constexpr size_type find(const CharT* s, size_type pos, size_type n) const;
        constexpr size_type find(const CharT* s, size_type pos = 0) const;
        constexpr size_type rfind(basic_string_view s, size_type pos = npos) const noexcept;
        constexpr size_type rfind(CharT c, size_type pos = npos) const noexcept;
        constexpr size_type rfind(const CharT* s, size_type pos, size_type n) const;
        constexpr size_type rfind(const CharT* s, size_type pos = npos) const;
     
        constexpr size_type find_first_of(basic_string_view s,
                                          size_type pos = 0) const noexcept;
        constexpr size_type find_first_of(CharT c, size_type pos = 0) const noexcept;
        constexpr size_type find_first_of(const CharT* s, size_type pos, size_type n) const;
        constexpr size_type find_first_of(const CharT* s, size_type pos = 0) const;
        constexpr size_type find_last_of(basic_string_view s,
                                         size_type pos = npos) const noexcept;
        constexpr size_type find_last_of(CharT c, size_type pos = npos) const noexcept;
        constexpr size_type find_last_of(const CharT* s, size_type pos, size_type n) const;
        constexpr size_type find_last_of(const CharT* s, size_type pos = npos) const;
        constexpr size_type find_first_not_of(basic_string_view s,
                                              size_type pos = 0) const noexcept;
        constexpr size_type find_first_not_of(CharT c, size_type pos = 0) const noexcept;
        constexpr size_type find_first_not_of(const CharT* s, size_type pos,
                                              size_type n) const;
        constexpr size_type find_first_not_of(const CharT* s, size_type pos = 0) const;
        constexpr size_type find_last_not_of(basic_string_view s,
                                           size_type pos = npos) const noexcept;
        constexpr size_type find_last_not_of(CharT c, size_type pos = npos) const noexcept;
        constexpr size_type find_last_not_of(const CharT* s, size_type pos,
                                             size_type n) const;
        constexpr size_type find_last_not_of(const CharT* s, size_type pos = npos) const;
     
      private:
        const_pointer data_;          // exposition only
        size_type size_;              // exposition only
      };
     
      // deduction guides
      template<class It, class End>
        basic_string_view(It, End) -> basic_string_view<iter_value_t<It>>;
     
      template<class R>
        basic_string_view(R&&) -> basic_string_view<ranges::range_value_t<R>>;
    }
```