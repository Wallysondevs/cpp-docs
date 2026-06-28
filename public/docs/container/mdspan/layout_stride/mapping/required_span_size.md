# std::layout_stride::mapping&lt;Extents&gt;::required_span_size

```cpp
constexpr index_type required_span_size() const noexcept;  // (desde C++23)
```

  
Retorna o tamanho necessário do mapeamento.

Seja s igual a:

  * 1, se extents().rank() == 0 for verdadeiro,
  * caso contrário, ​0​, se o tamanho do espaço de índice multidimensional extents() for ​0​,
  * caso contrário, 1 mais a soma dos produtos de extents().extent(r) - 1 e extents_type::`_index-cast_`(strides_[r]) para todo r no range `[`​0​`, `extents().rank()`)`.

Uma chamada é equivalente a return s;.

### Valor de retorno

O tamanho necessário do mapeamento.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ required_span_size](<#/doc/container/mdspan/layout_left/mapping/required_span_size>) |  retorna o tamanho necessário do mapeamento   
(função membro pública de `std::layout_left::mapping<Extents>`)  
[ required_span_size](<#/doc/container/mdspan/layout_right/mapping/required_span_size>) |  retorna o tamanho necessário do mapeamento   
(função membro pública de `std::layout_right::mapping<Extents>`)  
[ size](<#/doc/container/mdspan/size>) |  retorna o tamanho do espaço de índice multidimensional   
(função membro pública de `std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>`)