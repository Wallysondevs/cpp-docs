# std::ranges::slide_view&lt;V&gt;::iterator&lt;Const&gt;::iterator

```cpp
/*iterator*/();  // (1) (desde C++23)
constexpr /*iterator*/( /*iterator*/<!Const> i )
requires Const &&
std::convertible_to<ranges::iterator_t<V>, ranges::iterator_t<Base>>  // (2) (desde C++23)
private:
constexpr /*iterator*/( ranges::iterator_t<Base> current,
ranges::range_difference_t<Base> n )
requires (!/*slide-caches-first*/<Base>); | (3) | (exposition only*)
private:
constexpr /*iterator*/( ranges::iterator_t<Base> current,
ranges::iterator_t<Base> last_ele,
ranges::range_difference_t<Base> n )
requires /*slide-caches-first*/<Base>; | (4) | (exposition only*)
```

Constrói um iterator.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) os membros de dados subjacentes:

  * `_current__` com `[ranges::iterator_t](<#/doc/ranges/iterator_t>)<Base>()`,
  * `_last_ele__` com `[ranges::iterator_t](<#/doc/ranges/iterator_t>)<Base>()` (note que este membro pode não estar presente),
  * `_n__` com `​0​`.

2) Conversão de /*iterator*/&lt;false&gt; para /*iterator*/&lt;true&gt;. Inicializa os membros de dados subjacentes:

  * `_current__` com `std::[move](<#/doc/utility/move>)(i.current_)`,
  * `_n__` com `i.n_`.

Note que /*iterator*/&lt;true&gt; só pode ser formado quando [`_Base_`](<#/doc/ranges/slide_view/iterator>) modela /*slide-caches-nothing*/, caso em que [`_last_ele__`](<#/doc/ranges/slide_view/iterator>) não está presente.

3) Um construtor privado que é usado por ranges::slide_view::begin e ranges::slide_view::end. Este construtor não é acessível aos usuários. Inicializa os membros de dados subjacentes:

  * `_current__` com `current`,
  * `_n__` com `n`.

Note que esta sobrecarga só pode estar presente se [`_last_ele__`](<#/doc/ranges/slide_view/iterator>) não estiver presente.

4) Um construtor privado que é usado por ranges::slide_view::begin e ranges::slide_view::end. Este construtor não é acessível aos usuários. Inicializa os membros de dados subjacentes:

  * `_current__` com `current`,
  * `_last_ele__` com `last_ele` (note que este membro de dados está presente devido ao requisito /*slide-caches-first*/&lt;Base&gt;),
  * `_n__` com `n`.

### Parâmetros

- **i** — um /*iterator*/&lt;false&gt;
- **current** — um iterator para o elemento atual de `slide_view`
- **last_ele** — um iterator para o último elemento de `slide_view`
- **n** — a largura da janela deslizante (slide window) de `slide_view`

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo