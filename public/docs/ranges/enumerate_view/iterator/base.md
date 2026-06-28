# std::ranges::enumerate_view&lt;V&gt;::iterator&lt;Const&gt;::base

```cpp
constexpr const ranges::iterator_t<Base>& base() const& noexcept;  // (1) (desde C++23)
constexpr ranges::iterator_t<Base> base() &&;  // (2) (desde C++23)
```

Retorna o iterator subjacente. Seja [`_current__`](<#/doc/ranges/enumerate_view/iterator>) o iterator subjacente.

1) Equivalente a: `return current_;`.

2) Equivalente a: `return std::move(current_);`.

### Parâmetros

(nenhum)

### Valor de retorno

Um iterator para o elemento atual em `enumerate_view`.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo