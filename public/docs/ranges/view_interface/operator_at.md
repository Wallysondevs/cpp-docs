# std::ranges::view_interface&lt;D&gt;::operator[]

```cpp
template<ranges::random_access_range R = D>
constexpr decltype(auto) operator<R> n );  // (1) (desde C++20)
template<ranges::random_access_range R = const D>
constexpr decltype(auto) operator<R> n ) const;  // (2) (desde C++20)
```

  
A implementação padrão da função membro operator[] obtém o elemento no offset especificado em relação ao iterator inicial, reutilizando o operator[] do tipo do iterator.

1) Seja `derived` static_cast<D&>(*this). Equivalente a return [ranges::begin](<#/doc/ranges/begin>)(derived)[n];.

2) O mesmo que (1), exceto que `derived` é static_cast&lt;const D&&gt;(*this).

### Parâmetros

n  |  \-  |  posição do elemento a ser retornado   
  
### Valor de retorno

O elemento no offset `n` em relação ao iterator inicial.

### Observações

Em C++20, nenhum tipo derivado de [std::ranges::view_interface](<#/doc/ranges/view_interface>) na standard library fornece sua própria função membro operator[] .

No entanto, os seguintes tipos derivados não podem usar as implementações padrão, pois nunca satisfazem [`random_access_range`](<#/doc/ranges/random_access_range>):

  * [std::ranges::basic_istream_view](<#/doc/ranges/basic_istream_view>)
  * [std::ranges::filter_view](<#/doc/ranges/filter_view>)
  * [std::ranges::join_view](<#/doc/ranges/join_view>)
  * std::ranges::lazy_split_view
  * [std::ranges::split_view](<#/doc/ranges/split_view>)

A função membro operator[] herdada está disponível para [std::ranges::empty_view](<#/doc/ranges/empty_view>), mas uma chamada a ela sempre resulta em comportamento indefinido.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   