# Cabeçalho da biblioteca experimental &lt;experimental/ranges/tuple&gt;

Este cabeçalho faz parte da biblioteca [ranges](<#/doc/experimental/ranges>).

### Tuplas marcadas

Definido no namespace `std::experimental::ranges`
---
[ tagged_tuple](<#/doc/experimental/ranges/utility/tagged_tuple>) | alias template para uma [std::tuple](<#/doc/utility/tuple>) marcada
(modelo de alias)
[ make_tagged_tuple](<#/doc/experimental/ranges/utility/make_tagged_tuple>) | função de conveniência para criar uma `tagged_tuple`
(modelo de função)

### Sinopse
```
    namespace std { namespace experimental { namespace ranges { inline namespace v1 {
     
    template <TaggedType... Types>
    using tagged_tuple = tagged<tuple</* TAGELEM */(Types)...>,
                                /* TAGSPEC */(Types)...>;
     
    template <TagSpecifier... Tags, class... Types>
      requires sizeof...(Tags) == sizeof...(Types)
        constexpr /* see definition */ make_tagged_tuple(Types&&... t);
     
    }}}}
```