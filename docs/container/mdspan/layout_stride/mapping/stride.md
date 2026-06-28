# std::layout_stride::mapping&lt;Extents&gt;::stride

```cpp
constexpr index_type stride(rank_type i) const noexcept;  // (desde C++23)
```

  
Retorna o stride do mapeamento em um índice de rank i. Equivalente a return strides_[i];

### Parâmetros

i  |  \-  |  um índice de rank no intervalo `[`​0​`, `rank_`)`  
  
### Valor de retorno

O stride em um índice de rank especificado. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ strides](<#/doc/container/mdspan/layout_stride/mapping/strides>) |  obtém o array de strides   
(função membro pública)  
[ stride](<#/doc/container/mdspan/stride>) |  obtém o stride ao longo da dimensão especificada   
(função membro pública de `std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>`)