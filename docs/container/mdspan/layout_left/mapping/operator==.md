# operator==(std::layout_left::mapping)

```cpp
template< class OtherExtents >
friend constexpr bool operator==( const mapping& lhs,
const mapping<OtherExtents>& rhs ) noexcept;  // (desde C++23)
```

  
Compara dois mapeamentos de layout do mesmo tipo de layout com base em suas extents subjacentes. 

Os mapeamentos de layout lhs e rhs são considerados iguais se ambos lhs.extents() e rhs.extents() forem iguais. 

Esta sobrecarga participa da resolução de sobrecarga somente se extents_type::rank() == OtherExtents::rank() for true. 

### Parâmetros

lhs, rhs  |  \-  |  mapeamentos de layout cujas extents comparar   
  
### Valor de retorno

true se lhs.extents() == rhs.extents() for true, false caso contrário 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator==](<#/>) |  compara este mapeamento de layout de `layout_right` com outro mapeamento   
(modelo de função)  
[ operator==](<#/>) |  compara este mapeamento de layout de `layout_stride` com outro mapeamento   
(modelo de função)  
[ operator==](<#/>)(C++23) |  compara as extents subjacentes em cada dimensão de duas `extents`   
(função)