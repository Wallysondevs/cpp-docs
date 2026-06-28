# std::mdspan&lt;T,Extents,LayoutPolicy,AccessorPolicy&gt;::rank_dynamic

```cpp
static constexpr rank_type rank_dynamic() noexcept;  // (desde C++23)
```

  
Retorna o número de dimensões dinâmicas em um `mdspan`. Equivalente a `return Extents::rank_dynamic().`

### Parâmetros

(nenhum) 

### Valor de retorno

O número de dimensões dinâmicas. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ rank_dynamic](<#/doc/container/mdspan/extents/rank_dynamic>)[static] |  retorna o rank dinâmico de um `extents`   
(função membro estática pública de `std::extents<IndexType,Extents...>`)  
[ rank](<#/doc/container/mdspan/rank>)[static] |  retorna o rank de um `mdspan`   
(função membro estática pública)