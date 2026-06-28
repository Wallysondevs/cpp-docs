# Requisitos nomeados C++: AccessorPolicy (desde C++23)

**AccessorPolicy** define como os elementos são acessados a partir de um dado `data handle` para tais elementos e um índice. É usado como uma política em [std::mdspan](<#/doc/container/mdspan>) para especificar o acesso a uma referência de um elemento usando um índice 1D subjacente.

### Requisitos

Um tipo `A` satisfaz AccessorPolicy se ele modela [`copyable`](<#/doc/concepts/copyable>), e o seguinte é verdadeiro:

*   [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;A&gt;
*   [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;A&gt;
*   [std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;A&gt;

E, dados os seguintes tipos e valores, as expressões mostradas na tabela abaixo são válidas e possuem a semântica indicada:

#### Legenda

Tipo | Definição
---|---
`A` | um tipo de política de acesso
`OP` | um tipo de política de offset
Valor | Definição
a | um valor do tipo (possivelmente qualificado com const) `A`
p | um valor do tipo (possivelmente qualificado com const) `A::data_handle_type`
i, j, n | valores do tipo [std::size_t](<#/doc/types/size_t>)

#### Tipos de membro

Nome | Tipo | Requisitos
---|---|---
`A::element_type` | _(não especificado)_ |
*   Um tipo de objeto completo que não é um tipo de classe abstrata

`A::data_handle_type` | _(não especificado)_ mas o tipo não precisa ser element_type* |
*   Modela [`copyable`](<#/doc/concepts/copyable>)
*   As seguintes condições são todas verdadeiras:
    *   [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)<typename A::data_handle_type>
    *   [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)<typename A::data_handle_type>
    *   [std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)<typename A::data_handle_type>

`A::reference` | _(não especificado)_ mas o tipo não precisa ser element_type& |
*   [std::common_reference_with](<#/doc/concepts/common_reference_with>)&lt;typename A::reference&&, typename A::element_type&&gt; é verdadeiro

`A::offset_policy` | `OP` |
*   Satisfaz os requisitos de AccessorPolicy
*   [std::constructible_from](<#/doc/concepts/constructible_from>)<OP, const A&> é verdadeiro
*   typename OP​::​element_type e typename A​::​element_type são do mesmo tipo

#### Funções de membro

Expressão | Tipo de retorno | Semântica
---|---|---
a.access(p, i) | typename A::reference |
*   A expressão é [equality-preserving](<#/doc/concepts>).

a.offset(p, i) | typename A::offset_policy::data_handle_type |
*   Um valor q tal que para b sendo A::offset_policy(a), e qualquer inteiro n para o qual `[`​0​`, `n`)` é um `range` acessível[nota 1](<#/doc/named_req/AccessorPolicy>) de p e a.
    *   `[`​0​`, `n - i`)` é um `range` acessível de q e b; e
    *   b.access(q, j) fornece acesso ao mesmo elemento que a.access(p, i + j), para cada j no `range` `[`​0​`, `n - i`)`.
*   A expressão é [equality-preserving](<#/doc/concepts>).

1.  [↑](<#/doc/named_req/AccessorPolicy>) Um `range` de índices `[`​0​`, `N`)` é um _`range` acessível_ de um dado `data handle` e um `accessor` se, para cada índice no `range`, a função de membro `access` produz uma referência válida para um elemento.

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão satisfazem os requisitos de AccessorPolicy:

[ default_accessor](<#/doc/container/mdspan/default_accessor>)(C++23) | um tipo para acesso indexado a elementos de `mdspan`
(modelo de classe)
[ aligned_accessor](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/aligned_accessor&action=edit&redlink=1> "cpp/container/mdspan/aligned accessor \(page does not exist\)")(C++26) | um tipo para acesso alinhado a elementos de `mdspan`
(modelo de classe)
Definido no `namespace` `std::linalg`
[ scaled_accessor](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/scaled_accessor&action=edit&redlink=1> "cpp/numeric/linalg/scaled accessor \(page does not exist\)")(C++26) | política de acesso de std::mdspan cuja referência representa o produto de um fator de escala fixo e a referência de seu `accessor` std::mdspan aninhado
(modelo de classe)
[ conjugated_accessor](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/conjugated_accessor&action=edit&redlink=1> "cpp/container/mdspan/conjugated accessor \(page does not exist\)")(C++26) | política de acesso de std::mdspan cuja referência representa o conjugado complexo da referência de seu `accessor` std::mdspan aninhado
(modelo de classe)