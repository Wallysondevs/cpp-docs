# std::ranges::views::stride, std::ranges::stride_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::input_range V >
requires ranges::view<V>
class stride_view
: public ranges::view_interface<stride_view<V>>
namespace views {
inline constexpr /* unspecified */ stride = /* unspecified */;
}
Assinatura da chamada
template< ranges::viewable_range R >
constexpr ranges::view auto stride( R&& r, ranges::range_difference_t<R> n );
template< class DifferenceType >
constexpr /*range adaptor closure*/ stride( DifferenceType&& n );
Modelos auxiliares
```

  
1) `stride_view` é um adaptador de range que recebe um [`view`](<#/doc/ranges/view>) e um número `_n_` e produz um view, que consiste em elementos do view original avançando `_n_` elementos por vez. Isso significa que cada `_m_`-ésimo elemento do view produzido é o `_(n * i)_`-ésimo elemento do view original, para algum índice não negativo `_i_`. Os elementos do view original, cujo "índice" não é um múltiplo de `_n_`, não estão presentes no view produzido.

Seja `_S_` o tamanho do view original. Então o tamanho do view produzido é:

  * (S / n) + (S % n ? 1 : 0), se S >= n; caso contrário,
  * 1, se S > 0; caso contrário,
  * ​0​, e o view resultante é vazio.

2) O nome views::stride denota um [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). Dadas as subexpressões e e n, a expressão views::stride(e, n) é [expression-equivalent](<#/doc/language/expressions>) a stride_view(e, n).

O `n` deve ser maior que ​0​, caso contrário o comportamento é indefinido.

`stride_view` sempre modela [`input_range`](<#/doc/ranges/input_range>), e modela [`forward_range`](<#/doc/ranges/forward_range>), [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`random_access_range`](<#/doc/ranges/random_access_range>), e/ou [`sized_range`](<#/doc/ranges/sized_range>), se o tipo [`view`](<#/doc/ranges/view>) adaptado V modelar o concept correspondente. stride_view&lt;V&gt; modela [`common_range`](<#/doc/ranges/common_range>) sempre que o view subjacente V o faz.

### Membros de dados

Objeto membro | Definição
---|---
`_base__` (privado) | O [`view`](<#/doc/ranges/view>) subjacente do tipo `V`.
(objeto membro apenas para exposição*)
`_stride__` (privado) | O objeto de tamanho (o "stride") do tipo [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;V&gt;.
(objeto membro apenas para exposição*)
  
### Funções membro

[ (construtor)](<#/doc/ranges/stride_view/stride_view>) | constrói um `stride_view`
(função membro pública)
[ stride](<#/doc/ranges/stride_view/stride>)(C++23) | retorna o valor de stride armazenado
(função membro pública)
[ base](<#/doc/ranges/stride_view/base>) | retorna uma cópia do view subjacente (adaptado)
(função membro pública)
[ begin](<#/doc/ranges/stride_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/stride_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ size](<#/doc/ranges/stride_view/size>) | retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfaz [`sized_range`](<#/doc/ranges/sized_range>).
(função membro pública)
  
##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)
  
[ empty](<#/doc/ranges/view_interface/empty>) | retorna se o view derivado está vazio. Fornecido se satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se o view derivado não está vazio. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ele.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento no view derivado. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento no view derivado. Fornecido se satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento no view derivado. Fornecido se satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)
  
### [Guias de dedução](<#/doc/ranges/stride_view/deduction_guides>)

### Classes aninhadas

[_iterator_](<#/doc/ranges/stride_view/iterator>)(C++23) | o tipo do iterator
(modelo de classe membro apenas para exposição*)
  
### Modelos auxiliares

```cpp
template< class V >
constexpr bool ranges::enable_borrowed_range<stride_view<V>> =
ranges::enable_borrowed_range<V>;  // (desde C++23)
```

  
Esta especialização de [`ranges::enable_borrowed_range`](<#/doc/ranges/borrowed_range>) faz com que `stride_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando o view subjacente o satisfaz.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_ranges_stride`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | `std::ranges::stride_view`
  
### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    using namespace std::literals;
     
    void print(std::ranges::viewable_range auto&& v, std::string_view separator = " ")
    {
        for (auto const& x : v)
            std::cout << x << separator;
        std::cout << '\n';
    }
     
    int main()
    {
        print(std::views::iota(1, 13) | std::views::stride(3));
        print(std::views::iota(1, 13) | std::views::stride(3) | std::views::reverse);
        print(std::views::iota(1, 13) | std::views::reverse | std::views::stride(3));
     
        print("0x0!133713337*x//42/A$@"sv | std::views::stride(0B11) |
              std::views::transform( -> char { return 0100 | O; }),
              "");
    }
```

Saída:
```
    1 4 7 10
    10 7 4 1
    12 9 6 3
    password
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 26.7.31 Stride view [range.stride] 

### Veja também

[ ranges::slide_viewviews::slide](<#/doc/ranges/slide_view>)(C++23) | um [`view`](<#/doc/ranges/view>) cujo M-ésimo elemento é um [`view`](<#/doc/ranges/view>) sobre os elementos do M-ésimo ao (M + N - 1)-ésimo de outro [`view`](<#/doc/ranges/view>)
(modelo de classe) (objeto adaptador de range)
[ ranges::chunk_viewviews::chunk](<#/doc/ranges/chunk_view>)(C++23) | um range de [`view`s](<#/doc/ranges/view>) que são blocos sucessivos não sobrepostos de tamanho `N` dos elementos de outro [`view`](<#/doc/ranges/view>)
(modelo de classe) (objeto adaptador de range)
[ ranges::adjacent_viewviews::adjacent](<#/doc/ranges/adjacent_view>)(C++23) | um [`view`](<#/doc/ranges/view>) consistindo de tuplas de referências a elementos adjacentes do view adaptado
(modelo de classe) (objeto adaptador de range)
[ ranges::filter_viewviews::filter](<#/doc/ranges/filter_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que consiste nos elementos de um [`range`](<#/doc/ranges/range>) que satisfaz um predicado
(modelo de classe) (objeto adaptador de range)