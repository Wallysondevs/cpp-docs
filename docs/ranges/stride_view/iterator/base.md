# std::ranges::stride_view&lt;V&gt;::iterator&lt;Const&gt;::base

```cpp
constexpr ranges::iterator_t<Base> base() &&;  // (1) (desde C++23)
constexpr const ranges::iterator_t<Base>& base() const& noexcept;  // (2) (desde C++23)
```

Retorna o iterator subjacente. Seja [`_current__`](<#/doc/ranges/stride_view/iterator>) o iterator subjacente.

1) Equivalente a: return std::move(current_);.

2) Equivalente a: return current_;.

### Parâmetros

(nenhum)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo