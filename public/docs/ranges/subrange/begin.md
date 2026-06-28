# std::ranges::subrange&lt;I,S,K&gt;::begin

```cpp
constexpr I begin() const requires std::copyable<I>;  // (1) (desde C++20)
constexpr I begin() requires (!std::copyable<I>);  // (2) (desde C++20)
```

  
Obtém o iterator para o início do [`subrange`](<#/doc/ranges/subrange>). 

### Valor de retorno

1) `_[begin_](<#/doc/ranges/subrange>)_`.

2) std::move(`_[begin_](<#/doc/ranges/subrange>)_` ).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ end](<#/doc/ranges/subrange/end>) | obtém o sentinel   
(função membro pública)  
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array   
(modelo de função)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range  
(objeto de ponto de customização)