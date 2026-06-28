# std::extents&lt;IndexType,Extents...&gt;::fwd-prod-of-extents

```cpp
constexpr std::size_t /*fwd-prod-of-extents*/( rank_type i ) const noexcept;  // (desde C++23)
(apenas para exposição*)
```

  
Retorna o produto dos tamanhos dos extents com índice menor que i. O comportamento é indefinido se i <= rank() for falso. 

### Parâmetros

i  |  \-  |  O índice final do range de extents a serem multiplicados.   
  
### Valor de retorno

Se i > 0 for verdadeiro, retorna o produto de [`extent`](<#/doc/container/mdspan/extents/extent>)(k) para todo `k` no range `[`​0​`, `i`)`, caso contrário 1. 

### Veja também

[_rev-prod-of-extents_](<#/doc/container/mdspan/extents/rev-prod-of-extents>) |  retorna o produto do tamanho dos extents no range `[`i + 1`, `rank()`)`  
(função membro apenas para exposição*)  