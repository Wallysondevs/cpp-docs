# Requisitos nomeados C++: LayoutMappingPolicy (desde C++23)

**LayoutMappingPolicy** é um tipo usado para especificar a política de layout de [std::mdspan](<#/doc/container/mdspan>). Ele fornece um template de alias de membro cuja especialização é um tipo [LayoutMapping](<#/doc/named_req/LayoutMapping>).

### Requisitos

Um tipo `MP` satisfaz LayoutMappingPolicy se os requisitos de tipo mostrados abaixo forem válidos:

#### Legenda

Tipo | Definição
---|---
`MP` | uma classe de política de mapeamento de layout
`M` | uma classe de mapeamento de layout
`E` | uma especialização de [std::extents](<#/doc/container/mdspan/extents>)

#### Requisitos de tipo

* MP::mapping&lt;E&gt; é válido e denota um tipo `M` que satisfaz [LayoutMapping](<#/doc/named_req/LayoutMapping>).
* M::layout_type é válido e denota um tipo `MP`.
* M::extents_type é válido e denota um tipo `E`.

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão satisfazem os requisitos de LayoutMappingPolicy:

[ layout_left](<#/doc/container/mdspan/layout_left>)(C++23) | política de mapeamento de layout de array multidimensional column-major; a extensão mais à esquerda tem stride `1`
(class)
[ layout_right](<#/doc/container/mdspan/layout_right>)(C++23) | política de mapeamento de layout de array multidimensional row-major; a extensão mais à direita tem stride `1`
(class)
[ layout_stride](<#/doc/container/mdspan/layout_stride>)(C++23) | uma política de mapeamento de layout com strides definidos pelo usuário
(class)
[ layout_left_padded](<#/doc/container/mdspan/layout_left_padded>)(C++26) | política de mapeamento de layout column-major com padding stride que pode ser maior ou igual à extensão mais à esquerda
(class template)
[ layout_right_padded](<#/doc/container/mdspan/layout_right_padded>)(C++26) | política de mapeamento de layout row-major com padding stride que pode ser maior ou igual à extensão mais à direita
(class template)
Definido no namespace `std::linalg`

```cpp
 layout_transpose")(C++26)
(class template)
 layout_blas_packed")(C++26)
(class template)
```
