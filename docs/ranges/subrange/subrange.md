# std::ranges::subrange&lt;I,S,K&gt;::subrange

```cpp
subrange() requires std::default_initializable<I> = default;  // (1) (desde C++20)
constexpr subrange( /*convertible-to-non-slicing*/<I> auto i, S s )
requires (!/*StoreSize*/);  // (2) (desde C++20)
constexpr subrange( /*convertible-to-non-slicing*/<I> auto i, S s,
/*make-unsigned-like-t*/<std::iter_difference_t<I>> n )
requires (K == ranges::subrange_kind::sized);  // (3) (desde C++20)
template< /*different-from*/<subrange> R >
requires ranges::borrowed_range<R> &&
/*convertible-to-non-slicing*/<ranges::iterator_t<R>, I> &&
std::convertible_to<ranges::sentinel_t<R>, S>
constexpr subrange( R&& r )
requires (!/*StoreSize*/ || ranges::sized_range<R>);  // (4) (desde C++20)
template< ranges::borrowed_range R>
requires /*convertible-to-non-slicing*/<ranges::iterator_t<R>, I> &&
std::convertible_to<ranges::sentinel_t<R>, S>
constexpr subrange( R&& r,
/*make-unsigned-like-t*/<std::iter_difference_t<I>> n )
requires (K == ranges::subrange_kind::sized)
: subrange{ranges::begin(r), ranges::end(r), n} {}  // (5) (desde C++20)
```

  
Constrói um `subrange`.

Para as definições de /*make-unsigned-like-t*/ e /*different-from*/, veja `_[make-unsigned-like-t](<#/doc/ranges>)_` e `_[different-from](<#/doc/ranges>)_` respectivamente.

Sobrecarga  | [Membros de dados](<#/doc/ranges/subrange>)  
`_begin__` | `_end__` | `_size__`  
(somente se `_[StoreSize](<#/doc/ranges/subrange>)_` for true)  
(1) | [inicializado por valor](<#/doc/language/value_initialization>) | [inicializado por valor](<#/doc/language/value_initialization>) | inicializado com ​0​  
---|---|---|---
(2) | inicializado com std::move(i) | inicializado com s |  N/A  
(3) | inicializado com n  
(4) | inicializado com std::move([ranges::begin](<#/doc/ranges/begin>)(r)) | inicializado com [ranges::end](<#/doc/ranges/end>)(r) | inicializado com static_cast<decltype(`_[size_](<#/doc/ranges/subrange>)_` ﻿)>  
` `([ranges::size](<#/doc/ranges/size>)(r))  
(5) | inicializado com n  
  
2) Se `[`i`, `s`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

3) Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido: 

  * `[`i`, `s`)` não for um range válido. 
  * n ==` ` _[to-unsigned-like](<#/doc/ranges>)_` ` `([ranges::distance](<#/doc/iterator/ranges/distance>)(i, s)) for false.

### Parâmetros

i  |  \-  |  iterator que denota o início do range   
---|---|---
s  |  \-  |  sentinel que denota o fim do range   
r  |  \-  |  range   
n  |  \-  |  dica de tamanho, deve ser igual ao tamanho do range   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2393R1](<https://wg21.link/P2393R1>) | C++20  | para a sobrecarga ([4](<#/doc/ranges/subrange/subrange>)), `_[size_](<#/doc/ranges/subrange>)_` pode ser inicializado com [ranges::size](<#/doc/ranges/size>)(r), mas nem sempre é implicitamente conversível para o tipo [_unsigned-integer-like_](<#/doc/iterator/is-integer-like>) correspondente  | tornou a conversão explícita 