# std::ranges::join_with_view&lt;V,Pattern&gt;::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++23)
constexpr V base() &&;  // (2) (desde C++23)
```

  
Retorna uma cópia da view subjacente.

### Valor de retorno

1) `_[base_](<#/doc/ranges/join_with_view>)_`

2) [`std::move`](<#/doc/utility/move>)(`_[base_](<#/doc/ranges/join_with_view>)_`)

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   