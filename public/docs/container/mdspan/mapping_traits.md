# std::mdspan&lt;T,Extents,LayoutPolicy,AccessorPolicy&gt;::mapping-traits

```cpp
constexpr bool is_unique() const;  // (1) (desde C++23)
constexpr bool is_exhaustive() const;  // (2) (desde C++23)
constexpr bool is_strided() const;  // (3) (desde C++23)
static constexpr bool is_always_unique();  // (4) (desde C++23)
static constexpr bool is_always_exhaustive();  // (5) (desde C++23)
static constexpr bool is_always_strided();  // (6) (desde C++23)
```

Verifica se (1-3) o mapeamento de layout subjacente [`_map__`](<#/doc/container/mdspan>) ou (4-6) seu tipo `mapping_type` modela a semântica dos traits de mapeamento de predicado de [LayoutMapping](<#/doc/named_req/LayoutMapping>).

1-3) Seja `_func_` (1) `is_unique`, (2) `is_exhaustive`, ou (3) `is_strided`, então é equivalente a retornar `map_.func();`.

4-6) Seja `_func_` (4) `is_always_unique`, (5) `is_always_exhaustive`, ou (6) `is_always_strided`, então é equivalente a retornar `mapping_type::func();`.

### Parâmetros

(nenhum)

### Valor de retorno

Ver acima.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

| Esta seção está incompleta