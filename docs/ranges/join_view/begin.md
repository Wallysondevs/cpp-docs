# std::ranges::join_view&lt;V&gt;::begin

```cpp
constexpr auto begin();
```
| (1) | (desde C++20) |
|---|---|
```cpp
constexpr auto begin() const
requires ranges::input_range<const V> &&
std::is_reference_v<ranges::range_reference_t<const V>>;
```
| (2) | (desde C++20) |
|---|---|

Retorna um [iterator](<#/doc/ranges/join_view/iterator>) para o primeiro elemento da `join_view`. Dado que `_base__` é a view subjacente,

1) Equivalente a

  * `return /*iterator*/<true>{*this, ranges::begin(base_)};` se `/*simple-view*/<V>` for satisfeita e `ranges::range_reference_t<V>` for um tipo de referência. Caso contrário,
  * `return /*iterator*/<false>{*this, ranges::begin(base_)};`.

2) Equivalente a `return /*iterator*/<true>{*this, ranges::begin(base_)};`.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Observações

Quando `ranges::range_reference_t<V>` não é um tipo de referência, ou seja, desreferenciar um iterator de `V` retorna um prvalue temporário, a `join_view` é apenas um [`input_range`](<#/doc/ranges/input_range>), caso em que apenas a iteração de passagem única é suportada, e chamadas repetidas a `begin()` podem não produzir resultados significativos.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ end](<#/doc/ranges/join_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range
(objeto de ponto de customização)