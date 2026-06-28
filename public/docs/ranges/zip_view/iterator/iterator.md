# std::ranges::zip_view&lt;Views...&gt;::iterator&lt;Const&gt;::iterator

```cpp
/*iterator*/() = default;  // (1) (desde C++23)
constexpr /*iterator*/( /*iterator*/<!Const> i )
requires Const &&
(std::convertible_to<ranges::iterator_t<Views>,
ranges::iterator_t</*maybe-const*/<Const, Views>>> && ...);  // (2) (desde C++23)
```

Constrói um iterator.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) a tupla subjacente de iterators com seus valores padrão.

2) Conversão de /*iterator*/&lt;false&gt; para /*iterator*/&lt;true&gt;. Constrói por move a tupla subjacente de iterators `_current__` com std::move(i.current).

Este iterator também possui um construtor privado que é usado por zip_view::begin e zip_view::end. Este construtor não é acessível aos usuários.

### Parâmetros

- **i** — um /*iterator*/&lt;false&gt;

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo