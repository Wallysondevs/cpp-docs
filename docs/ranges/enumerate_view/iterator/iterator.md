# std::ranges::enumerate_view&lt;V&gt;::iterator&lt;Const&gt;::iterator

```cpp
/*iterator*/()
requires std::default_initializable<ranges::iterator_t<Base>> = default;  // (1) (desde C++23)
constexpr /*iterator*/( /*iterator*/<!Const> i )
requires Const &&
std::convertible_to<ranges::iterator_t<V>, ranges::iterator_t<Base>>;  // (2) (desde C++23)
private:
constexpr explicit /*iterator*/( ranges::iterator_t<Base> current,
difference_type pos);  // (3) (apenas para exposição*)
```

  
Constrói um iterator.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) o iterator subjacente [`_current__`](<#/doc/ranges/enumerate_view/iterator>) com [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;() e o índice subjacente [`_pos__`](<#/doc/ranges/enumerate_view/iterator>) com ​0​.

2) Conversão de /*iterator*/&lt;false&gt; para /*iterator*/&lt;true&gt;. Inicializa [`_current__`](<#/doc/ranges/enumerate_view/iterator>) com std::[`move`](<#/doc/utility/move>)(i.current_) e [`_pos__`](<#/doc/ranges/enumerate_view/iterator>) com `i.`[`_pos__`](<#/doc/ranges/enumerate_view/iterator>).

3) Um construtor privado que é usado por [`enumerate_view::begin`](<#/doc/ranges/enumerate_view/begin>) e [`enumerate_view::end`](<#/doc/ranges/enumerate_view/end>). Este construtor não é acessível aos usuários. Inicializa [`_current__`](<#/doc/ranges/enumerate_view/iterator>) com std::move(current) e [`_pos__`](<#/doc/ranges/enumerate_view/iterator>) com pos.

### Parâmetros

i  |  \-  |  um /*iterator*/&lt;false&gt;  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   