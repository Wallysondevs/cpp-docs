# std::ranges::views::adjacent_transform, std::ranges::adjacent_transform_view, std::ranges::views::pairwise_transform

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::forward_range V, std::move_constructible F, std::size_t N >
requires ranges::view<V> && (N > 0) && std::is_object_v<F> &&
std::regular_invocable<F&,
/*REPEAT*/(ranges::range_reference_t<V>, N)...> &&
/*can-reference*/<std::invoke_result_t<F&,
/*REPEAT*/(ranges::range_reference_t<V>, N)...>>
class adjacent_transform_view
: public ranges::view_interface<adjacent_transform_view<V, F, N>>
namespace views {
template< std::size_t N >
constexpr /* unspecified */ adjacent_transform = /* unspecified */;
}
namespace views {
inline constexpr auto pairwise_transform = adjacent_transform<2>;
}
Assinatura da chamada
template< ranges::viewable_range R, class F >
requires /* see below */
constexpr ranges::view auto adjacent_transform<N>( R&& r, F&& fun );
template< class F >
constexpr /*range adaptor closure*/ adjacent_transform<N>( F&& fun );
```

1) `adjacent_transform_view` é um adaptador de range que recebe uma [`view`](<#/doc/ranges/view>) e um objeto invocável `fun`, e produz uma [`view`](<#/doc/ranges/view>) cujo `_i_`-ésimo elemento é um valor que é o resultado da aplicação de `fun` a cada elemento em `[`i`, `i + N`)` da view original. `F` sempre tem [aridade](<https://en.wikipedia.org/wiki/arity> "enwiki:arity") `N`.

Seja `_S_` o tamanho da view original. Então o tamanho da view produzida é:

*   S - N + 1, se S >= N,
*   ​0​ caso contrário, e a view resultante está vazia.

2) O nome views::adjacent_transform&lt;N&gt; denota um [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). Dadas as subexpressões `e` e `f`, e uma expressão constante `N`, a expressão views::adjacent_transform&lt;N&gt;(e, f) é [equivalente em expressão](<#/doc/language/expressions>) a:

*   ((void)e, [views::zip_transform](<#/doc/ranges/zip_transform_view>)(f)), se `N` for igual a ​0​ e decltype((e)) modelar [`forward_range`](<#/doc/ranges/forward_range>) (exceto que as avaliações de `e` e `f` são [sequenciadas indeterminadamente](<#/doc/language/eval_order>)),
*   adjacent_transform_view<[views::all_t](<#/doc/ranges/all_view>)<decltype((e))>, [std::decay_t](<#/doc/types/decay>)<decltype((f))>, N>(e, f) caso contrário.

3) O nome views::pairwise_transform denota um [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>) que se comporta exatamente como views::adjacent_transform<2>. Em particular, a aridade de `F` também é 2 e `fun` é um objeto invocável binário.

`adjacent_transform_view` sempre modela [`forward_range`](<#/doc/ranges/forward_range>), e modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`random_access_range`](<#/doc/ranges/random_access_range>), ou [`sized_range`](<#/doc/ranges/sized_range>), se o tipo de [`view`](<#/doc/ranges/view>) adaptado modelar o conceito correspondente.

### Funções membro

[ (construtor)](<#/doc/ranges/adjacent_transform_view/adjacent_transform_view>) | constrói um `adjacent_transform_view`
(função membro pública)
[ begin](<#/doc/ranges/adjacent_transform_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/adjacent_transform_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ size](<#/doc/ranges/adjacent_transform_view/size>) | retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfaz [`sized_range`](<#/doc/ranges/sized_range>).
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### Guias de dedução

(nenhum)

### Tipos membro

Tipo membro | Definição
---|---
`_InnerView_` (privado) | [ranges::adjacent_view](<#/doc/ranges/adjacent_view>)<V, N>.
(tipo membro apenas para exposição*)
`_inner_iterator_` (privado) |

*   [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;const InnerView&gt;, se `Const` for true. Caso contrário,
*   [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;InnerView&gt;.
(tipo membro apenas para exposição*)

`_inner_sentinel_` (privado) |

*   [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;const InnerView&gt;, se `Const` for true. Caso contrário,
*   [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;InnerView&gt;.
(tipo membro apenas para exposição*)

### Membros de dados

Nome do membro | Definição
---|---
`_fun__` (privado) | /*movable-box*/&lt;F&gt;
(objeto membro apenas para exposição*)
`_inner__` (privado) | [ranges::adjacent_view](<#/doc/ranges/adjacent_view>)<V,N>
(objeto membro apenas para exposição*)

### Classes aninhadas

[_iterator_](<#/doc/ranges/adjacent_transform_view/iterator>) | o tipo do iterator
(modelo de classe membro apenas para exposição*)
[_sentinel_](<#/doc/ranges/adjacent_transform_view/sentinel>) | o tipo do sentinel usado quando `adjacent_transform_view` não é um [`common_range`](<#/doc/ranges/common_range>)
(modelo de classe membro apenas para exposição*)

### Notas

views::adjacent_transform aceita apenas ranges forward mesmo quando `N` é `0`.

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_ranges_zip`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | [ranges::zip_view](<#/doc/ranges/zip_view>),
[ranges::zip_transform_view](<#/doc/ranges/zip_transform_view>),
[ranges::adjacent_view](<#/doc/ranges/adjacent_view>),
`ranges::adjacent_transform_view`

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        constexpr static std::array data{1, 2, 3, 4, 5, 6};
        constexpr int window{3};
    
        auto Fun =  { return (... + ints); };
        // Alternatively, the Fun could be any ternary (if window == 3) callable, e.g.:
        // auto Fun =  { return x + y + z; };
    
        constexpr auto view = data | std::views::adjacent_transform<window>(Fun);
    
        static_assert(
            view.size() == (data.size() - window + 1)
            && std::array{6, 9, 12, 15}
            == std::array{view[0], view[1], view[2], view[3]}
            && view[0] == Fun(data[0], data[1], data[2])
            && view[1] == Fun(data[1], data[2], data[3])
            && view[2] == Fun(data[2], data[3], data[4])
            && view[3] == Fun(data[3], data[4], data[5])
        );
    
        for (int x : view)
            std::cout << x << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    6 9 12 15
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 4098](<https://cplusplus.github.io/LWG/issue4098>) | C++23 | views::adjacent_transform<0> costumava aceitar ranges apenas de entrada | foi rejeitado

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

*   26.7.27 Adjacent transform view [range.adjacent.transform]

### Ver também

[ ranges::adjacent_viewviews::adjacent](<#/doc/ranges/adjacent_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) consistindo de tuplas de referências a elementos adjacentes da view adaptada
(modelo de classe) (objeto adaptador de range)
[ ranges::transform_viewviews::transform](<#/doc/ranges/transform_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) de uma sequência que aplica uma função de transformação a cada elemento
(modelo de classe) (objeto adaptador de range)
[ ranges::zip_transform_viewviews::zip_transform](<#/doc/ranges/zip_transform_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) consistindo de resultados da aplicação de uma função de transformação a elementos correspondentes das views adaptadas
(modelo de classe) (objeto de ponto de customização)
[ ranges::transform](<#/doc/algorithm/ranges/transform>)(C++20) | aplica uma função a um range de elementos
(objeto de função de algoritmo)