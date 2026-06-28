# guias de dedução para std::mdspan

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
template< class CArray >
requires(std::is_array_v<CArray> && std::rank_v<CArray> == 1)
mdspan( CArray& )
-> mdspan<std::remove_all_extents_t<CArray>,
std::extents<std::size_t, std::extent_v<CArray, 0>>>;
template< class Pointer >
requires(std::is_pointer_v<std::remove_reference_t<Pointer>>)
mdspan( Pointer&& )
-> mdspan<std::remove_pointer_t<std::remove_reference_t<Pointer>>,
std::extents<size_t>>;
template< class ElementType, class... Integrals >
requires((std::is_convertible_v<Integrals, std::size_t> && ...) &&
sizeof...(Integrals) > 0)
explicit mdspan( ElementType*, Integrals... )
-> mdspan<ElementType, std::dextents<std::size_t, sizeof...(Integrals)>>;
template< class ElementType, class OtherIndexType, std::size_t N >
mdspan( ElementType*, std::span<OtherIndexType, N> )
-> mdspan<ElementType, std::dextents<std::size_t, N>>;
template< class ElementType, class OtherIndexType, std::size_t N >
mdspan( ElementType*, const std::array<OtherIndexType, N>& )
-> mdspan<ElementType, std::dextents<std::size_t, N>>;
template< class ElementType, class IndexType, std::size_t... ExtentsPack >
mdspan( ElementType*, const std::extents<IndexType, ExtentsPack...>& )
-> mdspan<ElementType, std::extents<IndexType, ExtentsPack...>>;
template< class ElementType, class MappingType >
mdspan( ElementType*, const MappingType& )
-> mdspan<ElementType, typename MappingType::extents_type,
typename MappingType::layout_type>;
template< class MappingType, class AccessorType >
mdspan( const typename AccessorType::data_handle_type&, const MappingType&,
const AccessorType& )
-> mdspan<typename AccessorType::element_type,
typename MappingType::extents_type,
typename MappingType::layout_type, AccessorType>;
Razão: explicação
```

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo