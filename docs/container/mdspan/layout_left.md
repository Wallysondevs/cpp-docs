# std::layout_left

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
struct layout_left;
```

`layout_left` é uma [LayoutMappingPolicy](<#/doc/named_req/LayoutMappingPolicy>) que fornece um mapeamento de layout onde a extensão mais à esquerda tem stride 1, e os strides aumentam da esquerda para a direita como o produto das extensões.

`layout_left` é um [TrivialType](<#/doc/named_req/TrivialType>). | (até C++26)
---|---
`layout_left` é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>), e [std::is_trivially_default_constructible_v](<#/doc/types/is_default_constructible>)<layout_left> é true. | (desde C++26)

### Templates de classe aninhados

[ mapping](<#/doc/container/mdspan/layout_left/mapping>) | um mapeamento de layout de layout_left
(template de classe membro público)

### Ver também

[ layout_left_padded](<#/doc/container/mdspan/layout_left_padded>)(C++26) | política de mapeamento de layout column-major com stride de preenchimento que pode ser maior ou igual à extensão mais à esquerda
(template de classe)
[ layout_right](<#/doc/container/mdspan/layout_right>)(C++23) | política de mapeamento de layout de array multidimensional row-major; a extensão mais à direita tem stride `1`
(classe)
[ layout_stride](<#/doc/container/mdspan/layout_stride>)(C++23) | uma política de mapeamento de layout com strides definidos pelo usuário
(classe)