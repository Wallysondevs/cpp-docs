# Cabeçalho da biblioteca padrão &lt;bitset&gt;

Este cabeçalho faz parte da biblioteca de [utilidades gerais](<#/doc/utility>).

### Inclusões

---
[ &lt;string&gt;](<#/doc/header/string>) | template de classe [std::basic_string](<#/doc/string/basic_string>)
---|---
[ &lt;iosfwd&gt;](<#/doc/header/iosfwd>) | Declarações antecipadas de todas as classes na biblioteca de entrada/saída

### Classes

[ bitset](<#/doc/utility/bitset>) | implementa um array de bits de comprimento constante
(template de classe)
[ std::hash<std::bitset>](<#/doc/utility/bitset/hash>)(C++11) | suporte a hash para [`std::bitset`](<#/doc/utility/bitset>)
(especialização de template de classe)

##### Declarações antecipadas

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```cpp
 hash(C++11)
(template de classe)
```

### Funções

[ operator&operator|operator^](<#/doc/utility/bitset/operator_logic2>) | realiza operações lógicas binárias em bitsets
(template de função)
[ operator<&lt;operator&gt;>](<#/doc/utility/bitset/operator_ltltgtgt2>) | realiza entrada e saída de stream de bitsets
(template de função)

### Sinopse
```cpp
    #include <string>
    #include <iosfwd>   // for istream, ostream
    
    namespace std {
      template<size_t N> class bitset;
    
      // bitset operators
      template<size_t N>
        constexpr bitset<N> operator&(const bitset<N>&, const bitset<N>&) noexcept;
      template<size_t N>
        constexpr bitset<N> operator|(const bitset<N>&, const bitset<N>&) noexcept;
      template<size_t N>
        constexpr bitset<N> operator^(const bitset<N>&, const bitset<N>&) noexcept;
      template<class CharT, class Traits, size_t N>
        basic_istream<CharT, Traits>&
          operator>>(basic_istream<CharT, Traits>& is, bitset<N>& x);
      template<class CharT, class Traits, size_t N>
        basic_ostream<CharT, Traits>&
          operator<<(basic_ostream<CharT, Traits>& os, const bitset<N>& x);
    }
```

#### Template de classe [std::bitset](<#/doc/utility/bitset>)
```cpp
    namespace std {
      template<size_t N> class bitset {
      public:
        // bit reference
        class reference {
          friend class bitset;
          constexpr reference() noexcept;
    
        public:
          constexpr reference(const reference&) = default;
          constexpr ~reference();
          constexpr reference& operator=(bool x) noexcept;              // for b[i] = x;
          constexpr reference& operator=(const reference&) noexcept;    // for b[i] = b[j];
          constexpr bool operator~() const noexcept;                    // flips the bit
          constexpr operator bool() const noexcept;                     // for x = b[i];
          constexpr reference& flip() noexcept;                         // for b[i].flip();
        };
    
        // constructors
        constexpr bitset() noexcept;
        constexpr bitset(unsigned long long val) noexcept;
        template<class CharT, class Traits, class Allocator>
          constexpr explicit bitset(
            const basic_string<CharT, Traits, Allocator>& str,
            typename basic_string<CharT, Traits, Allocator>::size_type pos = 0,
            typename basic_string<CharT, Traits, Allocator>::size_type n
              = basic_string<CharT, Traits, Allocator>::npos,
            CharT zero = CharT('0'),
            CharT one = CharT('1'));
        template<class CharT, class Traits>
          constexpr explicit bitset(
            basic_string_view<CharT, Traits> str,
            typename basic_string_view<CharT, Traits>::size_type pos = 0,
            typename basic_string_view<CharT, Traits>::size_type n
              = basic_string_view<CharT, Traits>::npos,
            CharT zero = CharT('0'),
            CharT one = CharT('1'));
        template<class CharT>
          constexpr explicit bitset(
            const CharT* str,
            typename basic_string_view<CharT>::size_type n = basic_string_view<CharT>::npos,
            CharT zero = CharT('0'),
            CharT one = CharT('1'));
    
        // bitset operations
        constexpr bitset& operator&=(const bitset& rhs) noexcept;
        constexpr bitset& operator|=(const bitset& rhs) noexcept;
        constexpr bitset& operator^=(const bitset& rhs) noexcept;
        constexpr bitset& operator<<=(size_t pos) noexcept;
        constexpr bitset& operator>>=(size_t pos) noexcept;
        constexpr bitset  operator<<(size_t pos) const noexcept;
        constexpr bitset  operator>>(size_t pos) const noexcept;
        constexpr bitset& set() noexcept;
        constexpr bitset& set(size_t pos, bool val = true);
        constexpr bitset& reset() noexcept;
        constexpr bitset& reset(size_t pos);
        constexpr bitset  operator~() const noexcept;
        constexpr bitset& flip() noexcept;
        constexpr bitset& flip(size_t pos);
    
        // element access
        constexpr bool operator const;
        constexpr reference operator;
    
        constexpr unsigned long to_ulong() const;
        constexpr unsigned long long to_ullong() const;
        template<class CharT = char,
                 class Traits = char_traits<CharT>,
                 class Allocator = allocator<CharT>>
          constexpr basic_string<CharT, Traits, Allocator>
            to_string(CharT zero = CharT('0'), CharT one = CharT('1')) const;
    
        // observers
        constexpr size_t count() const noexcept;
        constexpr size_t size() const noexcept;
        constexpr bool operator==(const bitset& rhs) const noexcept;
        constexpr bool test(size_t pos) const;
        constexpr bool all() const noexcept;
        constexpr bool any() const noexcept;
        constexpr bool none() const noexcept;
      };
    
      // hash support
      template<class T> struct hash;
      template<size_t N> struct hash<bitset<N>>;
    }
```