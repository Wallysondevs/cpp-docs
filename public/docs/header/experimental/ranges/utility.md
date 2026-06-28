# Cabeçalho da biblioteca experimental &lt;experimental/ranges/utility&gt;

Este cabeçalho faz parte da biblioteca [ranges](<#/doc/experimental/ranges>).

### Componentes de utilidade

Definido no namespace `std::experimental::ranges`
---
[ swap](<#/doc/experimental/ranges/utility/swap>) | troca o valor de dois objetos
(objeto de ponto de customização)
[ exchange](<#/doc/experimental/ranges/utility/exchange>) | substitui o argumento por um novo valor e retorna seu valor anterior
(modelo de função)

### Conceitos de Tag

Definido no namespace `std::experimental::ranges`
---
[ TagSpecifier](<#/doc/experimental/ranges/utility/TagSpecifier>) | especifica que um tipo é um especificador de tag
(concept)
[ TaggedType](<#/doc/experimental/ranges/utility/TaggedType>) | especifica que um tipo representa um especificador de tag e seu tipo de elemento
(concept)

### Pares com Tag

Definido no namespace `std::experimental::ranges`
---
[ tagged](<#/doc/experimental/ranges/utility/tagged>) | aumenta um tipo semelhante a tupla com acessadores nomeados
(modelo de classe)
[ tagged_pair](<#/doc/experimental/ranges/utility/tagged_pair>) | alias template para um [std::pair](<#/doc/utility/pair>) com tag
(alias template)
[ make_tagged_pair](<#/doc/experimental/ranges/utility/make_tagged_pair>) | função de conveniência para criar um `tagged_pair`
(modelo de função)

### Sinopse
```cpp
    namespace std { namespace experimental { namespace ranges { inline namespace v1 {
     
    namespace {
      constexpr /* unspecified */ swap = /* unspecified */;
    } 
     
    template<MoveConstructible T, class U = T>
      requires Assignable<T&, U>
    constexpr T exchange(T& obj, U&& new_val) noexcept(/* see definition */);
     
    template <class T>
    concept bool TagSpecifier = /* see definition */;
     
    template <class F>
    concept bool TaggedType = /* see definition */;
     
    template <class Base, TagSpecifier... Tags>
      requires sizeof...(Tags) <= std::tuple_size<Base>::value
    struct tagged;
     
    template <TaggedType T1, TaggedType T2>
    using tagged_pair = /* see definition */;
     
    template <TagSpecifier Tag1, TagSpecifier Tag2, class T1, class T2>
    constexpr /* see definition */ make_tagged_pair(T1&& x, T2&& y);
     
    }}}}
     
    namespace std {
     
    template <class Base, class... Tags>
    struct tuple_size<experimental::ranges::tagged<Base, Tags...>>;
     
    template <size_t N, class Base, class... Tags>
    struct tuple_element<N, experimental::ranges::tagged<Base, Tags...>>;
     
    }
```