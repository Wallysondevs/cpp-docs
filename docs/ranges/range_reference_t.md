# std::ranges::range_reference_t, std::ranges::range_const_reference_t, std::ranges::range_rvalue_reference_t, std::ranges::range_common_reference_t

Definido no header `[<ranges>](<#/doc/header/ranges>)`

```cpp
template< ranges::range R >
using range_reference_t = std::iter_reference_t<ranges::iterator_t<R>>;  // (1) (desde C++20)
template< ranges::range R >
using range_const_reference_t =
std::iter_const_reference_t<ranges::iterator_t<R>>;  // (2) (desde C++23)
template< ranges::range R >
using range_rvalue_reference_t =
std::iter_rvalue_reference_t<ranges::iterator_t<R>>;  // (3) (desde C++20)
template< ranges::range R >
using range_common_reference_t =
std::iter_common_reference_t<ranges::iterator_t<R>>;  // (4) (desde C++20)
```

  
1) Usado para obter o tipo de referência do tipo de iterator do tipo de range `R`.

2) Usado para obter o tipo de referência constante do tipo de iterator do tipo de range `R`.

3) Usado para obter o tipo de referência rvalue do tipo de iterator do tipo de range `R`.

4) Usado para obter o tipo de referência comum do tipo de iterator do tipo de range `R`.

### Parâmetros de template

R  |  \-  |  um tipo [`range`](<#/doc/ranges/range>) ou um tipo [`sized_range`](<#/doc/ranges/sized_range>)   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3860](<https://cplusplus.github.io/LWG/issue3860>) | C++20  | `range_common_reference_t` estava faltando  | adicionado   
  
### Veja também

[ iter_value_titer_reference_titer_const_reference_titer_difference_titer_rvalue_reference_titer_common_reference_t](<#/doc/iterator/iter_t>)(C++20)(C++20)(C++23)(C++20)(C++20)(C++20) |  calcula os tipos associados de um iterator  
(alias de template)  
[ ranges::iterator_tranges::const_iterator_tranges::sentinel_tranges::const_sentinel_t](<#/doc/ranges/iterator_t>)(C++20)(C++23)(C++20)(C++23) |  obtém os tipos de iterator e sentinel de um range  
(alias de template)  
[ ranges::range_difference_tranges::range_size_tranges::range_value_t](<#/doc/ranges/range_size_t>)(C++20)(C++20)(C++20) |  obtém os tipos de tamanho, diferença e valor de um range  
(alias de template)