# std::ranges::subrange&lt;I,S,K&gt;::operator PairLike

```cpp
template< /*different-from*/<subrange> PairLike >
requires /*pair-like-convertible-from*/<PairLike, const I&, const S&>
constexpr operator PairLike() const;  // (1) (desde C++20)
Conceitos auxiliares
template< class T >
concept /*pair-like*/ = /* ver descrição */; |  (2) | (exposition only*)
template< class T, class U, class V >
concept /*pair-like-convertible-from*/ = /* ver descrição */; |  (3) | (exposition only*)
```

  
1) Converte `subrange` para um tipo pair-like.

Para a definição de /*different-from*/, veja `_[different-from](<#/doc/ranges>)_` ﻿.

2) Determina se um tipo é _pair-like_ ﻿. Equivalente a: 
```cpp 
    template< class T >
    concept /*pair-like*/ =
        !std::is_reference_v<T> && requires(T t)
        {
            typename std::tuple_size<T>::type;
            requires std::derived_from<std::tuple_size<T>,
                                       std::integral_constant<std::size_t, 2>>;
            typename std::tuple_element_t<0, std::remove_const_t<T>>;
            typename std::tuple_element_t<1, std::remove_const_t<T>>;
            { std::get<0>(t) } -> std::convertible_to<
                                      const std::tuple_element_t<0, T>&>;
            { std::get<1>(t) } -> std::convertible_to<
                                      const std::tuple_element_t<1, T>&>;
        };
```

| (até C++23)  
---|---
Este concept é equivalente ao concept de exposição apenas [`_pair-like_`](<#/doc/utility/tuple/tuple-like>) de toda a biblioteca. | (desde C++23)  
  
3) Determina se um tipo pair-like pode ser construído a partir de dois valores de tipos dados possivelmente diferentes. Equivalente a: 
```cpp 
    template< class T, class U, class V >
    concept /*pair-like-convertible-from*/ =
        !ranges::range<T> && /*pair-like*/<T> &&
        std::constructible_from<T, U, V> &&
        /*convertible-to-non-slicing*/<U, std::tuple_element_t<0, T>> &&
        std::convertible_to<V, std::tuple_element_t<1, T>>;
```

| (até C++23)  
Equivalente a: 
```cpp 
    template< class T, class U, class V >
    concept /*pair-like-convertible-from*/ =
        !ranges::range<T> && !std::is_reference_v<T> && /*pair-like*/<T> &&
        std::constructible_from<T, U, V> &&
        /*convertible-to-non-slicing*/<U, std::tuple_element_t<0, T>> &&
        std::convertible_to<V, std::tuple_element_t<1, T>>;
```

| (desde C++23)  
  
### Valor de retorno

PairLike(`_[begin_](<#/doc/ranges/subrange>)_` ﻿,` ` _[end_](<#/doc/ranges/subrange>)_` ﻿)

### Observações

Os seguintes tipos na standard library são pair-like: 

  * [std::pair](<#/doc/utility/pair>)<T, U>
  * [std::tuple](<#/doc/utility/tuple>)<T, U>
  * [std::array](<#/doc/container/array>)<T, 2>
  * std::[ranges::subrange](<#/doc/ranges/subrange>)<I, S, K>

  * [std::complex](<#/doc/numeric/complex>)&lt;T&gt;

| (desde C++26)  
  
Um tipo definido pelo programa derivado de um desses tipos pode ser um tipo pair-like, se 

  * [`std::tuple_size`](<#/doc/utility/tuple_size>) e [`std::tuple_element`](<#/doc/utility/tuple_element>) forem corretamente especializados para ele, e 
  * chamadas para std::get<0> e std::get<1> para seu valor forem bem-formadas. 

| (até C++23)  
  
Como as especializações de `subrange` são tipos [`range`](<#/doc/ranges/range>), a conversão para elas não é realizada através desta função de conversão. 

Especializações de [std::array](<#/doc/container/array>) não podem ser convertidas de `subrange`, pois são tipos [`range`](<#/doc/ranges/range>). 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <ranges>
    #include <string>
    #include <utility>
     
    using striter = std::string::const_iterator;
     
    using legacy_strview = std::pair<striter, striter>;
     
    void legacy_print(legacy_strview p)
    {
        for (; p.first != p.second; ++p.first)
            std::cout << *p.first << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        std::string dat{"ABCDE"};
        for (auto v{std::ranges::subrange{dat}}; v; v = {v.begin(), v.end() - 1})
        {
            /*...*/
            legacy_print(legacy_strview{v});
        }
    }
```

Saída: 
```
    A B C D E 
    A B C D 
    A B C 
    A B 
    A
```

### Veja também

[_tuple-like pair-like_](<#/doc/utility/tuple/tuple-like>)(C++23) | especifica que um tipo implementou o _protocolo de tupla_  
([`std::get`](<#/doc/utility/tuple/get>), [`std::tuple_element`](<#/doc/utility/tuple_element>), [`std::tuple_size`](<#/doc/utility/tuple_size>))  
(concept de exposição apenas*)  