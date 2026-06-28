# std::ranges::stride_view&lt;V&gt;::iterator&lt;Const&gt;::iterator

```cpp
/*iterator*/()
requires std::default_initializable<ranges::iterator_t<Base>> = default;  // (1) (desde C++23)
constexpr /*iterator*/( /*iterator*/<!Const> i )
requires Const and
std::convertible_to<ranges::iterator_t<V>, ranges::iterator_t<Base>> and
std::convertible_to<ranges::sentinel_t<V>, ranges::sentinel_t<Base>>;  // (2) (desde C++23)
private:
constexpr /*iterator*/( /*Parent*/& parent,
ranges::iterator_t<Base> current,
ranges::range_difference_t<Base> missing = 0 );  // (3) (apenas para exposição*)
```

  
Constrói um [iterator](<#/doc/ranges/stride_view/iterator>).

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>):

  * [`_current__`](<#/doc/ranges/stride_view/iterator>) com [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;(),
  * [`_end__`](<#/doc/ranges/stride_view/iterator>) com [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;(),
  * [`_stride__`](<#/doc/ranges/stride_view/iterator>) com ​0​,
  * [`_missing__`](<#/doc/ranges/stride_view/iterator>) com ​0​.

2) Conversão de /*iterator*/&lt;false&gt; para /*iterator*/&lt;true&gt;. Inicializa:

  * [`_current__`](<#/doc/ranges/stride_view/iterator>) com std::move(i.current_),
  * [`_end__`](<#/doc/ranges/stride_view/iterator>) com std::move(i.end_),
  * [`_stride__`](<#/doc/ranges/stride_view/iterator>) com i.stride_,
  * [`_missing__`](<#/doc/ranges/stride_view/iterator>) com i.missing_.

3) Um construtor privado que é usado por stride_view::begin e stride_view::end. Este construtor não é acessível aos usuários. Inicializa

  * [`_current__`](<#/doc/ranges/stride_view/iterator>) com std::move(current),
  * [`_end__`](<#/doc/ranges/stride_view/iterator>) com [ranges::end](<#/doc/ranges/end>)(parent->base_),
  * [`_stride__`](<#/doc/ranges/stride_view/iterator>) com parent->stride_,
  * [`_missing__`](<#/doc/ranges/stride_view/iterator>) com missing.

### Parâmetros

i  |  \-  |  um /*iterator*/&lt;false&gt;  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   