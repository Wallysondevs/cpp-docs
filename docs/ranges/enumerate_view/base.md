# std::ranges::enumerate_view&lt;V&gt;::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++23)
constexpr V base() &&;  // (2) (desde C++23)
```

  
Retorna uma cópia da view subjacente.

1) Constrói por cópia o resultado a partir da view subjacente. Equivalente a `return base_;`

2) Constrói por movimento o resultado a partir da view subjacente. Equivalente a `return std::move(base_);`

### Parâmetros

(nenhum)

### Valor de retorno

Uma cópia da view subjacente.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   