# std::ranges::enumerate_view&lt;V&gt;::begin

```cpp
constexpr auto begin() requires (!/*simple-view*/<V>);  // (1) (desde C++23)
constexpr auto begin() const requires /*range-with-movable-references*/<const V>;  // (2) (desde C++23)
```

  
Retorna um [iterator](<#/doc/ranges/enumerate_view/iterator>) para o primeiro elemento da `enumerate_view`. 

Seja [`_base__`](<#/doc/ranges/enumerate_view>) a view subjacente. 

1) Equivalente a return /*iterator*/&lt;false&gt;([ranges::begin](<#/doc/ranges/begin>)(base_), 0);.

2) Equivalente a return /*iterator*/&lt;true&gt;([ranges::begin](<#/doc/ranges/begin>)(base_), 0);.

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para o primeiro elemento. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ end](<#/doc/ranges/enumerate_view/end>) | retorna um iterator ou um sentinel para o fim   
(função membro pública)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range  
(objeto de ponto de customização)