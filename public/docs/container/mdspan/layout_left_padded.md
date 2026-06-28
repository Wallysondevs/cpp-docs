# std::layout_left_padded

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
template< std::size_t PaddingValue = std::dynamic_extent >
struct layout_left_padded;
```

Cada especialização de `layout_left_padded` é uma [LayoutMappingPolicy](<#/doc/named_req/LayoutMappingPolicy>) que fornece um mapeamento de layout que é similar a [`layout_left::mapping`](<#/doc/container/mdspan/layout_left/mapping>), exceto que possui um _padding stride_.

Cada especialização de `layout_left_padded` é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>), e [std::is_trivially_default_constructible_v](<#/doc/types/is_default_constructible>)&lt;T&gt; é verdadeiro para qualquer especialização `T` desse tipo.

Seja m a instância do tipo de mapeamento [`layout_left_padded::mapping`](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/layout_left_padded/mapping&action=edit&redlink=1> "cpp/container/mdspan/layout left padded/mapping \(page does not exist\)"). O padding stride do mapeamento é o segundo stride m.stride(1), que é garantido ser pelo menos o primeiro valor de extent m.extent(0), chamado _extent a preencher_.

### Modelos de classe aninhados

[ mapping](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/layout_left_padded/mapping&action=edit&redlink=1> "cpp/container/mdspan/layout left padded/mapping \(page does not exist\)") | um mapeamento de layout de layout_left_padded
(modelo de classe membro público)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ layout_left](<#/doc/container/mdspan/layout_left>)(C++23) | política de mapeamento de layout de array multidimensional column-major; o extent mais à esquerda tem stride `1`
(classe)
[ layout_stride](<#/doc/container/mdspan/layout_stride>)(C++23) | uma política de mapeamento de layout com strides definidos pelo usuário
(classe)