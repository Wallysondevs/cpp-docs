# std::ranges::iterator_t, std::ranges::const_iterator_t, std::ranges::sentinel_t, std::ranges::const_sentinel_t

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class T >
using iterator_t = decltype(ranges::begin(std::declval<T&>()));
template< ranges::range R >
using const_iterator_t = decltype(ranges::cbegin(std::declval<R&>()));
template< ranges::range R >
using sentinel_t = decltype(ranges::end(std::declval<R&>()));
template< ranges::range R >
using const_sentinel_t = decltype(ranges::cend(std::declval<R&>()));
```

  
1) Usado para obter o tipo de iterator do tipo `T`.

2) Usado para obter o tipo de iterator constante do tipo [`range`](<#/doc/ranges/range>) `R`.

3) Usado para obter o tipo de sentinel do tipo range `R`.

4) Usado para obter o tipo de sentinel constante do tipo range `R`.

### Parâmetros de template

T  |  \-  |  um tipo que pode ser usado em [std::ranges::begin](<#/doc/ranges/begin>)  
---|---|---
R  |  \-  |  um tipo [`range`](<#/doc/ranges/range>) ou um tipo [`sized_range`](<#/doc/ranges/sized_range>)   
  
### Notas

`iterator_t` pode ser aplicado a tipos que não são ranges, por exemplo, arrays com limite desconhecido. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3946](<https://cplusplus.github.io/LWG/issue3946>) | C++23  | `const_iterator_t` e `const_sentinel_t` eram inconsistentes  
com o resultado de `ranges::cbegin` e `ranges::cend` respectivamente  | ajustado   
  
### Veja também

[ iter_value_titer_reference_titer_const_reference_titer_difference_titer_rvalue_reference_titer_common_reference_t](<#/doc/iterator/iter_t>)(C++20)(C++20)(C++23)(C++20)(C++20)(C++20) |  calcula os tipos associados de um iterator  
(modelo de alias)  
[ ranges::range_difference_tranges::range_size_tranges::range_value_t](<#/doc/ranges/range_size_t>)(C++20)(C++20)(C++20) |  obtém os tipos de tamanho, diferença e valor de um range  
(modelo de alias)  
[ ranges::range_reference_tranges::range_const_reference_tranges::range_rvalue_reference_tranges::range_common_reference_t](<#/doc/ranges/range_reference_t>)(C++20)(C++23)(C++20)(C++20) |  obtém os tipos de referência de um range  
(modelo de alias)