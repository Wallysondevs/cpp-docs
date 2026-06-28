# std::layout_left::mapping&lt;Extents&gt;::stride

```cpp
constexpr index_type required_span_size() const noexcept;
```
| | | (desde C++23)

Retorna o tamanho necessário do mapeamento.

Equivalente a retornar `extents`().`_fwd-prod-of-extents_`(extents_type::rank());.

### Valor de retorno

O tamanho necessário do mapeamento.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ required_span_size](<#/doc/container/mdspan/layout_right/mapping/required_span_size>) | retorna o tamanho necessário do mapeamento
(função membro pública de `std::layout_right::mapping<Extents>`)
[ required_span_size](<#/doc/container/mdspan/layout_stride/mapping/required_span_size>) | retorna o tamanho necessário do mapeamento
(função membro pública de `std::layout_stride::mapping<Extents>`)
[ size](<#/doc/container/mdspan/size>) | retorna o tamanho do espaço de índice multidimensional
(função membro pública de `std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>`)