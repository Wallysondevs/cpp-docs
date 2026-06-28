# std::mdspan&lt;T,Extents,LayoutPolicy,AccessorPolicy&gt;::extent

```cpp
constexpr index_type extent( rank_type r ) const noexcept;  // (desde C++23)
```

  
Retorna a extensão de um `mdspan` no índice de rank r. Equivalente a return extents().extent(r);. 

### Parâmetros

r  |  \-  |  O índice de rank para obter o tamanho da extensão   
  
### Valor de retorno

A extensão no índice de rank fornecido. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ extent](<#/doc/container/mdspan/extents/extent>) |  retorna o tamanho da extensão dinâmica de um `extents` em um determinado índice de rank   
(função membro pública de `std::extents<IndexType,Extents...>`)  
[ static_extent](<#/doc/container/mdspan/static_extent>)[static] |  retorna o tamanho da extensão estática de um `mdspan` em um determinado índice de rank   
(função membro estática pública)