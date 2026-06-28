# std::layout_stride

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
struct layout_stride;
```

`layout_stride` é uma [LayoutMappingPolicy](<#/doc/named_req/LayoutMappingPolicy>) que fornece um mapeamento de layout onde os strides são definidos pelo usuário.

`layout_stride` é um [TrivialType](<#/doc/named_req/TrivialType>). | (até C++26)
---|---
`layout_stride` é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>), e [std::is_trivially_default_constructible_v](<#/doc/types/is_default_constructible>)<layout_stride> é verdadeiro. | (desde C++26)

### Templates de classe aninhados

[ mapping](<#/doc/container/mdspan/layout_stride/mapping>) | um mapeamento de layout de layout_stride
(template de classe membro público)

### Veja também

[ layout_left](<#/doc/container/mdspan/layout_left>)(C++23) | política de mapeamento de layout de array multidimensional column-major; a extensão mais à esquerda tem stride `1`
(classe)
[ layout_left_padded](<#/doc/container/mdspan/layout_left_padded>)(C++26) | política de mapeamento de layout column-major com stride de preenchimento que pode ser maior ou igual à extensão mais à esquerda
(template de classe)
[ layout_right](<#/doc/container/mdspan/layout_right>)(C++23) | política de mapeamento de layout de array multidimensional row-major; a extensão mais à direita tem stride `1`
(classe)
[ layout_right_padded](<#/doc/container/mdspan/layout_right_padded>)(C++26) | política de mapeamento de layout row-major com stride de preenchimento que pode ser maior ou igual à extensão mais à direita
(template de classe)