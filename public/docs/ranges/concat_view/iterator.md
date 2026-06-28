# std::ranges::concat_view&lt;Views...&gt;::iterator

```cpp
template< bool Const >
class /*iterator*/  // (1) (apenas para exposição*)
Conceitos auxiliares
template< bool Const, class... Rs >
concept /*concat-is-random-access*/ = /* see description */;  // (2) (apenas para exposição*)
template< bool Const, class... Rs >
concept /*concat-is-bidirectional*/ = /* see description */;  // (3) (apenas para exposição*)
```

  
1) [ranges::concat_view](<#/doc/ranges/concat_view>)<Views...>::`_iterator_` é o tipo dos iterators retornados por [`begin()`](<#/doc/ranges/concat_view/begin>) e [`end()`](<#/doc/ranges/concat_view/end>) de [ranges::concat_view](<#/doc/ranges/concat_view>)<Views...>.

2) Seja `Fs` o pack que consiste em todos os elementos de `Rs`, exceto o último elemento. Equivalente a

template&lt;bool Const, class... Rs&gt;  
concept` ` _concat-is-random-access_` `= // apenas para exposição  
` ` _[all-random-access](<#/doc/ranges>)_` ﻿<Const, Rs...> &&  
` `([ranges::common_range](<#/doc/ranges/common_range>)<`_[maybe-const](<#/doc/ranges>)_` ﻿<Const, Fs>> && ...);

.

3) Seja `Fs` o pack que consiste em todos os elementos de `Rs`, exceto o último elemento. Equivalente a

template&lt;bool Const, class... Rs&gt;  
concept` ` _concat-is-bidirectional_` `= // apenas para exposição  
` ` _[all-bidirectional](<#/doc/ranges>)_` ﻿<Const, Rs...> &&  
` `([ranges::common_range](<#/doc/ranges/common_range>)<`_[maybe-const](<#/doc/ranges>)_` ﻿<Const, Fs>> && ...);

.

### Parâmetros de template

Const  |  \-  |  se o iterator é um iterator constante   
  
### Tipos aninhados

#####  Tipos apenas para exposição   
  
---  
Tipo  |  Definição   
---|---
`_base-iter_` |  [std::variant](<#/doc/utility/variant>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)<`_[maybe-const](<#/doc/ranges>)_` ﻿<Const, Views>>...>  
(tipo membro apenas para exposição*)  
  
#####  Tipos de propriedade do iterator   
  
Tipo  |  Definição   
---|---
`iterator_concept` |  uma [tag de iterator](<#/doc/iterator/iterator_tags>), [veja abaixo](<#/doc/ranges/concat_view/iterator>)  
`iterator_category`  
(presente condicionalmente) |  uma tag de iterator, [veja abaixo](<#/doc/ranges/concat_view/iterator>)  
---|---
`value_type` |  `_[concat-value-t](<#/doc/ranges/concat_view>)_` ﻿<`_[maybe-const](<#/doc/ranges>)_` ﻿<Const, Views>...>  
`difference_type` |  [std::common_type_t](<#/doc/types/common_type>)<[ranges::range_difference_t](<#/doc/ranges/range_size_t>)<`_[maybe-const](<#/doc/ranges>)_` ﻿<Const, Views>>...>  
  
#### Determinando o concept do iterator

`iterator_concept` é definido da seguinte forma: 

  * Se `_[concat-is-random-access](<#/doc/ranges/concat_view/iterator>)_` ﻿<Const, Views...> for modelado, `iterator_concept` denota [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>). 
  * Caso contrário, se `_[concat-is-bidirectional](<#/doc/ranges/concat_view/iterator>)_` ﻿<Const, Views...> for modelado, `iterator_concept` denota [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>). 
  * Caso contrário, se `_[all-forward](<#/doc/ranges>)_` ﻿<Const, Views...> for modelado, `iterator_concept` denota [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>). 
  * Caso contrário, `iterator_concept` denota [std::input_iterator_tag](<#/doc/iterator/iterator_tags>). 

#### Determinando a categoria do iterator

`iterator_category` é definido se e somente se `_[all-forward](<#/doc/ranges>)_` ﻿<Const, Views...> for modelado. Neste caso, é definido da seguinte forma: 

  * Se [std::is_reference_v](<#/doc/types/is_reference>)<`_[concat-reference-t](<#/doc/ranges/concat_view>)_` ﻿<`_[maybe-const](<#/doc/ranges>)_` ﻿<Const, Views>...>> for falso, `iterator_category` denota [std::input_iterator_tag](<#/doc/iterator/iterator_tags>). 
  * Caso contrário, seja `Cs` o pack de tipos [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)<`_[maybe-const](<#/doc/ranges>)_` ﻿<Const, Views>>>::iterator_category...: 
    * Se ([std::derived_from](<#/doc/concepts/derived_from>)<Cs, [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>)> && ...) &&  
` ` _[concat-is-random-access](<#/doc/ranges/concat_view/iterator>)_` ﻿<Const, Views...> for verdadeiro, `iterator_category` denota [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>). 
    * Caso contrário, se ([std::derived_from](<#/doc/concepts/derived_from>)<Cs, [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>)> && ...) &&  
` ` _[concat-is-bidirectional](<#/doc/ranges/concat_view/iterator>)_` ﻿<Const, Views...> for verdadeiro, `iterator_category` denota [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>). 
    * Caso contrário, se ([std::derived_from](<#/doc/concepts/derived_from>)<Cs, [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>)> && ...) for verdadeiro, `iterator_category` denota [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>). 
    * Caso contrário, `iterator_category` denota [std::input_iterator_tag](<#/doc/iterator/iterator_tags>). 

### Membros de dados

Membro  |  Definição   
---|---
`_[maybe-const](<#/doc/ranges>)_` ﻿<Const, [ranges::concat_view](<#/doc/ranges/concat_view>)>* `_parent__` |  um ponteiro para o `parent` (pai) [`concat_view`](<#/doc/ranges/concat_view>)  
(objeto membro apenas para exposição*)  
`_base-iter_` `_it__` |  um iterator para a view atual  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (constructor)](<#/doc/ranges/concat_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ operator*](<#/doc/ranges/concat_view/iterator/operator_star_>) |  acessa o elemento   
(função membro pública)  
[ operator[]](<#/doc/ranges/concat_view/iterator/operator_at>) |  acessa um elemento por índice   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/concat_view/iterator/operator_arith>) |  avança ou decrementa o iterator subjacente   
(função membro pública)  
  
#####  Templates de função apenas para exposição   
  
[__satisfy__](<#/doc/ranges/concat_view/iterator/helpers>) |  substitui `_it__` pelo início da próxima view, se `_it__` for o fim da view atual  
(função membro apenas para exposição*)  
[__prev__](<#/doc/ranges/concat_view/iterator/helpers>) |  decrementa `_it__` de modo que ele aponte para a posição anterior  
(função membro apenas para exposição*)  
[__advance-fwd__](<#/doc/ranges/concat_view/iterator/helpers>) |  avança a posição atual em um dado offset  
(função membro apenas para exposição*)  
[__advance-bwd__](<#/doc/ranges/concat_view/iterator/helpers>) |  decrementa a posição atual em um dado valor  
(função membro apenas para exposição*)  
  
### Funções não-membro

[ operator==operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/ranges/concat_view/iterator/operator_cmp>)(C++26) |  compara os iterators subjacentes   
(função)  
[ operator+operator-](<#/doc/ranges/concat_view/iterator/operator_arith2>)(C++26) |  realiza aritmética de iterator   
(função)  
[ iter_move](<#/doc/ranges/concat_view/iterator/iter_move>)(C++26) |  converte o resultado da desreferenciação do iterator subjacente para seu tipo de referência rvalue associado   
(função)  
[ iter_swap](<#/doc/ranges/concat_view/iterator/iter_swap>)(C++26) |  troca os objetos apontados por dois iterators subjacentes   
(função)  
  
### Exemplo

A versão preliminar pode ser verificada no [Compiler Explorer](<https://godbolt.org/z/TGv8v84xz>).

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <ranges>
    
    int main()
    {
        namespace views = std::views;
        static constexpr int p[]{1, 2, 3};
        static constexpr auto e = {4, 5};
        auto t = views::iota(6, 9);
        auto cat = views::concat(p, e, t);
        auto dog = views::concat(cat, cat);
        for (auto i{dog.begin()}; i != std::default_sentinel; ++i)
            std::cout << *i << ' ';
        std::cout << '\n';
    }
```

Saída: 
```
    1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8
```

### Referências

  * Padrão C++26 (ISO/IEC 14882:2026): 

    

  * 26.7.18.3 Class template `concat_view::iterator` [range.concat.iterator] 
