# std::mdspan&lt;T,Extents,LayoutPolicy,AccessorPolicy&gt;::extents

```cpp
constexpr const extents_type& extents() const noexcept;  // (desde C++23)
```

Retorna uma referência const para os extents do mapeamento de layout [`_map__`](<#/doc/container/mdspan>). Equivalente a `return map_.extents();`.

### Parâmetros

(nenhum)

### Valor de retorno

Uma referência const para os extents.

### Exemplo

| Esta seção está incompleta
Reason: no example

### Veja também

| Esta seção está incompleta