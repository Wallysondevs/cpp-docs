# operator==(std::layout_stride::mapping)

```cpp
template< class OtherMapping >
friend constexpr bool operator==( const mapping& lhs,
const OtherMapping& rhs ) noexcept;  // (desde C++23)
```

  
Compara dois mapeamentos de layout de tipos de layout possivelmente diferentes com base em suas extents e strides subjacentes.

Mapeamentos de layout lhs e rhs são considerados iguais se todas as seguintes condições forem verdadeiras:

  * ambos lhs.extents() e rhs.extents() são iguais,
  * OFFSET(rhs) é igual a ​0​, e
  * para cada índice de rank r no intervalo `[`​0​`, `lhs.extents().rank()`)`, lhs.stride(r) é igual a rhs.stride(r)

Onde OFFSET(rhs) é igual a:

  * rhs(), se rhs.extents().rank() for ​0​,
  * caso contrário ​0​, se o tamanho do espaço de índice multidimensional rhs.extents() for ​0​,
  * caso contrário rhs(z...) para um pacote de inteiros z que é um índice multidimensional em rhs.extents() e cada elemento de z é igual a ​0​.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes restrições forem satisfeitas:

  * [`_layout-mapping-alike_`](<#/doc/named_req/LayoutMapping>) &lt;OtherMapping&gt; é satisfeito,
  * rank_ == OtherMapping::extents_type::rank() é verdadeiro, e
  * OtherMapping::is_always_strided() é verdadeiro

([`_rank__`](<#/doc/container/mdspan/layout_stride/mapping>) é uma constante membro estática apenas para exposição definida em std::layout_stride::mapping.)

Se `OtherMapping` não atender aos requisitos de [LayoutMapping](<#/doc/named_req/LayoutMapping>), o comportamento é indefinido.

### Parâmetros

lhs, rhs  |  \-  |  mapeamentos de layout cujas extents e strides comparar   
  
### Valor de retorno

true se lhs e rhs forem ambos iguais conforme especificado acima, false caso contrário

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ operator==](<#/>) |  compara este mapeamento de layout de `layout_left` com outro mapeamento   
(modelo de função)  
[ operator==](<#/>) |  compara este mapeamento de layout de `layout_right` com outro mapeamento   
(modelo de função)  
[ operator==](<#/>)(C++23) |  compara as extents subjacentes em cada dimensão de duas `extents`   
(função)