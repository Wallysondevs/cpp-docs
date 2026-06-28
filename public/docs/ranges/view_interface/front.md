# std::ranges::view_interface&lt;D&gt;::front

```cpp
constexpr decltype(auto) front()
requires ranges::forward_range<D>;  // (1) (desde C++20)
constexpr decltype(auto) front() const
requires ranges::forward_range<const D>;  // (2) (desde C++20)
```

  
A implementação padrão da função membro `front()` retorna o primeiro elemento na view do tipo derivado. Se o elemento é retornado por valor ou por referência depende do `operator*` do tipo do iterator.

1) Seja `derived` igual a static_cast<D&>(*this). Equivalente a return *[ranges::begin](<#/doc/ranges/begin>)(derived);. O comportamento é indefinido se [`empty()`](<#/doc/ranges/view_interface/empty>) for `true` (isto é, o iterator inicial se compara igual ao sentinel), mesmo que o iterator obtido da mesma forma seja desreferenciável.

2) O mesmo que (1), exceto que `derived` é static_cast&lt;const D&&gt;(*this).

### Parâmetros

(nenhum) 

### Valor de retorno

O primeiro elemento na view. 

### Observações

Em C++20, nenhum tipo derivado de [std::ranges::view_interface](<#/doc/ranges/view_interface>) na standard library fornece sua própria função membro `front()`. Quase todos esses tipos usam a implementação padrão.

Uma exceção notável é [std::ranges::basic_istream_view](<#/doc/ranges/basic_istream_view>). Como ele nunca satisfaz [`forward_range`](<#/doc/ranges/forward_range>), a view não pode usar o `front()` herdado.

A função membro `front()` herdada está disponível para [std::ranges::empty_view](<#/doc/ranges/empty_view>), mas uma chamada a ela sempre resulta em comportamento indefinido.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array   
(modelo de função)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range  
(objeto de ponto de customização)  
[ ranges::cbegin](<#/doc/ranges/cbegin>)(C++20) | retorna um iterator para o início de um range somente leitura  
(objeto de ponto de customização)