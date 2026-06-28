# std::layout_right::mapping&lt;Extents&gt;::mapping-traits

```cpp
static constexpr bool is_unique() noexcept;  // (1) (desde C++23)
static constexpr bool is_exhaustive() noexcept;  // (2) (desde C++23)
static constexpr bool is_strided() noexcept;  // (3) (desde C++23)
static constexpr bool is_always_unique() noexcept;  // (4) (desde C++23)
static constexpr bool is_always_exhaustive() noexcept;  // (5) (desde C++23)
static constexpr bool is_always_strided() noexcept;  // (6) (desde C++23)
```

Cada instância de cada especialização de `mapping` é única, exaustiva e com passo. Veja [LayoutMapping](<#/doc/named_req/LayoutMapping>) para a semântica desses traits de mapeamento de predicado.

### Parâmetros

(nenhum)

### Valor de retorno

1-6) true

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

| Esta seção está incompleta