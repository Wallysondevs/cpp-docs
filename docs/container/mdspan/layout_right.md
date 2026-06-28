# std::layout_right

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
struct layout_right;
```

`layout_right` é uma [LayoutMappingPolicy](<#/doc/named_req/LayoutMappingPolicy>) que fornece um mapeamento de layout onde a extensão mais à direita tem stride 1, e os strides aumentam da direita para a esquerda como o produto das extensões.

`layout_right` é um [TrivialType](<#/doc/named_req/TrivialType>). | (até C++26)
---|---
`layout_right` é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>), e [std::is_trivially_default_constructible_v](<#/doc/types/is_default_constructible>)<layout_right> é verdadeiro. | (desde C++26)

É a política de mapeamento de layout padrão usada por std::mdspan se nenhum layout especificado pelo usuário for fornecido.

### Modelos de classe aninhados

[ mapping](<#/doc/container/mdspan/layout_right/mapping>) | um mapeamento de layout de layout_right
(modelo de classe membro público)

### Veja também

[ layout_right_padded](<#/doc/container/mdspan/layout_right_padded>)(C++26) | política de mapeamento de layout row-major com stride de preenchimento que pode ser maior ou igual à extensão mais à direita
(modelo de classe)
[ layout_left](<#/doc/container/mdspan/layout_left>)(C++23) | política de mapeamento de layout de array multidimensional column-major; a extensão mais à esquerda tem stride `1`
(classe)
[ layout_stride](<#/doc/container/mdspan/layout_stride>)(C++23) | uma política de mapeamento de layout com strides definidos pelo usuário
(classe)