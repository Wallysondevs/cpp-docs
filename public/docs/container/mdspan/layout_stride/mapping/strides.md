# std::layout_stride::mapping&lt;Extents&gt;::strides

```cpp
constexpr std::array<index_type, rank_> strides() const noexcept;  // (desde C++23)
```

  
Retorna um array dos strides do mapeamento. Equivalente a return strides_;. 

### Parâmetros

(nenhum) 

### Valor de retorno

Array de strides 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ stride](<#/doc/container/mdspan/layout_stride/mapping/stride>) |  obtém o stride ao longo da dimensão especificada   
(função membro pública)  
[ stride](<#/doc/container/mdspan/stride>) |  obtém o stride ao longo da dimensão especificada   
(função membro pública de `std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>`)