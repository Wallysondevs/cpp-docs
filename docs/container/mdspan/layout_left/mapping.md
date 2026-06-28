# std::layout_left::mapping

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
template< class Extents >
class layout_left::mapping;
```

O template de classe `layout_left::mapping` controla como índices multidimensionais são mapeados de forma column-major para um valor unidimensional que representa o offset. O mapeamento tem stride 1 na extensão mais à esquerda e os strides aumentam da esquerda para a direita como os produtos das extensões.

Cada especialização de `mapping` é um [LayoutMapping](<#/doc/named_req/LayoutMapping>) e um tipo [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) que satisfaz [`regular`](<#/doc/concepts/regular>).

O programa é malformado se o tamanho do espaço de índice multidimensional Extents() não for representável como um valor do tipo Extents::index_type quando Extents::rank_dynamic() for ​0​.

### Parâmetros de template

- **Extents** — especifica o número de dimensões, seus tamanhos e quais são conhecidos em tempo de compilação. Deve ser uma especialização de `std::extents`.

### Tipos de membros

Tipo de membro | Definição
---|---
`extents_type` | `Extents`
`index_type` | `extents_type::index_type`
`size_type` | `extents_type::size_type`
`rank_type` | `extents_type::rank_type`
`layout_type` | std::layout_left

### Membros de dados

Membro | Definição
---|---
`extents_type` `_extents__` (private) | o objeto extents
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/layout_left/mapping/mapping&action=edit&redlink=1> "cpp/container/mdspan/layout left/mapping/mapping \(page does not exist\)") | constrói um novo mapeamento
(função membro pública)
operator=(explicitly defaulted) | atribui um mapeamento
(função membro pública)

##### Observadores

[ extents](<#/doc/container/mdspan/layout_left/mapping/extents>) | obtém o objeto extents
(função membro pública)
[ required_span_size](<#/doc/container/mdspan/layout_left/mapping/required_span_size>) | retorna o tamanho necessário do mapeamento
(função membro pública)
[ operator()](<#/>) | mapeia um índice multidimensional para um valor de offset
(função membro pública)
[ is_unique](<#/doc/container/mdspan/layout_left/mapping/mapping_traits>)[static] | determina se este mapeamento é único (cada combinação de índices mapeia para um elemento subjacente diferente)
(função membro estática pública)
[ is_exhaustive](<#/doc/container/mdspan/layout_left/mapping/mapping_traits>)[static] | determina se este mapeamento é exaustivo (cada elemento subjacente pode ser acessado com alguma combinação de índices)
(função membro estática pública)
[ is_strided](<#/doc/container/mdspan/layout_left/mapping/mapping_traits>)[static] | determina se este mapeamento é strided (em cada dimensão, incrementar um índice salta sobre o mesmo número de elementos subjacentes a cada vez)
(função membro estática pública)
[ is_always_unique](<#/doc/container/mdspan/layout_left/mapping/mapping_traits>)[static] | determina se este mapeamento de layout é sempre único
(função membro estática pública)
[ is_always_exhaustive](<#/doc/container/mdspan/layout_left/mapping/mapping_traits>)[static] | determina se este mapeamento de layout é sempre exaustivo
(função membro estática pública)
[ is_always_strided](<#/doc/container/mdspan/layout_left/mapping/mapping_traits>)[static] | determina se este mapeamento de layout é sempre strided
(função membro estática pública)
[ stride](<#/doc/container/mdspan/layout_left/mapping/stride>) | obtém o stride ao longo da dimensão especificada
(função membro pública)

### Funções não-membro

[ operator==](<#/>) | compara este mapeamento de layout de `layout_left` com outro mapeamento
(template de função)
[ submdspan_mapping(std::layout_left::mapping)](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/layout_left/mapping/submdspan_mapping&action=edit&redlink=1> "cpp/container/mdspan/layout left/mapping/submdspan mapping \(page does not exist\)") (C++26) | calcula o mapeamento e o offset do handle de dados usados para `subdmspan`
(função membro pública)

### Veja também

[ mapping](<#/doc/container/mdspan/layout_right/mapping>) | um mapeamento de layout de layout_right
(template de classe membro público de `std::layout_right`)
[ mapping](<#/doc/container/mdspan/layout_stride/mapping>) | um mapeamento de layout de layout_stride
(template de classe membro público de `std::layout_stride`)