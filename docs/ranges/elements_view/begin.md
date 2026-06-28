# std::ranges::elements_view&lt;V,N&gt;::begin

```cpp
constexpr auto begin() requires (!/*simple-view*/<V>);  // (1) (desde C++20)
constexpr auto begin() const requires ranges::range<const V>;  // (2) (desde C++20)
```

  
Retorna um [iterator](<#/doc/ranges/elements_view/iterator>) para o primeiro elemento da `elements_view`.

Seja [`_base__`](<#/doc/ranges/elements_view>) a view subjacente.

1) Equivalente a return /*iterator*/&lt;false&gt;([ranges::begin](<#/doc/ranges/begin>)(base_));.

2) Equivalente a return /*iterator*/&lt;true&gt;([ranges::begin](<#/doc/ranges/begin>)(base_));.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ end](<#/doc/ranges/elements_view/end>) | retorna um iterator ou um sentinel para o fim   
(função membro pública)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range  
(objeto de ponto de customização)