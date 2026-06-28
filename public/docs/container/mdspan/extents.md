# std::extents, std::dextents, std::dims

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
template< class IndexType, std::size_t... Extents >
class extents;
template< class IndexType, std::size_t Rank >
using dextents = /* veja abaixo */
template< std::size_t Rank, class IndexType = std::size_t >
using dims = std::dextents<IndexType, Rank>;
```

1) Representa um espaço de índice multidimensional com rank igual a sizeof...(Extents).

2) Um alias template conveniente para um `extents` totalmente dinâmico. Seja `d` denotando [std::dynamic_extent](<#/doc/container/span/dynamic_extent>), cada especialização de dextents<IndexType, Rank> é equivalente a extents&lt;IndexType /*, d, d, ..., d*/&gt; (ou seja, `_d_` é repetido um total de `Rank` vezes).

3) Um alias template conveniente para um `extents` totalmente dinâmico com [std::size_t](<#/doc/types/size_t>) como o tipo de índice padrão.

Cada especialização de `extents` modela [`regular`](<#/doc/concepts/regular>) e é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>).

### Parâmetros de template

- **IndexType** — o tipo de cada `Extents` não dinâmico. Deve ser um tipo inteiro com ou sem sinal. Caso contrário, o programa é malformado.
- **Extents** — representa a extensão (tamanho de um intervalo inteiro) para cada índice de rank. Cada elemento dele é igual a [std::dynamic_extent](<#/doc/container/span/dynamic_extent>) (neste caso, representa uma _extensão dinâmica_ e o tamanho da extensão será determinado dinamicamente), ou é representável como um valor do tipo `IndexType` (então representa uma _extensão estática_ e o tamanho da extensão é apenas o seu valor), ou então o programa é malformado.
- **Rank** — denota o rank de um `extents` totalmente dinâmico.

### Tipos de membro

Tipo de membro | Definição
---|---
`index_type` | `IndexType`
`size_type` | [std::make_unsigned_t](<#/doc/types/make_unsigned>)<index_type>
`rank_type` | [std::size_t](<#/doc/types/size_t>)

### Membros de dados

Nome do membro | Definição
---|---
[std::array](<#/doc/container/array>)<index_type, rank_dynamic()> `_dynamic-extents_` (privado) | Um array que armazena o tamanho de cada extensão dinâmica.
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/container/mdspan/extents/extents>) | constrói um `extents`
(função membro pública)

##### Observadores

[ rank](<#/doc/container/mdspan/extents/rank>)[static] | retorna o rank estático de um `extents`
(função membro estática pública)
[ rank_dynamic](<#/doc/container/mdspan/extents/rank_dynamic>)[static] | retorna o rank dinâmico de um `extents`
(função membro estática pública)
[ static_extent](<#/doc/container/mdspan/extents/static_extent>)[static] | retorna o tamanho da extensão estática de um `extents` em um determinado índice de rank
(função membro estática pública)
[ extent](<#/doc/container/mdspan/extents/extent>) | retorna o tamanho da extensão dinâmica de um `extents` em um determinado índice de rank
(função membro pública)

##### Funções auxiliares

[_fwd-prod-of-extents_](<#/doc/container/mdspan/extents/fwd-prod-of-extents>) | retorna o produto do tamanho da extensão no range `[`​0​`, `i`)`
(função membro apenas para exposição*)
[_rev-prod-of-extents_](<#/doc/container/mdspan/extents/rev-prod-of-extents>) | retorna o produto do tamanho das extensões no range `[`i + 1`, `rank()`)`
(função membro apenas para exposição*)
[_index-cast_](<#/doc/container/mdspan/extents/index-cast>) | converte a entrada para um tipo inteiro
(função membro apenas para exposição*)
[_dynamic-index_](<#/doc/container/mdspan/extents/dynamic-index>)(privado) | retorna o número de extensões dinâmicas abaixo de um determinado índice de rank
(função membro apenas para exposição*)
[_dynamic-index-inv_](<#/doc/container/mdspan/extents/dynamic-index-inv>)(privado) | retorna o número `r` tal que no range `[`​0​`, `r + 1`)` há exatamente `i + 1` extensões dinâmicas para um determinado argumento `i`
(função membro apenas para exposição*)

### Funções não-membro

[ operator==](<#/>)(C++23) | compara as extensões subjacentes em cada dimensão de dois `extents`
(função)

### [Guias de dedução](<#/doc/container/mdspan/extents/deduction_guides>)(C++23)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ rank](<#/doc/types/rank>)(C++11) | obtém o número de dimensões de um tipo array
(modelo de classe)
[ extent](<#/doc/types/extent>)(C++11) | obtém o tamanho de um tipo array ao longo de uma dimensão especificada
(modelo de classe)