# std::layout_stride::mapping

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
template< class Extents >
class layout_stride::mapping;
```

A classe template `layout_stride::mapping` controla como índices multidimensionais são mapeados com strides definidos pelo usuário para um valor unidimensional que representa o offset.

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
`layout_type` | std::layout_stride

### Constantes de membro

Membro | Definição
---|---
constexpr rank_type `_rank__` (private) [static] | extents_type::rank()
(constante de membro estática apenas para exposição*)

### Membros de dados

Membro | Definição
---|---
`extents_type` `_extents__` (private) | o objeto extents
(objeto membro apenas para exposição*)
[std::array](<#/doc/container/array>)<index_type, rank_> `_strides__` (private) | o array de strides
(objeto membro apenas para exposição*)

### Funções de membro

[ (construtor)](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/layout_stride/mapping/mapping&action=edit&redlink=1> "cpp/container/mdspan/layout stride/mapping/mapping \(page does not exist\)") | constrói um novo mapping
(função membro pública)
operator=(explicitly defaulted) | atribui um mapping
(função membro pública)

##### Observadores

[ extents](<#/doc/container/mdspan/layout_stride/mapping/extents>) | obtém o objeto extents
(função membro pública)
[ strides](<#/doc/container/mdspan/layout_stride/mapping/strides>) | obtém o array de strides
(função membro pública)
[ required_span_size](<#/doc/container/mdspan/layout_stride/mapping/required_span_size>) | retorna o tamanho requerido do mapping
(função membro pública)
[ operator()](<#/>) | mapeia um índice multidimensional para um valor de offset
(função membro pública)
[ is_unique](<#/doc/container/mdspan/layout_stride/mapping/mapping_traits>)[static] | determina se este mapping é único (cada combinação de índices mapeia para um elemento subjacente diferente)
(função membro estática pública)
[ is_exhaustive](<#/doc/container/mdspan/layout_stride/mapping/mapping_traits>) | determina se este mapping é exaustivo (cada elemento subjacente pode ser acessado com alguma combinação de índices)
(função membro pública)
[ is_strided](<#/doc/container/mdspan/layout_stride/mapping/mapping_traits>)[static] | determina se este mapping é strided (em cada dimensão, incrementar um índice salta sobre o mesmo número de elementos subjacentes a cada vez)
(função membro estática pública)
[ is_always_unique](<#/doc/container/mdspan/layout_stride/mapping/mapping_traits>)[static] | determina se este layout mapping é sempre único
(função membro estática pública)
[ is_always_exhaustive](<#/doc/container/mdspan/layout_stride/mapping/mapping_traits>)[static] | determina se este layout mapping é sempre exaustivo
(função membro estática pública)
[ is_always_strided](<#/doc/container/mdspan/layout_stride/mapping/mapping_traits>)[static] | determina se este layout mapping é sempre strided
(função membro estática pública)
[ stride](<#/doc/container/mdspan/layout_stride/mapping/stride>) | obtém o stride ao longo da dimensão especificada
(função membro pública)

### Funções não-membro

[ operator==](<#/>) | compara este layout mapping de `layout_stride` com outro mapping
(template de função)
[ submdspan_mapping(std::layout_stride::mapping)](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/layout_stride/mapping/submdspan_mapping&action=edit&redlink=1> "cpp/container/mdspan/layout stride/mapping/submdspan mapping \(page does not exist\)") (C++26) | calcula o mapping e o offset do manipulador de dados usados para `subdmspan`
(função membro pública)

### Ver também

[ mapping](<#/doc/container/mdspan/layout_left/mapping>) | um layout mapping de layout_left
(classe template membro pública de `std::layout_left`)
[ mapping](<#/doc/container/mdspan/layout_right/mapping>) | um layout mapping de layout_right
(classe template membro pública de `std::layout_right`)