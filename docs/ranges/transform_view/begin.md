# std::ranges::transform_view&lt;V,F&gt;::begin

```cpp
constexpr /*iterator*/<false> begin();  // (1) (desde C++20)
constexpr /*iterator*/<true> begin() const
requires ranges::range<const V> &&
std::regular_invocable<const F&, ranges::range_reference_t<const V>>;  // (2) (desde C++20)
```

  
Retorna um [iterator](<#/doc/ranges/transform_view/iterator>) para o primeiro elemento da `transform_view`.

1) Equivalente a `return /*iterator*/<false>{*this, [ranges::begin](<#/doc/ranges/begin>)(base_)};`, onde [`_base__`](<#/doc/ranges/transform_view>) é a view subjacente.

2) Equivalente a `return /*iterator*/<true>{*this, [ranges::begin](<#/doc/ranges/begin>)(base_)};`, onde `_base__` é a view subjacente.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ end](<#/doc/ranges/transform_view/end>) | retorna um iterator ou um sentinel para o fim   
(função membro pública)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range  
(objeto de ponto de customização)