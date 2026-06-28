# std::ranges::transform_view&lt;V,F&gt;::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++20)
constexpr V base() &&;  // (2) (desde C++20)
```

  
Retorna uma cópia da view subjacente.

1) Constrói por cópia o resultado a partir da view subjacente [`_base__`](<#/doc/ranges/transform_view>).

2) Constrói por movimento o resultado a partir da view subjacente `_base__`.

### Parâmetros

(nenhum) 

### Valor de retorno

Uma cópia da view subjacente. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   