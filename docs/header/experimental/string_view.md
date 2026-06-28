# Cabeçalho de biblioteca experimental &lt;experimental/string_view&gt;

Este cabeçalho faz parte do Library Fundamentals TS ([v1](<#/doc/experimental/memory>), [v2](<#/doc/experimental/lib_extensions_2>)).

### Classes

Nome | Descrição
---|---
[std::experimental::basic_string_view](<#/doc/experimental/basic_string_view>) (library fundamentals TS) | Modelo de classe que representa uma referência a uma string de caracteres (modelo de classe)
[std::experimental::string_view](<#/doc/experimental/basic_string_view>) (library fundamentals TS) | [std::experimental::basic_string_view](<#/doc/experimental/basic_string_view>)&lt;char&gt; (typedef)
[std::experimental::wstring_view](<#/doc/experimental/basic_string_view>) (library fundamentals TS) | [std::experimental::basic_string_view](<#/doc/experimental/basic_string_view>)<wchar_t> (typedef)
[std::experimental::u16string_view](<#/doc/experimental/basic_string_view>) (library fundamentals TS) | [std::experimental::basic_string_view](<#/doc/experimental/basic_string_view>)<char16_t> (typedef)
[std::experimental::u32string_view](<#/doc/experimental/basic_string_view>) (library fundamentals TS) | [std::experimental::basic_string_view](<#/doc/experimental/basic_string_view>)<char32_t> (typedef)
[std::hash](<#/doc/utility/hash>)<[std::experimental::string_view](<#/doc/experimental/basic_string_view>)> (library fundamentals TS) | (especialização de modelo de classe)
[std::hash](<#/doc/utility/hash>)<[std::experimental::u16string_view](<#/doc/experimental/basic_string_view>)> (library fundamentals TS) | (especialização de modelo de classe)
[std::hash](<#/doc/utility/hash>)<[std::experimental::u32string_view](<#/doc/experimental/basic_string_view>)> (library fundamentals TS) | (especialização de modelo de classe)
[std::hash](<#/doc/utility/hash>)<[std::experimental::wstring_view](<#/doc/experimental/basic_string_view>)> (library fundamentals TS) | (especialização de modelo de classe)

### Funções

[ operator==operator!=operator&lt;operator&gt;operator<=operator>=](<#/doc/experimental/basic_string_view/operator_cmp>) | compara lexicograficamente duas views
(modelo de função)

##### Saída

[ operator<<](<#/doc/experimental/basic_string_view/operator_ltlt>) | realiza saída de stream em views
(modelo de função)

### Sinopse
```cpp
    namespace std {
      namespace experimental {
      inline namespace fundamentals_v1 {
    
        // 7.2, Class template basic_string_view
        template<class CharT, class Traits = char_traits<CharT>>
            class basic_string_view;
    
        // 7.9, basic_string_view non-member comparison functions
        template<class CharT, class Traits>
        constexpr bool operator==(basic_string_view<CharT, Traits> x,
                                  basic_string_view<CharT, Traits> y) noexcept;
        template<class CharT, class Traits>
        constexpr bool operator!=(basic_string_view<CharT, Traits> x,
                                  basic_string_view<CharT, Traits> y) noexcept;
        template<class CharT, class Traits>
        constexpr bool operator< (basic_string_view<CharT, Traits> x,
                                     basic_string_view<CharT, Traits> y) noexcept;
        template<class CharT, class Traits>
        constexpr bool operator> (basic_string_view<CharT, Traits> x,
                                  basic_string_view<CharT, Traits> y) noexcept;
        template<class CharT, class Traits>
        constexpr bool operator<=(basic_string_view<CharT, Traits> x,
                                     basic_string_view<CharT, Traits> y) noexcept;
        template<class CharT, class Traits>
        constexpr bool operator>=(basic_string_view<CharT, Traits> x,
                                  basic_string_view<CharT, Traits> y) noexcept;
        // /* veja a descrição */, sobrecargas adicionais suficientes de funções de comparação
    
        // 7.10, Inserters and extractors
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os,
                       basic_string_view<CharT, Traits> str);
    
        // basic_string_view typedef names
        typedef basic_string_view<char> string_view;
        typedef basic_string_view<char16_t> u16string_view;
        typedef basic_string_view<char32_t> u32string_view;
        typedef basic_string_view<wchar_t> wstring_view;
    
      }  // namespace fundamentals_v1
      }  // namespace experimental
    
      // 7.11, Hash support
      template <class T> struct hash;
      template <> struct hash<experimental::string_view>;
      template <> struct hash<experimental::u16string_view>;
      template <> struct hash<experimental::u32string_view>;
      template <> struct hash<experimental::wstring_view>;
    
    }  // namespace std
```