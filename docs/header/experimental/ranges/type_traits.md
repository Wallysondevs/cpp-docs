# Cabeçalho da biblioteca experimental &lt;experimental/ranges/type_traits&gt;

Este cabeçalho faz parte da biblioteca [ranges](<#/doc/experimental/ranges>).

### Metaprogramação e type traits

Definido no namespace `std::experimental::ranges`
---
[ is_swappable_withis_swappableis_nothrow_swappable_withis_nothrow_swappable](<#/doc/experimental/ranges/type_traits/is_swappable>) | verifica se objetos de um tipo podem ser trocados com objetos do mesmo tipo ou de tipos diferentes
(modelo de classe)
[ common_reference](<#/doc/experimental/ranges/type_traits/common_reference>) | determina o tipo de referência comum de um conjunto de tipos
(modelo de classe)
[ common_type](<#/doc/experimental/ranges/type_traits/common_type>) | determina o tipo comum de um conjunto de tipos
(modelo de classe)

### Sinopse
```
    namespace std { namespace experimental { namespace ranges { inline namespace v1 {

    template <class T, class U> struct is_swappable_with;
    template <class T> struct is_swappable;

    template <class T, class U> struct is_nothrow_swappable_with;
    template <class T> struct is_nothrow_swappable;

    template <class T, class U> constexpr bool is_swappable_with_v
      = is_swappable_with<T, U>::value;
    template <class T> constexpr bool is_swappable_v
      = is_swappable<T>::value;

    template <class T, class U> constexpr bool is_nothrow_swappable_with_v
      = is_nothrow_swappable_with<T, U>::value;
    template <class T> constexpr bool is_nothrow_swappable_v
      = is_nothrow_swappable<T>::value;

    template <class... T> struct common_type;
    template <class T, class U, template <class> class TQual, template <class> class UQual>
      struct basic_common_reference { };
    template <class... T> struct common_reference;

    template <class... T>
      using common_type_t = typename common_type<T...>::type;
    template <class... T>
      using common_reference_t = typename common_reference<T...>::type;

    }}}}
```