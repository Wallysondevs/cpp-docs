# std::layout_right::mapping&lt;Extents&gt;::stride

```cpp
constexpr index_type stride(rank_type i) const noexcept;  // (desde C++23)
```

Retorna o stride do mapeamento em um índice de rank i. Equivalente a return extents().`_rev-prod-of-extents_`(i);.

Esta sobrecarga participa da resolução de sobrecarga somente se extents_type​::​rank() > 0 for verdadeiro.

O comportamento é indefinido se i >= extents_type::rank() for verdadeiro.

### Parâmetros

- **i** — um índice de rank no range `[`​0​`, `extents_type::rank()`)`

### Valor de retorno

O stride em um índice de rank especificado.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ stride](<#/doc/container/mdspan/layout_stride/mapping/stride>) | obtém o stride ao longo da dimensão especificada
(função membro pública de `std::layout_stride::mapping<Extents>`)
[ stride](<#/doc/container/mdspan/stride>) | obtém o stride ao longo da dimensão especificada
(função membro pública de `std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>`)