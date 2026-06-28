# std::ranges::views::lazy_split, std::ranges::lazy_split_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::input_range V, ranges::forward_range Pattern >
requires ranges::view<V> &&
ranges::view<Pattern> &&
std::indirectly_comparable<ranges::iterator_t<V>,
ranges::iterator_t<Pattern>,
ranges::equal_to> &&
(ranges::forward_range<V>
class lazy_split_view
: public ranges::view_interface<lazy_split_view<V, Pattern>>
namespace views {
inline constexpr /* unspecified */ lazy_split = /* unspecified */;
}
Assinatura da chamada
template< ranges::viewable_range R, class Pattern >
requires /* see below */
constexpr ranges::view auto lazy_split( R&& r, Pattern&& pattern );
template< class Pattern >
constexpr /* range adaptor closure */ lazy_split( Pattern&& pattern );
Concepts auxiliares
template< class R >
concept /*tiny-range*/ =
ranges::sized_range<R> &&
requires { /* is-statically-constexpr-sized */<R>; } &&
(std::remove_reference_t<R>::size() <= 1);
```

  
1) `lazy_split_view` recebe uma [`view`](<#/doc/ranges/view>) e um delimitador, e divide a [`view`](<#/doc/ranges/view>) em sub-ranges no delimitador. 

Dois cenários principais são suportados: 

  * A view é um [`input_range`](<#/doc/ranges/input_range>), o delimitador é um único elemento (envolvido em uma [`single_view`](<#/doc/ranges/single_view>)). 
  * A view é um [`forward_range`](<#/doc/ranges/forward_range>), o delimitador é uma [`view`](<#/doc/ranges/view>) de elementos.

2) Um [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). A expressão views::lazy_split(e, f) é [expressão-equivalente](<#/doc/language/expressions>) a lazy_split_view(e, f).

3) O concept apenas para exposição /*tiny-range*/&lt;Pattern&gt; é satisfeito se `Pattern` satisfaz [`sized_range`](<#/doc/ranges/sized_range>), Pattern::size() é uma expressão constante e adequada como um argumento não-tipo de template, e o valor de Pattern::size() é menor ou igual a `1`. Notavelmente, [`empty_view`](<#/doc/ranges/empty_view>) e [`single_view`](<#/doc/ranges/single_view>) satisfazem este concept.

`lazy_split_view` modela os concepts [`forward_range`](<#/doc/ranges/forward_range>) e [`input_range`](<#/doc/ranges/input_range>) quando a [`view`](<#/doc/ranges/view>) subjacente `V` modela os respectivos concepts, e modela [`common_range`](<#/doc/ranges/common_range>) quando `V` modela ambos [`forward_range`](<#/doc/ranges/forward_range>) e [`common_range`](<#/doc/ranges/common_range>). 

O inner range ([ranges::range_reference_t](<#/doc/ranges/range_reference_t>)<lazy_split_view>) modela os concepts [`forward_range`](<#/doc/ranges/forward_range>) e [`input_range`](<#/doc/ranges/input_range>) quando a [`view`](<#/doc/ranges/view>) subjacente `V` modela os respectivos concepts. Ele não modela [`common_range`](<#/doc/ranges/common_range>), e não pode ser usado com algoritmos que esperam um [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) ou superior. 

Ao contrário de [`split_view`](<#/doc/ranges/split_view>), `lazy_split_view` não mantém a continuidade do sub-range. 

### Membros de dados

Membro  |  Descrição   
---|---
`V` `_base__` (privado) |  a [`view`](<#/doc/ranges/view>) subjacente  
(objeto membro apenas para exposição*)  
`Pattern` `_pattern__` (privado) |  o padrão que é usado como delimitador para dividir a [`view`](<#/doc/ranges/view>) subjacente  
(objeto membro apenas para exposição*)  
[`_non-propagating-cache_`](<#/doc/ranges/non-propagating-cache>) <[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;> `_current__` (privado)   
(presente apenas se `V` não satisfaz [`forward_range`](<#/doc/ranges/forward_range>)) |  um objeto que armazena em cache o resultado das chamadas para [`begin()`](<#/doc/ranges/lazy_split_view/begin>)  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (construtor)](<#/doc/ranges/lazy_split_view/lazy_split_view>) |  constrói uma `lazy_split_view`   
(função membro pública)  
[ base](<#/doc/ranges/lazy_split_view/base>) |  retorna uma cópia da view subjacente (adaptada)   
(função membro pública)  
[ begin](<#/doc/ranges/lazy_split_view/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ end](<#/doc/ranges/lazy_split_view/end>) |  retorna um iterator ou um sentinel para o fim   
(função membro pública)  
  
#####  Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)  
  
[ empty](<#/doc/ranges/view_interface/empty>) |  retorna se a view derivada está vazia. Fornecido se satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) |  retorna um iterator constante para o início do range.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) |  retorna um sentinel para o iterator constante do range.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) |  retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ela.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ front](<#/doc/ranges/view_interface/front>) |  retorna o primeiro elemento na view derivada. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
  
### Classes aninhadas

[_outer_iterator_](<#/doc/ranges/lazy_split_view/outer_iterator>) |  o tipo de iterator  
(template de classe membro apenas para exposição*)  
[_inner_iterator_](<#/doc/ranges/lazy_split_view/inner_iterator>) |  o tipo de iterator do inner range  
(template de classe membro apenas para exposição*)  
  
### [Deduction guides](<#/doc/ranges/lazy_split_view/deduction_guides>)

### Notas

O nome `lazy_split_view` é introduzido pelo relatório de defeito pós-C++20 [P2210R2](<https://wg21.link/P2210R2>). Ele possui o mesmo mecanismo lazy que o antigo `split_view` antes da mudança. 

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    
    auto print = 
    {
        // `view` is of std::views::lazy_split_view::__outer_iterator::value_type
    
        for (std::cout << "{ "; const auto element : view)
            std::cout << element << ' ';
        std::cout << "} ";
    };
    
    int main()
    {
        constexpr static auto source = {0, 1, 0, 2, 3, 0, 4, 5, 6, 0, 7, 8, 9};
        constexpr int delimiter{0};
        constexpr std::ranges::lazy_split_view outer_view{source, delimiter};
        std::cout << "splits" << std::[ranges::distance(outer_view) << "]:  ";
        for (auto const& inner_view: outer_view)
            print(inner_view);
    
        constexpr std::string_view hello{"Hello C++ 20 !"};
        std::cout << "\n" "substrings: ";
        std::ranges::for_each(hello | std::views::lazy_split(' '), print);
    
        constexpr std::string_view text{"Hello-+-C++-+-20-+-!"};
        constexpr std::string_view delim{"-+-"};
        std::cout << "\n" "substrings: ";
        std::ranges::for_each(text | std::views::lazy_split(delim), print);
    }
```

Saída: 
```
    splits[5]:  { } { 1 } { 2 3 } { 4 5 6 } { 7 8 9 }
    substrings: { H e l l o } { C + + } { 2 0 } { ! }
    substrings: { H e l l o } { C + + } { 2 0 } { ! }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2210R2](<https://wg21.link/P2210R2>) | C++20  | o antigo `split_view` era muito lazy para ser facilmente usado  | move sua funcionalidade para `lazy_split_view`  
  
### Veja também

[ ranges::split_viewviews::split](<#/doc/ranges/split_view>)(C++20) |  uma [`view`](<#/doc/ranges/view>) sobre os sub-ranges obtidos ao dividir outra [`view`](<#/doc/ranges/view>) usando um delimitador  
(template de classe) (objeto adaptador de range)  
[ ranges::join_viewviews::join](<#/doc/ranges/join_view>)(C++20) |  uma [`view`](<#/doc/ranges/view>) consistindo na sequência obtida ao achatar uma [`view`](<#/doc/ranges/view>) de [`range`s](<#/doc/ranges/range>)  
(template de classe) (objeto adaptador de range)