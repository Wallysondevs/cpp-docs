# std::ranges::chunk_by_view&lt;V,Pred&gt;::iterator::iterator

```cpp
/*iterator*/() = default;  // (1) (desde C++23)
private:
constexpr /*iterator*/( chunk_by_view& parent,
ranges::iterator_t<V> current,
ranges::iterator_t<V> next );  // (2) (apenas para exposição*)
```

Constrói um iterator.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) os membros de dados subjacentes da seguinte forma:

  * `_parent__` com `nullptr`,
  * `_current__` com `[ranges::iterator_t](<#/doc/ranges/iterator_t>)<V>()`,
  * `_next__` com `[ranges::iterator_t](<#/doc/ranges/iterator_t>)<V>()`.

2) Um construtor privado que é usado por `chunk_by_view::begin` e `chunk_by_view::end`. Este construtor não é acessível aos usuários. Inicializa:

  * `_parent__` com `[std::addressof](<#/doc/memory/addressof>)(parent)`,
  * `_current__` com `current`,
  * `_next__` com `next`.

### Parâmetros

- **parent** — um objeto pai
- **current, next** — iterators

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo