# std::extents&lt;IndexType,Extents...&gt;::extents

```cpp
constexpr extents() = default;  // (1) (desde C++23)
template< class OtherIndexType, std::size_t... OtherExtents >
constexpr explicit(/*see below*/)
extents( const std::extents<OtherIndexType, OtherExtents...>& other ) noexcept;  // (2) (desde C++23)
template< class... OtherIndexTypes >
constexpr explicit extents( OtherIndexTypes... exts ) noexcept;  // (3) (desde C++23)
template< class OtherIndexType, std::size_t N >
constexpr explicit(N != rank_dynamic())
extents( std::span<OtherIndexType, N> exts ) noexcept;  // (4) (desde C++23)
template< class OtherIndexType, std::size_t N >
constexpr explicit(N != rank_dynamic())
extents( const std::array<OtherIndexType, N>& exts ) noexcept;  // (5) (desde C++23)
```

Constrói um objeto `extents`. É possível construir `extents` apenas a partir de extents dinâmicos, que são todos os valores armazenados, ou a partir de todos os extents com uma pré-condição.

1) Construtor padrão. Inicializa todos os extents dinâmicos com zero.

2) Conversão a partir de outro objeto `extents`. Após a construção, *this == other é verdadeiro.

  * O comportamento é indefinido se

    

  * other.extent(r) != static_extent(r) para qualquer r para o qual static_extent(r) representa um extent estático, ou
  * other.extent(r) não é representável como um valor do tipo IndexType para qualquer valor de rank r em other.

  * Esta sobrecarga participa da resolução de sobrecarga apenas se

    

  * sizeof...(OtherExtents) == rank() for verdadeiro, e
  * ((OtherExtents == [std::dynamic_extent](<#/doc/container/span/dynamic_extent>) || Extents == [std::dynamic_extent](<#/doc/container/span/dynamic_extent>)
OtherExtents == Extents) && ...) for verdadeiro.

  * Este construtor é explícito se

    

  * ((Extents != [std::dynamic_extent](<#/doc/container/span/dynamic_extent>) && OtherExtents == [std::dynamic_extent](<#/doc/container/span/dynamic_extent>)) || ...) for verdadeiro, ou
  * [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;IndexType&gt;::max() < [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;OtherIndexType&gt;::max() for verdadeiro.

3) Seja N igual a sizeof...(exts) e exts_arr igual a [std::array](<#/doc/container/array>)<IndexType, N>{static_cast&lt;IndexType&gt;(std::move(exts))...}, equivalente a extents(exts_arr).

  * Esta sobrecarga participa da resolução de sobrecarga apenas se

    

  * ([std::is_convertible_v](<#/doc/types/is_convertible>)<OtherIndexTypes, IndexType> && ...) for verdadeiro,
  * ([std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<IndexType, OtherIndexTypes> && ...) for verdadeiro, e
  * N == rank_dynamic() || N == rank() for verdadeiro.

  * O comportamento é indefinido se

    

  * N != rank_dynamic() e exts_arr[r] não for igual a static_extent(r) para qualquer r para o qual static_extent(r) representa um extent estático, ou
  * um elemento em exts for negativo ou não representável como um valor do tipo IndexType.

4,5) Se N for igual a rank_dynamic(), para todo d em `[`​0​`, `rank_dynamic()`)`, [inicializa-diretamente-sem-lista](<#/doc/language/direct_initialization>) [`_dynamic-extents_`](<#/doc/container/mdspan/extents>)[d] com [std::as_const](<#/doc/utility/as_const>)(exts[d]). Caso contrário, para todo d em `[`​0​`, `rank_dynamic()`)`, inicializa-diretamente-sem-lista `_dynamic-extents_`[d] com [std::as_const](<#/doc/utility/as_const>)(exts[[`_dynamic-index-inv_`](<#/doc/container/mdspan/extents/dynamic-index-inv>)(d)]).

  * Esta sobrecarga participa da resolução de sobrecarga apenas se

    

  * [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const OtherIndexType&, IndexType&gt; for verdadeiro,
  * [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<IndexType, const OtherIndexType&> for verdadeiro, e
  * N == rank_dynamic() || N == rank() for verdadeiro.

  * O comportamento é indefinido se

    

  * N != rank_dynamic() e exts[r] não for igual a static_extent(r) para qualquer r para o qual static_extent(r) representa um extent estático, ou
  * exts[r] for negativo ou não representável como um valor do tipo IndexType para qualquer índice de rank r.

### Parâmetros

- **other** — outro objeto `extents` para converter
- **exts** — representa os extents

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

| | Esta seção está incompleta