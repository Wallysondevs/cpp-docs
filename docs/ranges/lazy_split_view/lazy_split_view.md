# std::ranges::lazy_split_view&lt;V,Pattern&gt;::lazy_split_view

```cpp
lazy_split_view()
requires std::default_initializable<V> &&
std::default_initializable<Pattern> = default;  // (1) (desde C++20)
constexpr explicit lazy_split_view( V base, Pattern pattern );  // (2) (desde C++20)
template< ranges::input_range R >
requires std::constructible_from<V, views::all_t<R>> &&
std::constructible_from<Pattern, ranges::single_view<
ranges::range_value_t<R>>>
constexpr explicit lazy_split_view( R&& r, ranges::range_value_t<R> e );  // (3) (desde C++20)
```

  
Constrói um `lazy_split_view`.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) a view subjacente `_[base_](<#/doc/ranges/lazy_split_view>)_` e o delimitador `_[pattern_](<#/doc/ranges/lazy_split_view>)_`.

2) Inicializa a view subjacente `_base__` com std::move(base) e o delimitador `_pattern__` com std::move(pattern).

3) Inicializa a view subjacente `_base__` com [views::all](<#/doc/ranges/all_view>)([std::forward](<#/doc/utility/forward>)&lt;R&gt;(r)) e o delimitador `_pattern__` com [ranges::single_view](<#/doc/ranges/single_view>){std::move(e)}.

### Parâmetros

base  |  \-  |  a view subjacente a ser dividida   
---|---|---
pattern  |  \-  |  uma view a ser usada como delimitador   
e  |  \-  |  um elemento a ser usado como delimitador   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3714](<https://cplusplus.github.io/LWG/issue3714>)  
([P2711R1](<https://wg21.link/P2711R1>))  | C++20  | o construtor multiparâmetro ([2](<#/doc/ranges/lazy_split_view/lazy_split_view>)) não era explicit  | tornado explicit 