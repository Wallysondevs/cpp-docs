# tuple-like, pair-like

```cpp
template< class T >
concept tuple-like = /* see below */;  // (1) (desde C++23)
(apenas para exposição*)
template< class T >
concept pair-like =
tuple-like<T> && std::tuple_size_v<std::remove_cvref_t<T>> == 2;  // (2) (desde C++23)
(apenas para exposição*)
```

  
1) Um tipo `T` modela e satisfaz o concept `_tuple-like_` se [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt; for uma especialização de 

  * [std::array](<#/doc/container/array>), 

  * [std::complex](<#/doc/numeric/complex>), 

| (desde C++26)  
  
  * [std::pair](<#/doc/utility/pair>), 
  * [std::tuple](<#/doc/utility/tuple>), ou 
  * [std::ranges::subrange](<#/doc/ranges/subrange>).

2) Objetos `_pair-like_` são objetos `_tuple-like_` com exatamente 2 elementos.

### Notas

Tipos `_tuple-like_` implementam o _protocolo tuple_ , ou seja, tais tipos podem ser usados com [`std::get`](<#/doc/utility/tuple/get>), [`std::tuple_element`](<#/doc/utility/tuple_element>) e [`std::tuple_size`](<#/doc/utility/tuple_size>). 

Elementos de tipos `_tuple-like_` podem ser vinculados com [structured binding](<#/doc/language/structured_binding>). 

### Veja também

`_tuple-like_` e `_pair-like_` são usados nos seguintes componentes da standard library: 

[ (construtor)](<#/doc/utility/tuple/tuple>) |  constrói uma nova `tuple`   
(função membro pública)  
[ operator=](<#/>) |  atribui o conteúdo de uma `tuple` a outra   
(função membro pública)  
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/tuple/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) |  compara lexicograficamente os valores na tuple   
(template de função)  
[ std::basic_common_reference<_tuple-like_ >](<#/doc/utility/tuple/basic_common_reference>)(C++23) |  determina o tipo de referência comum de uma `tuple` e um tipo `_tuple-like_`   
(especialização de template de classe)  
[ std::common_type<_tuple-like_ >](<#/doc/utility/tuple/common_type>)(C++23) |  determina o tipo comum de uma `tuple` e um tipo `_tuple-like_`   
(especialização de template de classe)  
[ tuple_cat](<#/doc/utility/tuple/tuple_cat>)(C++11) |  cria uma `tuple` concatenando qualquer número de tuples   
(template de função)  
[ apply](<#/doc/utility/apply>)(C++17) |  chama uma função com uma tuple de argumentos   
(template de função)  
[ make_from_tuple](<#/doc/utility/make_from_tuple>)(C++17) |  constrói um objeto com uma tuple de argumentos   
(template de função)  
[ (construtor)](<#/doc/utility/pair/pair>) |  constrói nova `pair`   
(função membro pública de `std::pair<T1,T2>`)  
[ operator=](<#/>) |  atribui o conteúdo   
(função membro pública de `std::pair<T1,T2>`)  
[ operator PairLike](<#/doc/ranges/subrange/operator_PairLike>) |  converte o `subrange` para um tipo `_pair-like_`   
(função membro pública de `std::ranges::subrange<I,S,K>`)  
[ ranges::elements_viewviews::elements](<#/doc/ranges/elements_view>)(C++20) |  recebe uma [`view`](<#/doc/ranges/view>) consistindo de valores `_tuple-like_` e um número N e produz uma [`view`](<#/doc/ranges/view>) do N-ésimo elemento de cada tuple  
(template de classe) (objeto adaptador de range)