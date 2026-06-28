# std::mdspan&lt;T,Extents,LayoutPolicy,AccessorPolicy&gt;::size

```cpp
constexpr size_type size() const noexcept;  // (desde C++23)
```

  
Retorna o número de elementos em [`mdspan`](<#/doc/container/mdspan/mdspan>). 

Equivalente a [`extents`](<#/doc/container/mdspan/extents>)().[`_fwd-prod-of-extents_`](<#/doc/container/mdspan/extents/fwd-prod-of-extents>)([`rank`](<#/doc/container/mdspan/extents/rank>)()). 

O tamanho do espaço de índice multidimensional [`extents()`](<#/doc/container/mdspan/extents>) deve ser representável como um valor do tipo [`size_type`](<#/doc/container/mdspan>). Caso contrário, o comportamento é indefinido. 

### Valor de retorno

O número de elementos. 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Ver também

| Esta seção está incompleta   