# std::mdspan&lt;T,Extents,LayoutPolicy,AccessorPolicy&gt;::operator[]

```cpp
template< class... OtherIndexTypes >
constexpr reference operator const;  // (1) (desde C++23)
template< class OtherIndexType >
constexpr reference operator[]
( std::span<OtherIndexType, rank()> indices ) const;  // (2) (desde C++23)
template< class OtherIndexType >
constexpr reference operator[]
( const std::array<OtherIndexType, rank()>& indices ) const;  // (3) (desde C++23)
```

  
Retorna uma referência para o elemento `indices`-ésimo do `mdspan`.

1) Equivalente a `return acc_.access(ptr_, map_(static_cast<index_type>(std::move(indices))...));`.

Esta sobrecarga participa da resolução de sobrecarga somente se:

  * ([std::is_convertible_v](<#/doc/types/is_convertible>)<OtherIndexTypes, index_type> && ...) for verdadeiro,
  * ([std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<index_type, OtherIndexTypes> && ...) for verdadeiro, e
  * `sizeof...(OtherIndexTypes) == rank()` for verdadeiro.

Seja `I` igual a `extents_type::`_index-cast_`(std::move(indices)). Então o comportamento é indefinido se `I` não for um índice multidimensional em `extents()`, ou seja, se `map_(I) < map_.required_span_size()` for falso.

2,3) Seja `P` um *parameter pack* tal que [std::is_same_v](<#/doc/types/is_same>)<make_index_sequence<rank()>, index_sequence<P...>> for verdadeiro, então o operador é equivalente a `return operator[](extents_type::`_index-cast_`([std::as_const](<#/doc/utility/as_const>)(indices[P]))...);`.

Esta sobrecarga participa da resolução de sobrecarga somente se:

  * [std::is_convertible_v](<#/doc/types/is_convertible>)<const OtherIndexType&, index_type> for verdadeiro, e
  * [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<index_type, const OtherIndexType&> for verdadeiro.

### Parâmetros

indices  |  \-  |  os índices do elemento a ser acessado   
  
### Valor de retorno

Uma referência para o elemento.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3974](<https://cplusplus.github.io/LWG/issue3974>) | C++23  | sobrecargas (2,3) não aplicavam `extents_type::`_index-cast_` | aplica   
  
### Veja também

| Esta seção está incompleta   