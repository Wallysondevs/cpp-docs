# std::mdspan&lt;T,Extents,LayoutPolicy,AccessorPolicy&gt;::rank

```cpp
static constexpr rank_type rank() noexcept;  // (desde C++23)
```

  
Retorna o número de dimensões em um `mdspan`. Equivalente a `return Extents::rank()`. 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de dimensões. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ rank](<#/doc/container/mdspan/extents/rank>)[static] |  retorna o rank estático de um `extents`   
(função membro estática pública de `std::extents<IndexType,Extents...>`)  
[ rank_dynamic](<#/doc/container/mdspan/rank_dynamic>)[static] |  retorna o rank dinâmico de um `mdspan`   
(função membro estática pública)