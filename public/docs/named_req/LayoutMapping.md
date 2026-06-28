# Requisitos nomeados C++: LayoutMapping (desde C++23)

**LayoutMapping** controla o mapeamento de um índice multidimensional para um deslocamento unidimensional para o manipulador de dados em [std::mdspan](<#/doc/container/mdspan>).

### Requisitos

Um tipo `M` satisfaz LayoutMapping se ele modela [`copyable`](<#/doc/concepts/copyable>) e [`equality_comparable`](<#/doc/concepts/equality_comparable>), e o seguinte é verdadeiro:

*   [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;M&gt;
*   [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;M&gt;
*   [std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;M&gt;

E, dados os seguintes tipos e valores, as expressões mostradas na tabela abaixo são válidas e possuem a semântica indicada:

#### Legenda

Tipo | Definição
---|---
`M` | uma classe de mapeamento de layout
Valor | Definição
m | um valor do tipo (possivelmente qualificado com const) `M`
i, j | pacotes de inteiros (possivelmente qualificados com const) que são índices multidimensionais em m.extents()
r | um índice de rank (possivelmente qualificado com const) de typename M​::​extents_type
d_r | um pacote de inteiros (possivelmente qualificados com const) para o qual sizeof...(d_r) == M​::​extents_type​::​rank() é verdadeiro, o elemento no índice de rank r é igual a 1, e todos os outros elementos são iguais a ​0​

#### Tipos de membros

Nome | Tipo | Requisitos
---|---|---
`M::extents_type` | Especialização do modelo de classe [std::extents](<#/doc/container/mdspan/extents>) |
`M::index_type` | typename M::extents_type::index_type |
`M::rank_type` | typename M::extents_type::rank_type |
`M::layout_type` | Política de mapeamento de layout `MP` onde typename MP::template mapping&lt;E&gt; é `M` para algum tipo de extents `E` | [LayoutMappingPolicy](<#/doc/named_req/LayoutMappingPolicy>) para a qual `M` é o tipo de mapeamento de `MP`

#### Funções membro e operadores

Expressão | Tipo de retorno | Semântica
---|---|---
m.extents() | const typename M​::​extents_type& | Retorna referência constante para o espaço de índice multidimensional associado
m(i...) | typename M​::​index_type |
  * Retorna um inteiro não negativo o tal que o < [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;typename M​::​index_type&gt;​::​max() e o <= [std::numeric_limits](<#/doc/types/numeric_limits>)<[std::size_t](<#/doc/types/size_t>)>​::​max() são ambos verdadeiros.
  * Tal expressão é equivalente a m(static_cast&lt;typename M::index_type&gt;(i)...).

m.required_span_size() | typename M​::​index_type |
  * Retorna 1 mais o valor máximo de m(i...) para todo i se o tamanho do espaço de índice multidimensional m.extents() não for 0.
  * Caso contrário, retorna ​0​.

m.is_unique() | bool | Retorna true apenas se para todo i e j onde (i != j || ...) é verdadeiro, m(i...) != m(j...) é verdadeiro. [nota 1](<#/doc/named_req/LayoutMapping>)
---|---|---
m.is_exhaustive() | bool | Retorna true apenas se para todo k no intervalo `[`​0​`, `m.required_span_size()`)`, existe um i tal que m(i...) é igual a k. [nota 2](<#/doc/named_req/LayoutMapping>)
m.is_strided() | bool | Retorna true apenas se para todo índice de rank r de m.extents(), existe um inteiro s_r tal que, para todo i onde (i + d_r) é um índice multidimensional em m.extents(), m((i + d_r)...) - m(i...) é igual a s_r. [nota 3](<#/doc/named_req/LayoutMapping>)
m.stride(r) | typename M​::​index_type |
  * A pré-condição é que m.is_strided() seja true.
  * Retorna um stride s_r no índice de rank r conforme definido em m.is_strided() acima.

M::is_always_unique() | bool |
  * Retorna true apenas se m.is_unique() for true para todos os objetos `m` possíveis do tipo `M`. [nota 4](<#/doc/named_req/LayoutMapping>)
  * O valor de retorno é sempre uma expressão constante.

M::is_always_exhaustive() | bool |
  * Retorna true apenas se m.is_exhaustive() for true para todos os objetos `m` possíveis do tipo `M`. [nota 5](<#/doc/named_req/LayoutMapping>)
  * O valor de retorno é sempre uma expressão constante.

M::is_always_strided() | bool |
  * Retorna true apenas se m.is_strided() for true para todos os objetos `m` possíveis do tipo `M`. [nota 6](<#/doc/named_req/LayoutMapping>)
  * O valor de retorno é sempre uma expressão constante.

1.  [↑](<#/doc/named_req/LayoutMapping>) Um mapeamento pode retornar false mesmo que a condição seja satisfeita. Para certos layouts, pode não ser viável determinar eficientemente se o layout é único.
2.  [↑](<#/doc/named_req/LayoutMapping>) O mesmo que acima, mas no caso de layouts exaustivos.
3.  [↑](<#/doc/named_req/LayoutMapping>) O mesmo que acima, mas no caso de layouts com stride.
4.  [↑](<#/doc/named_req/LayoutMapping>) Um mapeamento pode retornar false mesmo que a condição seja satisfeita. Para certos mapeamentos de layout, pode não ser viável determinar se cada instância é única.
5.  [↑](<#/doc/named_req/LayoutMapping>) O mesmo que acima, mas no caso de instâncias exaustivas.
6.  [↑](<#/doc/named_req/LayoutMapping>) O mesmo que acima, mas no caso de instâncias com stride.

### Concept

Para as restrições usadas em std::layout_stride::mapping, o seguinte concept apenas para exposição é definido.

```cpp
template< class M >
concept /*layout-mapping-alike*/ = requires
{
requires /*is-extents*/<typename M::extents_type>;
{ M::is_always_strided() } -> std::same_as<bool>;
{ M::is_always_exhaustive() } -> std::same_as<bool>;
{ M::is_always_unique() } -> std::same_as<bool>;
std::bool_constant<M::is_always_strided()>::value;
std::bool_constant<M::is_always_exhaustive()>::value;
std::bool_constant<M::is_always_unique()>::value;
};
```
Define as restrições mínimas de usabilidade do requisito LayoutMapping. Este concept verifica que as funções de trait de mapeamento de predicado acima existem, são expressões constantes e possuem um tipo de retorno bool.

/*is-extents*/&lt;E&gt; é verdadeiro se e somente se `E` é uma especialização de std::extents.

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão satisfazem os requisitos de LayoutMapping:

[ mapping](<#/doc/container/mdspan/layout_left/mapping>) | um mapeamento de layout de layout_left
(modelo de classe membro público de `std::layout_left`)
[ mapping](<#/doc/container/mdspan/layout_right/mapping>) | um mapeamento de layout de layout_right
(modelo de classe membro público de `std::layout_right`)
[ mapping](<#/doc/container/mdspan/layout_stride/mapping>) | um mapeamento de layout de layout_stride
(modelo de classe membro público de `std::layout_stride`)
[ mapping](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/layout_left_padded/mapping&action=edit&redlink=1> "cpp/container/mdspan/layout left padded/mapping \(page does not exist\)") | um mapeamento de layout de layout_left_padded
(modelo de classe membro público de `std::layout_left_padded<PaddingValue>`)
[ mapping](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/layout_right_padded/mapping&action=edit&redlink=1> "cpp/container/mdspan/layout right padded/mapping \(page does not exist\)") | um mapeamento de layout de layout_right_padded
(modelo de classe membro público de `std::layout_right_padded<PaddingValue>`)

### Ver também

*   [LayoutMappingPolicy](<#/doc/named_req/LayoutMappingPolicy>)

\*\[Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra aquela revisão
\*\[\_(as is)\_]: A::pointer