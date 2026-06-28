# Header da biblioteca padrão &lt;experimental/ranges/range&gt;

Este header faz parte da biblioteca [ranges](<#/doc/experimental/ranges>).

### Conceitos de Range

Definido no namespace `std::experimental::ranges`
---
[ Range](<#/doc/experimental/ranges/range/Range>) | especifica que um tipo é um range, ou seja, ele fornece um iterator `begin` e um sentinel `end`
(concept)
[ SizedRange](<#/doc/experimental/ranges/range/SizedRange>) | especifica que um range conhece seu tamanho em tempo constante
(concept)
[ View](<#/doc/experimental/ranges/range/View>) | especifica que um range é uma view, ou seja, ele possui cópia/movimentação/atribuição em tempo constante
(concept)
[ BoundedRange](<#/doc/experimental/ranges/range/BoundedRange>) | especifica que um range possui tipos de iterator e sentinel idênticos
(concept)
[ InputRange](<#/doc/experimental/ranges/range/InputRange>) | especifica um range cujo tipo de iterator satisfaz [`InputIterator`](<#/doc/experimental/ranges/iterator/InputIterator>)
(concept)
[ OutputRange](<#/doc/experimental/ranges/range/OutputRange>) | especifica um range cujo tipo de iterator satisfaz [`OutputIterator`](<#/doc/experimental/ranges/iterator/OutputIterator>)
(concept)
[ ForwardRange](<#/doc/experimental/ranges/range/ForwardRange>) | especifica um range cujo tipo de iterator satisfaz [`ForwardIterator`](<#/doc/experimental/ranges/iterator/ForwardIterator>)
(concept)
[ BidirectionalRange](<#/doc/experimental/ranges/range/BidirectionalRange>) | especifica um range cujo tipo de iterator satisfaz [`BidirectionalIterator`](<#/doc/experimental/ranges/iterator/BidirectionalIterator>)
(concept)
[ RandomAccessRange](<#/doc/experimental/ranges/range/RandomAccessRange>) | especifica um range cujo tipo de iterator satisfaz [`RandomAccessIterator`](<#/doc/experimental/ranges/iterator/RandomAccessIterator>)
(concept)

### Acesso a Range

Definido no namespace `std::experimental::ranges`
---
[ begincbegin](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/range/begin&action=edit&redlink=1> "cpp/experimental/ranges/range/begin \(page does not exist\)") | retorna um iterator para o início de um range
(customization point object)
[ endcend](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/range/end&action=edit&redlink=1> "cpp/experimental/ranges/range/end \(page does not exist\)") | retorna um iterator para o fim de um range
(customization point object)
[ rbegincrbegin](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/range/rbegin&action=edit&redlink=1> "cpp/experimental/ranges/range/rbegin \(page does not exist\)") | retorna um reverse iterator para um range
(customization point object)
[ rendcrend](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/range/rend&action=edit&redlink=1> "cpp/experimental/ranges/range/rend \(page does not exist\)") | retorna um reverse end iterator para um range
(customization point object)

### Primitivas de Range

Definido no namespace `std::experimental::ranges`
---
[ size](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/range/size&action=edit&redlink=1> "cpp/experimental/ranges/range/size \(page does not exist\)") | obtém o tamanho de um range cujo tamanho pode ser calculado em tempo constante
(customization point object)
[ empty](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/range/empty&action=edit&redlink=1> "cpp/experimental/ranges/range/empty \(page does not exist\)") | verifica se um range está vazio
(customization point object)
[ datacdata](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/range/data&action=edit&redlink=1> "cpp/experimental/ranges/range/data \(page does not exist\)") | obtém um ponteiro para o início de um range contíguo
(customization point object)
[ iterator_tsentinel_t](<#/doc/experimental/ranges/range/iterator_t>) | obtém os tipos de iterator e sentinel de um range
(alias template)

### Sinopse
```cpp
    #include <experimental/ranges/iterator>
    
    namespace std { namespace experimental { namespace ranges { inline namespace v1 {
    
    namespace {
      constexpr /* unspecified */ begin = /* unspecified */;
      constexpr /* unspecified */ end = /* unspecified */;
      constexpr /* unspecified */ cbegin = /* unspecified */;
      constexpr /* unspecified */ cend = /* unspecified */;
      constexpr /* unspecified */ rbegin = /* unspecified */;
      constexpr /* unspecified */ rend = /* unspecified */;
      constexpr /* unspecified */ crbegin = /* unspecified */;
      constexpr /* unspecified */ crend = /* unspecified */;
    }
    
    namespace {
      constexpr /* unspecified */ size = /* unspecified */;
      constexpr /* unspecified */ empty = /* unspecified */;
      constexpr /* unspecified */ data = /* unspecified */;
      constexpr /* unspecified */ cdata = /* unspecified */;
    }
    
    template <class T>
    using iterator_t = decltype(ranges::begin(declval<T&>()));
    
    template <class T>
    using sentinel_t = decltype(ranges::end(declval<T&>()));
    
    template <class>
    constexpr bool disable_sized_range = false;
    
    template <class T>
    struct enable_view { };
    
    struct view_base { };
    
    template <class T>
    concept bool Range = /* see definition */;
    
    template <class T>
    concept bool SizedRange = /* see definition */;
    
    template <class T>
    concept bool View = /* see definition */;
    
    template <class T>
    concept bool BoundedRange = /* see definition */;
    
    template <class T>
    concept bool InputRange = /* see definition */;
    
    template <class R, class T>
    concept bool OutputRange = /* see definition */;
    
    template <class T>
    concept bool ForwardRange = /* see definition */;
    
    template <class T>
    concept bool BidirectionalRange = /* see definition */;
    
    template <class T>
    concept bool RandomAccessRange = /* see definition */;
    
    }}}}
```