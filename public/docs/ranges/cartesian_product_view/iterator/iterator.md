# std::ranges::cartesian_product_view&lt;First, Vs...&gt;::iterator&lt;Const&gt;::iterator

```cpp
/*iterator*/() = default;  // (1) (desde C++23)
constexpr /*iterator*/( /*iterator*/<!Const> i )
requires Const && (
std::convertible_to<ranges::iterator_t<First>, ranges::iterator_t<const First>>
&& ... &&
std::convertible_to<ranges::iterator_t<Vs>, ranges::iterator_t<const Vs>>
);  // (2) (desde C++23)
private:
constexpr /*iterator*/(
/*Parent*/& parent,
std::tuple<ranges::iterator_t</*maybe-const*/<Const, First>>,
ranges::iterator_t</*maybe-const*/<Const, Vs>>...> current ); |  (3)  |  (exposition only*)
```

  
Constrói um iterator.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) o [`_parent__`](<#/doc/ranges/cartesian_product_view/iterator>) com nullptr e [inicializa por padrão](<#/doc/language/default_initialization>) o [`_current__`](<#/doc/ranges/cartesian_product_view/iterator>).

2) Conversão de /*iterator*/&lt;false&gt; para /*iterator*/&lt;true&gt;. Inicializa [`_parent__`](<#/doc/ranges/cartesian_product_view/iterator>) com `i.`[`_parent__`](<#/doc/ranges/cartesian_product_view/iterator>) e [`_current__`](<#/doc/ranges/cartesian_product_view/iterator>) com std::move(i.current_).

3) Um construtor privado que é usado por cartesian_product_view::begin e cartesian_product_view::end. Este construtor não é acessível aos usuários. Inicializa [`_parent__`](<#/doc/ranges/cartesian_product_view/iterator>) com [std::addressof](<#/doc/memory/addressof>)(parent) e [`_current__`](<#/doc/ranges/cartesian_product_view/iterator>) com std::move(current).

### Parâmetros

i  |  \-  |  um /*iterator*/&lt;false&gt;  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   