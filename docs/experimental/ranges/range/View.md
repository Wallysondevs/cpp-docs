# std::experimental::ranges::View

Definido no cabeçalho `[<experimental/ranges/range>](<#/doc/header/experimental/ranges/range>)`

```c
template< class T >
concept bool View = Range<T> && Semiregular<T> && /* view-predicate<T> */;
template< class T >
struct enable_view {};
struct view_base {};
```

O concept `View<T>` especifica que o range semiregular `T` possui operações de cópia, movimentação e atribuição em tempo constante.

A porção /* view-predicate&lt;T&gt; */ do concept é determinada da seguinte forma:

  * se o _qualified-id_ [ranges::enable_view](<#/doc/ranges/view>)&lt;T&gt;::type for válido e denotar um tipo, [ranges::enable_view](<#/doc/ranges/view>)&lt;T&gt;::type::value;
  * caso contrário, se [std::is_base_of_v](<#/doc/types/is_base_of>)<[ranges::view_base](<#/doc/ranges/view>), T> for verdadeiro, true;
  * caso contrário, se `T` for uma especialização de [std::initializer_list](<#/doc/utility/initializer_list>), [std::set](<#/doc/container/set>), [std::multiset](<#/doc/container/multiset>), [std::unordered_set](<#/doc/container/unordered_set>), ou [std::unordered_multiset](<#/doc/container/unordered_multiset>), false;
  * caso contrário, se tanto `T` quanto `const T` satisfizerem [`Range`](<#/doc/experimental/ranges/range/Range>) e ranges::reference_t <[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;T&gt;> não for do mesmo tipo que ranges::reference_t<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;const T&gt;>, false;
  * caso contrário, true.
