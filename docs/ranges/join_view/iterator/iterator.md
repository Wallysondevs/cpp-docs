# std::ranges::join_view&lt;V&gt;::iterator&lt;Const&gt;::iterator

```cpp
/*iterator*/() requires std::default_initializable<OuterIter> &&
std::default_initializable<InnerIter> = default;  // (1) (desde C++20)
constexpr /*iterator*/( Parent& parent, OuterIter outer );  // (2) (desde C++20)
constexpr /*iterator*/( /*iterator*/<!Const> i )
requires Const &&
std::convertible_to<ranges::iterator_t<V>, OuterIter> &&
std::convertible_to<ranges::iterator_t<InnerRng>, InnerIter>;  // (3) (desde C++20)
```

  
Constrói um iterator.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) os iterators subjacentes e inicializa o ponteiro para o [ranges::join_view](<#/doc/ranges/join_view>) pai com nullptr.

2) Inicializa o iterator subjacente [`_outer__`](<#/doc/ranges/join_view/iterator>) com std::move(outer), e o ponteiro para o pai [`_parent__`](<#/doc/ranges/join_view/iterator>) com [std::addressof](<#/doc/memory/addressof>)(parent); então chama [`satisfy()`](<#/doc/ranges/join_view/iterator/satisfy>).

3) Converte /*iterator*/&lt;false&gt; para /*iterator*/&lt;true&gt;. Constrói por movimento os iterators subjacentes [`_outer__`](<#/doc/ranges/join_view/iterator>) com std::move(i.outer_), [`_inner__`](<#/doc/ranges/join_view/iterator>) com std::move(i.inner_), e o ponteiro subjacente para o pai [`_parent__`](<#/doc/ranges/join_view/iterator>) com i.parent_.

### Parâmetros

parent  |  \-  |  um [ranges::join_view](<#/doc/ranges/join_view>) (possivelmente qualificado com const)  
---|---|---
outer  |  \-  |  um iterator para (possivelmente qualificado com const) [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;  
i  |  \-  |  um /*iterator*/&lt;false&gt;  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   