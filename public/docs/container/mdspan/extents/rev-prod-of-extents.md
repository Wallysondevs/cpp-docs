# std::extents&lt;IndexType,Extents...&gt;::rev-prod-of-extents

```cpp
constexpr std::size_t /*rev-prod-of-extents*/( rank_type i ) const noexcept;  // (desde C++23)
(apenas para exposição*)
```

Retorna o produto dos tamanhos dos extents com índice maior que i. O comportamento é indefinido se i < rank() for falso.

### Parâmetros

- **i** — um índice acima do qual os tamanhos dos extents correspondentes serão multiplicados.

### Valor de retorno

Se i + 1 < rank() for verdadeiro, retorna o produto de [`extent`](<#/doc/container/mdspan/extents/extent>)(k) para todo `k` no range `[`i + 1`, `rank()`)`, caso contrário 1.

### Veja também

[_fwd-prod-of-extents_](<#/doc/container/mdspan/extents/fwd-prod-of-extents>) | retorna o produto do tamanho do extent no range `[`​0​`, `i`)`
(função membro apenas para exposição*)