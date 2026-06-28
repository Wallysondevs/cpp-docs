# std::ranges::views::adjacent, std::ranges::adjacent_view, std::ranges::views::pairwise

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::forward_range V, std::size_t N >
requires ranges::view<V> && (N > 0)
class adjacent_view
: public ranges::view_interface<adjacent_view<V, N>>
namespace views {
template< std::size_t N >
constexpr /* unspecified */ adjacent = /* unspecified */ ;
}
namespace views {
inline constexpr auto pairwise = adjacent<2>;
}
Assinatura da chamada
template< ranges::viewable_range R >
requires /* veja abaixo */
constexpr ranges::view auto adjacent<N>( R&& r );
```

1) `adjacent_view` é um adaptador de range que recebe uma [`view`](<#/doc/ranges/view>), e produz uma [`view`](<#/doc/ranges/view>) cujo `_i_`-ésimo elemento (uma "janela") é uma [std::tuple](<#/doc/utility/tuple>) que contém `_N_` referências aos elementos da view original, do `_i_`-ésimo até o `i + N - 1`-ésimo, inclusive.

Seja `_S_` o tamanho da view original. Então o tamanho da view produzida é:

  * S - N + 1, se `S >= N`,
  * `0` caso contrário, e a view resultante é vazia.

2) O nome views::adjacent&lt;N&gt; denota um [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). Dada uma subexpressão e e uma expressão constante N, a expressão views::adjacent&lt;N&gt;(e) é [expression-equivalent](<#/doc/language/expressions>) a

  * ((void)e, auto([views::empty](<#/doc/ranges/empty_view>)<tuple<>>)) se N for igual a `0` e decltype((e)) modelar [`forward_range`](<#/doc/ranges/forward_range>),
  * adjacent_view<[views::all_t](<#/doc/ranges/all_view>)<decltype((e))>, N>(e) caso contrário.

3) O nome views::pairwise denota um [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>) que se comporta exatamente como views::adjacent<2>.

`adjacent_view` sempre modela [`forward_range`](<#/doc/ranges/forward_range>), e modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`random_access_range`](<#/doc/ranges/random_access_range>), ou [`sized_range`](<#/doc/ranges/sized_range>) se o tipo da [`view`](<#/doc/ranges/view>) adaptada modelar o concept correspondente.

### Membros de dados

Nome do membro | Definição
---|---
`_base__` (privado) | a [`view`](<#/doc/ranges/view>) subjacente do tipo `V`.
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/adjacent_view/adjacent_view>) | constrói uma `adjacent_view`
(função membro pública)
[ begin](<#/doc/ranges/adjacent_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/adjacent_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ size](<#/doc/ranges/adjacent_view/size>) | retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfizer [`sized_range`](<#/doc/ranges/sized_range>).
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se satisfizer [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) for aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se satisfizer [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se satisfizer [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se satisfizer [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### Guias de dedução

(nenhum)

### Classes aninhadas

[_iterator_](<#/doc/ranges/adjacent_view/iterator>) | o tipo do iterator
(template de classe membro apenas para exposição*)
[_sentinel_](<#/doc/ranges/adjacent_view/sentinel>) | o tipo do sentinel usado quando `adjacent_view` não é um [`common_range`](<#/doc/ranges/common_range>)
(template de classe membro apenas para exposição*)

### Helper templates

```cpp
template< class V, size_t N >
constexpr bool ranges::enable_borrowed_range<adjacent_view<V, N>> =
ranges::enable_borrowed_range<V>;  // (desde C++23)
```

Esta especialização de [`ranges::enable_borrowed_range`](<#/doc/ranges/borrowed_range>) faz com que `adjacent_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando a view subjacente o satisfaz.

### Notas

views::adjacent aceita apenas forward ranges mesmo quando `N` é `0`.

Existem similaridades entre ranges::adjacent_view e ranges::slide_view:

  * Ambos criam uma "janela deslizante" de tamanho `_N_`.
  * Ambos têm o mesmo tamanho `_S - N + 1_`, onde `_S_` é o tamanho de uma [`view`](<#/doc/ranges/view>) adaptada tal que `_S >= N > 0_`.

A tabela a seguir mostra as diferenças entre esses adaptadores:

Adaptador de view | `value_type` | O tamanho da janela `_N_`
---|---|---
ranges::adjacent_view | [std::tuple](<#/doc/utility/tuple>) | Um parâmetro de template
[ranges::slide_view](<#/doc/ranges/slide_view>) | [ranges::range](<#/doc/ranges/range>) | Um argumento em tempo de execução
Macro de teste de recurso | Valor | Std | Recurso
[`__cpp_lib_ranges_zip`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | [ranges::zip_view](<#/doc/ranges/zip_view>),
[ranges::zip_transform_view](<#/doc/ranges/zip_transform_view>),
`ranges::adjacent_view`,
[ranges::adjacent_transform_view](<#/doc/ranges/adjacent_transform_view>)

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <format>
    #include <iostream>
    #include <ranges>
    #include <tuple>
    
    int main()
    {
        constexpr std::array v{1, 2, 3, 4, 5, 6};
        std::cout << "v = [1 2 3 4 5 6]\n";
    
        for (int i{}; std::tuple t : v | std::views::adjacent<3>)
        {
            auto [t0, t1, t2] = t;
            std::cout << std::format("e = {:<{}}[{} {} {}]\n", "", 2 * i++, t0, t1, t2);
        }
    }
```

Saída:
```
    v = [1 2 3 4 5 6]
    e = [1 2 3]
    e =   [2 3 4]
    e =     [3 4 5]
    e =       [4 5 6]
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 4098](<https://cplusplus.github.io/LWG/issue4098>) | C++23 | views::adjacent<0> costumava aceitar apenas input-only ranges | tornou-se rejeitado

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 26.7.25 Adjacent view [range.adjacent]

### Veja também

[ ranges::adjacent_transform_viewviews::adjacent_transform](<#/doc/ranges/adjacent_transform_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) consistindo dos resultados da aplicação de uma função de transformação a elementos adjacentes da view adaptada
(template de classe) (objeto adaptador de range)
[ ranges::slide_viewviews::slide](<#/doc/ranges/slide_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) cujo M-ésimo elemento é uma [`view`](<#/doc/ranges/view>) sobre os elementos do M-ésimo ao (M + N - 1)-ésimo de outra [`view`](<#/doc/ranges/view>)
(template de classe) (objeto adaptador de range)
[ ranges::chunk_viewviews::chunk](<#/doc/ranges/chunk_view>)(C++23) | um range de [`view`s](<#/doc/ranges/view>) que são blocos sucessivos não sobrepostos de tamanho N dos elementos de outra [`view`](<#/doc/ranges/view>)
(template de classe) (objeto adaptador de range)
[ ranges::stride_viewviews::stride](<#/doc/ranges/stride_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) consistindo de elementos de outra [`view`](<#/doc/ranges/view>), avançando sobre N elementos por vez
(template de classe) (objeto adaptador de range)