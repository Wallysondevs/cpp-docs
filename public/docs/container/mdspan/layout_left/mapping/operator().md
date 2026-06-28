# std::layout_left::mapping&lt;Extents&gt;::operator()

```cpp
template< class... Indices >
constexpr index_type operator()( Indices... indices ) const noexcept;  // (desde C++23)
```

  
Mapeia os índices multidimensionais `indices` para um valor de deslocamento.

Equivalente a `return ((static_cast<index_type>(indices) * stride(P)) + ... + 0);` onde `P` é um *pack* tal que `[std::is_same_v](<#/doc/types/is_same>)<[std::index_sequence_for](<#/doc/utility/integer_sequence>)<Indices...>, [std::index_sequence](<#/doc/utility/integer_sequence>)<P...>>` é verdadeiro.

Esta sobrecarga participa da resolução de sobrecarga somente se:

  * `sizeof...(Indices) == extents_type​::​rank()` é verdadeiro,
  * `([std::is_convertible_v](<#/doc/types/is_convertible>)<Indices, index_type> && ...)` é verdadeiro, e
  * `([std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<index_type, Indices> && ...)` é verdadeiro.

Se `extents_type​::[`_index-cast_`](<#/doc/container/mdspan/extents/index-cast>)(i)` não for um índice multidimensional em `extents()`, o comportamento é indefinido.

### Parâmetros

`indices`  |  \-  |  o índice multidimensional no objeto `extents` subjacente   
  
### Valor de retorno

O valor de deslocamento.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ operator()](<#/>) |  mapeia um índice multidimensional para um valor de deslocamento   
(função membro pública de `std::layout_right::mapping<Extents>`)  
[ operator()](<#/>) |  mapeia um índice multidimensional para um valor de deslocamento   
(função membro pública de `std::layout_stride::mapping<Extents>`)  
[ operator[]](<#/doc/container/mdspan/operator_at>) |  acessa um elemento no índice multidimensional especificado   
(função membro pública de `std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>`)