# std::ranges::adjacent_transform_view&lt;V,F,N&gt;::iterator&lt;Const&gt;::iterator

```cpp
/*iterator*/() = default;  // (1) (desde C++23)
constexpr /*iterator*/( /*iterator*/<!Const> i )
requires Const &&
std::convertible_to</*inner-iterator*/<false>, /*inner-iterator*/<Const>>;  // (2) (desde C++23)
private:
constexpr /*iterator*/( Parent& parent, /*inner-iterator*/<Const> inner ); | (3) | (exposition only*)
```

Constrói um iterator.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) o ponteiro subjacente [`_parent__`](<#/doc/ranges/adjacent_transform_view/iterator>) com nullptr, e [inicializa por padrão](<#/doc/language/default_initialization>) o iterator subjacente [`_inner__`](<#/doc/ranges/adjacent_transform_view/iterator>).

2) Conversão de /*iterator*/&lt;false&gt; para /*iterator*/&lt;true&gt;. Inicializa o ponteiro subjacente [`_parent__`](<#/doc/ranges/adjacent_transform_view/iterator>) com i.parent_, e constrói por movimento o iterator subjacente [`_inner__`](<#/doc/ranges/adjacent_transform_view/iterator>) com [`std::move`](<#/doc/utility/move>)(i.inner_).

3) Este iterator também possui um construtor privado que é usado por ranges::adjacent_transform_view::begin e ranges::adjacent_transform_view::end. Este construtor não é acessível aos usuários. Inicializa [`_parent__`](<#/doc/ranges/adjacent_transform_view/iterator>) com [std::addressof](<#/doc/memory/addressof>)(parent), e constrói por movimento [`_inner__`](<#/doc/ranges/adjacent_transform_view/iterator>) com std::move(inner).

### Parâmetros

- **i** — um /*iterator*/&lt;false&gt;
- **parent** — um objeto proprietário do tipo adjacent_transform_view
- **inner** — um iterator do tipo adjacent_transform_view::[`_inner_iterator_`](<#/doc/ranges/adjacent_transform_view>)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo