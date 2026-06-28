# std::ranges::elements_view&lt;V,N&gt;::iterator

```cpp
template< bool Const >
class /*iterator*/;  // (apenas para exposição*)
```

  
O tipo de retorno de [`elements_view::begin`](<#/doc/ranges/elements_view/begin>), e de [`elements_view::end`](<#/doc/ranges/elements_view/end>) quando a view subjacente é uma [`common_range`](<#/doc/ranges/common_range>).

O tipo /*iterator*/&lt;true&gt; é retornado pelas sobrecargas qualificadas com `const`. O tipo /*iterator*/&lt;false&gt; é retornado pelas sobrecargas não qualificadas com `const`.

### Tipos Membro

Tipo Membro | Definição
---|---
`_Base_` (privado) | `const V` se `Const` for verdadeiro, caso contrário `V`.
(tipo membro apenas para exposição*)
`iterator_concept` | Denota:

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modelar [`random_access_range`](<#/doc/ranges/random_access_range>). Caso contrário,
  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modelar [`bidirectional_range`](<#/doc/ranges/bidirectional_range>). Caso contrário,
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modelar [`forward_range`](<#/doc/ranges/forward_range>). Caso contrário,
  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>).

`iterator_category`  
(presente condicionalmente) | Não definido, se `_Base_` não modelar [`forward_range`](<#/doc/ranges/forward_range>). Caso contrário,

  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>), se std::get&lt;N&gt;(*current_) for um rvalue. Caso contrário, seja `_C_` o tipo [std::iterator_traits](<#/doc/iterator/iterator_traits>)<std::iterator_t&lt;Base&gt;>::iterator_category.
  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se `_C_` modelar [std::derived_from](<#/doc/concepts/derived_from>)<[std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>)>. Caso contrário,
  * `_C_`.

`value_type` | [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::tuple_element_t](<#/doc/utility/tuple_element>)<N, [ranges::range_value_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;>>
---|---
`difference_type` | [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;

### Membros de Dados

Objeto Membro | Definição
---|---
`_current__` (privado) | Um iterator do tipo [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt; para o elemento atual da sequência subjacente.
(objeto membro apenas para exposição*)

### Funções Membro

[ (construtor)](<#/doc/ranges/elements_view/iterator/iterator>) | constrói um iterator
(função membro pública)
[ base](<#/doc/ranges/elements_view/iterator/base>) | retorna o iterator subjacente
(função membro pública)
[ operator*](<#/doc/ranges/elements_view/iterator/operator_star_>) | acessa o N-ésimo elemento da tupla
(função membro pública)
[ operator[]](<#/doc/ranges/elements_view/iterator/operator_at>) | acessa um elemento por índice
(função membro pública)
[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/elements_view/iterator/operator_arith>) | avança ou decrementa o iterator subjacente
(função membro pública)

### Funções Não-Membro

[ operator==operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/ranges/elements_view/iterator/operator_cmp>)(C++20) | compara os iterators subjacentes
(função)
[ operator+operator-](<#/doc/ranges/elements_view/iterator/operator_arith2>)(C++20) | realiza aritmética de iterators
(função)

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P2259R1](<https://wg21.link/P2259R1>) | C++20 | o membro `iterator_category` é sempre definido | definido apenas se `_Base_` modelar [`forward_range`](<#/doc/ranges/forward_range>)
[LWG 3555](<https://cplusplus.github.io/LWG/issue3555>) | C++20 | a definição de `iterator_concept` ignora const | feita para considerar

### Veja também

[ iterator](<#/doc/ranges/transform_view/iterator>)(C++20) | o tipo de retorno de ranges::transform_view::begin, e de ranges::transform_view::end quando a view subjacente é uma [`common_range`](<#/doc/ranges/common_range>)
(template de classe membro privado)