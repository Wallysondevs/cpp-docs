# std::layout_right_padded

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
template< std::size_t PaddingValue = std::dynamic_extent >
struct layout_right_padded;
```

Cada especialização de `layout_right_padded` é uma [LayoutMappingPolicy](<#/doc/named_req/LayoutMappingPolicy>) que fornece um mapeamento de layout similar a [`layout_right::mapping`](<#/doc/container/mdspan/layout_right/mapping>), exceto que possui um _padding stride_.

Cada especialização de `layout_right_padded` é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>), e [std::is_trivially_default_constructible_v](<#/doc/types/is_default_constructible>)&lt;T&gt; é verdadeiro para qualquer especialização `T` desse tipo.

Seja m a instância do tipo de mapeamento [`layout_right_padded::mapping`](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/layout_right_padded/mapping&action=edit&redlink=1> "cpp/container/mdspan/layout right padded/mapping \(page does not exist\)"). O padding stride do mapeamento é o penúltimo stride m.stride(rank() - 2), que é garantido ser pelo menos o último valor de extent m.extent(rank() - 1), chamado _extent a preencher_.

### Templates de classe aninhados

[ mapping](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/layout_right_padded/mapping&action=edit&redlink=1> "cpp/container/mdspan/layout right padded/mapping \(page does not exist\)") | um mapeamento de layout de layout_right_padded
(template de classe membro público)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ layout_right](<#/doc/container/mdspan/layout_right>)(C++23) | política de mapeamento de layout de array multidimensional row-major; o extent mais à direita tem stride `1`
(classe)
[ layout_stride](<#/doc/container/mdspan/layout_stride>)(C++23) | uma política de mapeamento de layout com strides definidos pelo usuário
(classe)