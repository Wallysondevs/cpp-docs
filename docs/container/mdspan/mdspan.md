# std::mdspan&lt;T,Extents,LayoutPolicy,AccessorPolicy&gt;::mdspan

```cpp
constexpr mdspan();  // (1) (desde C++23)
template< class... OtherIndexTypes >
constexpr explicit mdspan( data_handle_type p, OtherIndexTypes... exts );  // (2) (desde C++23)
template< class OtherIndexType, std::size_t N >
constexpr explicit(N != rank_dynamic())
mdspan( data_handle_type p, std::span<OtherIndexType, N> exts );  // (3) (desde C++23)
template< class OtherIndexType, std::size_t N >
constexpr explicit(N != rank_dynamic())
mdspan( data_handle_type p, const std::array<OtherIndexType, N>& exts );  // (4) (desde C++23)
constexpr mdspan( data_handle_type p, const extents_type& ext );  // (5) (desde C++23)
constexpr mdspan( data_handle_type p, const mapping_type& m );  // (6) (desde C++23)
constexpr mdspan( data_handle_type p, const mapping_type& m,
const accessor_type& a );  // (7) (desde C++23)
template< class OtherElementType, class OtherExtents,
class OtherLayoutPolicy, class OtherAccessor >
constexpr explicit(/* see below */)
mdspan( const mdspan<OtherElementType, OtherExtents,
OtherLayoutPolicy, OtherAccessor>& other );  // (8) (desde C++23)
constexpr mdspan( const mdspan& rhs ) = default;  // (9) (desde C++23)
constexpr mdspan( mdspan&& rhs ) = default;  // (10) (desde C++23)
```

Constrói um `mdspan`, opcionalmente usando o data handle p fornecido pelo usuário, o layout mapping m e o accessor a. Se extents exts ou ext forem fornecidos, eles são convertidos para extents_type e usados para inicializar o layout mapping.

1) Constrói um mdspan vazio. [Inicializa por valor](<#/doc/language/value_initialization>) [`_ptr__`](<#/doc/container/mdspan>), [`_map__`](<#/doc/container/mdspan>) e [`_acc__`](<#/doc/container/mdspan>).

  * O comportamento é indefinido se `[`​0​`, `map_.required_span_size()`)` não for um range acessível de [`_ptr__`](<#/doc/container/mdspan>) e [`_acc__`](<#/doc/container/mdspan>) para os valores de [`_map__`](<#/doc/container/mdspan>) e [`_acc__`](<#/doc/container/mdspan>) após a invocação deste construtor.
  * Esta sobrecarga participa da resolução de sobrecarga apenas se

    

  * rank_dynamic() > 0 for verdadeiro,
  * [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)<data_handle_type> for verdadeiro,
  * [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)<mapping_type> for verdadeiro, e
  * [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)<accessor_type> for verdadeiro.

2) Constrói um mdspan sobre os dados subjacentes referenciados por p com extents representados por `exts...`. [Inicializa por valor](<#/doc/language/value_initialization>) [`_acc__`](<#/doc/container/mdspan>), [inicializa diretamente sem lista](<#/doc/language/direct_initialization>) [`_ptr__`](<#/doc/container/mdspan>) com std::move(p) e [`_map__`](<#/doc/container/mdspan>) com extents_type(static_cast<index_type>(std::move(exts))...).

  * O comportamento é indefinido se `[`​0​`, `map_.required_span_size()`)` não for um range acessível de [`_ptr__`](<#/doc/container/mdspan>) e [`_acc__`](<#/doc/container/mdspan>) para os valores de [`_map__`](<#/doc/container/mdspan>) e [`_acc__`](<#/doc/container/mdspan>) após a invocação deste construtor.
  * Seja N igual a sizeof...(OtherIndexTypes). Esta sobrecarga participa da resolução de sobrecarga apenas se

    

  * ([std::is_convertible_v](<#/doc/types/is_convertible>)<OtherIndexTypes, index_type> && ...) for verdadeiro,
  * ([std::is_nothrow_constructible](<#/doc/types/is_constructible>)<index_type, OtherIndexTypes> && ...) for verdadeiro,
  * N == rank() || N == rank_dynamic() for verdadeiro,
  * [std::is_constructible_v](<#/doc/types/is_constructible>)<mapping_type, extents_type> for verdadeiro, e
  * [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)<accessor_type> for verdadeiro.

3,4) Constrói um mdspan sobre os dados subjacentes referenciados por p com extents representados pelo pack exts. [Inicializa por valor](<#/doc/language/value_initialization>) [`_acc__`](<#/doc/container/mdspan>), [inicializa diretamente sem lista](<#/doc/language/direct_initialization>) [`_ptr__`](<#/doc/container/mdspan>) com std::move(p) e [`_map__`](<#/doc/container/mdspan>) com extents_type(exts).

  * O comportamento é indefinido se `[`​0​`, `map_.required_span_size()`)` não for um range acessível de [`_ptr__`](<#/doc/container/mdspan>) e [`_acc__`](<#/doc/container/mdspan>) para os valores de [`_map__`](<#/doc/container/mdspan>) e [`_acc__`](<#/doc/container/mdspan>) após a invocação deste construtor.
  * Esta sobrecarga participa da resolução de sobrecarga apenas se

    

  * [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const OtherIndexTypes&, index_type&gt; for verdadeiro,
  * [std::is_nothrow_constructible](<#/doc/types/is_constructible>)<index_type, const OtherIndexTypes&> for verdadeiro,
  * N == rank() || N == rank_dynamic() for verdadeiro,
  * [std::is_constructible_v](<#/doc/types/is_constructible>)<mapping_type, extents_type> for verdadeiro, e
  * [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)<accessor_type> for verdadeiro.

5) Constrói um mdspan sobre os dados subjacentes referenciados por p com extents representados por ext. [Inicializa por valor](<#/doc/language/value_initialization>) [`_acc__`](<#/doc/container/mdspan>), [inicializa diretamente sem lista](<#/doc/language/direct_initialization>) [`_ptr__`](<#/doc/container/mdspan>) com std::move(p) e [`_map__`](<#/doc/container/mdspan>) com exts.

  * O comportamento é indefinido se `[`​0​`, `map_.required_span_size()`)` não for um range acessível de p e [`_acc__`](<#/doc/container/mdspan>) para os valores de [`_map__`](<#/doc/container/mdspan>) e [`_acc__`](<#/doc/container/mdspan>) após a invocação deste construtor.
  * Esta sobrecarga participa da resolução de sobrecarga apenas se

    

  * [std::is_constructible_v](<#/doc/types/is_constructible>)<mapping_type, const mapping_type&> for verdadeiro, e
  * [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)<accessor_type> for verdadeiro.

6) Constrói um mdspan sobre os dados subjacentes referenciados por p com o layout mapping m. [Inicializa por valor](<#/doc/language/value_initialization>) [`_acc__`](<#/doc/container/mdspan>), [inicializa diretamente sem lista](<#/doc/language/direct_initialization>) [`_ptr__`](<#/doc/container/mdspan>) com std::move(p) e [`_map__`](<#/doc/container/mdspan>) com m.

  * O comportamento é indefinido se `[`​0​`, `m.required_span_size()`)` não for um range acessível de p e [`_acc__`](<#/doc/container/mdspan>) para os valores de [`_acc__`](<#/doc/container/mdspan>) após a invocação deste construtor.
  * Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)<accessor_type> for verdadeiro.

7) Constrói um mdspan sobre os dados subjacentes referenciados por p com o layout mapping m e o accessor a. [Inicializa diretamente sem lista](<#/doc/language/direct_initialization>) [`_ptr__`](<#/doc/container/mdspan>) com std::move(p), [`_map__`](<#/doc/container/mdspan>) com m e [`_acc__`](<#/doc/container/mdspan>) com a.

  * O comportamento é indefinido se `[`​0​`, `m.required_span_size()`)` não for um range acessível de p e a após a invocação deste construtor.

8) Construtor de conversão de outro mdspan. [Inicializa diretamente sem lista](<#/doc/language/direct_initialization>) [`_ptr__`](<#/doc/container/mdspan>) com other.ptr_, [`_map__`](<#/doc/container/mdspan>) com other.map_ e [`_acc__`](<#/doc/container/mdspan>) com other.acc_.

  * O comportamento é indefinido se:

    

  * `[`​0​`, `map_.required_span_size()`)` não for um range acessível de [`_ptr__`](<#/doc/container/mdspan>) e [`_acc__`](<#/doc/container/mdspan>) para os valores de [`_map__`](<#/doc/container/mdspan>) e [`_acc__`](<#/doc/container/mdspan>) após a invocação deste construtor, ou
  * para cada índice de rank `r` de extents_type, extents_type::static_extent(r) == [std::dynamic_extent](<#/doc/container/span/dynamic_extent>) || extents_type::static_extent(r) == other.extent(r) for falso.

  * Esta sobrecarga participa da resolução de sobrecarga apenas se

    

  * [std::is_constructible_v](<#/doc/types/is_constructible>)<mapping_type, const OtherLayoutPolicy​::​template mapping&lt;OtherExtents&gt;&> for verdadeiro, e
  * [std::is_constructible_v](<#/doc/types/is_constructible>)<accessor_type, const OtherAccessor&> for verdadeiro.

  * O programa é malformado se:

    

  * [std::is_constructible_v](<#/doc/types/is_constructible>)<data_handle_type,
const OtherAccessor​::​data_handle_type&> for falso, ou
  * [std::is_constructible_v](<#/doc/types/is_constructible>)<extents_type, OtherExtents> for falso.

  * A expressão dentro de explicit é equivalente a: ! [std::is_convertible_v](<#/doc/types/is_convertible>)<const OtherLayoutPolicy:: template mapping&lt;OtherExtents&gt;&, mapping_type> || ! [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const OtherAccessor&, accessor_type&gt;

9) [Construtor de cópia padrão](<#/doc/language/copy_constructor>).

10) [Construtor de movimento padrão](<#/doc/language/move_constructor>).

### Parâmetros

- **p** — um handle para os dados subjacentes
- **m** — um layout mapping
- **a** — um accessor
- **ext** — um objeto [`std::extents`](<#/doc/container/mdspan/extents>)
- **exts** — representa extents multidimensionais
- **other** — outro mdspan para converter
- **rhs** — outro mdspan para copiar ou mover

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 24.7.3.6.2 Construtores [mdspan.mdspan.cons]

### Veja também

| Esta seção está incompleta