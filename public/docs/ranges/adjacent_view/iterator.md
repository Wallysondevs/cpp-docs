# std::ranges::adjacent_view&lt;V,N&gt;::iterator

```cpp
template< bool Const >
class /*iterator*/  // (desde C++23)
(apenas para exposição*)
```

  
O tipo de retorno de [`adjacent_view::begin`](<#/doc/ranges/adjacent_view/begin>), e de [`adjacent_view::end`](<#/doc/ranges/adjacent_view/end>) quando a view subjacente `V` é uma [`common_range`](<#/doc/ranges/common_range>). 

O tipo /*iterator*/&lt;true&gt; é retornado pelas sobrecargas qualificadas como const. O tipo /*iterator*/&lt;false&gt; é retornado pelas sobrecargas não qualificadas como const. 

### Tipos Membro

Tipo Membro  |  Definição   
---|---
`_Base_` (private) |  const V se Const for true, caso contrário V.  
(tipo membro apenas para exposição*)  
`iterator_category` |  [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)  
---|---
`iterator_concept` | 

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modelar [`random_access_range`](<#/doc/ranges/random_access_range>). Caso contrário, 
  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modelar [`bidirectional_range`](<#/doc/ranges/bidirectional_range>). Caso contrário, 
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>). 

  
`value_type` |  [std::tuple](<#/doc/utility/tuple>)</*REPEAT*/([ranges::range_value_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;, N)...>;  
---|---
`difference_type` |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;  
  
### Membros de Dados

Objeto Membro  |  Definição   
---|---
`_current__` (private) |  [std::array](<#/doc/container/array>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;, N>.  
(objeto membro apenas para exposição*)  
  
### Funções Membro

[ (construtor)](<#/doc/ranges/adjacent_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ operator*](<#/doc/ranges/adjacent_view/iterator/operator_star_>) |  acessa o elemento   
(função membro pública)  
[ operator[]](<#/doc/ranges/adjacent_view/iterator/operator_at>) |  acessa um elemento por índice   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/adjacent_view/iterator/operator_arith>) |  avança ou decrementa os iterators subjacentes   
(função membro pública)  
  
### Funções Não-Membro

[ operator==operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/ranges/adjacent_view/iterator/operator_cmp>)(C++23) |  compara os iterators subjacentes   
(função)  
[ operator+operator-](<#/doc/ranges/adjacent_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iterators   
(função)  
[ iter_move](<#/doc/ranges/adjacent_view/iterator/iter_move>)(C++23) |  converte o resultado da desreferência do iterator subjacente para seu tipo de referência rvalue associado   
(função)  
[ iter_swap](<#/doc/ranges/adjacent_view/iterator/iter_swap>)(C++23) |  troca os objetos apontados por dois iterators subjacentes   
(função)  
  
### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <concepts>
    #include <list>
    #include <ranges>
    #include <tuple>
    #include <utility>
    #include <vector>
    
    int main()
    {
        auto v = std::vector{0, 1, 2, 3, 4, 5};
        auto i = (v | std::views::adjacent<3>).begin();
        using I = decltype(i);
        static_assert(std::same_as<I::value_type, std::tuple<int, int, int>>);
        static_assert(std::same_as<I::iterator_concept, std::random_access_iterator_tag>);
        // some of available operators:
        ++i; i++; --i; i--; i += 2; i -= 2;
        assert(i[2] == std::tuple(2, 3, 4));
        using DI = decltype(*i);
        static_assert(std::same_as<DI, std::tuple<int&, int&, int&>>);
        std::get<1>(*i) = 42; // modifies v[1] via iterator i
        assert(v[1] == 42);
    
        auto l = std::list{0, 1, 2, 3, 4, 5};
        auto j = (l | std::views::adjacent<3>).begin();
        using J = decltype(j);
        static_assert(std::same_as<J::value_type, std::tuple<int, int, int>>);
        static_assert(std::same_as<J::iterator_concept, std::bidirectional_iterator_tag>);
        ++j; --j; j++; j--; // some of available operators
        // j += 2; j -= 2;       // error: these operator are not available
        // std::ignore() = j[1]; //        for bidirectional iterator
    }
```

### Referências

  * C++23 standard (ISO/IEC 14882:2024): 

    

  * 26.7.25.3 Class template adjacent_view::iterator [range.adjacent.iterator] 

### Veja também  
  
---