# operator==(std::extents)

```cpp
template< class OtherIndexType, std::size_t... OtherExtents >
friend constexpr bool operator==(
const extents& lhs, const extents<OtherIndexType, OtherExtents...>& rhs ) noexcept;  // (desde C++23)
```

  
Compara dois `extents`. Retorna true se lhs.rank() for igual a rhs.rank() e lhs.extent(r) for igual a rhs.extent(r) para cada índice de rank r de rhs; caso contrário, retorna false.

### Parâmetros

lhs, rhs  |  \-  |  extents cujos valores devem ser comparados   
  
### Valor de retorno

true se os extents representados por lhs e rhs forem iguais, false caso contrário

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   