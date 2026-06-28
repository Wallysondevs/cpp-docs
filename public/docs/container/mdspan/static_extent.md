# std::mdspan&lt;T,Extents,LayoutPolicy,AccessorPolicy&gt;::static_extent

```cpp
static constexpr std::size_t static_extent( rank_type r ) noexcept;  // (desde C++23)
```

  
Determina estaticamente a extensão de um `mdspan` no índice de rank `r`. Se o índice de rank `r` corresponder a uma extensão dinâmica, retorna `std::dynamic_extent`. Equivalente a `return Extents::static_extent(r);`. 

### Parâmetros

r  |  \-  |  O índice de rank para obter o tamanho da extensão estática   
  
### Valor de retorno

O tamanho da extensão estática, ou `std::dynamic_extent`. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ static_extent](<#/doc/container/mdspan/extents/static_extent>)[static] |  retorna o tamanho da extensão estática de um `extents` em um determinado índice de rank   
(função membro estática pública de `std::extents<IndexType,Extents...>`)  
[ extent](<#/doc/container/mdspan/extent>) |  retorna a extensão de um `mdspan` em um determinado índice de rank   
(função membro pública)