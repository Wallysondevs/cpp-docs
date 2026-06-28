# std::mdspan&lt;T,Extents,LayoutPolicy,AccessorPolicy&gt;::stride

```cpp
constexpr index_type stride( rank_type r ) const;  // (desde C++23)
```

  
Retorna o stride do mapeamento de layout [`_map__`](<#/doc/container/mdspan>) na r-ésima dimensão. Equivalente a return map_.stride(r);. 

### Parâmetros

r  |  \-  |  o índice da dimensão   
  
### Valor de retorno

O stride. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

| Esta seção está incompleta   